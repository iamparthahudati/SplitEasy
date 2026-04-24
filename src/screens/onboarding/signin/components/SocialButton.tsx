import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../../../theme/colors';
import { spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

interface SocialButtonProps {
  variant: 'apple' | 'google';
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const APPLE_BG = colors.black;
const GOOGLE_BG = colors.white;
const APPLE_TEXT = colors.white;
const GOOGLE_TEXT = '#1A1A1A';
const GOOGLE_G_COLOR = '#4285F4';

export const SocialButton = ({
  variant,
  onPress,
  loading = false,
  disabled = false,
}: SocialButtonProps) => {
  const isApple = variant === 'apple';

  const labelStyle = [
    styles.label,
    isApple ? styles.appleLabel : styles.googleLabel,
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        isApple ? styles.appleContainer : styles.googleContainer,
        disabled && styles.disabled,
        pressed && { opacity: 0.8 },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isApple ? APPLE_TEXT : GOOGLE_TEXT}
        />
      ) : (
        <View style={styles.content}>
          {isApple ? (
            <Text style={styles.appleIcon}>{''}</Text>
          ) : (
            <Text style={styles.googleG}>{'G'}</Text>
          )}
          <Text style={labelStyle}>
            {isApple ? 'Sign in with Apple' : 'Sign in with Google'}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  appleContainer: {
    backgroundColor: APPLE_BG,
  },
  googleContainer: {
    backgroundColor: GOOGLE_BG,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  appleIcon: {
    fontSize: 20,
    color: APPLE_TEXT,
    lineHeight: 24,
  },
  googleG: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    color: GOOGLE_G_COLOR,
    lineHeight: 24,
  },
  label: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
  },
  appleLabel: {
    color: APPLE_TEXT,
  },
  googleLabel: {
    color: GOOGLE_TEXT,
  },
});
