import React from 'react';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';

import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/spacing';
import Icon, { IconName } from '../../atoms/Icon';
import styles from './styles';

export type InfoCardVariant =
  | 'info'
  | 'warning'
  | 'success'
  | 'error'
  | 'premium';

export interface InfoCardProps {
  icon: IconName;
  title: string;
  body: string;
  variant?: InfoCardVariant;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
}

interface VariantTokens {
  bg: string;
  border: string;
  titleColor: string;
  bodyColor: string;
  actionColor: string;
  iconBg: string;
  iconStroke: string;
}

const VARIANT_TOKENS: Record<InfoCardVariant, VariantTokens> = {
  info: {
    bg: colors.brandLight,
    border: colors.brandMid,
    titleColor: colors.brandDark,
    bodyColor: colors.text2,
    actionColor: colors.brand,
    iconBg: colors.white,
    iconStroke: colors.brand,
  },
  success: {
    bg: colors.posBg,
    border: '#A7F3D0',
    titleColor: colors.posDark,
    bodyColor: colors.text2,
    actionColor: colors.pos,
    iconBg: '#ECFDF5',
    iconStroke: colors.pos,
  },
  warning: {
    bg: colors.pendBg,
    border: '#FDE68A',
    titleColor: '#92400E',
    bodyColor: colors.text2,
    actionColor: colors.pend,
    iconBg: '#FFFBEB',
    iconStroke: colors.pend,
  },
  error: {
    bg: colors.negBg,
    border: '#FECACA',
    titleColor: colors.negDark,
    bodyColor: colors.text2,
    actionColor: colors.neg,
    iconBg: '#FFF5F5',
    iconStroke: colors.neg,
  },
  premium: {
    bg: colors.brandLight,
    border: colors.brandMid,
    titleColor: colors.brandDark,
    bodyColor: colors.text2,
    actionColor: colors.brandDark,
    iconBg: colors.white,
    iconStroke: colors.brandDark,
  },
};

export const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  body,
  variant = 'info',
  actionLabel,
  onAction,
  onDismiss,
  style,
}) => {
  const tokens = VARIANT_TOKENS[variant];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: tokens.bg, borderColor: tokens.border },
        style,
      ]}
    >
      {/* Icon box */}
      <View style={[styles.iconWrap, { backgroundColor: tokens.iconBg }]}>
        <Icon
          name={icon}
          size={sizes.iconMd}
          stroke={tokens.iconStroke}
          fill="none"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: tokens.titleColor }]}>
          {title}
        </Text>
        <Text style={[styles.body, { color: tokens.bodyColor }]}>{body}</Text>
        {actionLabel != null && onAction != null && (
          <Pressable
            onPress={onAction}
            accessibilityRole="button"
            accessibilityLabel={actionLabel}
            style={({ pressed }) => [
              styles.action,
              pressed && styles.actionPressed,
            ]}
          >
            <Text style={[styles.actionLabel, { color: tokens.actionColor }]}>
              {actionLabel}
            </Text>
          </Pressable>
        )}
      </View>

      {/* Dismiss button */}
      {onDismiss != null && (
        <Icon
          name="close"
          size={14}
          stroke={tokens.titleColor}
          fill="none"
          onPress={onDismiss}
          style={styles.dismiss}
        />
      )}
    </View>
  );
};

export default InfoCard;
