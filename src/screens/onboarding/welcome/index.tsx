import React, { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  Text,
  View,
  ViewToken,
} from 'react-native';

import { useNavigation } from '../../../navigation/NavigationContext';
import { BalanceIllustration } from './components/BalanceIllustration';
import { BillSplitIllustration } from './components/BillSplitIllustration';
import { DotIndicator } from './components/DotIndicator';
import { FriendsIllustration } from './components/FriendsIllustration';
import { SlideItem } from './components/SlideItem';
import { SCREEN_WIDTH, styles } from './styles';

// ─── Slide data ───────────────────────────────────────────────────────────────
interface Slide {
  key: string;
  illustration: React.ReactNode;
  title: string;
  body: string;
  sub: string;
}

const SLIDES: Slide[] = [
  {
    key: '1',
    illustration: <BillSplitIllustration />,
    title: 'Split any bill in 3 taps',
    body: 'No more mental math. No more awkward conversations.',
    sub: 'Just tap, split, done.',
  },
  {
    key: '2',
    illustration: <BalanceIllustration />,
    title: 'Always know who owes whom',
    body: 'Real-time balances across every group.',
    sub: 'Settle one person at a time.',
  },
  {
    key: '3',
    illustration: <FriendsIllustration />,
    title: 'Friends need zero account',
    body: 'Add anyone by name.',
    sub: 'They never have to download anything.',
  },
];

// ─── TODO: persist to AsyncStorage once installed ────────────────────────────
const markOnboarded = () => {};

const VIEWABILITY_CONFIG = { viewAreaCoveragePercentThreshold: 50 };

// ─── Screen ───────────────────────────────────────────────────────────────────
export function WelcomeScreen() {
  const { reset } = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);
  const btnScale = useRef(new Animated.Value(1)).current;

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
      reset('SignIn');
    }
  };

  const handleSkip = () => {
    markOnboarded();
    reset('SignIn');
  };

  const onPressIn = () =>
    Animated.spring(btnScale, { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = () =>
    Animated.spring(btnScale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <View style={styles.root}>
      {/* ── Background: #1A1560 top half, #2D2A6E bottom half ── */}
      <View style={styles.bgBottom} />

      {/* ── Skip ── */}
      <Pressable style={styles.skipBtn} onPress={handleSkip} hitSlop={12}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      {/* ── Slides ── */}
      <FlatList
        ref={flatRef}
        data={SLIDES}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={VIEWABILITY_CONFIG}
        style={styles.flatList}
        renderItem={({ item }) => (
          <SlideItem
            illustration={item.illustration}
            title={item.title}
            body={item.body}
            sub={item.sub}
            width={SCREEN_WIDTH}
          />
        )}
      />

      {/* ── Dot indicators ── */}
      <DotIndicator count={SLIDES.length} activeIndex={activeIndex} />

      {/* ── Next / Get Started button ── */}
      <Animated.View
        style={[styles.btnWrap, { transform: [{ scale: btnScale }] }]}
      >
        <Pressable
          style={styles.nextBtn}
          onPress={handleNext}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Text style={styles.nextText}>
            {activeIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
