import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';

// iOS-style toggle dimensions
const TRACK_WIDTH = 51;
const TRACK_HEIGHT = 31;
const THUMB_SIZE = 27;
const THUMB_OFFSET = 2; // gap between thumb and track edge
const TRAVEL = TRACK_WIDTH - THUMB_SIZE - THUMB_OFFSET * 2;

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  activeColor?: string;
  style?: StyleProp<ViewStyle>;
}

const Toggle: React.FC<ToggleProps> = ({
  value,
  onValueChange,
  disabled = false,
  activeColor = colors.brand,
  style,
}) => {
  const translateX = useRef(new Animated.Value(value ? TRAVEL : 0)).current;
  const trackOpacity = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: value ? TRAVEL : 0,
        useNativeDriver: true,
        bounciness: 4,
        speed: 18,
      }),
      Animated.timing(trackOpacity, {
        toValue: value ? 1 : 0,
        duration: 180,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value, translateX, trackOpacity]);

  const trackBg = trackOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.borderMid, activeColor],
  });

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      style={[style, disabled && styles.disabled]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Animated.View style={[styles.track, { backgroundColor: trackBg }]}>
        {/* Thumb shadow layer */}
        <Animated.View
          style={[styles.thumbShadow, { transform: [{ translateX }] }]}
        />
        {/* Thumb */}
        <Animated.View
          style={[styles.thumb, { transform: [{ translateX }] }]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    justifyContent: 'center',
  },
  thumbShadow: {
    position: 'absolute',
    left: THUMB_OFFSET,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: 'rgba(0,0,0,0.12)',
    // Slight downward offset for depth
    top: THUMB_OFFSET + 1,
  },
  thumb: {
    position: 'absolute',
    left: THUMB_OFFSET,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: colors.white,
    top: THUMB_OFFSET,
    // Subtle border for definition on white backgrounds
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  disabled: {
    opacity: 0.4,
  },
});

export default Toggle;
