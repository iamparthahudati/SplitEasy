import React, { JSX } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/spacing';
import Icon, { IconName } from '../../atoms/Icon';
import styles from './styles';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ScreenHeaderVariant = 'light' | 'dark' | 'transparent';

export interface HeaderAction {
  icon: IconName;
  onPress: () => void;
  accessibilityLabel?: string;
  badge?: boolean;
}

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightActions?: HeaderAction[];
  variant?: ScreenHeaderVariant;
  leftAlign?: boolean;
  style?: StyleProp<ViewStyle>;
}

// ─── Variant tokens ───────────────────────────────────────────────────────────

interface VariantTokens {
  bg: string;
  titleColor: string;
  subtitleColor: string;
  iconColor: string;
  btnBg: string;
  borderColor: string | undefined;
}

function getTokens(variant: ScreenHeaderVariant): VariantTokens {
  switch (variant) {
    case 'dark':
      return {
        bg: colors.brand,
        titleColor: colors.white,
        subtitleColor: 'rgba(255,255,255,0.65)',
        iconColor: colors.white,
        btnBg: 'rgba(255,255,255,0.15)',
        borderColor: undefined,
      };
    case 'transparent':
      return {
        bg: 'transparent',
        titleColor: colors.white,
        subtitleColor: 'rgba(255,255,255,0.65)',
        iconColor: colors.white,
        btnBg: 'rgba(0,0,0,0.18)',
        borderColor: undefined,
      };
    case 'light':
    default:
      return {
        bg: colors.white,
        titleColor: colors.text1,
        subtitleColor: colors.text3,
        iconColor: colors.text2,
        btnBg: colors.border,
        borderColor: colors.border,
      };
  }
}

// ─── IconBtn ──────────────────────────────────────────────────────────────────

interface IconBtnProps {
  action: HeaderAction;
  iconColor: string;
  btnBg: string;
}

function IconBtn({ action, iconColor, btnBg }: IconBtnProps): JSX.Element {
  return (
    <Pressable
      onPress={action.onPress}
      style={({ pressed }) => [
        styles.iconBtn,
        { backgroundColor: btnBg },
        pressed && styles.iconBtnPressed,
      ]}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={action.accessibilityLabel}
    >
      <Icon
        name={action.icon}
        size={sizes.iconMd}
        stroke={iconColor}
        fill="none"
      />
      {action.badge && <View style={styles.badgeDot} />}
    </Pressable>
  );
}

// ─── ScreenHeader ─────────────────────────────────────────────────────────────

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  rightActions,
  variant = 'light',
  leftAlign = false,
  style,
}: ScreenHeaderProps): JSX.Element {
  const tokens = getTokens(variant);
  const hasRight = rightActions && rightActions.length > 0;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: tokens.bg },
        tokens.borderColor
          ? {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: tokens.borderColor,
            }
          : undefined,
        style,
      ]}
    >
      <View style={styles.row}>
        {/* Left slot */}
        <View style={styles.sideSlot}>
          {onBack ? (
            <Pressable
              onPress={onBack}
              style={({ pressed }) => [
                styles.iconBtn,
                { backgroundColor: tokens.btnBg },
                pressed && styles.iconBtnPressed,
              ]}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Icon
                name="chevron-left"
                size={sizes.iconMd}
                stroke={tokens.iconColor}
                fill="none"
              />
            </Pressable>
          ) : null}
        </View>

        {/* Center slot */}
        <View style={[styles.centerSlot, leftAlign && styles.centerSlotLeft]}>
          <Text
            style={[styles.title, { color: tokens.titleColor }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={[styles.subtitle, { color: tokens.subtitleColor }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        {/* Right slot */}
        <View style={[styles.sideSlot, styles.sideSlotRight]}>
          {hasRight
            ? rightActions!.map((action, index) => (
                <IconBtn
                  key={index}
                  action={action}
                  iconColor={tokens.iconColor}
                  btnBg={tokens.btnBg}
                />
              ))
            : null}
        </View>
      </View>
    </View>
  );
}
