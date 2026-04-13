import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../../theme/colors';
import { fontSizes, fontWeights } from '../../theme/typography';
import { spacing, radius, sizes } from '../../theme/spacing';
import type { SettingsStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<SettingsStackParamList, 'SettingsHome'>;

// ─── Mock User ────────────────────────────────────────────────────────────────

const MOCK_USER = {
  name: 'Partha Hudati',
  email: 'partha@example.com',
  initials: 'PH',
  avatarColor: colors.brand,
  isPremium: false,
};

// ─── Components ───────────────────────────────────────────────────────────────

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
        <View style={[styles.rowIconWrap, destructive && styles.rowIconWrapRed]}>
          <Text style={styles.rowIcon}>{icon}</Text>
        </View>
        <Text style={[styles.rowLabel, destructive && styles.rowLabelRed]}>{label}</Text>
      </View>
      <View style={styles.settingsRowRight}>
        {value ? <Text style={styles.rowValue}>{value}</Text> : null}
        <Text style={[styles.chevron, destructive && styles.chevronRed]}>›</Text>
      </View>
    </Pressable>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function SettingsHomeScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Header ───────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* ── Profile card ─────────────────────────────────────────────── */}
        <Pressable style={styles.profileCard} onPress={() => navigation.navigate('Profile')}>
          <View style={[styles.profileAvatar, { backgroundColor: MOCK_USER.avatarColor }]}>
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

        {/* ── Premium upgrade card ─────────────────────────────────────── */}
        {!MOCK_USER.isPremium && (
          <Pressable style={styles.premiumCard}>
            <View>
              <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
              <Text style={styles.premiumSub}>Unlimited groups, recurring bills & more.</Text>
            </View>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>✦ PRO</Text>
            </View>
          </Pressable>
        )}

        {/* ── Account section ──────────────────────────────────────────── */}
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

        {/* ── Preferences section ───────────────────────────────────────── */}
        <SectionHeader title="Preferences" />
        <View style={styles.section}>
          <SettingsRow
            icon="🔔"
            label="Notifications"
            onPress={() => navigation.navigate('Notifications')}
          />
        </View>

        {/* ── App section ────────────────────────────────────────────────── */}
        <SectionHeader title="App" />
        <View style={styles.section}>
          <SettingsRow
            icon="ℹ️"
            label="About SplitEasy"
            onPress={() => navigation.navigate('About')}
          />
          <View style={styles.rowDivider} />
          <SettingsRow
            icon="⭐"
            label="Rate the App"
            onPress={() => {}}
          />
          <View style={styles.rowDivider} />
          <SettingsRow
            icon="💬"
            label="Send Feedback"
            onPress={() => {}}
          />
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
  root: { flex: 1, backgroundColor: colors.bg },

  // Header
  header: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
    paddingBottom: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
  },

  // Profile card
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: spacing[5],
    marginBottom: spacing[3],
    padding: spacing[4],
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing[3],
  },
  profileAvatar: {
    width: sizes.avatarLg,
    height: sizes.avatarLg,
    borderRadius: sizes.avatarLg / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold as any,
    color: colors.white,
  },
  profileInfo: { flex: 1, gap: 2 },
  profileName: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
    color: colors.text1,
  },
  profileEmail: {
    fontSize: fontSizes.sm,
    color: colors.text4,
  },
  editBadge: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.brand,
  },
  editBadgeText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
    color: colors.brand,
  },

  // Premium card
  premiumCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing[5],
    marginBottom: spacing[3],
    padding: spacing[4],
    backgroundColor: colors.brand,
    borderRadius: radius.lg,
    gap: spacing[3],
  },
  premiumTitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold as any,
    color: colors.white,
    marginBottom: 2,
  },
  premiumSub: {
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  premiumBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.sm,
  },
  premiumBadgeText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.extrabold as any,
    color: colors.white,
    letterSpacing: 1,
  },

  // Section header
  sectionHeader: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[4],
    paddingBottom: spacing[2],
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    color: colors.text4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Settings section
  section: {
    marginHorizontal: spacing[5],
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
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
    borderRadius: radius.xs,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIconWrapRed: { backgroundColor: colors.negBg },
  rowIcon: { fontSize: fontSizes.base },
  rowLabel: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium as any,
    color: colors.text1,
  },
  rowLabelRed: { color: colors.neg },
  settingsRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  rowValue: {
    fontSize: fontSizes.sm,
    color: colors.text4,
  },
  chevron: {
    fontSize: fontSizes.xl,
    color: colors.text4,
    lineHeight: 24,
  },
  chevronRed: { color: colors.neg },
  rowDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing[4] + 32 + spacing[3], // align with text
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: spacing[8],
    gap: spacing[2],
  },
  footerVersion: {
    fontSize: fontSizes.sm,
    color: colors.text4,
  },
  footerLinks: {
    fontSize: fontSizes.xs,
    color: colors.text4,
  },
});
