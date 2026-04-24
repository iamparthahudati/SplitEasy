import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../../../theme/colors';
import { fontSizes, fontWeights } from '../../../../theme/typography';

interface AuthButtonProps {
  label: string;
  variant: 'email' | 'guest';
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const AuthButton = ({
  label,
  variant,
  onPress,
  loading = false,
  disabled = false,
}: AuthButtonProps) => {
  const isEmail = variant === 'email';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        isEmail ? styles.emailButton : styles.guestButton,
        pressed && { opacity: 0.85 },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={isEmail ? colors.white : 'rgba(255,255,255,0.35)'}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.label,
            isEmail ? styles.emailLabel : styles.guestLabel,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailButton: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 12,
  },
  guestButton: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,0.12)',
    marginBottom: 12,
  },
  label: {
    letterSpacing: 0.2,
  },
  emailLabel: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
  },
  guestLabel: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 15,
    fontWeight: fontWeights.regular,
  },
});
