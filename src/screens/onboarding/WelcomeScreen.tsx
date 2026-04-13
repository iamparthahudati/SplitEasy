import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../../theme/colors';
import { fontSizes, fontWeights } from '../../theme/typography';
import { spacing, radius } from '../../theme/spacing';
import type { OnboardingStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, 'Welcome'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Slide {
  key: string;
  bg: string;
  icon: string;
  title: string;
  subtitle: string;
}

const SLIDES: Slide[] = [
  {
    key: '1',
    bg: colors.brand,
    icon: '÷',
    title: 'Split any bill in 3 taps',
    subtitle: 'No more mental math. No more awkward conversations. Just tap, split, done.',
  },
  {
    key: '2',
    bg: '#059669',
    icon: '⚖',
    title: 'Always know who owes whom',
    subtitle: 'Real-time balances across every group. Settle one person at a time.',
  },
  {
    key: '3',
    bg: '#6366F1',
    icon: '👥',
    title: 'Friends need zero account',
    subtitle: 'Add anyone by name. They never have to download anything.',
  },
];

// TODO: store to AsyncStorage once library is installed
const markOnboarded = () => {};

export function WelcomeScreen() {
  const navigation = useNavigation<Nav>();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      flatRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
    } else {
      markOnboarded();
      navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
    }
  };

  const handleSkip = () => {
    markOnboarded();
    navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.skipBtn} onPress={handleSkip} hitSlop={12}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <FlatList
        ref={flatRef}
        data={SLIDES}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.bg }]}>
            <Text style={styles.slideIcon}>{item.icon}</Text>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      <View style={styles.indicatorRow}>
        {SLIDES.map((s, i) => (
          <View
            key={s.key}
            style={[
              styles.dot,
              i === activeIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      <Pressable style={styles.nextBtn} onPress={handleNext}>
        <Text style={styles.nextText}>
          {activeIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand,
  },
  skipBtn: {
    position: 'absolute',
    top: 56,
    right: spacing[4],
    zIndex: 10,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
  },
  skipText: {
    fontSize: fontSizes.base,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: fontWeights.medium as any,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[8],
    paddingTop: 80,
    paddingBottom: 160,
  },
  slideIcon: {
    fontSize: 72,
    marginBottom: spacing[6],
    color: colors.white,
  },
  slideTitle: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold as any,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing[3],
    lineHeight: 32,
  },
  slideSubtitle: {
    fontSize: fontSizes.md,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 24,
  },
  indicatorRow: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: spacing[2],
  },
  dot: {
    borderRadius: radius.pill,
    height: 5,
  },
  dotActive: {
    width: 18,
    backgroundColor: colors.white,
  },
  dotInactive: {
    width: 5,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  nextBtn: {
    position: 'absolute',
    bottom: 48,
    left: spacing[4],
    right: spacing[4],
    height: 56,
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
    color: colors.brand,
  },
});
