import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Tag from '../../../components/atoms/Tag';
import { AmountDisplay } from '../../../components/molecules/AmountDisplay';
import { ListRow } from '../../../components/molecules/ListRow';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { SectionHeader } from '../../../components/molecules/SectionHeader';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { useNavigation } from '../../../navigation/NavigationContext';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import styles from './styles';

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_EXPENSE = {
  amount: 84,
  description: 'Dinner at La Boqueria',
  category: 'Food',
  paidBy: 'Alice',
  date: 'Apr 12, 2024',
  notes: 'Great tapas place near the market. Everyone loved it!',
  addedBy: 'You',
  split: [
    { name: 'You', amount: 28 },
    { name: 'Alex', amount: 28 },
    { name: 'Jordan', amount: 28 },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ExpenseDetailScreen() {
  const { goBack, navigate } = useNavigation();

  function handleDelete() {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => goBack(),
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader
        title="Expense Detail"
        onBack={goBack}
        rightActions={[
          {
            icon: 'edit',
            onPress: () => navigate('EditExpense'),
            accessibilityLabel: 'Edit',
          },
        ]}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <View style={styles.hero}>
          <AmountDisplay
            amount={MOCK_EXPENSE.amount}
            currency="USD"
            size="xl"
            style={styles.heroAmount}
          />
          <Text style={styles.heroDescription}>{MOCK_EXPENSE.description}</Text>
          <Tag
            label={MOCK_EXPENSE.category}
            color={colors.brand}
            bgColor={colors.brandLight}
          />
        </View>

        {/* ── Paid By ── */}
        <SectionHeader title="PAID BY" style={{ marginTop: spacing[4] }} />
        <View style={styles.card}>
          <ListRow
            title={MOCK_EXPENSE.paidBy}
            subtitle="paid the full amount"
            leftIcon={<Avatar name={MOCK_EXPENSE.paidBy} size="sm" />}
            leftIconBg="transparent"
            showChevron={false}
          />
        </View>

        {/* ── Split Breakdown ── */}
        <SectionHeader title="SPLIT BREAKDOWN" />
        <View style={styles.card}>
          {MOCK_EXPENSE.split.map((member, index) => {
            const isLast = index === MOCK_EXPENSE.split.length - 1;
            return (
              <View
                key={member.name}
                style={[styles.memberRow, isLast && styles.memberRowLast]}
              >
                <Avatar name={member.name} size="sm" />
                <Text style={styles.memberName}>{member.name}</Text>
                <AmountDisplay
                  amount={member.amount}
                  currency="USD"
                  size="sm"
                />
              </View>
            );
          })}
        </View>

        {/* ── Notes ── */}
        {MOCK_EXPENSE.notes ? (
          <>
            <SectionHeader title="NOTES" />
            <View style={styles.card}>
              <Text style={styles.notesText}>{MOCK_EXPENSE.notes}</Text>
            </View>
          </>
        ) : null}

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{MOCK_EXPENSE.date}</Text>
          <Text style={styles.footerText}>Added by {MOCK_EXPENSE.addedBy}</Text>
        </View>

        {/* ── Delete ── */}
        <Button
          label="Delete Expense"
          variant="danger"
          onPress={handleDelete}
          style={styles.deleteBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
