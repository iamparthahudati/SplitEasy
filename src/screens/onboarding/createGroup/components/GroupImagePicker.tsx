import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../../theme/colors';
import { spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';
import { CameraIcon } from './CameraIcon';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface GroupImagePickerProps {
  imageUri: string | null;
  color: string;
  groupName: string;
  onPickImage: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function GroupImagePicker({
  imageUri,
  color,
  groupName,
  onPickImage,
}: GroupImagePickerProps): React.JSX.Element {
  const initials = groupName.trim().slice(0, 2).toUpperCase() || 'GR';

  return (
    <View style={s.wrapper}>
      <Pressable onPress={onPickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={s.image} />
        ) : (
          <View style={[s.placeholder, { backgroundColor: color }]}>
            <Text style={s.initials}>{initials}</Text>
          </View>
        )}
        {/* Camera badge */}
        <View style={s.badge}>
          <CameraIcon />
        </View>
      </Pressable>
      <Text style={s.hint}>Tap to add a group photo</Text>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: spacing[4],
    marginBottom: spacing[6],
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.white,
    letterSpacing: 1,
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: colors.bg,
  },
  hint: {
    marginTop: spacing[3],
    fontSize: fontSizes.sm,
    color: colors.text3,
    fontWeight: fontWeights.medium,
  },
});
