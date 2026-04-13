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
import { useNavigation, CommonActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../../theme/colors';
import { fontSizes, fontWeights } from '../../theme/typography';
import { spacing, radius, sizes } from '../../theme/spacing';
import type { OnboardingStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, 'SignIn'>;

type Mode = 'main' | 'email' | 'forgotPassword';

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
      // TODO: wire Firebase Apple Sign-In
      navigation.navigate('CreateGroup');
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
      navigation.navigate('CreateGroup');
    } catch {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    if (!email.trim()) { setError('Please enter your email.'); return; }
    if (!password) { setError('Please enter your password.'); return; }
    setLoading(true);
    setError('');
    try {
      // TODO: wire Firebase email sign-in
      goToMainTabs();
    } catch {
      setError('Wrong email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) { setError('Enter your email address above first.'); return; }
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
    navigation.navigate('CreateGroup');
  };

  if (mode === 'forgotPassword') {
    return (
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <Pressable style={styles.backRow} onPress={() => { setMode('email'); setResetSent(false); }}>
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backLabel}>Back</Text>
          </Pressable>
          <Text style={styles.heading}>Reset password</Text>
          <Text style={styles.sub}>We'll send a reset link to your email.</Text>

          {resetSent ? (
            <View style={styles.successBox}>
              <Text style={styles.successText}>✓ Reset link sent! Check your inbox.</Text>
            </View>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={colors.text4}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={t => { setEmail(t); clearError(); }}
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <Pressable
                style={[styles.btn, styles.btnPrimary, loading && styles.btnDisabled]}
                onPress={handleForgotPassword}
                disabled={loading}
              >
                {loading
                  ? <ActivityIndicator color={colors.white} />
                  : <Text style={styles.btnPrimaryText}>Send reset link</Text>
                }
              </Pressable>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }

  if (mode === 'email') {
    return (
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Pressable style={styles.backRow} onPress={() => setMode('main')}>
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backLabel}>Back</Text>
          </Pressable>
          <Text style={styles.heading}>Sign in</Text>

          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor={colors.text4}
            keyboardType="email-address"
            autoCapitalize="none"
            autoFocus
            value={email}
            onChangeText={t => { setEmail(t); clearError(); }}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.text4}
            secureTextEntry
            value={password}
            onChangeText={t => { setPassword(t); clearError(); }}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable
            style={[styles.btn, styles.btnPrimary, loading && styles.btnDisabled]}
            onPress={handleEmailSignIn}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color={colors.white} />
              : <Text style={styles.btnPrimaryText}>Sign in</Text>
            }
          </Pressable>

          <Pressable onPress={() => setMode('forgotPassword')}>
            <Text style={styles.forgotLink}>Forgot password?</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Welcome to{'\n'}SplitEasy</Text>
        <Text style={styles.trust}>Your friends never need to download anything.</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          style={[styles.btn, styles.btnApple, loading && styles.btnDisabled]}
          onPress={handleApple}
          disabled={loading}
        >
          <Text style={styles.appleIcon}></Text>
          <Text style={styles.btnAppleText}>Sign in with Apple</Text>
        </Pressable>

        <Pressable
          style={[styles.btn, styles.btnGoogle, loading && styles.btnDisabled]}
          onPress={handleGoogle}
          disabled={loading}
        >
          <Text style={styles.googleG}>G</Text>
          <Text style={styles.btnGoogleText}>Sign in with Google</Text>
        </Pressable>

        <Pressable
          style={[styles.btn, styles.btnEmail]}
          onPress={() => setMode('email')}
        >
          <Text style={styles.btnEmailText}>Continue with Email</Text>
        </Pressable>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <Pressable
          style={[styles.btn, styles.btnGuest]}
          onPress={handleNoAccount}
        >
          <Text style={styles.btnGuestText}>Continue without account</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing[5],
    paddingTop: 80,
    paddingBottom: spacing[8],
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[5],
    gap: spacing[2],
  },
  backArrow: {
    fontSize: fontSizes.xl,
    color: colors.brand,
  },
  backLabel: {
    fontSize: fontSizes.base,
    color: colors.brand,
    fontWeight: fontWeights.medium as any,
  },
  heading: {
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
    marginBottom: spacing[3],
    lineHeight: 40,
  },
  sub: {
    fontSize: fontSizes.base,
    color: colors.text3,
    marginBottom: spacing[6],
  },
  trust: {
    fontSize: fontSizes.base,
    color: colors.text3,
    marginBottom: spacing[8],
  },
  input: {
    height: sizes.btnHeight,
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.borderMid,
    paddingHorizontal: spacing[4],
    fontSize: fontSizes.base,
    color: colors.text1,
    marginBottom: spacing[3],
  },
  errorText: {
    fontSize: fontSizes.sm,
    color: colors.neg,
    marginBottom: spacing[3],
    paddingHorizontal: spacing[1],
  },
  successBox: {
    backgroundColor: colors.posBg,
    borderRadius: radius.sm,
    padding: spacing[4],
    marginTop: spacing[3],
  },
  successText: {
    color: colors.posDark,
    fontWeight: fontWeights.medium as any,
    fontSize: fontSizes.base,
  },
  btn: {
    height: sizes.btnHeight,
    borderRadius: radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
    gap: spacing[2],
  },
  btnDisabled: { opacity: 0.6 },
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
  btnGoogle: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderMid,
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
  btnEmail: {
    borderWidth: 1.5,
    borderColor: colors.brand,
    backgroundColor: 'transparent',
  },
  btnEmailText: {
    color: colors.brand,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
  },
  btnPrimary: {
    backgroundColor: colors.brand,
    marginTop: spacing[2],
  },
  btnPrimaryText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
  },
  btnGuest: {
    borderWidth: 1.5,
    borderColor: colors.borderMid,
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
  },
  btnGuestText: {
    color: colors.text3,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium as any,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
    gap: spacing[3],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderMid,
  },
  dividerText: {
    fontSize: fontSizes.sm,
    color: colors.text4,
  },
  forgotLink: {
    textAlign: 'center',
    fontSize: fontSizes.sm,
    color: colors.brand,
    marginTop: spacing[2],
    paddingVertical: spacing[2],
  },
});
