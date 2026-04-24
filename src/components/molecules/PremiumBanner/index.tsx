import React, { JSX } from 'react';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/spacing';
import Icon from '../../atoms/Icon';
import styles from './styles';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PremiumBannerProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  /** Bullet features shown as a row of pills below the subtitle */
  features?: string[];
  onPress: () => void;
  /** Compact single-line strip variant — no features row */
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function PremiumBanner({
  title = 'Upgrade to Premium',
  subtitle = 'Remove all limits and unlock every feature.',
  ctaLabel = 'Upgrade Now',
  features,
  onPress,
  compact = false,
  style,
}: PremiumBannerProps): JSX.Element {
  if (compact) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.compact,
          pressed && styles.compactPressed,
          style,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`${title}. ${ctaLabel}`}
      >
        {/* Left: crown + text */}
        <View style={styles.compactLeft}>
          <View style={styles.compactIconWrap}>
            <Icon
              name="crown"
              size={sizes.iconSm}
              stroke={colors.white}
              fill="none"
            />
          </View>
          <View style={styles.compactTextBlock}>
            <Text style={styles.compactTitle} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.compactSubtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
        </View>

        {/* Right: CTA pill */}
        <View style={styles.compactCta}>
          <Text style={styles.compactCtaLabel}>{ctaLabel}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Upgrade to Premium"
    >
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>{subtitle}</Text>

      {/* Feature pills */}
      {features && features.length > 0 && (
        <View style={styles.featuresRow}>
          {features.map((f, i) => (
            <View key={i} style={styles.featurePill}>
              <Text style={styles.featureLabel}>{f}</Text>
            </View>
          ))}
        </View>
      )}

      {/* CTA button */}
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.ctaBtn,
          pressed && styles.ctaBtnPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Upgrade Now"
      >
        <Text style={styles.ctaBtnLabel}>Upgrade Now</Text>
      </Pressable>
    </Pressable>
  );
}
