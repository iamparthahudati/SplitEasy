import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

type LabelPosition = 'top' | 'right';

interface ProgressBarProps {
  /** Value between 0 and 1 */
  progress: number;
  color?: string;
  trackColor?: string;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  animated?: boolean;
  /** Renders a diagonal stripe pattern overlay on the fill */
  striped?: boolean;
  /** Renders the percentage value as a label */
  showLabel?: boolean;
  /** Controls whether the label appears above or to the right of the bar */
  labelPosition?: LabelPosition;
}

/** Number of repeating stripe slices rendered across the fill */
const STRIPE_COUNT = 8;

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = colors.brand,
  trackColor = colors.borderMid,
  height = 6,
  borderRadius: br = radius.pill,
  style,
  animated = true,
  striped = false,
  showLabel = false,
  labelPosition = 'right',
}) => {
  const clamped = Math.min(1, Math.max(0, progress));

  const widthAnim = useRef(new Animated.Value(clamped)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(widthAnim, {
        toValue: clamped,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else {
      widthAnim.setValue(clamped);
    }
  }, [clamped, animated, widthAnim]);

  const animatedWidth = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  // ── Fill (with optional stripe overlay) ──────────────────────────────────
  const fill = (
    <Animated.View
      style={[
        styles.fill,
        {
          width: animatedWidth,
          height,
          borderRadius: br,
          backgroundColor: color,
        },
      ]}
    >
      {striped && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {Array.from({ length: STRIPE_COUNT }).map((_, i) => (
            <View
              key={i}
              style={[styles.stripe, { left: `${(i / STRIPE_COUNT) * 100}%` }]}
            />
          ))}
        </View>
      )}
    </Animated.View>
  );

  // ── Track ─────────────────────────────────────────────────────────────────
  const track = (
    <View
      style={[
        styles.track,
        showLabel && labelPosition === 'right' && styles.trackFlex,
        { height, borderRadius: br, backgroundColor: trackColor },
      ]}
    >
      {fill}
    </View>
  );

  // ── Label ─────────────────────────────────────────────────────────────────
  const labelText = `${Math.round(clamped * 100)}%`;

  // ── Composition ───────────────────────────────────────────────────────────
  if (!showLabel) {
    return <View style={[styles.trackOuter, style]}>{track}</View>;
  }

  if (labelPosition === 'top') {
    return (
      <View style={style}>
        <Text style={styles.labelTop}>{labelText}</Text>
        {track}
      </View>
    );
  }

  // labelPosition === 'right'
  return (
    <View style={[styles.row, style]}>
      {track}
      <Text style={styles.labelRight}>{labelText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // Outer wrapper used when there is no label — preserves the original
  // width:'100%' + overflow:hidden contract without an extra wrapping View
  // when a label is present (label layouts handle their own outer container).
  trackOuter: {
    width: '100%',
    overflow: 'hidden',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  // When the label sits to the right the track must flex-grow inside the row.
  trackFlex: {
    flex: 1,
    width: undefined,
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
  },
  // One diagonal stripe slice: tall, narrow, rotated semi-transparent white bar.
  // Rendered STRIPE_COUNT times, evenly distributed across the fill width.
  stripe: {
    position: 'absolute',
    top: '-50%',
    width: 6,
    height: '200%',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    transform: [{ rotate: '20deg' }],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  labelRight: {
    marginLeft: 8,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text3,
    // Fixed width prevents the bar from jumping as the number changes width
    minWidth: 32,
    textAlign: 'left',
  },
  labelTop: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    color: colors.text3,
    marginBottom: 4,
    textAlign: 'right',
  },
});

export default ProgressBar;
