import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '../../../navigation/NavigationContext';
import { AuthButton } from './components/AuthButton';
import { EmailSignInView } from './components/EmailSignInView';
import { ForgotPasswordView } from './components/ForgotPasswordView';
import { LogoMark } from './components/LogoMark';
import { OrDivider } from './components/OrDivider';
import { SocialButton } from './components/SocialButton';
import { BG_BASE, styles as sharedStyles } from './styles';

type Mode = 'main' | 'email' | 'forgotPassword';

export function SignInScreen() {
  const { navigate } = useNavigation();
  const [mode, setMode] = useState<Mode>('main');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const clearError = () => setError('');

  // ── Auth handlers ────────────────────────────────────────────────────────────

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

  // ── Sub-views ────────────────────────────────────────────────────────────────

  if (mode === 'forgotPassword') {
    return (
      <ForgotPasswordView
        email={email}
        loading={loading}
        error={error}
        resetSent={resetSent}
        onEmailChange={t => {
          setEmail(t);
          clearError();
        }}
        onSubmit={handleForgotPassword}
        onBack={() => {
          setMode('email');
          setResetSent(false);
          clearError();
        }}
      />
    );
  }

  if (mode === 'email') {
    return (
      <EmailSignInView
        email={email}
        password={password}
        loading={loading}
        error={error}
        onEmailChange={t => {
          setEmail(t);
          clearError();
        }}
        onPasswordChange={t => {
          setPassword(t);
          clearError();
        }}
        onSignIn={handleEmailSignIn}
        onForgotPassword={() => {
          setMode('forgotPassword');
          clearError();
        }}
        onBack={() => {
          setMode('main');
          clearError();
        }}
      />
    );
  }

  // ── Main view ────────────────────────────────────────────────────────────────

  return (
    <View style={styles.root}>
      {/* Radial purple glow */}
      <View style={sharedStyles.glowCircle} />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Hero logo — large stacked icon + wordmark */}
        <View style={{ alignSelf: 'center', marginBottom: 48 }}>
          <LogoMark scale={2} />
        </View>

        {/* Hero text */}
        <Text style={styles.heading}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Your friends never need to download anything.
        </Text>

        {/* Error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Social buttons */}
        <SocialButton
          variant="apple"
          onPress={handleApple}
          loading={loading}
          disabled={loading}
        />
        <SocialButton
          variant="google"
          onPress={handleGoogle}
          loading={loading}
          disabled={loading}
        />

        {/* Divider */}
        <OrDivider />

        {/* Email + Guest */}
        <AuthButton
          label="Continue with Email"
          variant="email"
          onPress={() => setMode('email')}
        />
        <AuthButton
          label="Continue without account"
          variant="guest"
          onPress={handleNoAccount}
        />

        {/* Footer */}
        <Text style={styles.footer}>
          {'\uD83D\uDD12'} Encrypted and private
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG_BASE,
  },
  container: {
    flexGrow: 1,
    alignItems: 'stretch',
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 36,
    alignSelf: 'center',
  },
  errorText: {
    fontSize: 13,
    color: '#F87171',
    marginBottom: 12,
    textAlign: 'center',
    alignSelf: 'center',
  },
  footer: {
    marginTop: 'auto' as any,
    paddingTop: 32,
    fontSize: 13,
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
