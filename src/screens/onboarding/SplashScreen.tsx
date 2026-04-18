import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '../../navigation/NavigationContext';
import { fontSizes, fontWeights, letterSpacings } from '../../theme/typography';

// ─── Splash gradient colors ───────────────────────────────────────────────────
const GRAD_TOP = '#1A1560'; // near-black dark indigo
const GRAD_MID = '#2D2A6E'; // indigo mid
const GRAD_BOTTOM = '#3730A3'; // indigo 700

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

    // Step 3: navigate after 2s — PAUSED for visual review
    // const timer = setTimeout(async () => {
    //   const hasOnboarded = await checkHasOnboarded();
    //   if (!hasOnboarded) {
    //     reset('Welcome');
    //     return;
    //   }
    //   const hasGroups = await checkHasGroups();
    //   reset(hasGroups ? 'Groups' : 'CreateGroup');
    // }, 2000);

    // return () => clearTimeout(timer);
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

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAD_TOP,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Gradient bands
  gradMid: {
    ...StyleSheet.absoluteFill,
    top: '38%',
    backgroundColor: GRAD_MID,
    opacity: 0.82,
  },
  gradBottom: {
    ...StyleSheet.absoluteFill,
    top: '68%',
    backgroundColor: GRAD_BOTTOM,
    opacity: 0.7,
  },

  // Very faint radial warmth behind logo — not a visible ring
  radialGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: '50%',
    marginTop: -160,
    alignSelf: 'center',
  },

  // Logo + text block — sits slightly above center
  centerUnit: {
    alignItems: 'center',
    marginBottom: '18%',
  },

  wordmark: {
    marginTop: 12,
    fontSize: fontSizes['3xl'], // 30px
    fontWeight: fontWeights.extrabold, // 800
    color: '#FFFFFF',
    letterSpacing: letterSpacings.tight, // -0.5
  },

  divider: {
    marginTop: 12,
    width: 36,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.20)',
  },

  tagline: {
    marginTop: 10,
    fontSize: fontSizes.xs, // 10px
    fontWeight: fontWeights.medium, // 500
    color: 'rgba(255,255,255,0.40)',
    letterSpacing: 3.5,
    textTransform: 'uppercase',
  },

  version: {
    position: 'absolute',
    bottom: 40,
    fontSize: fontSizes.xs, // 10px
    fontWeight: fontWeights.regular, // 400
    color: 'rgba(255,255,255,0.20)',
    letterSpacing: 0.5,
  },
});
