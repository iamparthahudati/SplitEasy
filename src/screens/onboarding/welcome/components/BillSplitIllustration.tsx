import React from 'react';
import { Text, View } from 'react-native';
import { AVATAR_OVERLAP, AVATAR_SIZE, illustStyles } from '../styles';

const AVATARS = [
  { label: 'A', color: '#7C75D8', amount: '$12' },
  { label: 'B', color: '#4B44B8', amount: '$12' },
  { label: 'C', color: '#3730A3', amount: '$11' },
];

// Visual strip width: first avatar full width + each subsequent visible slice
const STRIP_WIDTH =
  AVATAR_SIZE + (AVATARS.length - 1) * (AVATAR_SIZE - AVATAR_OVERLAP);

export function BillSplitIllustration() {
  return (
    <View style={illustStyles.wrapper}>
      {/* Overlapping avatar circles */}
      <View style={illustStyles.avatarRow}>
        {AVATARS.map((avatar, i) => (
          <View
            key={avatar.label}
            style={[
              illustStyles.avatar,
              {
                backgroundColor: avatar.color,
                borderWidth: 2,
                borderColor: 'rgba(255,255,255,0.15)',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: i > 0 ? -AVATAR_OVERLAP : 0,
                zIndex: i,
              },
            ]}
          >
            <Text style={illustStyles.avatarLabel}>{avatar.label}</Text>
          </View>
        ))}
      </View>

      {/* Divider line spanning the avatar strip */}
      <View style={[illustStyles.dividerLine, { width: STRIP_WIDTH }]} />

      {/* Amount labels aligned under each avatar's visible centre */}
      <View style={illustStyles.amountRow}>
        {AVATARS.map((avatar, i) => (
          <Text
            key={avatar.label}
            style={[
              illustStyles.amount,
              i > 0 && { marginLeft: -AVATAR_OVERLAP },
            ]}
          >
            {avatar.amount}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default BillSplitIllustration;
