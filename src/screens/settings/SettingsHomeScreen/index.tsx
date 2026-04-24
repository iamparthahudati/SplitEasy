import React from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../../components/atoms/Icon';
import { ListRow } from '../../../components/molecules/ListRow';
import { PremiumBanner } from '../../../components/molecules/PremiumBanner';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { useNavigation } from '../../../navigation/NavigationContext';
import { useIsPremium } from '../../../store/useAppStore';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/spacing';
import { ProfileCard } from './components/ProfileCard';
import { SettingsGroup } from './components/SettingsGroup';
import styles from './styles';

// ─── Mock user ────────────────────────────────────────────────────────────────

const MOCK_USER = {
  name: 'Alex Jordan',
  email: 'alex@example.com',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function RowIcon({
  name,
  bg,
}: {
  name: Parameters<typeof Icon>[0]['name'];
  bg: string;
}) {
  return (
    <View style={[styles.iconContainer, { backgroundColor: bg }]}>
      <Icon name={name} size={sizes.iconSm} stroke={colors.white} fill="none" />
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function SettingsHomeScreen() {
  const { navigate } = useNavigation();
  const isPremium = useIsPremium();

  const handleRateApp = () => {
    Alert.alert('Rate App', 'This would open the App Store rating prompt.');
  };

  const handleShareApp = () => {
    Alert.alert('Share App', 'This would open the native share sheet.');
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => navigate('SignIn'),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScreenHeader title="Settings" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile card */}
        <View style={styles.profileCardWrapper}>
          <ProfileCard
            name={MOCK_USER.name}
            email={MOCK_USER.email}
            isPremium={isPremium}
            onPress={() => navigate('Profile')}
          />
        </View>

        {/* Premium banner — only for free users */}
        {!isPremium && (
          <View style={styles.premiumBannerWrapper}>
            <PremiumBanner
              compact
              title="Unlock Premium"
              subtitle="Unlimited groups, PDF export, multi-currency and more."
              ctaLabel="Upgrade"
              onPress={() => navigate('Paywall')}
            />
          </View>
        )}

        {/* Settings groups */}
        <View style={styles.groupsWrapper}>
          {/* ACCOUNT */}
          <SettingsGroup title="ACCOUNT">
            <ListRow
              title="Profile"
              leftIcon={<RowIcon name="user" bg={colors.brand} />}
              leftIconBg="transparent"
              onPress={() => navigate('Profile')}
              showChevron
            />
            <ListRow
              title="Default Currency"
              leftIcon={<RowIcon name="dollar" bg={colors.pos} />}
              leftIconBg="transparent"
              onPress={() => navigate('DefaultCurrency')}
              showChevron
            />
            <ListRow
              title="Notifications"
              leftIcon={<RowIcon name="bell" bg={colors.pend} />}
              leftIconBg="transparent"
              onPress={() => navigate('Notifications')}
              showChevron
            />
          </SettingsGroup>

          {/* APP */}
          <SettingsGroup title="APP">
            <ListRow
              title="About"
              leftIcon={<RowIcon name="info" bg={colors.text3} />}
              leftIconBg="transparent"
              onPress={() => navigate('About')}
              showChevron
            />
            <ListRow
              title="Rate App"
              leftIcon={<RowIcon name="star" bg={colors.pend} />}
              leftIconBg="transparent"
              onPress={handleRateApp}
              showChevron
            />
            <ListRow
              title="Share App"
              leftIcon={<RowIcon name="share" bg={colors.brand} />}
              leftIconBg="transparent"
              onPress={handleShareApp}
              showChevron
            />
          </SettingsGroup>

          {/* DANGER */}
          <SettingsGroup title="DANGER">
            <ListRow
              title="Sign Out"
              leftIcon={<RowIcon name="log-out" bg={colors.neg} />}
              leftIconBg="transparent"
              rightLabel="Sign Out"
              onPress={handleSignOut}
              showChevron={false}
            />
          </SettingsGroup>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
