import React from 'react';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';
import Icon, { IconName } from '../../../../components/atoms/Icon';
import { AmountDisplay } from '../../../../components/molecules/AmountDisplay';
import { colors } from '../../../../theme/colors';
import { sizes } from '../../../../theme/spacing';
import { formatRelativeDate } from '../../../../utils/formatters';
import styles from '../styles';

interface ActivityEventRowProps {
  type: 'expense' | 'settlement';
  description: string;
  groupName: string;
  amount: number;
  date: Date;
  iconName: IconName;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ActivityEventRow({
  type,
  description,
  groupName,
  amount,
  date,
  iconName,
  onPress,
  style,
}: ActivityEventRowProps) {
  const isSettlement = type === 'settlement';
  const iconStroke = isSettlement ? colors.settleGreen : colors.brand;
  const relativeTime = formatRelativeDate(date);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.rowContainer,
        pressed && styles.rowPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={description}
    >
      {/* Icon circle */}
      <View
        style={[
          styles.rowIconCircle,
          isSettlement
            ? styles.rowIconCircleSettlement
            : styles.rowIconCircleExpense,
        ]}
      >
        <Icon
          name={iconName}
          size={sizes.iconMd}
          stroke={iconStroke}
          fill="none"
        />
      </View>

      {/* Content */}
      <View style={styles.rowContent}>
        <Text style={styles.rowDescription} numberOfLines={1}>
          {description}
        </Text>
        <Text style={styles.rowMeta} numberOfLines={1}>
          {groupName} · {relativeTime}
        </Text>
      </View>

      {/* Amount */}
      <View style={styles.rowAmountCol}>
        <AmountDisplay
          amount={isSettlement ? Math.abs(amount) : amount}
          size="sm"
          showSign={isSettlement}
          style={isSettlement ? undefined : { alignItems: 'flex-end' }}
        />
      </View>
    </Pressable>
  );
}
