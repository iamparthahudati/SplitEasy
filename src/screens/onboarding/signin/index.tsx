import React, { useState } from 'react';
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

import { useNavigation } from '../../../navigation/NavigationContext';
import { styles } from './styles';

type Mode = 'main' | 'email' | 'forgotPassword';

// ── Logo mark: split circle + wordmark ──────────────────────────────────────

function LogoMark() {
  return (
    <View style={styles.logoRow}>
      {/* Split circle mark */}
      <View style={styles.splitCircle}>
        {/* Left half — solid white */}
        <View style={styles.splitLeft} />
        {/* Right half — outlined arc via border */}
        <View style={styles.splitRight} />
        {/* Center divider */}
        <View style={styles.splitDivider} />
      </View>
      <Text style={styles.wordmark}>SplitEasy</Text>
    </View>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────

export function SignInScreen() {
  const { navigate } = useNavigation();
  const [mode, setMode] = useState<Mode>('main');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const clearError = () => setError('');

  // ── Auth handlers ──────────────────────────────────────────────────────────

  const handleApple = async () => {
    setLoading(true);
    setError('');
    try {
      // TODO: wire Firebase Apple Sign-In
      navigate('CreateGroup');
    } catch {
      setError('Apple sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      // TODO: wire Firebase Google Sign-In
      navigate('CreateGroup');
    } catch {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // TODO: wire Firebase email sign-in
      navigate('Groups');
    } catch {
      setError('Wrong email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError('Enter your email address above first.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // TODO: Firebase sendPasswordResetEmail(auth, email)
      setResetSent(true);
    } catch {
      setError('Could not send reset email. Check your address and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNoAccount = () => {
    // TODO: store "guestMode = true" in AsyncStorage
    navigate('CreateGroup');
  };

  // ── Forgot password sub-view ───────────────────────────────────────────────

  if (mode === 'forgotPassword') {
    return (
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.safeArea}>
          <View style={styles.subContainer}>
            <Pressable
              style={styles.backRow}
              onPress={() => {
                setMode('email');
                setResetSent(false);
              }}
            >
              <Text style={styles.backText}>← Back</Text>
            </Pressable>

            <Text style={styles.subHeading}>Reset password</Text>
            <Text style={styles.subSubtitle}>
              We'll send a reset link to your email.
            </Text>

            {resetSent ? (
              <View style={styles.successBox}>
                <Text style={styles.successText}>
                  Reset link sent. Check your inbox.
                </Text>
              </View>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor="rgba(255,255,255,0.35)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={t => {
                    setEmail(t);
                    clearError();
                  }}
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Pressable
                  style={[styles.btnPrimary, loading && styles.btnDisabled]}
                  onPress={handleForgotPassword}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.btnPrimaryText}>Send reset link</Text>
                  )}
                </Pressable>
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // ── Email sub-view ─────────────────────────────────────────────────────────

  if (mode === 'email') {
    return (
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.subContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Pressable style={styles.backRow} onPress={() => setMode('main')}>
              <Text style={styles.backText}>← Back</Text>
            </Pressable>

            <Text style={styles.subHeading}>Sign in</Text>

            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="rgba(255,255,255,0.35)"
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus
              value={email}
              onChangeText={t => {
                setEmail(t);
                clearError();
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.35)"
              secureTextEntry
              value={password}
              onChangeText={t => {
                setPassword(t);
                clearError();
              }}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Pressable
              style={[styles.btnPrimary, loading && styles.btnDisabled]}
              onPress={handleEmailSignIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.btnPrimaryText}>Sign in</Text>
              )}
            </Pressable>

            <Pressable onPress={() => setMode('forgotPassword')}>
              <Text style={styles.forgotLink}>Forgot password?</Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // ── Main sign-in view ──────────────────────────────────────────────────────

  return (
    <View style={styles.root}>
      {/* Radial purple glow */}
      <View style={styles.glowCircle} />

      <View style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.mainContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <LogoMark />

          {/* Hero text */}
          <Text style={styles.welcomeHeading}>Welcome back</Text>
          <Text style={styles.welcomeSubtitle}>
            Your friends never need to download anything.
          </Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Buttons */}
          <View style={styles.buttonsSection}>
            {/* Apple */}
            <Pressable
              style={[styles.btnApple, loading && styles.btnDisabled]}
              onPress={handleApple}
              disabled={loading}
            >
              <Text style={styles.appleIcon}></Text>
              <Text style={styles.btnAppleText}>Sign in with Apple</Text>
            </Pressable>

            {/* Google */}
            <Pressable
              style={[styles.btnGoogle, loading && styles.btnDisabled]}
              onPress={handleGoogle}
              disabled={loading}
            >
              <Text style={styles.googleG}>G</Text>
              <Text style={styles.btnGoogleText}>Sign in with Google</Text>
            </Pressable>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Email */}
            <Pressable style={styles.btnEmail} onPress={() => setMode('email')}>
              <Text style={styles.btnEmailText}>Continue with Email</Text>
            </Pressable>

            {/* Guest */}
            <Pressable style={styles.btnGuest} onPress={handleNoAccount}>
              <Text style={styles.btnGuestText}>Continue without account</Text>
            </Pressable>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {'\uD83D\uDD12'} Encrypted and private
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
