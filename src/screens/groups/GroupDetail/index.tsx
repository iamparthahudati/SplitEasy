import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  getMockGroup,
  MOCK_BALANCES,
  MOCK_EXPENSES,
} from '../../../mocks/groups';
import { useNavigation } from '../../../navigation/NavigationContext';
import { colors } from '../../../theme/colors';
import { radius, sizes, spacing } from '../../../theme/spacing';

import { AddExpenseBar } from './components/AddExpenseBar';
import { BalanceRow } from './components/BalanceRow';
import { HeroBanner } from './components/HeroBanner';
import { NavBar } from './components/NavBar';
import { RecentExpenseRow } from './components/RecentExpenseRow';
import { SectionHeader } from './components/SectionHeader';

const SCREEN_BG = '#F2F3F7';

// ─── Screen ───────────────────────────────────────────────────────────────────
export function GroupDetailScreen() {
  const { goBack, navigate, currentParams } = useNavigation();
  const groupId = currentParams.groupId ?? '1';
  const group = getMockGroup(groupId);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <NavBar
        title={group.name}
        onBack={goBack}
        onSettings={() => navigate('GroupSettings')}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeroBanner
          name={group.name}
          memberCount={group.memberCount}
          balance={group.balance}
          totalSpent={group.totalSpent}
        />

        <View style={styles.card}>
          <SectionHeader title="Balances" />
          {MOCK_BALANCES.map(b => (
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

        <View style={styles.card}>
          <SectionHeader
            title="Recent"
            actionLabel="View all >"
            onAction={() => navigate('ActivityFeed')}
          />
          {MOCK_EXPENSES.map(e => (
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

      <AddExpenseBar
        onPress={() => navigate('AddExpense', { groupId: group.id })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: sizes.btnHeight + spacing[6] + spacing[4],
  },
  card: {
    backgroundColor: colors.white,
    marginHorizontal: spacing[4],
    marginTop: spacing[3],
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
});
