import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { spacing } from '../../../theme/spacing';
import { Avatar } from '../../ui/Avatar';
import styles, {
  AVATAR_DIM,
  AvatarSize,
  DEFAULT_OVERLAP,
  OVERFLOW_FONT_SIZE,
} from './styles';

// ─── Types ────────────────────────────────────────────────────────────────────

export type { AvatarSize };

export interface AvatarGroupProps {
  names: string[];
  max?: number;
  size?: AvatarSize;
  overlap?: number;
  style?: StyleProp<ViewStyle>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AvatarGroup({
  names,
  max = 4,
  size = 'sm',
  overlap,
  style,
}: AvatarGroupProps) {
  const dim = AVATAR_DIM[size];
  const effectiveOverlap =
    overlap !== undefined ? overlap : DEFAULT_OVERLAP[size];
  const overflowCount = names.length > max ? names.length - max : 0;
  const visibleNames = names.slice(0, max);

  return (
    <View style={[styles.row, style]}>
      {visibleNames.map((name, index) => (
        <View
          key={`${name}-${index}`}
          style={[
            styles.avatarWrapper,
            {
              marginLeft: index === 0 ? 0 : -effectiveOverlap,
              width: dim + spacing[1],
              height: dim + spacing[1],
              borderRadius: (dim + spacing[1]) / 2,
            },
          ]}
        >
          <Avatar name={name} size={size} />
        </View>
      ))}

      {overflowCount > 0 && (
        <View
          style={[
            styles.overflowBubble,
            {
              width: dim,
              height: dim,
              borderRadius: dim / 2,
              marginLeft: -effectiveOverlap,
            },
          ]}
        >
          <Text
            style={[
              styles.overflowText,
              { fontSize: OVERFLOW_FONT_SIZE[size] },
            ]}
            numberOfLines={1}
          >
            {`+${overflowCount}`}
          </Text>
        </View>
      )}
    </View>
  );
}
