import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSizes, fontWeights, letterSpacings } from '../../theme/typography';
import { useNavigation } from '../../navigation/NavigationContext';

// TODO: replace with AsyncStorage.getItem('hasOnboarded') once library is installed
const checkHasOnboarded = (): Promise<boolean> => Promise.resolve(false);
const checkHasGroups = (): Promise<boolean> => Promise.resolve(false);

export function SplashScreen() {
  const { navigate, reset } = useNavigation();
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo entrance animation
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Tagline fades in after logo settles
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }).start();
    });

    // Navigate after 1.5s
    const timer = setTimeout(async () => {
      const hasOnboarded = await checkHasOnboarded();
      if (!hasOnboarded) {
        reset('Welcome');
        return;
      }
      const hasGroups = await checkHasGroups();
      reset(hasGroups ? 'Groups' : 'CreateGroup');
    }, 1500);

    return () => clearTimeout(timer);
  }, [logoScale, logoOpacity, taglineOpacity, navigate, reset]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        {/* Logo mark — overlapping circles */}
        <View style={styles.logoMark}>
          <View style={[styles.circle, styles.circleLeft]} />
          <View style={[styles.circle, styles.circleRight]} />
        </View>
        <Text style={styles.wordmark}>SplitEasy</Text>
      </Animated.View>

      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        SPLIT BILLS · KEEP FRIENDS
      </Animated.Text>
    </View>
  );
}

const CIRCLE_SIZE = 44;
const OVERLAP = 14;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoMark: {
    flexDirection: 'row',
    width: CIRCLE_SIZE * 2 - OVERLAP,
    height: CIRCLE_SIZE,
    marginBottom: 16,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    opacity: 0.9,
  },
  circleLeft: {
    backgroundColor: colors.white,
    left: 0,
  },
  circleRight: {
    backgroundColor: colors.brandMid,
    right: 0,
  },
  wordmark: {
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold as any,
    color: colors.white,
    letterSpacing: letterSpacings.tight,
  },
  tagline: {
    position: 'absolute',
    bottom: 60,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    color: colors.brandMid,
    letterSpacing: letterSpacings.widest,
  },
});
