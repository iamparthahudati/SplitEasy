import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const DURATION = 150;
const BOX_SIZE = 22;

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onPress,
  label,
  disabled = false,
  style,
}) => {
  const bgAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const checkOpacity = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: checked ? 1 : 0,
      duration: DURATION,
      useNativeDriver: false,
    }).start();

    Animated.timing(checkOpacity, {
      toValue: checked ? 1 : 0,
      duration: DURATION,
      useNativeDriver: false,
    }).start();
  }, [checked, bgAnim, checkOpacity]);

  const animatedBg = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.white, colors.brand],
  });

  const animatedBorderColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.borderMid, colors.brand],
  });

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      style={[styles.row, disabled && styles.disabled, style]}
    >
      <Animated.View
        style={[
          styles.box,
          {
            backgroundColor: animatedBg,
            borderColor: animatedBorderColor,
          },
        ]}
      >
        <Animated.View style={[styles.checkmark, { opacity: checkOpacity }]}>
          {/* Short horizontal bar of the L (bottom of checkmark) */}
          <View style={styles.barShort} />
          {/* Tall vertical bar of the L (right side of checkmark) */}
          <View style={styles.barTall} />
        </Animated.View>
      </Animated.View>

      {label !== undefined && (
        <Text
          style={[
            styles.label,
            disabled ? styles.labelDisabled : styles.labelEnabled,
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  disabled: {
    opacity: 0.4,
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    // Rotate the L-shape to form a classic checkmark
    transform: [{ rotate: '-45deg' }],
  },
  // Horizontal bar — bottom stroke of the checkmark
  barShort: {
    position: 'absolute',
    bottom: 6,
    left: 4,
    width: 7,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.white,
  },
  // Vertical bar — right stroke of the checkmark
  barTall: {
    position: 'absolute',
    bottom: 6,
    left: 9,
    width: 2,
    height: 11,
    borderRadius: 1,
    backgroundColor: colors.white,
  },
  label: {
    marginLeft: spacing[2],
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
  },
  labelEnabled: {
    color: colors.text2,
  },
  labelDisabled: {
    color: colors.text3,
  },
});

export default Checkbox;
