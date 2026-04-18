import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '../styles';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ForgotPasswordViewProps {
  email: string;
  loading: boolean;
  error: string;
  resetSent: boolean;
  onEmailChange: (t: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const ForgotPasswordView = ({
  email,
  loading,
  error,
  resetSent,
  onEmailChange,
  onSubmit,
  onBack,
}: ForgotPasswordViewProps): React.JSX.Element => {
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
    >
      <ScrollView
        contentContainerStyle={styles.subContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <TouchableOpacity
          style={styles.backRow}
          onPress={onBack}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backText}>{'← Back'}</Text>
        </TouchableOpacity>

        {/* Heading */}
        <Text style={styles.subHeading}>Reset password</Text>

        {/* Subtitle */}
        <Text style={styles.subSubtitle}>
          We will send a reset link to your email.
        </Text>

        {/* Email input */}
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={onEmailChange}
          placeholder="Email address"
          placeholderTextColor="rgba(255,255,255,0.3)"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
          returnKeyType="send"
          onSubmitEditing={onSubmit}
          accessibilityLabel="Email address"
        />

        {/* Inline error */}
        {!!error && <Text style={styles.errorText}>{error}</Text>}

        {/* Submit button */}
        <TouchableOpacity
          style={[styles.btnPrimary, loading && styles.btnDisabled]}
          onPress={onSubmit}
          disabled={loading}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Send reset link"
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.btnPrimaryText}>Send reset link</Text>
          )}
        </TouchableOpacity>

        {/* Success banner */}
        {resetSent && (
          <View style={styles.successBox}>
            <Text style={styles.successText}>
              Reset link sent. Check your inbox.
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
