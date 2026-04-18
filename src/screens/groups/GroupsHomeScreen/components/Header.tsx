import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

const LOGO_BLUE = '#3B5BDB';
const LR = 14; // left semicircle radius → 28px total
const D = LR * 2;

// ─── Split-circle logo (View-based, no SVG) ───────────────────────────────────
function SplitCircleLogo() {
  return (
    <View style={{ width: D, height: D }}>
      {/* Full circle outline */}
      <View
        style={{
          position: 'absolute',
          width: D,
          height: D,
          borderRadius: LR,
          borderWidth: 1.5,
          borderColor: LOGO_BLUE,
          backgroundColor: 'transparent',
        }}
      />
      {/* Left half — solid white */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: LR,
          height: D,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: D,
            height: D,
            borderRadius: LR,
            backgroundColor: '#FFFFFF',
          }}
        />
      </View>
      {/* Center divider */}
      <View
        style={{
          position: 'absolute',
          left: LR - 0.75,
          top: 0,
          width: 1.5,
          height: D,
          backgroundColor: LOGO_BLUE,
        }}
      />
    </View>
  );
}

// ─── Bell icon (View-based) ───────────────────────────────────────────────────
function BellIcon() {
  return (
    <View style={bellStyles.wrap}>
      <View style={bellStyles.body} />
      <View style={bellStyles.clapper} />
    </View>
  );
}

const bellStyles = StyleSheet.create({
  wrap: { width: 20, height: 22, alignItems: 'center' },
  body: {
    width: 18,
    height: 16,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.text2,
    backgroundColor: 'transparent',
    marginTop: 3,
  },
  clapper: {
    width: 8,
    height: 4,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.text2,
    borderTopWidth: 0,
    marginTop: -1,
  },
});

// ─── Header ───────────────────────────────────────────────────────────────────
interface HeaderProps {
  groupCount: number;
  onBellPress: () => void;
  notificationCount?: number;
}

export function Header({
  groupCount,
  onBellPress,
  notificationCount = 1,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Left: logo + text */}
      <View style={styles.left}>
        <SplitCircleLogo />
        <View style={styles.textBlock}>
          <Text style={styles.appName}>SplitEasy</Text>
          <Text style={styles.subtitle}>{groupCount} active groups</Text>
        </View>
      </View>

      {/* Right: bell with badge */}
      <Pressable style={styles.bellButton} onPress={onBellPress} hitSlop={8}>
        <BellIcon />
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[3],
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  textBlock: {
    justifyContent: 'center',
  },
  appName: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    color: LOGO_BLUE,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: fontSizes.sm,
    color: colors.text3,
    lineHeight: 16,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.neg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: fontWeights.bold,
    color: colors.white,
  },
});
