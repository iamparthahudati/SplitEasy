import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../theme/colors';
import { radius, sizes, spacing } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

// ─── Types ────────────────────────────────────────────────────────────────────

type Plan = 'monthly' | 'annual';

// ─── Feature List ─────────────────────────────────────────────────────────────

const FEATURES = [
  { id: '1', text: 'Unlimited groups — no caps, ever' },
  { id: '2', text: 'Recurring bills that auto-add themselves' },
  { id: '3', text: 'AI receipt scanner — snap and split' },
  { id: '4', text: 'PDF reports for every group' },
  { id: '5', text: 'Multi-currency at live exchange rates' },
  { id: '6', text: 'Zero ads, forever' },
];

// ─── Gold Star Mark ───────────────────────────────────────────────────────────
// Two overlapping rotated squares simulate a star/diamond shape

function GoldStarMark() {
  return (
    <View style={starStyles.wrap}>
      <View style={[starStyles.square, starStyles.squareBack]} />
      <View style={[starStyles.square, starStyles.squareFront]} />
      <View style={starStyles.center} />
    </View>
  );
}

const starStyles = StyleSheet.create({
  wrap: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  square: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: colors.premiumGold,
  },
  squareBack: {
    transform: [{ rotate: '45deg' }],
    opacity: 0.5,
  },
  squareFront: {
    transform: [{ rotate: '22deg' }],
    opacity: 0.85,
  },
  center: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.white,
    opacity: 0.9,
  },
});

// ─── Gold Checkmark ───────────────────────────────────────────────────────────

function GoldCheck() {
  return (
    <View style={checkStyles.circle}>
      <View style={checkStyles.checkL} />
      <View style={checkStyles.checkR} />
    </View>
  );
}

const checkStyles = StyleSheet.create({
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.premiumGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkL: {
    position: 'absolute',
    width: 5,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.white,
    bottom: 8,
    left: 4,
    transform: [{ rotate: '45deg' }],
  },
  checkR: {
    position: 'absolute',
    width: 9,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.white,
    bottom: 9,
    right: 3,
    transform: [{ rotate: '-50deg' }],
  },
});

// ─── Close Button ─────────────────────────────────────────────────────────────

function CloseButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable style={closeStyles.btn} onPress={onPress} hitSlop={12}>
      <View style={closeStyles.barL} />
      <View style={closeStyles.barR} />
    </Pressable>
  );
}

const closeStyles = StyleSheet.create({
  btn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barL: {
    position: 'absolute',
    width: 16,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    transform: [{ rotate: '45deg' }],
  },
  barR: {
    position: 'absolute',
    width: 16,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    transform: [{ rotate: '-45deg' }],
  },
});

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}) {
  const isAnnual = plan === 'annual';

  return (
    <Pressable
      style={[
        styles.planCard,
        selected ? styles.planCardSelected : styles.planCardUnselected,
      ]}
      onPress={onSelect}
    >
      {/* Best value badge — annual only */}
      {isAnnual && (
        <View style={styles.bestValueBadge}>
          <Text style={styles.bestValueText}>BEST VALUE</Text>
        </View>
      )}

      {/* Selection indicator */}
      <View style={[styles.planRadio, selected && styles.planRadioSelected]}>
        {selected && <View style={styles.planRadioDot} />}
      </View>

      {/* Plan details */}
      <View style={styles.planInfo}>
        <Text style={[styles.planName, selected && styles.planNameSelected]}>
          {isAnnual ? 'Annual' : 'Monthly'}
        </Text>
        <Text style={[styles.planPrice, selected && styles.planPriceSelected]}>
          {isAnnual ? '$24.99' : '$3.49'}
        </Text>
        <Text style={styles.planPeriod}>
          {isAnnual ? 'per year · save 40%' : 'per month'}
        </Text>
      </View>
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function PaywallScreen() {
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState<Plan>('annual');

  const handleClose = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handlePurchase = () => {
    // TODO: wire to RevenueCat Purchases.purchasePackage()
  };

  const handleRestore = () => {
    // TODO: wire to RevenueCat Purchases.restorePurchases()
  };

  return (
    <View style={styles.root}>
      {/* Dark gradient background */}
      <View style={StyleSheet.absoluteFill} />
      <View style={styles.gradientOverlay} />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Close button */}
        <View style={styles.closeRow}>
          <CloseButton onPress={handleClose} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Hero section ─────────────────────────────────────────────── */}
          <View style={styles.heroSection}>
            <GoldStarMark />
            <Text style={styles.heroTitle}>SplitEasy Premium</Text>
            <Text style={styles.heroSubtitle}>
              Everything you need to split smarter
            </Text>
          </View>

          {/* ── Feature list ─────────────────────────────────────────────── */}
          <View style={styles.featureList}>
            {FEATURES.map(f => (
              <View key={f.id} style={styles.featureRow}>
                <GoldCheck />
                <Text style={styles.featureText}>{f.text}</Text>
              </View>
            ))}
          </View>

          {/* ── Plan cards ───────────────────────────────────────────────── */}
          <View style={styles.planRow}>
            <PlanCard
              plan="annual"
              selected={selectedPlan === 'annual'}
              onSelect={() => setSelectedPlan('annual')}
            />
            <PlanCard
              plan="monthly"
              selected={selectedPlan === 'monthly'}
              onSelect={() => setSelectedPlan('monthly')}
            />
          </View>

          {/* ── CTA button ───────────────────────────────────────────────── */}
          <Pressable style={styles.ctaBtn} onPress={handlePurchase}>
            <Text style={styles.ctaBtnText}>Start 7-Day Free Trial</Text>
          </Pressable>

          {/* ── Restore link ─────────────────────────────────────────────── */}
          <Pressable style={styles.restoreBtn} onPress={handleRestore}>
            <Text style={styles.restoreText}>Restore Purchases</Text>
          </Pressable>

          {/* ── Legal ────────────────────────────────────────────────────── */}
          <Text style={styles.legalText}>
            Cancel anytime. Billed{' '}
            {selectedPlan === 'annual' ? 'annually' : 'monthly'}.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Layout
  root: {
    flex: 1,
    backgroundColor: '#1E1B4B',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#312E81',
    opacity: 0.75,
  },
  safeArea: {
    flex: 1,
  },

  // Close row
  closeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
  },

  // Scroll
  scrollContent: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[8],
  },

  // Hero
  heroSection: {
    alignItems: 'center',
    paddingTop: spacing[4],
    paddingBottom: spacing[5],
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: fontWeights.bold as any,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  heroSubtitle: {
    fontSize: fontSizes.base,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
  },

  // Feature list
  featureList: {
    gap: spacing[3],
    marginBottom: spacing[6],
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  featureText: {
    fontSize: 15,
    color: colors.white,
    fontWeight: fontWeights.medium as any,
    flex: 1,
  },

  // Plan cards
  planRow: {
    flexDirection: 'row',
    gap: spacing[3],
    marginBottom: spacing[5],
  },
  planCard: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing[4],
    borderWidth: 2,
    position: 'relative',
    overflow: 'visible',
  },
  planCardSelected: {
    backgroundColor: colors.brandLight,
    borderColor: colors.brand,
  },
  planCardUnselected: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.15)',
  },
  bestValueBadge: {
    position: 'absolute',
    top: -10,
    right: spacing[3],
    backgroundColor: colors.premiumGold,
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  bestValueText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.extrabold as any,
    color: colors.premiumGoldDark,
    letterSpacing: 0.5,
  },
  planRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },
  planRadioSelected: {
    borderColor: colors.brand,
  },
  planRadioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand,
  },
  planInfo: {
    gap: 2,
  },
  planName: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
    color: 'rgba(255,255,255,0.6)',
  },
  planNameSelected: {
    color: colors.text3,
  },
  planPrice: {
    fontSize: 22,
    fontWeight: fontWeights.bold as any,
    color: colors.white,
  },
  planPriceSelected: {
    color: colors.text1,
  },
  planPeriod: {
    fontSize: fontSizes.xs,
    color: 'rgba(255,255,255,0.45)',
  },

  // CTA button
  ctaBtn: {
    height: sizes.btnHeight,
    backgroundColor: colors.brand,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  ctaBtnText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
    color: colors.white,
    letterSpacing: 0.2,
  },

  // Restore
  restoreBtn: {
    alignItems: 'center',
    paddingVertical: spacing[3],
    marginTop: spacing[2],
  },
  restoreText: {
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.45)',
  },

  // Legal
  legalText: {
    fontSize: fontSizes.xs,
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
    marginTop: spacing[1],
  },
});
