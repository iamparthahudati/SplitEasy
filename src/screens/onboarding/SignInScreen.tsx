import { CommonActions, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { OnboardingStackParamList } from '../../navigation/types';
import {
  sendPasswordReset,
  signInWithApple,
  signInWithEmail,
  signInWithGoogle,
} from '../../services/firebase/auth';
import { colors } from '../../theme/colors';
import { radius, sizes, spacing } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, 'SignIn'>;
type Mode = 'main' | 'email' | 'forgotPassword';

// ─── Logo Mark ────────────────────────────────────────────────────────────────
// Two chain-link rounded rectangles — matches SplashScreen logo

function LogoMark() {
  return (
    <View style={logo.wrap}>
      <View style={logo.linkLeft}>
        <View style={logo.innerLeft} />
      </View>
      <View style={logo.linkRight}>
        <View style={logo.innerRight} />
      </View>
    </View>
  );
}

const logo = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  linkLeft: {
    width: 36,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -8,
    zIndex: 2,
  },
  innerLeft: {
    width: 18,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E1B4B',
  },
  linkRight: {
    width: 36,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#A5B4FC',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  innerRight: {
    width: 18,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E1B4B',
  },
});

// ─── Gradient Background ──────────────────────────────────────────────────────
// Simulated dark indigo gradient using two layered Views

function DarkBackground() {
  return (
    <>
      <View style={StyleSheet.absoluteFill} />
      <View style={bgStyles.bottomHalf} />
    </>
  );
}

const bgStyles = StyleSheet.create({
  bottomHalf: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: '#312E81',
    opacity: 0.7,
  },
});

// ─── Divider ──────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <View style={divStyles.row}>
      <View style={divStyles.line} />
      <Text style={divStyles.text}>or</Text>
      <View style={divStyles.line} />
    </View>
  );
}

const divStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing[3],
    gap: spacing[3],
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  text: {
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.4)',
  },
});

// ─── Main Component ───────────────────────────────────────────────────────────

export function SignInScreen() {
  const navigation = useNavigation<Nav>();
  const [mode, setMode] = useState<Mode>('main');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const clearError = () => setError('');

  const goToMainTabs = () => {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'MainTabs' as any }] }),
    );
  };

  const handleApple = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithApple();
      navigation.navigate('CreateGroup');
    } catch (e: any) {
      setError(e?.message ?? 'Apple sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      navigation.navigate('CreateGroup');
    } catch (e: any) {
      setError(e?.message ?? 'Google sign-in failed. Please try again.');
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
      await signInWithEmail(email.trim(), password);
      goToMainTabs();
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
      await sendPasswordReset(email.trim());
      setResetSent(true);
    } catch {
      setError('Could not send reset email. Check your address and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNoAccount = () => {
    navigation.navigate('CreateGroup');
  };

  // ── FORGOT PASSWORD mode ────────────────────────────────────────────────────
  if (mode === 'forgotPassword') {
    return (
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <DarkBackground />
        <View style={styles.subContainer}>
          <Pressable
            style={styles.backRow}
            onPress={() => {
              setMode('email');
              setResetSent(false);
            }}
          >
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backLabel}>Back</Text>
          </Pressable>

          <Text style={styles.subHeading}>Reset password</Text>
          <Text style={styles.subText}>
            We'll send a reset link to your email.
          </Text>

          {resetSent ? (
            <View style={styles.successBox}>
              <Text style={styles.successText}>
                Reset link sent! Check your inbox.
              </Text>
            </View>
          ) : (
            <>
              <TextInput
                style={styles.darkInput}
                placeholder="Email address"
                placeholderTextColor="rgba(255,255,255,0.4)"
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
                style={[
                  styles.btn,
                  styles.btnPrimary,
                  loading && styles.btnDisabled,
                ]}
                onPress={handleForgotPassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.btnPrimaryText}>Send reset link</Text>
                )}
              </Pressable>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }

  // ── EMAIL mode ──────────────────────────────────────────────────────────────
  if (mode === 'email') {
    return (
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <DarkBackground />
        <ScrollView
          contentContainerStyle={styles.subContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable style={styles.backRow} onPress={() => setMode('main')}>
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backLabel}>Back</Text>
          </Pressable>

          <Text style={styles.subHeading}>Sign in</Text>

          <TextInput
            style={styles.darkInput}
            placeholder="Email address"
            placeholderTextColor="rgba(255,255,255,0.4)"
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
            style={styles.darkInput}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.4)"
            secureTextEntry
            value={password}
            onChangeText={t => {
              setPassword(t);
              clearError();
            }}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable
            style={[
              styles.btn,
              styles.btnPrimary,
              loading && styles.btnDisabled,
            ]}
            onPress={handleEmailSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.btnPrimaryText}>Sign in</Text>
            )}
          </Pressable>

          <Pressable onPress={() => setMode('forgotPassword')}>
            <Text style={styles.forgotLink}>Forgot password?</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  // ── MAIN mode ───────────────────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <DarkBackground />
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo + wordmark */}
        <View style={styles.logoSection}>
          <LogoMark />
          <Text style={styles.wordmark}>SplitEasy</Text>
        </View>

        {/* Headings */}
        <Text style={styles.welcomeHeading}>Welcome back</Text>
        <Text style={styles.trustLine}>
          Your friends never need to download anything.
        </Text>

        {/* Error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Glass card with all auth options */}
        <View style={styles.glassCard}>
          {/* Apple */}
          <Pressable
            style={[styles.btn, styles.btnApple, loading && styles.btnDisabled]}
            onPress={handleApple}
            disabled={loading}
          >
            <Text style={styles.appleIcon}></Text>
            <Text style={styles.btnAppleText}>Sign in with Apple</Text>
          </Pressable>

          {/* Google */}
          <Pressable
            style={[
              styles.btn,
              styles.btnGoogle,
              loading && styles.btnDisabled,
            ]}
            onPress={handleGoogle}
            disabled={loading}
          >
            <Text style={styles.googleG}>G</Text>
            <Text style={styles.btnGoogleText}>Sign in with Google</Text>
          </Pressable>

          <Divider />

          {/* Email */}
          <Pressable
            style={[styles.btn, styles.btnEmail]}
            onPress={() => setMode('email')}
          >
            <Text style={styles.btnEmailText}>Continue with Email</Text>
          </Pressable>

          {/* Guest */}
          <Pressable
            style={[styles.btn, styles.btnGuest]}
            onPress={handleNoAccount}
          >
            <Text style={styles.btnGuestText}>Continue without account</Text>
          </Pressable>
        </View>

        {/* Trust badge */}
        <View style={styles.trustBadge}>
          <Text style={styles.trustBadgeText}> Encrypted and private</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Layout
  root: {
    flex: 1,
    backgroundColor: '#1E1B4B',
  },
  mainContainer: {
    flexGrow: 1,
    paddingBottom: spacing[8],
  },
  subContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing[5],
    paddingTop: 72,
    paddingBottom: spacing[8],
  },

  // Logo section
  logoSection: {
    alignItems: 'center',
    paddingTop: 60,
    marginBottom: 0,
  },
  wordmark: {
    fontSize: 28,
    fontWeight: fontWeights.bold as any,
    color: colors.white,
    letterSpacing: 0.4,
  },

  // Main headings
  welcomeHeading: {
    fontSize: 22,
    fontWeight: fontWeights.semibold as any,
    color: colors.white,
    textAlign: 'center',
    marginTop: 32,
    marginBottom: spacing[2],
  },
  trustLine: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: spacing[6],
  },

  // Glass card
  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 24,
    padding: 24,
    marginHorizontal: spacing[5],
  },

  // Sub-mode headings
  subHeading: {
    fontSize: 28,
    fontWeight: fontWeights.bold as any,
    color: colors.white,
    marginBottom: spacing[4],
  },
  subText: {
    fontSize: fontSizes.base,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: spacing[5],
  },

  // Back row
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[5],
    gap: spacing[2],
  },
  backArrow: {
    fontSize: fontSizes.xl,
    color: '#A5B4FC',
  },
  backLabel: {
    fontSize: fontSizes.base,
    color: '#A5B4FC',
    fontWeight: fontWeights.medium as any,
  },

  // Dark input (email / forgot password modes)
  darkInput: {
    height: sizes.btnHeight,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing[4],
    fontSize: fontSizes.base,
    color: colors.white,
    marginBottom: spacing[3],
  },

  // Error / success
  errorText: {
    fontSize: fontSizes.sm,
    color: 'rgba(255,107,107,1)',
    marginBottom: spacing[3],
    paddingHorizontal: spacing[1],
  },
  successBox: {
    backgroundColor: 'rgba(5,150,105,0.2)',
    borderRadius: radius.sm,
    padding: spacing[4],
    marginTop: spacing[3],
    borderWidth: 1,
    borderColor: 'rgba(5,150,105,0.4)',
  },
  successText: {
    color: '#6EE7B7',
    fontWeight: fontWeights.medium as any,
    fontSize: fontSizes.base,
  },

  // Shared button base
  btn: {
    height: sizes.btnHeight,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
    gap: spacing[2],
  },
  btnDisabled: { opacity: 0.6 },

  // Apple button
  btnApple: { backgroundColor: '#000000' },
  appleIcon: {
    fontSize: fontSizes.xl,
    color: colors.white,
    marginBottom: 2,
  },
  btnAppleText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
  },

  // Google button
  btnGoogle: {
    backgroundColor: colors.white,
  },
  googleG: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold as any,
    color: '#4285F4',
  },
  btnGoogleText: {
    color: colors.text1,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium as any,
  },

  // Email button (inside glass card)
  btnEmail: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'transparent',
  },
  btnEmailText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
  },

  // Primary button (email / forgot password modes)
  btnPrimary: {
    backgroundColor: colors.brand,
    marginTop: spacing[2],
  },
  btnPrimaryText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
  },

  // Guest button
  btnGuest: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'transparent',
    marginBottom: 0,
  },
  btnGuestText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium as any,
  },

  // Forgot password link
  forgotLink: {
    textAlign: 'center',
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.6)',
    marginTop: spacing[2],
    paddingVertical: spacing[2],
  },

  // Trust badge
  trustBadge: {
    alignItems: 'center',
    marginTop: spacing[5],
    paddingBottom: spacing[4],
  },
  trustBadgeText: {
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 0.3,
  },
});
