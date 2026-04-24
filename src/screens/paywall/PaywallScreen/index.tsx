import React, { JSX, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../../components/atoms/Icon';
import { Button } from '../../../components/ui/Button';
import { useNavigation } from '../../../navigation/NavigationContext';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/spacing';
import { FeatureRow } from './components/FeatureRow';
import { PricingCard } from './components/PricingCard';
import styles from './styles';

// ─── Constants ────────────────────────────────────────────────────────────────

type Plan = 'monthly' | 'annual';

const FEATURES: string[] = [
  'Unlimited groups',
  'PDF export',
  'Multi-currency support',
  'Receipt scanning',
  'Priority support',
  'No ads ever',
];

// ─── Component ────────────────────────────────────────────────────────────────

export function PaywallScreen(): JSX.Element {
  const { goBack } = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState<Plan>('annual');

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Close button */}
      <Pressable
        onPress={goBack}
        style={({ pressed }) => [
          styles.closeBtn,
          pressed && styles.closeBtnPressed,
        ]}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Close"
      >
        <Icon
          name="close"
          size={sizes.iconMd}
          stroke={colors.white}
          fill="none"
        />
      </Pressable>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.heroSection}>
          <View style={styles.logoWrap}>
            <Icon name="crown" size={32} stroke={colors.white} fill="none" />
          </View>
          <Text style={styles.heroTitle}>SplitEasy Premium</Text>
          <Text style={styles.heroSubtitle}>
            Everything you need to split smarter
          </Text>
        </View>

        {/* Feature rows */}
        <View style={styles.featuresSection}>
          {FEATURES.map(label => (
            <FeatureRow key={label} label={label} />
          ))}
        </View>

        {/* Pricing cards */}
        <View style={styles.pricingRow}>
          <PricingCard
            planName="Monthly"
            price="$4.99"
            period="per month"
            selected={selectedPlan === 'monthly'}
            onPress={() => setSelectedPlan('monthly')}
          />
          <PricingCard
            planName="Annual"
            price="$39.99"
            period="per year"
            savingsBadge="Save 33%"
            selected={selectedPlan === 'annual'}
            onPress={() => setSelectedPlan('annual')}
          />
        </View>

        {/* CTA */}
        <Button
          label="Start Free Trial"
          onPress={() => {}}
          variant="primary"
          style={styles.ctaButton}
        />

        {/* Restore purchases */}
        <Pressable
          style={styles.restoreBtn}
          onPress={() => {}}
          accessibilityRole="button"
          accessibilityLabel="Restore purchases"
        >
          <Text style={styles.restoreText}>Restore purchases</Text>
        </Pressable>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Terms · Privacy</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
