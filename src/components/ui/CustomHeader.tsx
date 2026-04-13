import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { fontSizes, fontWeights } from '../../theme/typography';
import { sizes, spacing } from '../../theme/spacing';

interface Props {
  title: string;
  /** Show a back button on the left. Requires onBack to be provided. */
  showBack?: boolean;
  /** Called when the back button is pressed. */
  onBack?: () => void;
  /** Optional element rendered on the right side. */
  rightElement?: React.ReactNode;
  /**
   * Add top safe-area inset padding.
   * Set true when used as a navigator header (outside SafeAreaView).
   * Leave false (default) when rendered inside a SafeAreaView with edges={['top']}.
   */
  safeAreaTop?: boolean;
}

/**
 * CustomHeader — shared header component used across all screens.
 *
 * - showBack=false  → large bold left-aligned title (tab/root screens)
 * - showBack=true   → 3-column layout: back button | centred title | right element
 */
export function CustomHeader({
  title,
  showBack = false,
  onBack,
  rightElement,
  safeAreaTop = false,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        safeAreaTop && { paddingTop: insets.top },
      ]}
    >
      <View style={[styles.inner, showBack ? styles.innerStack : styles.innerTab]}>
        {showBack ? (
          /* ── Stack mode: back | title | right ───────────────────── */
          <>
            <Pressable
              onPress={onBack}
              hitSlop={12}
              style={styles.backBtn}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>

            <Text style={styles.stackTitle} numberOfLines={1}>
              {title}
            </Text>

            <View style={styles.rightSlot}>
              {rightElement ?? null}
            </View>
          </>
        ) : (
          /* ── Tab mode: title (left) | right ─────────────────────── */
          <>
            <Text style={styles.tabTitle} numberOfLines={1}>
              {title}
            </Text>
            {rightElement ? (
              <View style={styles.rightSlot}>{rightElement}</View>
            ) : null}
          </>
        )}
      </View>
    </View>
  );
}

const SIDE_WIDTH = 44; // keeps title centred in stack mode

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderMid,
  },

  inner: {
    height: sizes.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Stack mode: fixed height, horizontally padded equally so title is centred
  innerStack: {
    paddingHorizontal: spacing[3],
  },

  // Tab mode: a bit more breathing room on left, vertically taller feel kept
  // by relying on the fixed height above
  innerTab: {
    paddingHorizontal: spacing[5],
  },

  // ── Back button ──────────────────────────────────────────────────────────
  backBtn: {
    width: SIDE_WIDTH,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 30,
    lineHeight: 34,
    color: colors.brand,
    fontWeight: fontWeights.regular as any,
  },

  // ── Titles ───────────────────────────────────────────────────────────────
  stackTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
    color: colors.text1,
  },
  tabTitle: {
    flex: 1,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
  },

  // ── Right slot ───────────────────────────────────────────────────────────
  rightSlot: {
    width: SIDE_WIDTH,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
