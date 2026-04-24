import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import Icon from '../../../../components/atoms/Icon';
import { colors } from '../../../../theme/colors';
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
        <Pressable
          style={({ pressed }) => [styles.backRow, pressed && { opacity: 0.7 }]}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Icon name="arrow-back" size={18} stroke={colors.white} fill="none" />
        </Pressable>

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
        <Pressable
          style={({ pressed }) => [
            styles.btnPrimary,
            loading && styles.btnDisabled,
            pressed && { opacity: 0.8 },
          ]}
          onPress={onSubmit}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Send reset link"
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.btnPrimaryText}>Send reset link</Text>
          )}
        </Pressable>

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
