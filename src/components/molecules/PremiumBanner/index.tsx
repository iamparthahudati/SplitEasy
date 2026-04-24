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

// ─── Decorative orbs (pure View, no SVG needed) ───────────────────────────────

function Orb({
  size,
  top,
  right,
  opacity,
}: {
  size: number;
  top: number;
  right: number;
  opacity: number;
}): JSX.Element {
  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.white,
        opacity,
        top,
        right,
      }}
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PremiumBanner({
  title = 'Unlock Premium',
  subtitle = 'Unlimited groups, PDF export, multi-currency and more.',
  ctaLabel = 'Upgrade now',
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
      accessibilityLabel={`${title}. ${ctaLabel}`}
    >
      {/* Decorative background orbs */}
      <Orb size={120} top={-40} right={-30} opacity={0.06} />
      <Orb size={72} top={10} right={60} opacity={0.05} />

      {/* Premium badge */}
      <View style={styles.badge}>
        <Icon name="zap" size={10} stroke={colors.brandDark} fill="none" />
        <Text style={styles.badgeLabel}>PREMIUM</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>{subtitle}</Text>

      {/* Feature pills */}
      {features && features.length > 0 && (
        <View style={styles.featuresRow}>
          {features.map((f, i) => (
            <View key={i} style={styles.featurePill}>
              <Icon
                name="check"
                size={10}
                stroke={colors.brandDark}
                fill="none"
              />
              <Text style={styles.featureLabel}>{f}</Text>
            </View>
          ))}
        </View>
      )}

      {/* CTA row */}
      <View style={styles.ctaRow}>
        <View style={styles.ctaBtn}>
          <Text style={styles.ctaBtnLabel}>{ctaLabel}</Text>
          <Icon
            name="arrow-forward"
            size={14}
            stroke={colors.brand}
            fill="none"
          />
        </View>
        <Text style={styles.dismissHint}>No commitment, cancel anytime</Text>
      </View>
    </Pressable>
  );
}
