import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
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

import type { OnboardingStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import { fontWeights } from '../../theme/typography';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, 'Welcome'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ---------------------------------------------------------------------------
// Slide data
// ---------------------------------------------------------------------------

interface Slide {
  key: string;
  bgTop: string;
  bgBottom: string;
  title: string;
  subtitle: string;
}

const SLIDES: Slide[] = [
  {
    key: '1',
    bgTop: '#1E1B4B',
    bgBottom: '#4338CA',
    title: 'Split any bill in 3 taps',
    subtitle:
      'No more mental math. No more awkward conversations. Just tap, split, done.',
  },
  {
    key: '2',
    bgTop: '#064E3B',
    bgBottom: '#059669',
    title: 'Always know who owes whom',
    subtitle:
      'Real-time balances across every group. Settle one person at a time.',
  },
  {
    key: '3',
    bgTop: '#1E1B4B',
    bgBottom: '#6D28D9',
    title: 'Friends need zero account',
    subtitle: 'Add anyone by name. They never have to download anything.',
  },
];

// ---------------------------------------------------------------------------
// Geometric SVG-style illustrations (pure Views)
// ---------------------------------------------------------------------------

/** Slide 1 — three overlapping avatar circles with amounts below */
function IllustrationSplit() {
  const avatars = [
    { initials: 'A', color: '#818CF8', left: 0 },
    { initials: 'B', color: '#6366F1', left: 44 },
    { initials: 'C', color: '#4F46E5', left: 88 },
  ];
  const amounts = ['$12', '$12', '$11'];

  return (
    <View style={illStyles.root}>
      {/* Overlapping avatars */}
      <View style={illStyles.avatarRow}>
        {avatars.map((av, i) => (
          <View
            key={av.initials}
            style={[
              illStyles.avatar,
              {
                backgroundColor: av.color,
                marginLeft: i === 0 ? 0 : -14,
                zIndex: i,
              },
            ]}
          >
            <Text style={illStyles.avatarInitial}>{av.initials}</Text>
          </View>
        ))}
      </View>

      {/* Dividing line */}
      <View style={illStyles.divider} />

      {/* Amount labels */}
      <View style={illStyles.amountRow}>
        {amounts.map((amt, i) => (
          <View key={i} style={illStyles.amountCol}>
            <Text style={illStyles.amountText}>{amt}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/** Slide 2 — balance scale */
function IllustrationScale() {
  return (
    <View style={illStyles.root}>
      {/* Fulcrum pole */}
      <View style={illStyles.scalePole} />

      {/* Horizontal beam */}
      <View style={illStyles.scaleBeam} />

      {/* Left pan — positive */}
      <View style={[illStyles.scalePanWire, { left: 28 }]} />
      <View
        style={[illStyles.scalePan, { left: 10, backgroundColor: '#34D399' }]}
      >
        <Text style={illStyles.scalePanText}>+$24</Text>
      </View>

      {/* Right pan — negative */}
      <View style={[illStyles.scalePanWire, { right: 28 }]} />
      <View
        style={[illStyles.scalePan, { right: 10, backgroundColor: '#F87171' }]}
      >
        <Text style={illStyles.scalePanText}>-$18</Text>
      </View>

      {/* Base triangle */}
      <View style={illStyles.scaleBase} />
    </View>
  );
}

/** Slide 3 — three person silhouettes connected by dotted lines */
function IllustrationNetwork() {
  return (
    <View style={illStyles.root}>
      {/* Dotted connector lines */}
      <View style={illStyles.connectorLeft} />
      <View style={illStyles.connectorRight} />

      {/* Left person */}
      <View style={[illStyles.personWrap, { left: 8 }]}>
        <View
          style={[
            illStyles.personHead,
            { backgroundColor: 'rgba(255,255,255,0.45)' },
          ]}
        />
        <View
          style={[
            illStyles.personBody,
            { backgroundColor: 'rgba(255,255,255,0.35)' },
          ]}
        />
      </View>

      {/* Center person — highlighted */}
      <View style={[illStyles.personWrap, illStyles.personCenter]}>
        <View style={illStyles.personGlow} />
        <View
          style={[
            illStyles.personHead,
            {
              backgroundColor: '#FFFFFF',
              width: 40,
              height: 40,
              borderRadius: 20,
            },
          ]}
        />
        <View
          style={[
            illStyles.personBody,
            {
              backgroundColor: '#FFFFFF',
              width: 52,
              height: 28,
              borderRadius: 10,
            },
          ]}
        />
      </View>

      {/* Right person */}
      <View style={[illStyles.personWrap, { right: 8 }]}>
        <View
          style={[
            illStyles.personHead,
            { backgroundColor: 'rgba(255,255,255,0.45)' },
          ]}
        />
        <View
          style={[
            illStyles.personBody,
            { backgroundColor: 'rgba(255,255,255,0.35)' },
          ]}
        />
      </View>
    </View>
  );
}

const illStyles = StyleSheet.create({
  root: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // --- Slide 1 ---
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  divider: {
    width: 140,
    height: 1.5,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 12,
  },
  amountRow: {
    flexDirection: 'row',
    gap: 16,
  },
  amountCol: {
    alignItems: 'center',
  },
  amountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // --- Slide 2 ---
  scalePole: {
    position: 'absolute',
    width: 4,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 2,
    bottom: 40,
    alignSelf: 'center',
  },
  scaleBeam: {
    position: 'absolute',
    width: 160,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 2,
    top: 44,
  },
  scalePanWire: {
    position: 'absolute',
    width: 1.5,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.5)',
    top: 48,
  },
  scalePan: {
    position: 'absolute',
    width: 56,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    top: 76,
  },
  scalePanText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  scaleBase: {
    position: 'absolute',
    bottom: 28,
    width: 40,
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 4,
  },

  // --- Slide 3 ---
  connectorLeft: {
    position: 'absolute',
    width: 60,
    height: 1.5,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    top: 88,
    left: 44,
  },
  connectorRight: {
    position: 'absolute',
    width: 60,
    height: 1.5,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    top: 88,
    right: 44,
  },
  personWrap: {
    position: 'absolute',
    alignItems: 'center',
    gap: 6,
  },
  personCenter: {
    alignSelf: 'center',
    alignItems: 'center',
    top: 52,
  },
  personGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.12)',
    top: -12,
  },
  personHead: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  personBody: {
    width: 44,
    height: 24,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.35)',
    marginTop: 6,
  },
});

// ---------------------------------------------------------------------------
// Gradient background (layered Views simulating top→bottom gradient)
// ---------------------------------------------------------------------------

function GradientBackground({
  topColor,
  bottomColor,
}: {
  topColor: string;
  bottomColor: string;
}) {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Top solid layer */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: topColor }]} />
      {/* Bottom overlay fading in — 6 stepped layers */}
      {[0.15, 0.25, 0.38, 0.52, 0.68, 0.85].map((opacity, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: `${(i + 1) * 17}%`,
            backgroundColor: bottomColor,
            opacity,
          }}
        />
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// markOnboarded (TODO: persist to AsyncStorage once library is installed)
// ---------------------------------------------------------------------------

const markOnboarded = () => {};

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------

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
      flatRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
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
      {/* Skip button — floats above carousel */}
      <Pressable style={styles.skipBtn} onPress={handleSkip} hitSlop={12}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      {/* Carousel */}
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
          <View style={styles.slide}>
            {/* Gradient background */}
            <GradientBackground
              topColor={item.bgTop}
              bottomColor={item.bgBottom}
            />

            {/* Illustration area */}
            <View style={styles.illustrationWrap}>
              {/* Glow circle */}
              <View style={styles.glowCircle} />

              {/* Geometric illustration */}
              <View style={styles.illustrationInner}>
                {item.key === '1' && <IllustrationSplit />}
                {item.key === '2' && <IllustrationScale />}
                {item.key === '3' && <IllustrationNetwork />}
              </View>
            </View>

            {/* Text */}
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      {/* Page dots */}
      <View style={styles.dotsRow}>
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

      {/* Next / Get Started button */}
      <Pressable style={styles.nextBtn} onPress={handleNext}>
        <Text style={styles.nextText}>
          {activeIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </Pressable>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1B4B',
  },

  // Skip
  skipBtn: {
    position: 'absolute',
    top: 56,
    right: spacing[4],
    zIndex: 10,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
  },
  skipText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: fontWeights.medium as any,
  },

  // Slide
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[6],
    paddingTop: 80,
    paddingBottom: 180,
    overflow: 'hidden',
  },

  // Illustration
  illustrationWrap: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[8],
  },
  glowCircle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  illustrationInner: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text
  slideTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: spacing[3],
  },
  slideSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 26,
  },

  // Dots
  dotsRow: {
    position: 'absolute',
    bottom: 124,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: spacing[2],
    alignItems: 'center',
  },
  dot: {
    borderRadius: radius.pill,
  },
  dotActive: {
    width: 24,
    height: 6,
    backgroundColor: '#FFFFFF',
  },
  dotInactive: {
    width: 6,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },

  // Next button
  nextBtn: {
    position: 'absolute',
    bottom: 48,
    left: spacing[5],
    right: spacing[5],
    height: 56,
    backgroundColor: colors.white,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    fontSize: 16,
    fontWeight: fontWeights.semibold as any,
    color: colors.brand,
  },
});
