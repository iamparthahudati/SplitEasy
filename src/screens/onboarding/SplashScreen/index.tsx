import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '../../../navigation/NavigationContext';

import styles from './styles';

// ─── Splash gradient colors ───────────────────────────────────────────────────
const GRAD_TOP = '#1A1560'; // near-black dark indigo

// ─── TODO: replace with AsyncStorage once installed ──────────────────────────
const checkHasOnboarded = (): Promise<boolean> => Promise.resolve(false);
const checkHasGroups = (): Promise<boolean> => Promise.resolve(false);

function LogoMark() {
  const R = 38; // radius → 76px diameter
  const D = R * 2;
  const SW = 1.5; // stroke width

  return (
    <View style={{ width: D, height: D }}>
      {/* Full circle — white stroke (right half visible, left covered by fill) */}
      <View
        style={{
          position: 'absolute',
          width: D,
          height: D,
          borderRadius: R,
          borderWidth: SW,
          borderColor: 'rgba(255,255,255,0.88)',
          backgroundColor: 'transparent',
        }}
      />

      {/* Left half — solid white fill, clipped to left 50% */}
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
            backgroundColor: '#FFFFFF',
          }}
        />
      </View>

      {/* Center vertical divider — 1px white */}
      <View
        style={{
          position: 'absolute',
          left: R - 0.5,
          top: 0,
          width: 1,
          height: D,
          backgroundColor: '#FFFFFF',
        }}
      />
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export function SplashScreen() {
  const { reset } = useNavigation();

  const logoScale = useRef(new Animated.Value(0.72)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const subOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Step 1: logo springs in
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 52,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Step 2: tagline + version fade in
      Animated.timing(subOpacity, {
        toValue: 1,
        duration: 400,
        delay: 280,
        useNativeDriver: true,
      }).start();
    });

    // Step 3: navigate after 2s
    const timer = setTimeout(async () => {
      const hasOnboarded = await checkHasOnboarded();
      if (!hasOnboarded) {
        reset('Welcome');
        return;
      }
      const hasGroups = await checkHasGroups();
      reset(hasGroups ? 'Groups' : 'CreateGroup');
    }, 2000);

    return () => clearTimeout(timer);
  }, [logoScale, logoOpacity, subOpacity, reset]);

  return (
    <View style={styles.container}>
      {/* ── Gradient: #1A1560 → #2D2A6E → #3730A3 ── */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: GRAD_TOP }]} />
      <View style={styles.gradMid} />
      <View style={styles.gradBottom} />

      {/* ── Subtle radial glow behind logo ── */}
      <View style={styles.radialGlow} />

      {/* ── Logo + wordmark + divider + tagline unit ── */}
      <Animated.View
        style={[
          styles.centerUnit,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <LogoMark />

        {/* Wordmark — 12px below logo */}
        <Text style={styles.wordmark}>SplitEasy</Text>

        {/* Divider — 12px below wordmark */}
        <View style={styles.divider} />

        {/* Tagline — 10px below divider */}
        <Animated.Text style={[styles.tagline, { opacity: subOpacity }]}>
          SPLIT BILLS · KEEP FRIENDS
        </Animated.Text>
      </Animated.View>

      {/* ── Version — 40px from bottom ── */}
      <Animated.Text style={[styles.version, { opacity: subOpacity }]}>
        v1.0.0
      </Animated.Text>
    </View>
  );
}
