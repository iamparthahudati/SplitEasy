import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../../theme/colors';
import { fontSizes, fontWeights, typography } from '../../theme/typography';
import { spacing, radius, sizes } from '../../theme/spacing';
import type { GroupsStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<GroupsStackParamList, 'GroupsHome'>;

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface MockGroup {
  id: string;
  name: string;
  emoji: string;
  color: string;
  memberCount: number;
  lastExpense: string;
  balance: number; // positive = owed to you, negative = you owe
  currency: string;
}

const MOCK_GROUPS: MockGroup[] = [
  { id: '1', name: 'Spain Trip 2024', emoji: '✈️', color: colors.brand, memberCount: 5, lastExpense: 'Hotel Barcelona', balance: 124.50, currency: '$' },
  { id: '2', name: 'Flat Bills', emoji: '🏠', color: '#059669', memberCount: 3, lastExpense: 'Electricity — April', balance: -42.00, currency: '$' },
  { id: '3', name: 'Weekend Ski', emoji: '🎿', color: '#0891B2', memberCount: 4, lastExpense: 'Ski rental', balance: 0, currency: '$' },
  { id: '4', name: 'Pizza Fridays', emoji: '🍕', color: '#DC2626', memberCount: 6, lastExpense: 'Domino\'s order', balance: 18.75, currency: '$' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function formatBalance(balance: number, currency: string): string {
  const abs = Math.abs(balance).toFixed(2);
  return `${currency}${abs}`;
}

// ─── Components ───────────────────────────────────────────────────────────────

function GroupCard({ group, onPress }: { group: MockGroup; onPress: () => void }) {
  const isPos = group.balance > 0;
  const isNeg = group.balance < 0;
  const isZero = group.balance === 0;

  return (
    <Pressable style={styles.card} onPress={onPress} android_ripple={{ color: colors.brandLight }}>
      {/* Left: emoji circle */}
      <View style={[styles.groupIcon, { backgroundColor: group.color + '20' }]}>
        <Text style={styles.groupEmoji}>{group.emoji}</Text>
      </View>

      {/* Center: name + meta */}
      <View style={styles.cardCenter}>
        <Text style={styles.groupName} numberOfLines={1}>{group.name}</Text>
        <Text style={styles.groupMeta} numberOfLines={1}>
          {group.memberCount} members · {group.lastExpense}
        </Text>
      </View>

      {/* Right: balance chip */}
      <View style={[
        styles.balanceChip,
        isPos && styles.balanceChipPos,
        isNeg && styles.balanceChipNeg,
        isZero && styles.balanceChipZero,
      ]}>
        <Text style={[
          styles.balanceChipText,
          isPos && styles.balanceTextPos,
          isNeg && styles.balanceTextNeg,
          isZero && styles.balanceTextZero,
        ]}>
          {isZero ? 'Settled' : isPos ? `+${formatBalance(group.balance, group.currency)}` : `-${formatBalance(group.balance, group.currency)}`}
        </Text>
      </View>
    </Pressable>
  );
}

function EmptyState({ onCreateGroup }: { onCreateGroup: () => void }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>👥</Text>
      <Text style={styles.emptyTitle}>No groups yet</Text>
      <Text style={styles.emptySubtitle}>Create your first group to start splitting bills with friends.</Text>
      <Pressable style={styles.emptyBtn} onPress={onCreateGroup}>
        <Text style={styles.emptyBtnText}>Create a group</Text>
      </Pressable>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function GroupsHomeScreen() {
  const navigation = useNavigation<Nav>();
  const [search, setSearch] = useState('');

  const filtered = MOCK_GROUPS.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Stats
  const totalOwedToMe = MOCK_GROUPS.reduce((s, g) => g.balance > 0 ? s + g.balance : s, 0);
  const totalIOwe = MOCK_GROUPS.reduce((s, g) => g.balance < 0 ? s + Math.abs(g.balance) : s, 0);
  const netBalance = totalOwedToMe - totalIOwe;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.wordmark}>SplitEasy</Text>
          <Text style={styles.headerSub}>{MOCK_GROUPS.length} active groups</Text>
        </View>
        <Pressable style={styles.notifBtn} hitSlop={8}>
          <Text style={styles.notifIcon}>🔔</Text>
        </Pressable>
      </View>

      {/* ── Net balance banner ─────────────────────────────────────────── */}
      <View style={[
        styles.banner,
        netBalance > 0 ? styles.bannerPos : netBalance < 0 ? styles.bannerNeg : styles.bannerZero,
      ]}>
        <View>
          <Text style={styles.bannerLabel}>
            {netBalance > 0 ? 'You are owed' : netBalance < 0 ? 'You owe' : 'All settled up'}
          </Text>
          {netBalance !== 0 && (
            <Text style={[
              styles.bannerAmount,
              netBalance > 0 ? styles.bannerAmountPos : styles.bannerAmountNeg,
            ]}>
              ${Math.abs(netBalance).toFixed(2)}
            </Text>
          )}
        </View>
        {netBalance !== 0 && (
          <Pressable style={[
            styles.settleAllBtn,
            netBalance < 0 ? styles.settleAllBtnNeg : styles.settleAllBtnPos,
          ]}>
            <Text style={styles.settleAllText}>Settle all</Text>
          </Pressable>
        )}
      </View>

      {/* ── Search bar ─────────────────────────────────────────────────── */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
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
              <Text style={styles.clearBtn}>✕</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* ── Groups list ────────────────────────────────────────────────── */}
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
              onPress={() => navigation.navigate('GroupDetail', { groupId: item.id })}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ── FAB ────────────────────────────────────────────────────────── */}
      <Pressable style={styles.fab}>
        <Text style={styles.fabIcon}>＋</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
    paddingBottom: spacing[2],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  wordmark: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.extrabold as any,
    color: colors.brand,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: fontSizes.xs,
    color: colors.text4,
    marginTop: 1,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifIcon: {
    fontSize: fontSizes.lg,
  },

  // Banner
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing[5],
    marginTop: spacing[4],
    marginBottom: spacing[2],
    padding: spacing[4],
    borderRadius: radius.md,
  },
  bannerPos: { backgroundColor: colors.posBg },
  bannerNeg: { backgroundColor: colors.negBg },
  bannerZero: { backgroundColor: colors.brandLight },
  bannerLabel: {
    fontSize: fontSizes.sm,
    color: colors.text3,
    fontWeight: fontWeights.medium as any,
    marginBottom: 2,
  },
  bannerAmount: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold as any,
  },
  bannerAmountPos: { color: colors.pos },
  bannerAmountNeg: { color: colors.neg },
  settleAllBtn: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: radius.pill,
  },
  settleAllBtnPos: { backgroundColor: colors.pos },
  settleAllBtnNeg: { backgroundColor: colors.neg },
  settleAllText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
    color: colors.white,
  },

  // Search
  searchRow: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
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
  searchIcon: { fontSize: fontSizes.base },
  searchInput: {
    flex: 1,
    fontSize: fontSizes.base,
    color: colors.text1,
    paddingVertical: 0,
  },
  clearBtn: {
    fontSize: fontSizes.sm,
    color: colors.text4,
    paddingHorizontal: spacing[1],
  },

  // List
  listContent: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[14] + spacing[4],
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 72,
  },

  // Card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[4],
    gap: spacing[3],
    backgroundColor: colors.white,
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

  // Empty state
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[8],
  },
  emptyIcon: { fontSize: 56, marginBottom: spacing[4] },
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

  // No results
  noResults: {
    flex: 1,
    alignItems: 'center',
    paddingTop: spacing[10],
  },
  noResultsText: {
    fontSize: fontSizes.base,
    color: colors.text4,
  },

  // FAB
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    fontSize: fontSizes['2xl'],
    color: colors.white,
    lineHeight: 28,
  },
});
