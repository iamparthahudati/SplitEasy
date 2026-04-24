import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../../components/atoms/Icon';
import { InputField } from '../../../components/molecules/InputField';
import { ListRow } from '../../../components/molecules/ListRow';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { useNavigation } from '../../../navigation/NavigationContext';
import { colors } from '../../../theme/colors';
import styles from './styles';

const MOCK_NAME = 'Alex Jordan';
const MOCK_EMAIL = 'alex@example.com';
const MOCK_MEMBER_SINCE = 'January 2024';

export function ProfileScreen() {
  const { goBack } = useNavigation();
  const [displayName, setDisplayName] = useState(MOCK_NAME);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScreenHeader title="Profile" onBack={goBack} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <Avatar name={MOCK_NAME} size="lg" style={styles.avatar} />
              <View style={styles.cameraBadge}>
                <Icon
                  name="camera"
                  size={14}
                  stroke={colors.white}
                  fill="none"
                />
              </View>
            </View>
          </View>

          {/* Form fields */}
          <View style={styles.formSection}>
            <View style={styles.fieldSpacing}>
              <InputField
                label="Display Name"
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="Your name"
                leftIcon="user"
              />
            </View>
            <View style={styles.fieldSpacing}>
              <InputField
                label="Email"
                value={MOCK_EMAIL}
                onChangeText={() => undefined}
                placeholder="Email address"
                leftIcon="mail"
                editable={false}
                hint="Email cannot be changed"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Member Since */}
          <View style={styles.memberCard}>
            <ListRow
              title="Member Since"
              rightLabel={MOCK_MEMBER_SINCE}
              showChevron={false}
            />
          </View>

          {/* Save */}
          <Button
            label="Save Changes"
            onPress={handleSave}
            variant="primary"
            loading={saving}
            style={styles.saveButton}
          />

          {/* Danger zone */}
          <View style={styles.dangerSection}>
            <Button
              label="Delete Account"
              onPress={() => undefined}
              variant="danger"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
