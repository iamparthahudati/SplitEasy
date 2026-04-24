import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../../../../components/ui/Avatar';
import { Badge } from '../../../../components/ui/Badge';
import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProfileCardProps {
  name: string;
  email: string;
  isPremium: boolean;
  onPress: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProfileCard({
  name,
  email,
  isPremium,
  onPress,
}: ProfileCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`Profile: ${name}`}
    >
      <Avatar name={name} size="lg" />

      <View style={styles.textBlock}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          {email}
        </Text>
      </View>

      <Badge
        label={isPremium ? 'Premium' : 'Free'}
        variant={isPremium ? 'premium' : 'free'}
      />
    </Pressable>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing[4],
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.85,
  },
  textBlock: {
    flex: 1,
    marginHorizontal: spacing[3],
  },
  name: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold,
    color: colors.text1,
    marginBottom: 2,
  },
  email: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: colors.text3,
  },
});
