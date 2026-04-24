import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputField } from '../../../components/molecules/InputField';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { SelectRow } from '../../../components/molecules/SelectRow';
import { Button } from '../../../components/ui/Button';
import { useNavigation } from '../../../navigation/NavigationContext';
import { formatDate } from '../../../utils/formatters';
import { AmountInput } from '../AddExpenseScreen/components/AmountInput';
import { CategoryPicker } from '../AddExpenseScreen/components/CategoryPicker';
import { MemberSplitRow } from '../AddExpenseScreen/components/MemberSplitRow';
import {
  SplitMethod,
  SplitMethodTabs,
} from '../AddExpenseScreen/components/SplitMethodTabs';
import styles from './styles';

// ─── Mock members ─────────────────────────────────────────────────────────────

interface Member {
  id: string;
  name: string;
}

const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'You' },
  { id: '2', name: 'Alex' },
  { id: '3', name: 'Jordan' },
];

// ─── Pre-filled mock data ─────────────────────────────────────────────────────

const PREFILLED_AMOUNT = '84.00';
const PREFILLED_DESCRIPTION = 'Dinner at La Boqueria';
const PREFILLED_CATEGORY = 'Food';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeEqualSplit(total: number, count: number): number {
  if (count === 0) {
    return 0;
  }
  return Math.round((total / count) * 100) / 100;
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function EditExpenseScreen() {
  const { goBack } = useNavigation();

  const [amount, setAmount] = useState(PREFILLED_AMOUNT);
  const [description, setDescription] = useState(PREFILLED_DESCRIPTION);
  const [category, setCategory] = useState(PREFILLED_CATEGORY);
  const [splitMethod, setSplitMethod] = useState<SplitMethod>('equal');
  const [notes, setNotes] = useState('');

  const [memberAmounts, setMemberAmounts] = useState<Record<string, string>>(
    () => Object.fromEntries(MOCK_MEMBERS.map(m => [m.id, '0.00'])),
  );
  const [memberPercentages, setMemberPercentages] = useState<
    Record<string, string>
  >(() =>
    Object.fromEntries(
      MOCK_MEMBERS.map(m => [m.id, (100 / MOCK_MEMBERS.length).toFixed(0)]),
    ),
  );

  const totalAmount = parseFloat(amount) || 0;
  const equalShare = computeEqualSplit(totalAmount, MOCK_MEMBERS.length);

  const handleMemberAmountChange = (id: string) => (value: string) => {
    setMemberAmounts(prev => ({ ...prev, [id]: value }));
  };

  const handleMemberPercentageChange = (id: string) => (value: string) => {
    setMemberPercentages(prev => ({ ...prev, [id]: value }));
  };

  const getMemberAmount = (id: string): number => {
    if (splitMethod === 'equal') {
      return equalShare;
    }
    if (splitMethod === 'exact') {
      return parseFloat(memberAmounts[id]) || 0;
    }
    const pct = parseFloat(memberPercentages[id]) || 0;
    return Math.round(totalAmount * (pct / 100) * 100) / 100;
  };

  const getMemberPercentage = (id: string): number => {
    if (splitMethod === 'percentage') {
      return parseFloat(memberPercentages[id]) || 0;
    }
    if (splitMethod === 'equal') {
      return MOCK_MEMBERS.length > 0
        ? Math.round((100 / MOCK_MEMBERS.length) * 10) / 10
        : 0;
    }
    const memberAmt = parseFloat(memberAmounts[id]) || 0;
    return totalAmount > 0
      ? Math.round((memberAmt / totalAmount) * 100 * 10) / 10
      : 0;
  };

  const handleAmountChange = (id: string) => (value: string) => {
    if (splitMethod === 'exact') {
      handleMemberAmountChange(id)(value);
    } else {
      handleMemberPercentageChange(id)(value);
    }
  };

  const handleDelete = () => {
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
  };

  const todayFormatted = formatDate(new Date());

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <ScreenHeader
        title="Edit Expense"
        onBack={goBack}
        rightActions={[
          {
            icon: 'trash',
            onPress: handleDelete,
            accessibilityLabel: 'Delete expense',
          },
        ]}
      />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Amount hero */}
          <View style={styles.amountSection}>
            <AmountInput value={amount} onChangeText={setAmount} currency="$" />
          </View>

          {/* Description + Category */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Details</Text>
            <View style={styles.inputWrap}>
              <InputField
                value={description}
                onChangeText={setDescription}
                placeholder="What was it for?"
                leftIcon="receipt"
                autoCapitalize="sentences"
              />
            </View>
            <View style={styles.categoryRow}>
              <CategoryPicker selected={category} onSelect={setCategory} />
            </View>
          </View>

          {/* Paid by */}
          <View style={styles.card}>
            <SelectRow label="Paid by" value="You" onPress={() => {}} />
          </View>

          {/* Split method + members */}
          <View style={styles.splitCard}>
            <Text style={styles.sectionLabel}>Split</Text>
            <View style={styles.splitTabsWrap}>
              <SplitMethodTabs
                selected={splitMethod}
                onSelect={setSplitMethod}
              />
            </View>
            {MOCK_MEMBERS.map(member => (
              <MemberSplitRow
                key={member.id}
                name={member.name}
                amount={getMemberAmount(member.id)}
                percentage={getMemberPercentage(member.id)}
                splitMethod={splitMethod}
                onAmountChange={handleAmountChange(member.id)}
              />
            ))}
          </View>

          {/* Date + Notes */}
          <View style={styles.detailsCard}>
            <SelectRow label="Date" value={todayFormatted} onPress={() => {}} />
            <Text style={styles.sectionLabel}>Notes</Text>
            <View style={styles.inputWrap}>
              <InputField
                value={notes}
                onChangeText={setNotes}
                placeholder="Add a note..."
                multiline
                numberOfLines={3}
                autoCapitalize="sentences"
              />
            </View>
          </View>

          {/* Save */}
          <View style={styles.saveWrap}>
            <Button
              label="Save Changes"
              onPress={() => goBack()}
              variant="primary"
              style={styles.saveBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
