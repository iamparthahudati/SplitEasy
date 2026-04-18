import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '../../../navigation/NavigationContext';

import { AddExpenseBar } from './components/AddExpenseBar';
import { BalanceRow } from './components/BalanceRow';
import { HeroBanner } from './components/HeroBanner';
import { NavBar } from './components/NavBar';
import { RecentExpenseRow } from './components/RecentExpenseRow';
import { SectionHeader } from './components/SectionHeader';

// ─── Mock data ────────────────────────────────────────────────────────────────
const GROUP = {
  id: '1',
  name: 'Spain Trip 2024',
  memberCount: 5,
  balance: 124.5,
  totalSpent: 620.0,
};

const BALANCES = [
  {
    id: '1',
    initials: 'AC',
    avatarColor: '#4F46E5',
    name: 'Alex Chen',
    relation: 'owes You',
    balance: 48.0,
  },
  {
    id: '2',
    initials: 'JM',
    avatarColor: '#059669',
    name: 'Jordan Mills',
    relation: 'owes You',
    balance: 36.5,
  },
  {
    id: '3',
    initials: 'SP',
    avatarColor: '#F97316',
    name: 'Sara Park',
    relation: 'owes',
    balance: -22.0,
  },
  {
    id: '4',
    initials: 'RK',
    avatarColor: '#6366F1',
    name: 'Raj Kumar',
    relation: '',
    balance: 0,
  },
];

const EXPENSES = [
  {
    id: '1',
    icon: '🏨',
    name: 'Hotel Barcelona',
    paidBy: 'You',
    date: 'Apr 13',
    amount: 248.0,
  },
  {
    id: '2',
    icon: '🍽',
    name: 'Dinner at La Boqueria',
    paidBy: 'Alice',
    date: 'Apr 12',
    amount: -84.0,
  },
  {
    id: '3',
    icon: '🚗',
    name: 'Airport Transfer',
    paidBy: 'You',
    date: 'Apr 11',
    amount: -20.0,
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────
export function GroupDetailScreen() {
  const { goBack, navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Nav bar */}
      <NavBar
        title={GROUP.name}
        onBack={goBack}
        onSettings={() => navigate('GroupSettings')}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero banner */}
        <HeroBanner
          name={GROUP.name}
          memberCount={GROUP.memberCount}
          balance={GROUP.balance}
          totalSpent={GROUP.totalSpent}
        />

        {/* Balances section */}
        <View style={styles.card}>
          <SectionHeader title="Balances" />
          {BALANCES.map(b => (
            <BalanceRow
              key={b.id}
              initials={b.initials}
              avatarColor={b.avatarColor}
              name={b.name}
              relation={b.relation}
              balance={b.balance}
              onSettle={() => navigate('SettleUp', { memberId: b.id })}
            />
          ))}
        </View>

        {/* Recent expenses section */}
        <View style={styles.card}>
          <SectionHeader
            title="Recent"
            actionLabel="View all >"
            onAction={() => navigate('ActivityFeed')}
          />
          {EXPENSES.map(e => (
            <RecentExpenseRow
              key={e.id}
              icon={e.icon}
              name={e.name}
              paidBy={e.paidBy}
              date={e.date}
              amount={e.amount}
              onPress={() => navigate('ExpenseDetail', { expenseId: e.id })}
            />
          ))}
        </View>
      </ScrollView>

      {/* Add expense bar */}
      <AddExpenseBar
        onPress={() => navigate('AddExpense', { groupId: GROUP.id })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F2F3F7',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
