import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../../../theme/colors';
import { fontSizes, fontWeights } from '../../../../theme/typography';

interface AmountInputProps {
  value: string;
  onChangeText: (text: string) => void;
  currency?: string;
}

export function AmountInput({
  value,
  onChangeText,
  currency = '$',
}: AmountInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.currency}>{currency}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
        placeholder="0.00"
        placeholderTextColor={colors.text4}
        textAlign="center"
        returnKeyType="done"
        accessibilityLabel="Expense amount"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  currency: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.brand,
    marginRight: 4,
    lineHeight: fontSizes['2xl'] * 1.3,
  },
  input: {
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    color: colors.text1,
    minWidth: 120,
    backgroundColor: 'transparent',
    padding: 0,
  },
});
