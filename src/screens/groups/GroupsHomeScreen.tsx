import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { GroupsStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { radius, sizes, spacing } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

type Nav = NativeStackNavigationProp<GroupsStackParamList, 'GroupsHome'>;

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface MockGroup {
  id: string;
  name: string;
  emoji: string;
  color: string;
  memberCount: number;
  lastExpense: string;
  balance: number;
  currency: string;
}

const MOCK_GROUPS: MockGroup[] = [
  {
    id: '1',
    name: 'Spain Trip 2024',
    emoji: '✈️',
    color: colors.brand,
    memberCount: 5,
    lastExpense: 'Hotel Barcelona',
    balance: 124.5,
    currency: '$',
  },
  {
    id: '2',
    name: 'Flat Bills',
    emoji: '🏠',
    color: '#059669',
    memberCount: 3,
    lastExpense: 'Electricity — April',
    balance: -42.0,
    currency: '$',
  },
  {
    id: '3',
    name: 'Weekend Ski',
    emoji: '🎿',
    color: '#0891B2',
    memberCount: 4,
    lastExpense: 'Ski rental',
    balance: 0,
    currency: '$',
  },
  {
    id: '4',
    name: 'Pizza Fridays',
    emoji: '🍕',
    color: '#DC2626',
    memberCount: 6,
    lastExpense: "Domino's order",
    balance: 18.75,
    currency: '$',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBalance(balance: number, currency: string): string {
  return `${currency}${Math.abs(balance).toFixed(2)}`;
}

// ─── Logo Mark ────────────────────────────────────────────────────────────────
// Rounded square with two stacked white bars — compact brand mark

function LogoMark() {
  return (
    <View style={logoStyles.container}>
      <View style={logoStyles.barTop} />
      <View style={logoStyles.barBottom} />
    </View>
  );
}

const logoStyles = StyleSheet.create({
  container: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  barTop: {
    width: 14,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  barBottom: {
    width: 10,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
});

// ─── Bell Icon ────────────────────────────────────────────────────────────────
// View-based bell: rounded rectangle body + small clapper circle

function BellIcon() {
  return (
    <View style={bellStyles.wrapper}>
      <View style={bellStyles.body} />
      <View style={bellStyles.clapper} />
    </View>
  );
}

const bellStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 22,
  },
  body: {
    width: 14,
    height: 16,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: colors.brand,
  },
  clapper: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
    marginTop: -1,
  },
});

// ─── Search Icon ──────────────────────────────────────────────────────────────
// Circle outline + diagonal handle line

function SearchIcon() {
  return (
    <View style={searchIconStyles.wrapper}>
      <View style={searchIconStyles.circle} />
      <View style={searchIconStyles.handle} />
    </View>
  );
}

const searchIconStyles = StyleSheet.create({
  wrapper: {
    width: 18,
    height: 18,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  circle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.text4,
    backgroundColor: 'transparent',
  },
  handle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 6,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.text4,
    transform: [{ rotate: '45deg' }],
  },
});

// ─── Group Card ───────────────────────────────────────────────────────────────

function GroupCard({
  group,
  onPress,
}: {
  group: MockGroup;
  onPress: () => void;
}) {
  const isPos = group.balance > 0;
  const isNeg = group.balance < 0;
  const isZero = group.balance === 0;
  const accentColor = isPos ? colors.pos : isNeg ? colors.neg : colors.brand;

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      android_ripple={{ color: colors.brandLight }}
    >
      {/* Left accent bar */}
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

      {/* Emoji icon */}
      <View style={[styles.groupIcon, { backgroundColor: group.color + '26' }]}>
        <Text style={styles.groupEmoji}>{group.emoji}</Text>
      </View>

      {/* Center: name + meta */}
      <View style={styles.cardCenter}>
        <Text style={styles.groupName} numberOfLines={1}>
          {group.name}
        </Text>
        <Text style={styles.groupMeta} numberOfLines={1}>
          {group.memberCount} members · {group.lastExpense}
        </Text>
      </View>

      {/* Right: balance chip */}
      <View
        style={[
          styles.balanceChip,
          isPos && styles.balanceChipPos,
          isNeg && styles.balanceChipNeg,
          isZero && styles.balanceChipZero,
        ]}
      >
        <Text
          style={[
            styles.balanceChipText,
            isPos && styles.balanceTextPos,
            isNeg && styles.balanceTextNeg,
            isZero && styles.balanceTextZero,
          ]}
        >
          {isZero
            ? 'Settled'
            : isPos
            ? `+${formatBalance(group.balance, group.currency)}`
            : `-${formatBalance(group.balance, group.currency)}`}
        </Text>
      </View>
    </Pressable>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ onCreateGroup }: { onCreateGroup: () => void }) {
  return (
    <View style={styles.emptyState}>
      {/* Nested circle illustration */}
      <View style={styles.emptyOuterCircle}>
        <View style={styles.emptyMidCircle}>
          <View style={styles.emptyInnerCircle}>
            <Text style={styles.emptyInnerText}>G</Text>
          </View>
        </View>
      </View>
      <Text style={styles.emptyTitle}>No groups yet</Text>
      <Text style={styles.emptySubtitle}>
        Create your first group to start splitting bills with friends.
      </Text>
      <Pressable
        style={styles.emptyBtn}
        onPress={onCreateGroup}
        android_ripple={{ color: colors.brandDark }}
      >
        <Text style={styles.emptyBtnText}>Create a group</Text>
      </Pressable>
    </View>
  );
}

// ─── Net Balance Banner ───────────────────────────────────────────────────────

function NetBalanceBanner({ netBalance }: { netBalance: number }) {
  const isPos = netBalance > 0;
  const isNeg = netBalance < 0;
  const baseBg = isPos ? colors.pos : isNeg ? colors.neg : colors.brand;
  const overlayBg = isPos ? '#34D399' : isNeg ? '#FB7185' : '#8B5CF6';
  const labelText = isPos
    ? 'You are owed'
    : isNeg
    ? 'You owe'
    : 'All settled up';
  const chipTextColor = isPos ? colors.pos : isNeg ? colors.neg : colors.brand;

  return (
    <View style={[styles.banner, { backgroundColor: baseBg }]}>
      {/* Gradient simulation — right half lighter overlay */}
      <View style={[styles.bannerOverlay, { backgroundColor: overlayBg }]} />

      {/* Decorative circles */}
      <View style={[styles.bannerCircle, styles.bannerCircle1]} />
      <View style={[styles.bannerCircle, styles.bannerCircle2]} />
      <View style={[styles.bannerCircle, styles.bannerCircle3]} />

      {/* Left: label + amount */}
      <View style={styles.bannerLeft}>
        <Text style={styles.bannerLabel}>{labelText}</Text>
        <Text style={styles.bannerAmount}>
          {netBalance !== 0 ? `$${Math.abs(netBalance).toFixed(2)}` : '$0.00'}
        </Text>
      </View>

      {/* Right: settle all pill */}
      {netBalance !== 0 && (
        <Pressable style={styles.settleAllBtn}>
          <Text style={[styles.settleAllText, { color: chipTextColor }]}>
            Settle all
          </Text>
        </Pressable>
      )}
    </View>
  );
}

// ─── FAB ─────────────────────────────────────────────────────────────────────
// Plus icon built from two crossing View bars

function FAB({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      style={styles.fab}
      onPress={onPress}
      android_ripple={{ color: colors.brandDark }}
    >
      <View style={styles.fabBarH} />
      <View style={styles.fabBarV} />
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function GroupsHomeScreen() {
  const navigation = useNavigation<Nav>();
  const [search, setSearch] = useState('');

  const filtered = MOCK_GROUPS.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalOwedToMe = MOCK_GROUPS.reduce(
    (s, g) => (g.balance > 0 ? s + g.balance : s),
    0,
  );
  const totalIOwe = MOCK_GROUPS.reduce(
    (s, g) => (g.balance < 0 ? s + Math.abs(g.balance) : s),
    0,
  );
  const netBalance = totalOwedToMe - totalIOwe;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <LogoMark />
          <View style={styles.headerTextBlock}>
            <Text style={styles.wordmark}>SplitEasy</Text>
            <Text style={styles.headerSub}>
              {MOCK_GROUPS.length} active groups
            </Text>
          </View>
        </View>
        <Pressable style={styles.notifBtn} hitSlop={8}>
          <BellIcon />
        </Pressable>
      </View>

      {/* ── Net Balance Banner ──────────────────────────────────────────── */}
      <NetBalanceBanner netBalance={netBalance} />

      {/* ── Search Bar ─────────────────────────────────────────────────── */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search groups…"
            placeholderTextColor={colors.text4}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')} hitSlop={8}>
              <View style={styles.clearBtnCircle}>
                <Text style={styles.clearBtnText}>x</Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>

      {/* ── Groups List ─────────────────────────────────────────────────── */}
      {filtered.length === 0 && search.length > 0 ? (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>No groups match "{search}"</Text>
        </View>
      ) : filtered.length === 0 ? (
        <EmptyState onCreateGroup={() => {}} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <GroupCard
              group={item}
              onPress={() =>
                navigation.navigate('GroupDetail', { groupId: item.id })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ── FAB ────────────────────────────────────────────────────────── */}
      <FAB onPress={() => {}} />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
    paddingBottom: spacing[3],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  headerTextBlock: {
    gap: 1,
  },
  wordmark: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.extrabold as any,
    color: colors.brand,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: fontSizes.xs,
    color: colors.text4,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Net Balance Banner ───────────────────────────────────────────────────────
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing[5],
    marginTop: spacing[4],
    borderRadius: radius.lg,
    height: 88,
    paddingHorizontal: spacing[5],
    overflow: 'hidden',
  },
  bannerOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    opacity: 0.35,
  },
  bannerCircle: {
    position: 'absolute',
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  bannerCircle1: {
    width: 80,
    height: 80,
    top: -20,
    right: 60,
  },
  bannerCircle2: {
    width: 56,
    height: 56,
    top: 20,
    right: 20,
  },
  bannerCircle3: {
    width: 40,
    height: 40,
    bottom: -10,
    right: 90,
    opacity: 0.5,
  },
  bannerLeft: {
    gap: 2,
  },
  bannerLabel: {
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: fontWeights.medium as any,
  },
  bannerAmount: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.extrabold as any,
    color: colors.white,
    letterSpacing: -0.5,
  },
  settleAllBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: radius.pill,
  },
  settleAllText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
  },

  // ── Search Bar ───────────────────────────────────────────────────────────────
  searchRow: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
    paddingBottom: spacing[2],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.borderMid,
    paddingHorizontal: spacing[3],
    height: 44,
    gap: spacing[2],
  },
  searchInput: {
    flex: 1,
    fontSize: fontSizes.base,
    color: colors.text1,
    paddingVertical: 0,
  },
  clearBtnCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.surfaceDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: {
    fontSize: 10,
    color: colors.text3,
    fontWeight: fontWeights.bold as any,
    lineHeight: 14,
  },

  // ── Group Card ───────────────────────────────────────────────────────────────
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[5],
    backgroundColor: colors.white,
    gap: spacing[3],
  },
  accentBar: {
    width: 3,
    height: 40,
    borderRadius: radius.pill,
  },
  groupIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupEmoji: {
    fontSize: fontSizes.xl,
  },
  cardCenter: {
    flex: 1,
    gap: 3,
  },
  groupName: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold as any,
    color: colors.text1,
  },
  groupMeta: {
    fontSize: fontSizes.sm,
    color: colors.text4,
  },
  balanceChip: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.pill,
  },
  balanceChipPos: { backgroundColor: colors.posBg },
  balanceChipNeg: { backgroundColor: colors.negBg },
  balanceChipZero: { backgroundColor: colors.bg },
  balanceChipText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
  },
  balanceTextPos: { color: colors.pos },
  balanceTextNeg: { color: colors.neg },
  balanceTextZero: { color: colors.zero },

  // ── List ─────────────────────────────────────────────────────────────────────
  listContent: {
    paddingBottom: sizes.fabSize + spacing[8],
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing[5] + 3 + spacing[3] + 48 + spacing[3], // align after accent+icon
  },

  // ── Empty State ───────────────────────────────────────────────────────────────
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[8],
  },
  emptyOuterCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(99,102,241,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[5],
  },
  emptyMidCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(99,102,241,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyInnerCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyInnerText: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold as any,
    color: colors.white,
  },
  emptyTitle: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: fontSizes.base,
    color: colors.text3,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing[6],
  },
  emptyBtn: {
    height: sizes.btnHeightSm,
    paddingHorizontal: spacing[6],
    backgroundColor: colors.brand,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBtnText: {
    color: colors.white,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold as any,
  },

  // ── No Results ────────────────────────────────────────────────────────────────
  noResults: {
    flex: 1,
    alignItems: 'center',
    paddingTop: spacing[10],
  },
  noResultsText: {
    fontSize: fontSizes.base,
    color: colors.text4,
  },

  // ── FAB ──────────────────────────────────────────────────────────────────────
  fab: {
    position: 'absolute',
    right: spacing[5],
    bottom: spacing[6],
    width: sizes.fabSize,
    height: sizes.fabSize,
    borderRadius: sizes.fabSize / 2,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabBarH: {
    position: 'absolute',
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  fabBarV: {
    position: 'absolute',
    width: 3,
    height: 20,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
});
