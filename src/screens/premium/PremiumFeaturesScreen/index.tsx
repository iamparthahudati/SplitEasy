import React, { JSX } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon, { IconName } from '../../../components/atoms/Icon';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { SectionHeader } from '../../../components/molecules/SectionHeader';
import { Button } from '../../../components/ui/Button';
import { useNavigation } from '../../../navigation/NavigationContext';
import { colors } from '../../../theme/colors';
import { FeatureCard } from './components/FeatureCard';
import styles from './styles';

// ─── Constants ────────────────────────────────────────────────────────────────

interface FeatureItem {
  iconName: IconName;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    iconName: 'users',
    iconBg: colors.brandLight,
    iconColor: '#6366F1',
    title: 'Unlimited Groups',
    description:
      'Create as many groups as you need — travel, home, work, and more.',
  },
  {
    iconName: 'file-text',
    iconBg: colors.posBg,
    iconColor: '#10B981',
    title: 'PDF Export',
    description:
      "Export any group's expense history as a clean, shareable PDF.",
  },
  {
    iconName: 'globe',
    iconBg: colors.pendBg,
    iconColor: '#F59E0B',
    title: 'Multi-Currency',
    description: 'Track expenses in any currency with live conversion rates.',
  },
  {
    iconName: 'camera',
    iconBg: colors.negBg,
    iconColor: '#EF4444',
    title: 'Receipt Scanning',
    description:
      'Snap a photo of any receipt and auto-fill the expense details.',
  },
  {
    iconName: 'shield',
    iconBg: colors.posBgAlt,
    iconColor: '#10B981',
    title: 'Priority Support',
    description: 'Get help fast with dedicated priority support from our team.',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function PremiumFeaturesScreen(): JSX.Element {
  const { goBack, navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Premium Features" onBack={goBack} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroIconWrap}>
            <Icon name="crown" size={24} stroke={colors.white} fill="none" />
          </View>
          <View style={styles.heroDecorCircle} pointerEvents="none" />
          <Text style={styles.heroTitle}>Go Premium</Text>
          <Text style={styles.heroSubtitle}>
            Everything you need to split bills like a pro.
          </Text>
        </View>

        {/* Feature cards */}
        <SectionHeader title="WHAT YOU GET" />
        <View style={styles.cardsSection}>
          {FEATURES.map(item => (
            <FeatureCard
              key={item.title}
              iconName={item.iconName}
              iconBg={item.iconBg}
              iconColor={item.iconColor}
              title={item.title}
              description={item.description}
            />
          ))}
        </View>

        {/* CTA */}
        <Button
          label="Upgrade to Premium"
          onPress={() => navigate('Paywall')}
          variant="primary"
          style={styles.ctaButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
