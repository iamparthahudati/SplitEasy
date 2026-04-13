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
import { spacing, radius, sizes } from '../../theme/spacing';

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface PersonBalance {
  id: string;
  name: string;
  balance: number; // positive = they owe you, negative = you owe them
  currency: string;
  groups: string[]; // group names they're in
}

const MOCK_BALANCES: PersonBalance[] = [
  { id: '1', name: 'Alex Chen', balance: 86.50, currency: '$', groups: ['Spain Trip 2024', 'Pizza Fridays'] },
  { id: '2', name: 'Mia Torres', balance: 38.00, currency: '$', groups: ['Spain Trip 2024'] },
  { id: '3', name: 'Jordan Lee', balance: -42.00, currency: '$', groups: ['Flat Bills'] },
  { id: '4', name: 'Sam Park', balance: 18.75, currency: '$', groups: ['Pizza Fridays'] },
  { id: '5', name: 'Taylor Kim', balance: -18.25, currency: '$', groups: ['Flat Bills', 'Spain Trip 2024'] },
  { id: '6', name: 'Riley Wong', balance: 0, currency: '$', groups: ['Weekend Ski'] },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

type FilterType = 'all' | 'owes_me' | 'i_owe';

function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

const AVATAR_COLORS = [
  '#6366F1', '#059669', '#D97706', '#DC2626',
  '#7C3AED', '#0891B2', '#BE185D', '#16A34A',
];

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) { hash = name.charCodeAt(i) + ((hash << 5) - hash); }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ─── Components ───────────────────────────────────────────────────────────────

function BalanceRow({ person }: { person: PersonBalance }) {
  const isPos = person.balance > 0;
  const isNeg = person.balance < 0;
  const isZero = person.balance === 0;
  const abs = Math.abs(person.balance).toFixed(2);

  return (
    <View style={styles.row}>
      {/* Avatar */}
      <View style={[styles.avatar, { backgroundColor: avatarColor(person.name) }]}>
        <Text style={styles.avatarText}>{getInitials(person.name)}</Text>
      </View>

      {/* Info */}
      <View style={styles.rowInfo}>
        <Text style={styles.personName}>{person.name}</Text>
        <Text style={styles.personGroups} numberOfLines={1}>
          {person.groups.join(' · ')}
        </Text>
      </View>

      {/* Balance + action */}
      <View style={styles.rowRight}>
        {isZero ? (
          <Text style={styles.settledText}>Settled</Text>
        ) : (
          <>
            <Text style={[styles.balanceAmount, isPos ? styles.posText : styles.negText]}>
              {isPos ? `+${person.currency}${abs}` : `-${person.currency}${abs}`}
            </Text>
            <Text style={[styles.balanceLabel, isPos ? styles.posText : styles.negText]}>
              {isPos ? 'owes you' : 'you owe'}
            </Text>
          </>
        )}
        {!isZero && (
          <Pressable style={[styles.settleBtn, isPos ? styles.settleBtnPos : styles.settleBtnNeg]}>
            <Text style={styles.settleBtnText}>Settle</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function BalancesScreen() {
  const [filter, setFilter] = useState<FilterType>('all');

  const owedToMe = MOCK_BALANCES.filter(p => p.balance > 0).reduce((s, p) => s + p.balance, 0);
  const iOwe = MOCK_BALANCES.filter(p => p.balance < 0).reduce((s, p) => s + Math.abs(p.balance), 0);
  const net = owedToMe - iOwe;

  const filtered = MOCK_BALANCES.filter(p => {
    if (filter === 'owes_me') return p.balance > 0;
    if (filter === 'i_owe') return p.balance < 0;
    return true;
  });

  const FILTERS: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'owes_me', label: 'Owe me' },
    { key: 'i_owe', label: 'I owe' },
  ];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Balances</Text>
      </View>

      {/* ── Summary hero ───────────────────────────────────────────────── */}
      <View style={[styles.heroCard, net > 0 ? styles.heroCardPos : net < 0 ? styles.heroCardNeg : styles.heroCardZero]}>
        <View style={styles.heroMain}>
          <Text style={styles.heroLabel}>
            {net > 0 ? "You're owed" : net < 0 ? 'You owe' : 'All settled up 🎉'}
          </Text>
          {net !== 0 && (
            <Text style={[styles.heroAmount, net > 0 ? styles.posText : styles.negText]}>
              ${Math.abs(net).toFixed(2)}
            </Text>
          )}
          {net === 0 && (
            <Text style={styles.heroZeroSub}>No outstanding balances across all groups.</Text>
          )}
        </View>

        {net !== 0 && (
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatAmount} numberOfLines={1}>${owedToMe.toFixed(2)}</Text>
              <Text style={styles.heroStatLabel}>owed to me</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={[styles.heroStatAmount, styles.negText]} numberOfLines={1}>${iOwe.toFixed(2)}</Text>
              <Text style={styles.heroStatLabel}>I owe</Text>
            </View>
          </View>
        )}
      </View>

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

      {/* ── People list ────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>⚖️</Text>
          <Text style={styles.emptyTitle}>Nothing here</Text>
          <Text style={styles.emptySubtitle}>No balances match this filter.</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => <BalanceRow person={item} />}
          showsVerticalScrollIndicator={false}
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

  // Hero card
  heroCard: {
    margin: spacing[5],
    borderRadius: radius.lg,
    padding: spacing[5],
  },
  heroCardPos: { backgroundColor: colors.posBg },
  heroCardNeg: { backgroundColor: colors.negBg },
  heroCardZero: { backgroundColor: colors.brandLight },
  heroMain: { marginBottom: spacing[4] },
  heroLabel: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium as any,
    color: colors.text3,
    marginBottom: spacing[1],
  },
  heroAmount: {
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.extrabold as any,
    letterSpacing: -1,
  },
  heroZeroSub: {
    fontSize: fontSizes.base,
    color: colors.brand,
    fontWeight: fontWeights.medium as any,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  heroStat: { flex: 1, alignItems: 'center' },
  heroStatAmount: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold as any,
    color: colors.pos,
  },
  heroStatLabel: {
    fontSize: fontSizes.xs,
    color: colors.text4,
    marginTop: 2,
  },
  heroStatDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },

  // Filters
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing[5],
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  filterPill: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: radius.pill,
    backgroundColor: colors.white,
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
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[10],
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 60,
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[4],
    gap: spacing[3],
    backgroundColor: colors.white,
    marginHorizontal: -spacing[5],
    paddingHorizontal: spacing[5],
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold as any,
    color: colors.white,
  },
  rowInfo: { flex: 1, gap: 3 },
  personName: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold as any,
    color: colors.text1,
  },
  personGroups: {
    fontSize: fontSizes.xs,
    color: colors.text4,
  },
  rowRight: { alignItems: 'flex-end', gap: 2 },
  balanceAmount: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold as any,
  },
  balanceLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium as any,
  },
  posText: { color: colors.pos },
  negText: { color: colors.neg },
  settledText: {
    fontSize: fontSizes.sm,
    color: colors.zero,
    fontWeight: fontWeights.medium as any,
  },
  settleBtn: {
    marginTop: spacing[1],
    paddingHorizontal: spacing[3],
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  settleBtnPos: { backgroundColor: colors.pos },
  settleBtnNeg: { backgroundColor: colors.neg },
  settleBtnText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    color: colors.white,
  },

  // Empty
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing[8] },
  emptyIcon: { fontSize: 48, marginBottom: spacing[4] },
  emptyTitle: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold as any, color: colors.text1, marginBottom: spacing[2] },
  emptySubtitle: { fontSize: fontSizes.base, color: colors.text3, textAlign: 'center' },
});
