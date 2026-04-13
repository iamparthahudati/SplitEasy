import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../theme/colors';
import { fontSizes, fontWeights } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';
import { CustomHeader } from '../../components/ui/CustomHeader';

// ─── Mock Data ────────────────────────────────────────────────────────────────

type ActivityType = 'expense' | 'settlement';

interface ActivityItem {
  id: string;
  type: ActivityType;
  date: string;       // ISO string
  group: string;
  description: string;
  amount: number;
  currency: string;
  paidBy: string;     // name
  yourShare?: number; // how much you owe/owed from this expense
  settled?: { from: string; to: string }; // for settlements
}

const MOCK_ACTIVITY: ActivityItem[] = [
  { id: '1', type: 'expense', date: '2026-04-13', group: 'Flat Bills', description: 'Electricity — April', amount: 126.00, currency: '$', paidBy: 'Jordan Lee', yourShare: 42.00 },
  { id: '2', type: 'expense', date: '2026-04-13', group: 'Pizza Fridays', description: "Domino's order", amount: 67.50, currency: '$', paidBy: 'You', yourShare: 11.25 },
  { id: '3', type: 'settlement', date: '2026-04-12', group: 'Spain Trip 2024', description: 'Settlement', amount: 55.00, currency: '$', paidBy: 'Alex Chen', settled: { from: 'Alex Chen', to: 'You' } },
  { id: '4', type: 'expense', date: '2026-04-12', group: 'Spain Trip 2024', description: 'Hotel Barcelona', amount: 620.00, currency: '$', paidBy: 'You', yourShare: -372.00 },
  { id: '5', type: 'expense', date: '2026-04-10', group: 'Weekend Ski', description: 'Ski rental x4', amount: 280.00, currency: '$', paidBy: 'Sam Park', yourShare: 70.00 },
  { id: '6', type: 'settlement', date: '2026-04-09', group: 'Pizza Fridays', description: 'Settlement', amount: 18.75, currency: '$', paidBy: 'You', settled: { from: 'You', to: 'Sam Park' } },
  { id: '7', type: 'expense', date: '2026-04-08', group: 'Spain Trip 2024', description: 'Tapas dinner', amount: 94.00, currency: '$', paidBy: 'Mia Torres', yourShare: 18.80 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

type FilterType = 'all' | 'expense' | 'settlement';

function formatDate(iso: string): string {
  const d = new Date(iso);
  const today = new Date('2026-04-13');
  const yesterday = new Date('2026-04-12');
  if (iso === '2026-04-13') { return 'Today'; }
  if (iso === '2026-04-12') { return 'Yesterday'; }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function groupByDate(items: ActivityItem[]): { date: string; data: ActivityItem[] }[] {
  const map = new Map<string, ActivityItem[]>();
  for (const item of items) {
    const existing = map.get(item.date) ?? [];
    map.set(item.date, [...existing, item]);
  }
  return Array.from(map.entries()).map(([date, data]) => ({ date, data }));
}

const CATEGORY_ICONS: Record<string, string> = {
  Hotel: '🏨', Electricity: '⚡', Domino: '🍕', tapas: '🍷', Ski: '🎿', Settlement: '💸',
};

function getExpenseIcon(description: string): string {
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (description.toLowerCase().includes(key.toLowerCase())) { return icon; }
  }
  return '💳';
}

// ─── Components ───────────────────────────────────────────────────────────────

function ActivityRow({ item }: { item: ActivityItem }) {
  const isSettlement = item.type === 'settlement';
  const iYouPaid = item.paidBy === 'You';
  const yourShare = item.yourShare ?? 0;
  const isYouOwe = yourShare > 0 && !iYouPaid;
  const isOwedToYou = iYouPaid && !isSettlement;

  return (
    <View style={styles.actRow}>
      {/* Icon circle */}
      <View style={[styles.actIcon, isSettlement ? styles.actIconSettlement : styles.actIconExpense]}>
        <Text style={styles.actIconText}>
          {isSettlement ? '💸' : getExpenseIcon(item.description)}
        </Text>
      </View>

      {/* Info */}
      <View style={styles.actInfo}>
        <View style={styles.actInfoTop}>
          <Text style={styles.actDescription} numberOfLines={1}>{item.description}</Text>
          <Text style={[
            styles.actAmount,
            isSettlement ? styles.settlementText : isOwedToYou ? styles.posText : isYouOwe ? styles.negText : styles.neutralText,
          ]}>
            {isSettlement
              ? `$${item.amount.toFixed(2)}`
              : iYouPaid
                ? `+$${(item.amount - (item.yourShare ?? 0)).toFixed(2)}`
                : `-$${(item.yourShare ?? 0).toFixed(2)}`
            }
          </Text>
        </View>

        <View style={styles.actInfoBottom}>
          {/* Group badge */}
          <View style={styles.groupBadge}>
            <Text style={styles.groupBadgeText} numberOfLines={1}>{item.group}</Text>
          </View>

          {isSettlement ? (
            <Text style={styles.actMeta}>
              {item.settled?.from} → {item.settled?.to}
            </Text>
          ) : (
            <Text style={styles.actMeta}>
              {iYouPaid ? 'You paid' : `${item.paidBy} paid`} · ${item.amount.toFixed(2)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

function DateHeader({ date }: { date: string }) {
  return (
    <View style={styles.dateHeader}>
      <Text style={styles.dateHeaderText}>{formatDate(date)}</Text>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function ActivityScreen() {
  const [filter, setFilter] = useState<FilterType>('all');

  const FILTERS: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'expense', label: 'Expenses' },
    { key: 'settlement', label: 'Settlements' },
  ];

  const filtered = MOCK_ACTIVITY.filter(a => filter === 'all' || a.type === filter);
  const sections = groupByDate(filtered);

  // Flatten for FlatList with date headers
  const flatData: ({ kind: 'header'; date: string } | { kind: 'item'; item: ActivityItem })[] = [];
  for (const section of sections) {
    flatData.push({ kind: 'header', date: section.date });
    for (const item of section.data) {
      flatData.push({ kind: 'item', item });
    }
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <CustomHeader title="Activity" />

      {/* ── Filter pills ───────────────────────────────────────────────── */}
      <View style={styles.filterRow}>
        {FILTERS.map(f => (
          <Pressable
            key={f.key}
            style={[styles.filterPill, filter === f.key && styles.filterPillActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* ── Activity feed ──────────────────────────────────────────────── */}
      {flatData.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyTitle}>No activity yet</Text>
          <Text style={styles.emptySubtitle}>Expenses and settlements will appear here.</Text>
        </View>
      ) : (
        <FlatList
          data={flatData}
          keyExtractor={(item, index) =>
            item.kind === 'header' ? `header-${item.date}` : `item-${item.item.id}`
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: row }) => {
            if (row.kind === 'header') {
              return <DateHeader date={row.date} />;
            }
            return <ActivityRow item={row.item} />;
          }}
        />
      )}
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  // Header
  header: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
    paddingBottom: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
  },

  // Filters
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
    gap: spacing[2],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterPill: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.borderMid,
  },
  filterPillActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  filterText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium as any,
    color: colors.text3,
  },
  filterTextActive: { color: colors.white },

  // List
  listContent: {
    paddingBottom: spacing[10],
  },

  // Date header
  dateHeader: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[5],
    paddingBottom: spacing[2],
  },
  dateHeaderText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
    color: colors.text4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Activity row
  actRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[5],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing[3],
  },
  actIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actIconExpense: { backgroundColor: colors.brandLight },
  actIconSettlement: { backgroundColor: colors.posBg },
  actIconText: { fontSize: fontSizes.xl },

  actInfo: { flex: 1, gap: spacing[1] },
  actInfoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[2],
  },
  actDescription: {
    flex: 1,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold as any,
    color: colors.text1,
  },
  actAmount: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold as any,
  },
  actInfoBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    flexWrap: 'wrap',
  },
  groupBadge: {
    backgroundColor: colors.brandLight,
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  groupBadgeText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    color: colors.brand,
  },
  actMeta: {
    fontSize: fontSizes.xs,
    color: colors.text4,
    flex: 1,
  },

  posText: { color: colors.pos },
  negText: { color: colors.neg },
  settlementText: { color: colors.pos },
  neutralText: { color: colors.text3 },

  // Empty state
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[8],
  },
  emptyIcon: { fontSize: 48, marginBottom: spacing[4] },
  emptyTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
    marginBottom: spacing[2],
  },
  emptySubtitle: {
    fontSize: fontSizes.base,
    color: colors.text3,
    textAlign: 'center',
  },
});
