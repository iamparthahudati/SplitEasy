import React, { useRef } from 'react';
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

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  leftIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Chip: React.FC<ChipProps> = ({
  label,
  selected,
  onPress,
  leftIcon,
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.94,
        useNativeDriver: true,
        speed: 40,
        bounciness: 4,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.75,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 30,
        bounciness: 6,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      <Animated.View
        style={[
          styles.chip,
          selected ? styles.chipSelected : styles.chipUnselected,
          { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          style,
        ]}
      >
        {leftIcon != null && <View style={styles.iconWrapper}>{leftIcon}</View>}
        <Text
          style={[
            styles.label,
            selected ? styles.labelSelected : styles.labelUnselected,
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  chipUnselected: {
    backgroundColor: colors.white,
    borderColor: colors.borderMid,
  },
  iconWrapper: {
    marginRight: spacing[1],
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
  },
  labelSelected: {
    color: colors.white,
    fontWeight: fontWeights.semibold,
  },
  labelUnselected: {
    color: colors.text2,
  },
});

export default Chip;
