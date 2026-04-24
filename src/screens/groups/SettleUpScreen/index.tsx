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

import Chip from '../../../components/atoms/Chip';
import { AmountDisplay } from '../../../components/molecules/AmountDisplay';
import { InputField } from '../../../components/molecules/InputField';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { SelectRow } from '../../../components/molecules/SelectRow';
import { Button } from '../../../components/ui/Button';
import { useNavigation } from '../../../navigation/NavigationContext';
import { formatDate } from '../../../utils/formatters';
import styles from './styles';

// ─── Types ────────────────────────────────────────────────────────────────────

type PaymentMethod = 'Cash' | 'Bank Transfer' | 'Other';

const PAYMENT_METHODS: PaymentMethod[] = ['Cash', 'Bank Transfer', 'Other'];

// ─── Component ────────────────────────────────────────────────────────────────

export function SettleUpScreen() {
  const { goBack } = useNavigation();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('Cash');
  const [note, setNote] = useState('');

  const today = formatDate(new Date());

  function handleConfirm() {
    Alert.alert(
      'Settlement Confirmed',
      'Your payment has been recorded successfully.',
      [
        {
          text: 'Done',
          onPress: () => goBack(),
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Settle Up" onBack={goBack} />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Subheader ── */}
          <Text style={styles.subheader}>Settling with Alex Chen</Text>

          {/* ── Amount card ── */}
          <View style={styles.amountCard}>
            <AmountDisplay
              amount={48}
              currency="USD"
              size="xl"
              showSign={false}
            />
          </View>

          {/* ── Payment Method ── */}
          <View style={styles.methodSection}>
            <Text style={styles.methodLabel}>Payment Method</Text>
            <View style={styles.chipRow}>
              {PAYMENT_METHODS.map(method => (
                <Chip
                  key={method}
                  label={method}
                  selected={selectedMethod === method}
                  onPress={() => setSelectedMethod(method)}
                />
              ))}
            </View>
          </View>

          {/* ── Form ── */}
          <View style={styles.formSection}>
            <InputField
              label="Notes"
              placeholder="Add a note..."
              value={note}
              onChangeText={setNote}
              leftIcon="edit"
            />
            <SelectRow label="Date" value={today} onPress={() => {}} />
          </View>

          {/* ── Confirm ── */}
          <Button
            label="Confirm Settlement"
            variant="primary"
            onPress={handleConfirm}
            style={styles.confirmBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
