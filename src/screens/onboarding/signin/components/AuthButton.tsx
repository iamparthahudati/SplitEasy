import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
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
    <TouchableOpacity
      style={[styles.base, isEmail ? styles.emailButton : styles.guestButton]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
    >
      {loading ? (
        <ActivityIndicator
          color={isEmail ? '#FFFFFF' : 'rgba(255,255,255,0.35)'}
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
    </TouchableOpacity>
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
    color: '#FFFFFF',
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
  },
  guestLabel: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 15,
    fontWeight: fontWeights.regular,
  },
});
