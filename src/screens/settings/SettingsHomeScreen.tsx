import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomHeader } from '../../components/ui/CustomHeader';
import type { SettingsStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

type Nav = NativeStackNavigationProp<SettingsStackParamList, 'SettingsHome'>;

// ─── Mock User ────────────────────────────────────────────────────────────────

const MOCK_USER = {
  name: 'Partha Hudati',
  email: 'partha@example.com',
  initials: 'PH',
  avatarColor: colors.brand,
  isPremium: false,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

function SettingsRow({
  icon,
  label,
  value,
  onPress,
  destructive,
}: {
  icon: string;
  label: string;
  value?: string;
  onPress: () => void;
  destructive?: boolean;
}) {
  return (
    <Pressable
      style={styles.settingsRow}
      onPress={onPress}
      android_ripple={{ color: colors.brandLight }}
    >
      <View style={styles.settingsRowLeft}>
        <View
          style={[styles.rowIconWrap, destructive && styles.rowIconWrapRed]}
        >
          <Text style={styles.rowIcon}>{icon}</Text>
        </View>
        <Text style={[styles.rowLabel, destructive && styles.rowLabelRed]}>
          {label}
        </Text>
      </View>
      <View style={styles.settingsRowRight}>
        {value ? <Text style={styles.rowValue}>{value}</Text> : null}
        <Text style={styles.chevron}>›</Text>
      </View>
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function SettingsHomeScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <CustomHeader title="Settings" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Profile Card ─────────────────────────────────────────────── */}
        <Pressable
          style={styles.profileCard}
          onPress={() => navigation.navigate('Profile')}
          android_ripple={{ color: colors.brandLight }}
        >
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitials}>{MOCK_USER.initials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{MOCK_USER.name}</Text>
            <Text style={styles.profileEmail}>{MOCK_USER.email}</Text>
          </View>
          <View style={styles.editBadge}>
            <Text style={styles.editBadgeText}>Edit</Text>
          </View>
        </Pressable>

        {/* ── Premium Upgrade Card ─────────────────────────────────────── */}
        {!MOCK_USER.isPremium && (
          <View style={styles.premiumCard}>
            <View style={styles.premiumTopRow}>
              <View style={styles.premiumTextBlock}>
                <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
                <Text style={styles.premiumSub}>
                  Unlimited groups, AI scanner, zero ads.
                </Text>
              </View>
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>✦ PRO</Text>
              </View>
            </View>
            <Pressable
              style={styles.premiumButton}
              android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
            >
              <Text style={styles.premiumButtonText}>
                Start 7-day free trial
              </Text>
            </Pressable>
          </View>
        )}

        {/* ── Account ──────────────────────────────────────────────────── */}
        <SectionHeader title="Account" />
        <View style={styles.section}>
          <SettingsRow
            icon="👤"
            label="Profile"
            onPress={() => navigation.navigate('Profile')}
          />
          <View style={styles.rowDivider} />
          <SettingsRow
            icon="💱"
            label="Default Currency"
            value="USD"
            onPress={() => navigation.navigate('DefaultCurrency')}
          />
        </View>

        {/* ── Preferences ──────────────────────────────────────────────── */}
        <SectionHeader title="Preferences" />
        <View style={styles.section}>
          <SettingsRow
            icon="🔔"
            label="Notifications"
            onPress={() => navigation.navigate('Notifications')}
          />
        </View>

        {/* ── App ──────────────────────────────────────────────────────── */}
        <SectionHeader title="App" />
        <View style={styles.section}>
          <SettingsRow
            icon="ℹ️"
            label="About SplitEasy"
            onPress={() => navigation.navigate('About')}
          />
          <View style={styles.rowDivider} />
          <SettingsRow icon="⭐" label="Rate the App" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingsRow icon="💬" label="Send Feedback" onPress={() => {}} />
        </View>

        {/* ── Sign Out ─────────────────────────────────────────────────── */}
        <SectionHeader title="" />
        <View style={styles.section}>
          <SettingsRow
            icon="🚪"
            label="Sign Out"
            onPress={() => {}}
            destructive
          />
        </View>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <View style={styles.footer}>
          <Text style={styles.footerVersion}>SplitEasy v1.0.0</Text>
          <Text style={styles.footerLinks}>Privacy Policy · Terms of Use</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── Profile Card
  profileCard: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    backgroundColor: colors.white,
    shadowColor: colors.shadowNeutral,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    fontSize: 22,
    fontWeight: fontWeights.bold as any,
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold as any,
    color: colors.text1,
  },
  profileEmail: {
    fontSize: 13,
    color: colors.text4,
    marginTop: 2,
  },
  editBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.brand,
  },
  editBadgeText: {
    fontSize: 13,
    fontWeight: fontWeights.semibold as any,
    color: colors.brand,
  },

  // ── Premium Card
  premiumCard: {
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#1E1B4B',
  },
  premiumTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  premiumTextBlock: {
    flex: 1,
    marginRight: 12,
  },
  premiumTitle: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold as any,
    color: colors.white,
  },
  premiumSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4,
  },
  proBadge: {
    backgroundColor: colors.premiumGold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  proBadgeText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.extrabold as any,
    color: colors.premiumGoldDark,
  },
  premiumButton: {
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.20)',
    borderRadius: 12,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumButtonText: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold as any,
    color: colors.white,
    textAlign: 'center',
  },

  // ── Section Header
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
    fontSize: 11,
    fontWeight: fontWeights.semibold as any,
    color: colors.text4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // ── Settings Section
  section: {
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  // ── Settings Row
  settingsRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    flex: 1,
  },
  rowIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surfaceDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIconWrapRed: {
    backgroundColor: colors.negBg,
  },
  rowIcon: {
    fontSize: fontSizes.base,
  },
  rowLabel: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium as any,
    color: colors.text1,
  },
  rowLabelRed: {
    color: colors.neg,
  },
  settingsRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  rowValue: {
    fontSize: 13,
    color: colors.text4,
  },
  chevron: {
    fontSize: 20,
    color: colors.text4,
    lineHeight: 24,
  },
  rowDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 60,
  },

  // ── Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 6,
  },
  footerVersion: {
    fontSize: 13,
    color: colors.text4,
  },
  footerLinks: {
    fontSize: 11,
    color: colors.text4,
  },
});
