import React, { JSX } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InfoCard } from '../../../components/molecules/InfoCard';
import { PremiumBanner } from '../../../components/molecules/PremiumBanner';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { SectionHeader } from '../../../components/molecules/SectionHeader';
import { useNavigation } from '../../../navigation/NavigationContext';
import { LimitRow } from './components/LimitRow';
import styles from './styles';

// ─── Constants ────────────────────────────────────────────────────────────────

interface LimitItem {
  label: string;
  used: number;
  total: number;
}

const LIMITS: LimitItem[] = [
  { label: 'Groups', used: 3, total: 3 },
  { label: 'Expenses per group', used: 10, total: 10 },
  { label: 'Members per group', used: 5, total: 10 },
  { label: 'Receipt photos', used: 2, total: 5 },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function FreeLimitsScreen(): JSX.Element {
  const { goBack, navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Usage Limits" onBack={goBack} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Plan section */}
        <SectionHeader title="YOUR PLAN" />
        <InfoCard
          icon="alert-circle"
          title="Free Plan"
          body="Upgrade to Premium for unlimited access to all features."
          variant="warning"
          style={styles.infoCardWrap}
        />

        {/* Usage section */}
        <SectionHeader title="CURRENT USAGE" />
        <View style={styles.usageCard}>
          {LIMITS.map((item, index) => (
            <React.Fragment key={item.label}>
              <LimitRow
                label={item.label}
                used={item.used}
                total={item.total}
              />
              {index < LIMITS.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Premium banner */}
        <PremiumBanner
          features={['Unlimited groups', 'Unlimited expenses', 'PDF export']}
          onPress={() => navigate('Paywall')}
          style={styles.premiumBanner}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
