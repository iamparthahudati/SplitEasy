import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomHeader } from '../../components/ui/CustomHeader';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface PersonBalance {
  id: string;
  name: string;
  balance: number; // positive = they owe you, negative = you owe them
  currency: string;
  groups: string[];
}

const MOCK_BALANCES: PersonBalance[] = [
  {
    id: '1',
    name: 'Alex Chen',
    balance: 86.5,
    currency: '$',
    groups: ['Spain Trip 2024', 'Pizza Fridays'],
  },
  {
    id: '2',
    name: 'Mia Torres',
    balance: 38.0,
    currency: '$',
    groups: ['Spain Trip 2024'],
  },
  {
    id: '3',
    name: 'Jordan Lee',
    balance: -42.0,
    currency: '$',
    groups: ['Flat Bills'],
  },
  {
    id: '4',
    name: 'Sam Park',
    balance: 18.75,
    currency: '$',
    groups: ['Pizza Fridays'],
  },
  {
    id: '5',
    name: 'Taylor Kim',
    balance: -18.25,
    currency: '$',
    groups: ['Flat Bills', 'Spain Trip 2024'],
  },
  {
    id: '6',
    name: 'Riley Wong',
    balance: 0,
    currency: '$',
    groups: ['Weekend Ski'],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

type FilterType = 'all' | 'owes_me' | 'i_owe';

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
}

const AVATAR_COLORS = [
  '#6366F1',
  '#059669',
  '#D97706',
  '#DC2626',
  '#7C3AED',
  '#0891B2',
  '#BE185D',
  '#16A34A',
];

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ─── BalanceRow ───────────────────────────────────────────────────────────────

function BalanceRow({ person }: { person: PersonBalance }) {
  const isPos = person.balance > 0;
  const isZero = person.balance === 0;
  const abs = Math.abs(person.balance).toFixed(2);

  return (
    <View style={styles.row}>
      {/* Avatar */}
      <View
        style={[styles.avatar, { backgroundColor: avatarColor(person.name) }]}
      >
        <Text style={styles.avatarText}>{getInitials(person.name)}</Text>
      </View>

      {/* Info */}
      <View style={styles.rowInfo}>
        <Text style={styles.personName}>{person.name}</Text>
        <Text style={styles.personGroups} numberOfLines={1}>
          {person.groups.join(' · ')}
        </Text>
      </View>

      {/* Right column */}
      <View style={styles.rowRight}>
        {isZero ? (
          <Text style={styles.settledText}>Settled</Text>
        ) : (
          <>
            <Text
              style={[
                styles.balanceAmount,
                isPos ? styles.posText : styles.negText,
              ]}
            >
              {isPos
                ? `+${person.currency}${abs}`
                : `-${person.currency}${abs}`}
            </Text>
            <Text
              style={[
                styles.balanceLabel,
                isPos ? styles.posText : styles.negText,
              ]}
            >
              {isPos ? 'owes you' : 'you owe'}
            </Text>
          </>
        )}
        {!isZero && (
          <Pressable
            style={[
              styles.settleBtn,
              isPos ? styles.settleBtnPos : styles.settleBtnNeg,
            ]}
          >
            <Text style={styles.settleBtnText}>Settle</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

// ─── HeroCard ─────────────────────────────────────────────────────────────────

function HeroCard({
  net,
  owedToMe,
  iOwe,
}: {
  net: number;
  owedToMe: number;
  iOwe: number;
}) {
  const heroBg =
    net > 0 ? colors.posBg : net < 0 ? colors.negBg : colors.brandLight;

  return (
    <View style={[styles.heroCard, { backgroundColor: heroBg }]}>
      {/* Label */}
      <Text style={styles.heroLabel}>
        {net > 0 ? "You're owed" : net < 0 ? 'You owe' : 'All settled up'}
      </Text>

      {/* Amount */}
      {net !== 0 && (
        <Text
          style={[styles.heroAmount, net > 0 ? styles.posText : styles.negText]}
        >
          ${Math.abs(net).toFixed(2)}
        </Text>
      )}

      {/* Zero subtitle */}
      {net === 0 && (
        <Text style={styles.heroZeroSub}>
          No outstanding balances across all groups.
        </Text>
      )}

      {/* Stats row */}
      {net !== 0 && (
        <View style={styles.heroStats}>
          {/* Owed to me */}
          <View style={styles.heroStat}>
            <Text
              style={[styles.heroStatAmount, styles.posText]}
              numberOfLines={1}
            >
              ${owedToMe.toFixed(2)}
            </Text>
            <Text style={styles.heroStatLabel}>owed to me</Text>
          </View>

          {/* Vertical divider */}
          <View style={styles.heroStatDivider} />

          {/* I owe */}
          <View style={styles.heroStat}>
            <Text
              style={[styles.heroStatAmount, styles.negText]}
              numberOfLines={1}
            >
              ${iOwe.toFixed(2)}
            </Text>
            <Text style={styles.heroStatLabel}>I owe</Text>
          </View>
        </View>
      )}
    </View>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconCircle}>
        <Text style={styles.emptyIconText}>0</Text>
      </View>
      <Text style={styles.emptyTitle}>Nothing here</Text>
      <Text style={styles.emptySubtitle}>No balances match this filter.</Text>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function BalancesScreen() {
  const [filter, setFilter] = useState<FilterType>('all');

  const owedToMe = MOCK_BALANCES.filter(p => p.balance > 0).reduce(
    (s, p) => s + p.balance,
    0,
  );
  const iOwe = MOCK_BALANCES.filter(p => p.balance < 0).reduce(
    (s, p) => s + Math.abs(p.balance),
    0,
  );
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
      {/* Header */}
      <CustomHeader title="Balances" />

      {/* Hero card */}
      <HeroCard net={net} owedToMe={owedToMe} iOwe={iOwe} />

      {/* Filter pills */}
      <View style={styles.filterRow}>
        {FILTERS.map(f => (
          <Pressable
            key={f.key}
            style={[
              styles.filterPill,
              filter === f.key && styles.filterPillActive,
            ]}
            onPress={() => setFilter(f.key)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f.key && styles.filterTextActive,
              ]}
            >
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* People list / empty state */}
      {filtered.length === 0 ? (
        <EmptyState />
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
  // Root
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── Hero card ──────────────────────────────────────────────────────────────
  heroCard: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
  },
  heroLabel: {
    fontSize: fontSizes.sm, // 12px
    fontWeight: fontWeights.medium as any,
    color: colors.text3,
    marginBottom: 4,
  },
  heroAmount: {
    fontSize: fontSizes['4xl'], // 36px → closest; spec says 40px
    fontWeight: fontWeights.extrabold as any,
    letterSpacing: -1,
  },
  heroZeroSub: {
    fontSize: fontSizes.base, // 14px
    fontWeight: fontWeights.medium as any,
    color: colors.brand,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    marginTop: 16,
    paddingTop: 16,
  },
  heroStat: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatAmount: {
    fontSize: fontSizes.lg, // 18px
    fontWeight: fontWeights.bold as any,
    color: colors.pos,
  },
  heroStatLabel: {
    fontSize: fontSizes.xs, // 11px (xs=10, closest available)
    color: colors.text4,
    marginTop: 2,
  },
  heroStatDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },

  // ── Filter pills ───────────────────────────────────────────────────────────
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginTop: 12,
    marginBottom: 4,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
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
    fontSize: 13,
    fontWeight: fontWeights.medium as any,
    color: colors.text3,
  },
  filterTextActive: {
    fontWeight: fontWeights.semibold as any,
    color: colors.white,
  },

  // ── List ───────────────────────────────────────────────────────────────────
  listContent: {
    paddingBottom: spacing[10],
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 76,
  },

  // ── Person row ─────────────────────────────────────────────────────────────
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
    backgroundColor: colors.white,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: fontWeights.bold as any,
    color: colors.white,
  },
  rowInfo: {
    flex: 1,
    gap: 3,
  },
  personName: {
    fontSize: fontSizes.base, // 14px
    fontWeight: fontWeights.semibold as any,
    color: colors.text1,
  },
  personGroups: {
    fontSize: 11,
    color: colors.text4,
  },
  rowRight: {
    alignItems: 'flex-end',
    gap: 3,
  },
  balanceAmount: {
    fontSize: 15,
    fontWeight: fontWeights.bold as any,
  },
  balanceLabel: {
    fontSize: 11,
    fontWeight: fontWeights.medium as any,
  },
  posText: { color: colors.pos },
  negText: { color: colors.neg },
  settledText: {
    fontSize: 13,
    fontWeight: fontWeights.medium as any,
    color: colors.zero,
  },
  settleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  settleBtnPos: { backgroundColor: colors.pos },
  settleBtnNeg: { backgroundColor: colors.neg },
  settleBtnText: {
    fontSize: 11,
    fontWeight: fontWeights.semibold as any,
    color: colors.white,
  },

  // ── Empty state ────────────────────────────────────────────────────────────
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[8],
  },
  emptyIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.brandLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  emptyIconText: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold as any,
    color: colors.brand,
  },
  emptyTitle: {
    fontSize: fontSizes.lg, // 18px
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
    marginBottom: spacing[2],
  },
  emptySubtitle: {
    fontSize: fontSizes.base, // 14px
    color: colors.text3,
    textAlign: 'center',
  },
});
