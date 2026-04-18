import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import type { RootStackParamList } from '../../navigation/types';
import { useUser } from '../../store/useAppStore';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

// ─── Split-circle logo mark ───────────────────────────────────────────────────
// Left half: solid white filled semicircle
// Right half: white stroke outline only, transparent inside
// Divided by a razor-thin 1px white vertical line
function LogoMark() {
  const R = 36; // radius → 72px diameter
  const D = R * 2;
  const stroke = 1.5;

  return (
    <View style={{ width: D, height: D }}>
      {/* Full circle white stroke (right half visible, left half hidden behind fill) */}
      <View
        style={{
          position: 'absolute',
          width: D,
          height: D,
          borderRadius: R,
          borderWidth: stroke,
          borderColor: 'rgba(255,255,255,0.90)',
          backgroundColor: 'transparent',
        }}
      />

      {/* Left half solid white fill — clips the left 50% */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: R,
          height: D,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: D,
            height: D,
            borderRadius: R,
            backgroundColor: 'white',
          }}
        />
      </View>

      {/* Center vertical divider — 1px white line */}
      <View
        style={{
          position: 'absolute',
          left: R - 0.5,
          top: 0,
          width: 1,
          height: D,
          backgroundColor: 'white',
        }}
      />
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export function SplashScreen() {
  const navigation = useNavigation<Nav>();
  const user = useUser();

  const logoScale = useRef(new Animated.Value(0.75)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const subOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo springs in
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 55,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Tagline + version fade in after logo settles
      Animated.timing(subOpacity, {
        toValue: 1,
        duration: 420,
        delay: 300,
        useNativeDriver: true,
      }).start();
    });

    const timer = setTimeout(() => {
      if (!user) {
        navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
        return;
      }
      if (user.groupIds.length > 0) {
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Onboarding', params: { screen: 'CreateGroup' } }],
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [logoScale, logoOpacity, subOpacity, navigation, user]);

  return (
    <View style={styles.container}>
      {/* ── Gradient layers: #1E1B4B → #2D2A6E → #3730A3 ── */}
      {/* Base: darkest indigo */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#1E1B4B' }]} />
      {/* Mid band */}
      <View style={styles.gradMid} />
      {/* Bottom band */}
      <View style={styles.gradBottom} />

      {/* ── Logo + wordmark unit — 10% above vertical center ── */}
      <Animated.View
        style={[
          styles.centerUnit,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        {/* Subtle radial glow behind logo — not a visible halo, just warmth */}
        <View style={styles.radialGlow} />

        <LogoMark />

        {/* Wordmark: 12px below logo */}
        <Text style={styles.wordmark}>SplitEasy</Text>

        {/* Divider: 12px below wordmark */}
        <View style={styles.divider} />

        {/* Tagline: 10px below divider */}
        <Animated.Text style={[styles.tagline, { opacity: subOpacity }]}>
          SPLIT BILLS · KEEP FRIENDS
        </Animated.Text>
      </Animated.View>

      {/* ── Version: 40px from bottom ── */}
      <Animated.Text style={[styles.version, { opacity: subOpacity }]}>
        v1.0.0
      </Animated.Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1B4B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Gradient simulation — layered opacity bands
  gradMid: {
    ...StyleSheet.absoluteFill,
    top: '35%',
    backgroundColor: '#2D2A6E',
    opacity: 0.78,
  },
  gradBottom: {
    ...StyleSheet.absoluteFill,
    top: '65%',
    backgroundColor: '#3730A3',
    opacity: 0.65,
  },

  // Entire logo + text block sits 10% above center
  centerUnit: {
    alignItems: 'center',
    marginBottom: '20%',
  },

  // Extremely subtle radial warmth behind the logo — not a visible ring
  radialGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.04)',
    top: -44,
    alignSelf: 'center',
  },

  wordmark: {
    marginTop: 12,
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },

  divider: {
    marginTop: 12,
    width: 36,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.20)',
  },

  tagline: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.40)',
    letterSpacing: 3.5,
    textTransform: 'uppercase',
  },

  version: {
    position: 'absolute',
    bottom: 40,
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.20)',
    letterSpacing: 0.5,
  },
});
