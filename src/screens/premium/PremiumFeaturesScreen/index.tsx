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
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    iconName: 'users',
    iconBg: colors.brandLight,
    title: 'Unlimited Groups',
    description: 'Create as many groups as you need — no caps.',
  },
  {
    iconName: 'file-text',
    iconBg: colors.posBg,
    title: 'PDF Export',
    description: 'Export any group as a clean PDF to share or archive.',
  },
  {
    iconName: 'globe',
    iconBg: colors.pendBg,
    title: 'Multi-Currency',
    description: 'Track expenses in any currency with live conversion.',
  },
  {
    iconName: 'camera',
    iconBg: colors.negBg,
    title: 'Receipt Scanning',
    description: 'Snap a photo and auto-fill expense details.',
  },
  {
    iconName: 'shield',
    iconBg: colors.posBgAlt,
    title: 'Priority Support',
    description: 'Get help fast with dedicated premium support.',
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
          <Text style={styles.heroTitle}>Go Premium</Text>
          <Text style={styles.heroSubtitle}>
            Unlock the full SplitEasy experience with unlimited access to every
            feature.
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
