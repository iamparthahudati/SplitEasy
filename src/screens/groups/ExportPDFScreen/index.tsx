import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toggle from '../../../components/atoms/Toggle';
import { ListRow } from '../../../components/molecules/ListRow';
import { PremiumBanner } from '../../../components/molecules/PremiumBanner';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { SelectRow } from '../../../components/molecules/SelectRow';
import { Button } from '../../../components/ui/Button';
import { useNavigation } from '../../../navigation/NavigationContext';
import { useIsPremium } from '../../../store/useAppStore';
import { SettingsGroup } from '../../settings/SettingsHomeScreen/components/SettingsGroup';
import styles from './styles';

// ─── Component ────────────────────────────────────────────────────────────────

export function ExportPDFScreen() {
  const { goBack, navigate } = useNavigation();
  const isPremium = useIsPremium();

  const [includeSettled, setIncludeSettled] = useState(true);
  const [includeNotes, setIncludeNotes] = useState(true);

  const handleExport = () => {
    if (!isPremium) {
      navigate('Paywall');
      return;
    }
    Alert.alert('Export PDF', 'Your PDF is being generated…');
  };

  const handleShare = () => {
    if (!isPremium) {
      navigate('Paywall');
      return;
    }
    Alert.alert('Share', 'Preparing PDF to share…');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Export PDF" onBack={goBack} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Preview card ─────────────────────────────────────────────────── */}
        <View style={styles.previewCard}>
          <View style={styles.previewAccent} />
          <View style={styles.previewBody}>
            <Text style={styles.previewTitle}>Spain Trip 2024</Text>
            <Text style={styles.previewSubtitle}>
              4 expenses · $620.00 total
            </Text>
            <Text style={styles.previewDate}>Apr 1 – Apr 15, 2024</Text>
          </View>
        </View>

        {/* ── Options ──────────────────────────────────────────────────────── */}
        <View style={styles.settingsSection}>
          <SettingsGroup title="OPTIONS">
            <SelectRow label="Date Range" value="All time" onPress={() => {}} />
            <ListRow
              title="Include Settled"
              showChevron={false}
              rightElement={
                <Toggle
                  value={includeSettled}
                  onValueChange={setIncludeSettled}
                />
              }
            />
            <ListRow
              title="Include Notes"
              showChevron={false}
              rightElement={
                <Toggle value={includeNotes} onValueChange={setIncludeNotes} />
              }
            />
          </SettingsGroup>
        </View>

        {/* ── Premium banner ───────────────────────────────────────────────── */}
        {!isPremium && (
          <PremiumBanner
            compact
            title="PDF Export is Premium"
            subtitle="Upgrade to export and share group reports."
            onPress={() => navigate('Paywall')}
            style={styles.premiumBanner}
          />
        )}

        {/* ── Action buttons ───────────────────────────────────────────────── */}
        <View style={styles.actionsRow}>
          <Button
            label="Export PDF"
            onPress={handleExport}
            style={styles.actionBtn}
          />
          <Button
            label="Share"
            onPress={handleShare}
            variant="outline"
            style={styles.actionBtn}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
