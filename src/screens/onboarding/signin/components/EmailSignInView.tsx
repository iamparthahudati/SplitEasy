import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

// ── Constants ─────────────────────────────────────────────────────────────────

const BG_BASE = '#2D2A6E';
const BRAND_INDIGO = '#6366F1';
const WHITE = '#FFFFFF';

// ── Types ─────────────────────────────────────────────────────────────────────

interface EmailSignInViewProps {
  email: string;
  password: string;
  loading: boolean;
  error: string;
  onEmailChange: (t: string) => void;
  onPasswordChange: (t: string) => void;
  onSignIn: () => void;
  onForgotPassword: () => void;
  onBack: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const EmailSignInView = ({
  email,
  password,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onSignIn,
  onForgotPassword,
  onBack,
}: EmailSignInViewProps): React.JSX.Element => {
  return (
    <KeyboardAvoidingView
      style={s.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
    >
      <ScrollView
        contentContainerStyle={s.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <View style={s.backRow}>
          <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
            <Text style={s.backText}>← Back</Text>
          </TouchableOpacity>
        </View>

        {/* Heading */}
        <Text style={s.heading}>Sign in</Text>

        {/* Email input */}
        <TextInput
          style={s.input}
          placeholder="Email address"
          placeholderTextColor="rgba(255,255,255,0.35)"
          value={email}
          onChangeText={onEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          editable={!loading}
        />

        {/* Password input */}
        <TextInput
          style={s.input}
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.35)"
          value={password}
          onChangeText={onPasswordChange}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={onSignIn}
          editable={!loading}
        />

        {/* Inline error */}
        {error.length > 0 && <Text style={s.errorText}>{error}</Text>}

        {/* Primary sign-in button */}
        <TouchableOpacity
          style={[s.btnPrimary, loading && s.btnDisabled]}
          onPress={onSignIn}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={WHITE} />
          ) : (
            <Text style={s.btnPrimaryText}>Sign in</Text>
          )}
        </TouchableOpacity>

        {/* Forgot password link */}
        <TouchableOpacity
          onPress={onForgotPassword}
          activeOpacity={0.7}
          disabled={loading}
        >
          <Text style={s.forgotLink}>Forgot password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG_BASE,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing[6], // 24
    paddingTop: spacing[5], // 20
    paddingBottom: spacing[8], // 32
  },

  // Back
  backRow: {
    marginBottom: spacing[6], // 24
  },
  backText: {
    fontSize: fontSizes.base, // 14
    fontWeight: fontWeights.medium as any,
    color: 'rgba(255,255,255,0.6)',
  },

  // Heading
  heading: {
    fontSize: 28,
    fontWeight: fontWeights.bold as any,
    color: WHITE,
    marginBottom: spacing[6], // 24
  },

  // Inputs
  input: {
    height: 52,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radius.md, // 12
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: spacing[4], // 16
    fontSize: fontSizes.base, // 14
    color: WHITE,
    marginBottom: spacing[3], // 12
  },

  // Error
  errorText: {
    fontSize: 13,
    color: '#F87171',
    marginBottom: spacing[3], // 12
  },

  // Primary button
  btnPrimary: {
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRAND_INDIGO,
    marginBottom: spacing[3], // 12
  },
  btnDisabled: {
    opacity: 0.55,
  },
  btnPrimaryText: {
    fontSize: fontSizes.md, // 16
    fontWeight: fontWeights.semibold as any, // 600
    color: WHITE,
  },

  // Forgot password
  forgotLink: {
    textAlign: 'center',
    fontSize: fontSizes.base, // 14
    color: 'rgba(255,255,255,0.45)',
    paddingVertical: spacing[3], // 12
  },
});
