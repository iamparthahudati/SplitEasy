import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Avatar } from '../../../../components/ui/Avatar';
import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';
import { SplitMethod } from './SplitMethodTabs';

interface MemberSplitRowProps {
  name: string;
  amount: number;
  percentage: number;
  splitMethod: SplitMethod;
  onAmountChange: (value: string) => void;
}

export function MemberSplitRow({
  name,
  amount,
  percentage,
  splitMethod,
  onAmountChange,
}: MemberSplitRowProps) {
  const renderRight = () => {
    if (splitMethod === 'equal') {
      return <Text style={styles.amountText}>${amount.toFixed(2)}</Text>;
    }

    if (splitMethod === 'exact') {
      return (
        <View style={styles.inputWrap}>
          <Text style={styles.inputPrefix}>$</Text>
          <TextInput
            style={styles.input}
            value={amount.toFixed(2)}
            onChangeText={onAmountChange}
            keyboardType="decimal-pad"
            textAlign="right"
            accessibilityLabel={`Amount for ${name}`}
          />
        </View>
      );
    }

    // percentage
    return (
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          value={percentage.toFixed(0)}
          onChangeText={onAmountChange}
          keyboardType="decimal-pad"
          textAlign="right"
          accessibilityLabel={`Percentage for ${name}`}
        />
        <Text style={styles.inputSuffix}>%</Text>
      </View>
    );
  };

  return (
    <View style={styles.row}>
      <Avatar name={name} size="sm" />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      {renderRight()}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderMid,
    gap: spacing[3],
  },
  name: {
    flex: 1,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.text1,
  },
  amountText: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.text2,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.border,
    borderRadius: radius.xs,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    minWidth: 80,
  },
  inputPrefix: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text3,
    marginRight: 2,
  },
  inputSuffix: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text3,
    marginLeft: 2,
  },
  input: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.text1,
    minWidth: 48,
    padding: 0,
  },
});
