import React from 'react';
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
import { spacing, radius, sizes } from '../../theme/spacing';
import type { GroupsStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<GroupsStackParamList, 'GroupDetail'>;

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface MockExpense {
  id: string;
  name: string;
  amount: number;
  currency: string;
  paidBy: string;
  date: string;
  categoryIcon: string;
  /** positive = owed to you, negative = you owe, 0 = settled */
  yourShare: number;
}

interface MockGroupDetail {
  name: string;
  emoji: string;
  color: string;
  members: string[];
  currency: string;
  balance: number;
  expenses: MockExpense[];
}

const MOCK_GROUPS: Record<string, MockGroupDetail> = {
  '1': {
    name: 'Spain Trip 2024', emoji: '✈️', color: colors.brand,
    members: ['You', 'Alex', 'Jordan', 'Sam', 'Chris'],
    currency: '$', balance: 124.50,
    expenses: [
      { id: 'e1', name: 'Hotel Barcelona',        amount: 350.00, currency: '$', paidBy: 'You',    date: 'Apr 10', categoryIcon: '🏠', yourShare:  140.00 },
      { id: 'e2', name: 'Airport Taxi',            amount:  65.00, currency: '$', paidBy: 'Alex',   date: 'Apr 9',  categoryIcon: '✈️', yourShare:  -13.00 },
      { id: 'e3', name: 'Dinner at El Born',       amount: 120.00, currency: '$', paidBy: 'Jordan', date: 'Apr 9',  categoryIcon: '🍽️', yourShare:  -24.00 },
      { id: 'e4', name: 'Sagrada Familia tickets', amount: 200.00, currency: '$', paidBy: 'You',    date: 'Apr 8',  categoryIcon: '⚽', yourShare:  160.00 },
      { id: 'e5', name: 'Groceries',               amount:  80.00, currency: '$', paidBy: 'Sam',    date: 'Apr 7',  categoryIcon: '🛒', yourShare:  -16.00 },
    ],
  },
  '2': {
    name: 'Flat Bills', emoji: '🏠', color: '#059669',
    members: ['You', 'Mike', 'Emma'],
    currency: '$', balance: -42.00,
    expenses: [
      { id: 'e1', name: 'Electricity — April', amount: 126.00, currency: '$', paidBy: 'Mike',  date: 'Apr 1',  categoryIcon: '💡', yourShare: -42.00 },
      { id: 'e2', name: 'Internet',             amount:  60.00, currency: '$', paidBy: 'You',   date: 'Mar 25', categoryIcon: '💡', yourShare:  40.00 },
      { id: 'e3', name: 'Water bill',           amount:  45.00, currency: '$', paidBy: 'Emma',  date: 'Mar 20', categoryIcon: '💡', yourShare: -15.00 },
    ],
  },
  '3': {
    name: 'Weekend Ski', emoji: '🎿', color: '#0891B2',
    members: ['You', 'Riley', 'Taylor', 'Morgan'],
    currency: '$', balance: 0,
    expenses: [
      { id: 'e1', name: 'Ski rental',   amount: 240.00, currency: '$', paidBy: 'Riley',  date: 'Feb 15', categoryIcon: '⛷️', yourShare:  -60.00 },
      { id: 'e2', name: 'Lodge dinner', amount: 180.00, currency: '$', paidBy: 'You',    date: 'Feb 15', categoryIcon: '🍽️', yourShare:  135.00 },
      { id: 'e3', name: 'Lift passes',  amount: 320.00, currency: '$', paidBy: 'Taylor', date: 'Feb 14', categoryIcon: '🎿', yourShare:  -80.00 },
    ],
  },
  '4': {
    name: 'Pizza Fridays', emoji: '🍕', color: '#DC2626',
    members: ['You', 'Ben', 'Chloe', 'Dan', 'Eve', 'Finn'],
    currency: '$', balance: 18.75,
    expenses: [
      { id: 'e1', name: "Domino's order",  amount: 112.50, currency: '$', paidBy: 'You',   date: 'Apr 11', categoryIcon: '🍕', yourShare:  93.75 },
      { id: 'e2', name: "Pizza Hut order", amount:  96.00, currency: '$', paidBy: 'Ben',   date: 'Apr 4',  categoryIcon: '🍕', yourShare: -16.00 },
      { id: 'e3', name: "Papa John's",     amount:  84.00, currency: '$', paidBy: 'Chloe', date: 'Mar 28', categoryIcon: '🍕', yourShare: -14.00 },
    ],
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function GroupHeader({ group }: { group: MockGroupDetail }) {
  const isPos = group.balance > 0;
  const isNeg = group.balance < 0;

  return (
    <View style={[styles.groupHeader, { borderBottomColor: group.color + '30' }]}>
      <View style={[styles.groupIconLg, { backgroundColor: group.color + '20' }]}>
        <Text style={styles.groupEmojiLg}>{group.emoji}</Text>
      </View>
      <Text style={styles.groupName}>{group.name}</Text>
      <Text style={styles.memberList} numberOfLines={1}>
        {group.members.join(' · ')}
      </Text>
      <View style={[
        styles.balanceBanner,
        isPos ? styles.bannerPos : isNeg ? styles.bannerNeg : styles.bannerZero,
      ]}>
        <Text style={[
          styles.balanceLabel,
          isPos ? styles.labelPos : isNeg ? styles.labelNeg : styles.labelZero,
        ]}>
          {isPos
            ? `You are owed ${group.currency}${group.balance.toFixed(2)}`
            : isNeg
              ? `You owe ${group.currency}${Math.abs(group.balance).toFixed(2)}`
              : 'All settled up'}
        </Text>
      </View>
    </View>
  );
}

function ActionBar({ groupId, navigation }: { groupId: string; navigation: Props['navigation'] }) {
  const actions = [
    { icon: '➕', label: 'Add Expense', onPress: () => navigation.navigate('AddExpense', { groupId }) },
    { icon: '🤝', label: 'Settle Up',   onPress: () => navigation.navigate('SettleUp', { groupId }) },
    { icon: '📋', label: 'Activity',    onPress: () => navigation.navigate('ActivityFeed', { groupId }) },
    { icon: '⚙️', label: 'Settings',   onPress: () => navigation.navigate('GroupSettings', { groupId }) },
  ];

  return (
    <View style={styles.actionBar}>
      {actions.map(a => (
        <Pressable
          key={a.label}
          style={styles.actionBtn}
          onPress={a.onPress}
          android_ripple={{ color: colors.brandLight }}
        >
          <View style={styles.actionIconCircle}>
            <Text style={styles.actionIcon}>{a.icon}</Text>
          </View>
          <Text style={styles.actionLabel}>{a.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function ExpenseRow({ expense, onPress }: { expense: MockExpense; onPress: () => void }) {
  const isPos = expense.yourShare > 0;

  return (
    <Pressable
      style={styles.expenseRow}
      onPress={onPress}
      android_ripple={{ color: colors.brandLight }}
    >
      <View style={styles.expenseIcon}>
        <Text style={styles.expenseIconText}>{expense.categoryIcon}</Text>
      </View>
      <View style={styles.expenseDetails}>
        <Text style={styles.expenseName} numberOfLines={1}>{expense.name}</Text>
        <Text style={styles.expenseMeta}>
          {expense.paidBy === 'You' ? 'You paid' : `${expense.paidBy} paid`} · {expense.date}
        </Text>
      </View>
      <View style={styles.expenseAmountCol}>
        <Text style={styles.expenseTotal}>
          {expense.currency}{expense.amount.toFixed(2)}
        </Text>
        {expense.yourShare === 0 ? (
          <Text style={styles.shareSettled}>settled</Text>
        ) : (
          <Text style={[styles.shareAmount, isPos ? styles.sharePos : styles.shareNeg]}>
            {isPos
              ? `+${expense.currency}${expense.yourShare.toFixed(2)}`
              : `-${expense.currency}${Math.abs(expense.yourShare).toFixed(2)}`}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

function EmptyExpenses({ onAdd }: { onAdd: () => void }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🧾</Text>
      <Text style={styles.emptyTitle}>No expenses yet</Text>
      <Text style={styles.emptySub}>Add your first expense to start tracking.</Text>
      <Pressable style={styles.emptyBtn} onPress={onAdd}>
        <Text style={styles.emptyBtnText}>Add Expense</Text>
      </Pressable>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function GroupDetailScreen({ route, navigation }: Props) {
  const { groupId } = route.params;
  const group = MOCK_GROUPS[groupId];

  if (!group) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Group not found</Text>
      </View>
    );
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: group.name });
  }, [navigation, group.name]);

  const expenses = group.expenses;

  return (
    <View style={styles.root}>
      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <GroupHeader group={group} />
            <ActionBar groupId={groupId} navigation={navigation} />
            {expenses.length > 0 && (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Transactions</Text>
                <Text style={styles.sectionCount}>{expenses.length}</Text>
              </View>
            )}
          </>
        }
        renderItem={({ item }) => (
          <ExpenseRow
            expense={item}
            onPress={() =>
              navigation.navigate('ExpenseDetail', { expenseId: item.id, groupId })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <EmptyExpenses
            onAdd={() => navigation.navigate('AddExpense', { groupId })}
          />
        }
        contentContainerStyle={styles.listContent}
      />

      {expenses.length > 0 && (
        <Pressable
          style={styles.fab}
          onPress={() => navigation.navigate('AddExpense', { groupId })}
          android_ripple={{ color: colors.brandDark }}
        >
          <Text style={styles.fabIcon}>＋</Text>
        </Pressable>
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  // Group header
  groupHeader: {
    alignItems: 'center',
    paddingHorizontal: spacing[5],
    paddingTop: spacing[5],
    paddingBottom: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
  },
  groupIconLg: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },
  groupEmojiLg: { fontSize: 36 },
  groupName: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
    marginBottom: spacing[1],
    textAlign: 'center',
  },
  memberList: {
    fontSize: fontSizes.sm,
    color: colors.text4,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  balanceBanner: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[2],
    borderRadius: radius.pill,
  },
  bannerPos:  { backgroundColor: colors.posBg },
  bannerNeg:  { backgroundColor: colors.negBg },
  bannerZero: { backgroundColor: colors.brandLight },
  balanceLabel: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
  },
  labelPos:  { color: colors.pos },
  labelNeg:  { color: colors.neg },
  labelZero: { color: colors.brand },

  // Action bar
  actionBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing[3],
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  actionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.brandLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[1],
  },
  actionIcon: { fontSize: fontSizes.base },
  actionLabel: {
    fontSize: fontSizes.xs,
    color: colors.text3,
    fontWeight: fontWeights.medium as any,
    textAlign: 'center',
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[2],
  },
  sectionTitle: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    color: colors.text3,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionCount: {
    fontSize: fontSizes.xs,
    color: colors.text4,
  },

  // Expense row
  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
    backgroundColor: colors.white,
    gap: spacing[3],
  },
  expenseIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.xs,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expenseIconText: { fontSize: fontSizes.lg },
  expenseDetails: { flex: 1, gap: 3 },
  expenseName: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium as any,
    color: colors.text1,
  },
  expenseMeta: {
    fontSize: fontSizes.sm,
    color: colors.text4,
  },
  expenseAmountCol: { alignItems: 'flex-end', gap: 3 },
  expenseTotal: {
    fontSize: fontSizes.sm,
    color: colors.text3,
    fontWeight: fontWeights.medium as any,
  },
  shareAmount: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
  },
  sharePos: { color: colors.pos },
  shareNeg: { color: colors.neg },
  shareSettled: { fontSize: fontSizes.xs, color: colors.zero },

  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 72 + spacing[5],
  },

  listContent: { paddingBottom: spacing[14] + spacing[4] },

  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingTop: spacing[12],
    paddingHorizontal: spacing[8],
  },
  emptyIcon: { fontSize: 48, marginBottom: spacing[4] },
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

  // Not found
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  notFoundText: { fontSize: fontSizes.base, color: colors.text4 },

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