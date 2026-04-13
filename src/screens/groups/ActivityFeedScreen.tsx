import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors } from '../../theme/colors';
import { fontSizes, fontWeights } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';
import type { GroupsStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<GroupsStackParamList, 'ActivityFeed'>;

// ─── Types ────────────────────────────────────────────────────────────────────

type ActivityType = 'expense' | 'settlement' | 'member_joined' | 'member_left' | 'group_created';

interface ActivityItem {
  id: string;
  type: ActivityType;
  actor: string;
  date: string;
  dateGroup: string;
  // expense-specific
  expenseName?: string;
  expenseAmount?: number;
  expenseCurrency?: string;
  expenseIcon?: string;
  // settlement-specific
  settleTo?: string;
  settleAmount?: number;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const ACTIVITY_DATA: Record<string, ActivityItem[]> = {
  '1': [
    { id: 'a1',  type: 'expense',    actor: 'You',    date: 'Apr 10, 2:14 PM', dateGroup: 'Today',     expenseName: 'Hotel Barcelona',        expenseAmount: 350.00, expenseCurrency: '$', expenseIcon: '🏠' },
    { id: 'a2',  type: 'expense',    actor: 'Alex',   date: 'Apr 9, 7:45 PM',  dateGroup: 'Yesterday', expenseName: 'Airport Taxi',            expenseAmount:  65.00, expenseCurrency: '$', expenseIcon: '✈️' },
    { id: 'a3',  type: 'expense',    actor: 'Jordan', date: 'Apr 9, 9:30 PM',  dateGroup: 'Yesterday', expenseName: 'Dinner at El Born',       expenseAmount: 120.00, expenseCurrency: '$', expenseIcon: '🍽️' },
    { id: 'a4',  type: 'expense',    actor: 'You',    date: 'Apr 8, 3:00 PM',  dateGroup: 'Apr 8',     expenseName: 'Sagrada Familia tickets', expenseAmount: 200.00, expenseCurrency: '$', expenseIcon: '⚽' },
    { id: 'a5',  type: 'expense',    actor: 'Sam',    date: 'Apr 7, 11:15 AM', dateGroup: 'Apr 7',     expenseName: 'Groceries',               expenseAmount:  80.00, expenseCurrency: '$', expenseIcon: '🛒' },
    { id: 'a6',  type: 'member_joined', actor: 'Chris', date: 'Apr 6, 10:00 AM', dateGroup: 'Apr 6' },
    { id: 'a7',  type: 'group_created', actor: 'You', date: 'Apr 6, 9:00 AM',  dateGroup: 'Apr 6' },
  ],
  '2': [
    { id: 'a1',  type: 'expense',    actor: 'Mike',   date: 'Apr 1, 8:00 AM',  dateGroup: 'Apr 1', expenseName: 'Electricity — April', expenseAmount: 126.00, expenseCurrency: '$', expenseIcon: '💡' },
    { id: 'a2',  type: 'settlement', actor: 'You',    date: 'Mar 28, 6:00 PM', dateGroup: 'Mar 28', settleTo: 'Emma', settleAmount: 15.00 },
    { id: 'a3',  type: 'expense',    actor: 'You',    date: 'Mar 25, 1:00 PM', dateGroup: 'Mar 25', expenseName: 'Internet',    expenseAmount: 60.00, expenseCurrency: '$', expenseIcon: '💡' },
    { id: 'a4',  type: 'expense',    actor: 'Emma',   date: 'Mar 20, 3:00 PM', dateGroup: 'Mar 20', expenseName: 'Water bill',  expenseAmount: 45.00, expenseCurrency: '$', expenseIcon: '💡' },
    { id: 'a5',  type: 'group_created', actor: 'You', date: 'Mar 1, 9:00 AM', dateGroup: 'Mar 1' },
  ],
  '3': [
    { id: 'a1',  type: 'settlement', actor: 'You',    date: 'Feb 16, 4:00 PM', dateGroup: 'Feb 16', settleTo: 'Riley',  settleAmount: 60.00 },
    { id: 'a2',  type: 'settlement', actor: 'You',    date: 'Feb 16, 4:00 PM', dateGroup: 'Feb 16', settleTo: 'Taylor', settleAmount: 80.00 },
    { id: 'a3',  type: 'expense',    actor: 'Riley',  date: 'Feb 15, 2:00 PM', dateGroup: 'Feb 15', expenseName: 'Ski rental',   expenseAmount: 240.00, expenseCurrency: '$', expenseIcon: '⛷️' },
    { id: 'a4',  type: 'expense',    actor: 'You',    date: 'Feb 15, 8:00 PM', dateGroup: 'Feb 15', expenseName: 'Lodge dinner', expenseAmount: 180.00, expenseCurrency: '$', expenseIcon: '🍽️' },
    { id: 'a5',  type: 'expense',    actor: 'Taylor', date: 'Feb 14, 9:00 AM', dateGroup: 'Feb 14', expenseName: 'Lift passes',  expenseAmount: 320.00, expenseCurrency: '$', expenseIcon: '🎿' },
    { id: 'a6',  type: 'group_created', actor: 'You', date: 'Feb 10, 9:00 AM', dateGroup: 'Feb 10' },
  ],
  '4': [
    { id: 'a1',  type: 'expense',    actor: 'You',   date: 'Apr 11, 7:30 PM', dateGroup: 'Apr 11', expenseName: "Domino's order",  expenseAmount: 112.50, expenseCurrency: '$', expenseIcon: '🍕' },
    { id: 'a2',  type: 'expense',    actor: 'Ben',   date: 'Apr 4, 7:00 PM',  dateGroup: 'Apr 4',  expenseName: "Pizza Hut order", expenseAmount:  96.00, expenseCurrency: '$', expenseIcon: '🍕' },
    { id: 'a3',  type: 'expense',    actor: 'Chloe', date: 'Mar 28, 7:15 PM', dateGroup: 'Mar 28', expenseName: "Papa John's",     expenseAmount:  84.00, expenseCurrency: '$', expenseIcon: '🍕' },
    { id: 'a4',  type: 'group_created', actor: 'You', date: 'Mar 1, 9:00 AM', dateGroup: 'Mar 1' },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAvatarColor(name: string) {
  const palette = ['#6366F1', '#059669', '#0891B2', '#DC2626', '#D97706', '#7C3AED'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

function getInitials(name: string) {
  return name === 'You' ? 'Me' : name.slice(0, 2).toUpperCase();
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────

type Filter = 'all' | 'expenses' | 'settlements';
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all',         label: 'All' },
  { key: 'expenses',    label: 'Expenses' },
  { key: 'settlements', label: 'Settlements' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function MiniAvatar({ name }: { name: string }) {
  const bg = getAvatarColor(name);
  return (
    <View style={[styles.avatar, { backgroundColor: bg + '20' }]}>
      <Text style={[styles.avatarText, { color: bg }]}>{getInitials(name)}</Text>
    </View>
  );
}

function ActivityRow({ item }: { item: ActivityItem }) {
  switch (item.type) {
    case 'expense':
      return (
        <View style={styles.row}>
          <View style={styles.iconWrap}>
            <Text style={styles.rowEmoji}>{item.expenseIcon}</Text>
          </View>
          <View style={styles.rowBody}>
            <Text style={styles.rowTitle} numberOfLines={1}>
              <Text style={styles.rowActor}>{item.actor === 'You' ? 'You' : item.actor}</Text>
              {' added '}
              <Text style={styles.rowHighlight}>{item.expenseName}</Text>
            </Text>
            <Text style={styles.rowDate}>{item.date}</Text>
          </View>
          <Text style={styles.rowAmount}>
            {item.expenseCurrency}{item.expenseAmount?.toFixed(2)}
          </Text>
        </View>
      );

    case 'settlement':
      return (
        <View style={styles.row}>
          <View style={[styles.iconWrap, styles.iconWrapGreen]}>
            <Text style={styles.rowEmoji}>🤝</Text>
          </View>
          <View style={styles.rowBody}>
            <Text style={styles.rowTitle} numberOfLines={1}>
              <Text style={styles.rowActor}>{item.actor === 'You' ? 'You' : item.actor}</Text>
              {' paid '}
              <Text style={styles.rowHighlight}>{item.settleTo}</Text>
            </Text>
            <Text style={styles.rowDate}>{item.date}</Text>
          </View>
          <View style={styles.settleAmountWrap}>
            <Text style={styles.settleAmount}>${item.settleAmount?.toFixed(2)}</Text>
            <Text style={styles.settleLabel}>settled</Text>
          </View>
        </View>
      );

    case 'member_joined':
      return (
        <View style={styles.rowMeta}>
          <MiniAvatar name={item.actor} />
          <Text style={styles.metaText}>
            <Text style={styles.rowActor}>{item.actor}</Text>
            {' joined the group'}
          </Text>
          <Text style={styles.metaDate}>{item.date}</Text>
        </View>
      );

    case 'member_left':
      return (
        <View style={styles.rowMeta}>
          <MiniAvatar name={item.actor} />
          <Text style={styles.metaText}>
            <Text style={styles.rowActor}>{item.actor}</Text>
            {' left the group'}
          </Text>
          <Text style={styles.metaDate}>{item.date}</Text>
        </View>
      );

    case 'group_created':
      return (
        <View style={styles.rowMeta}>
          <View style={[styles.avatar, { backgroundColor: colors.brandLight }]}>
            <Text style={[styles.avatarText, { color: colors.brand }]}>✦</Text>
          </View>
          <Text style={styles.metaText}>
            <Text style={styles.rowActor}>{item.actor === 'You' ? 'You' : item.actor}</Text>
            {' created this group'}
          </Text>
          <Text style={styles.metaDate}>{item.date}</Text>
        </View>
      );

    default:
      return null;
  }
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function ActivityFeedScreen({ route, navigation }: Props) {
  const { groupId } = route.params;
  const allItems = ACTIVITY_DATA[groupId] ?? [];

  const [filter, setFilter] = useState<Filter>('all');

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: 'Activity' });
  }, [navigation]);

  const filtered = allItems.filter(item => {
    if (filter === 'expenses')    return item.type === 'expense';
    if (filter === 'settlements') return item.type === 'settlement';
    return true;
  });

  // Group items by dateGroup, preserving order
  const sections: { dateGroup: string; data: ActivityItem[] }[] = [];
  const seen = new Set<string>();
  for (const item of filtered) {
    if (!seen.has(item.dateGroup)) {
      seen.add(item.dateGroup);
      sections.push({ dateGroup: item.dateGroup, data: [] });
    }
    sections[sections.length - 1].data.push(item);
  }

  return (
    <View style={styles.root}>
      {/* ── Filter tabs ──────────────────────────────────────────────── */}
      <View style={styles.filterBar}>
        {FILTERS.map(f => (
          <Pressable
            key={f.key}
            style={[styles.filterTab, filter === f.key && styles.filterTabActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.filterTabText, filter === f.key && styles.filterTabTextActive]}>
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* ── List ─────────────────────────────────────────────────────── */}
      <FlatList
        data={sections}
        keyExtractor={s => s.dateGroup}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>No activity yet</Text>
            <Text style={styles.emptySub}>Expenses and settlements will appear here.</Text>
          </View>
        }
        renderItem={({ item: section }) => (
          <View style={styles.section}>
            <Text style={styles.dateHeader}>{section.dateGroup}</Text>
            <View style={styles.card}>
              {section.data.map((item, idx) => (
                <React.Fragment key={item.id}>
                  <ActivityRow item={item} />
                  {idx < section.data.length - 1 && <View style={styles.separator} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  // Filter bar
  filterBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterTab: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.borderMid,
    backgroundColor: colors.white,
  },
  filterTabActive: {
    borderColor: colors.brand,
    backgroundColor: colors.brandLight,
  },
  filterTabText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium as any,
    color: colors.text3,
  },
  filterTabTextActive: {
    color: colors.brand,
    fontWeight: fontWeights.semibold as any,
  },

  // List
  listContent: {
    padding: spacing[4],
    paddingBottom: spacing[10],
    gap: spacing[4],
  },
  section: { gap: spacing[2] },
  dateHeader: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    color: colors.text4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: spacing[1],
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 16 + 40 + 12, // align with text
  },

  // Standard row (expense / settlement)
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3] + 1,
    gap: spacing[3],
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.xs,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconWrapGreen: { backgroundColor: colors.posBg },
  rowEmoji: { fontSize: fontSizes.lg },
  rowBody: { flex: 1, gap: 2 },
  rowTitle: {
    fontSize: fontSizes.base,
    color: colors.text2,
    lineHeight: 20,
  },
  rowActor: {
    fontWeight: fontWeights.semibold as any,
    color: colors.text1,
  },
  rowHighlight: {
    fontWeight: fontWeights.medium as any,
    color: colors.text1,
  },
  rowDate: {
    fontSize: fontSizes.xs,
    color: colors.text4,
  },
  rowAmount: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
    color: colors.text2,
    flexShrink: 0,
  },
  settleAmountWrap: { alignItems: 'flex-end', gap: 1 },
  settleAmount: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
    color: colors.pos,
  },
  settleLabel: {
    fontSize: fontSizes.xs,
    color: colors.text4,
  },

  // Meta row (joined / left / created)
  rowMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[3],
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold as any,
  },
  metaText: {
    flex: 1,
    fontSize: fontSizes.sm,
    color: colors.text3,
  },
  metaDate: {
    fontSize: fontSizes.xs,
    color: colors.text4,
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingTop: spacing[16],
    paddingHorizontal: spacing[8],
  },
  emptyIcon: { fontSize: 44, marginBottom: spacing[4] },
  emptyTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
    marginBottom: spacing[2],
  },
  emptySub: {
    fontSize: fontSizes.base,
    color: colors.text3,
    textAlign: 'center',
  },
});