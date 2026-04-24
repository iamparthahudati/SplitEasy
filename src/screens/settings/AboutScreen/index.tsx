import React from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../../components/atoms/Icon';
import { ListRow } from '../../../components/molecules/ListRow';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { useNavigation } from '../../../navigation/NavigationContext';
import { colors } from '../../../theme/colors';
import { SettingsGroup } from '../SettingsHomeScreen/components/SettingsGroup';
import styles from './styles';

const APP_VERSION = '1.0.0';
const BUILD_NUMBER = '100';

export function AboutScreen() {
  const { goBack } = useNavigation();

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="About" onBack={goBack} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo block */}
        <View style={styles.logoBlock}>
          <Text style={styles.wordmark}>SplitEasy</Text>
          <Text style={styles.versionText}>Version {APP_VERSION}</Text>
        </View>

        <View style={styles.groupsWrapper}>
          {/* App Info */}
          <SettingsGroup title="APP INFO">
            <ListRow
              title="Version"
              rightLabel={APP_VERSION}
              showChevron={false}
            />
            <ListRow
              title="Build"
              rightLabel={BUILD_NUMBER}
              showChevron={false}
            />
            <ListRow
              title="Platform"
              rightLabel={Platform.OS}
              showChevron={false}
            />
          </SettingsGroup>

          {/* Legal */}
          <SettingsGroup title="LEGAL">
            <ListRow
              title="Terms of Service"
              onPress={() => undefined}
              showChevron
            />
            <ListRow
              title="Privacy Policy"
              onPress={() => undefined}
              showChevron
            />
            <ListRow
              title="Open Source Licenses"
              onPress={() => undefined}
              showChevron
            />
          </SettingsGroup>

          {/* Follow Us */}
          <SettingsGroup title="FOLLOW US">
            <ListRow
              title="Twitter / X"
              onPress={() => undefined}
              showChevron
              rightElement={
                <Icon name="link" size={16} stroke={colors.text4} fill="none" />
              }
            />
            <ListRow
              title="Instagram"
              onPress={() => undefined}
              showChevron
              rightElement={
                <Icon name="link" size={16} stroke={colors.text4} fill="none" />
              }
            />
          </SettingsGroup>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
