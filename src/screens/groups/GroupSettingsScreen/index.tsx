import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../../components/atoms/Icon';
import { InputField } from '../../../components/molecules/InputField';
import { ListRow } from '../../../components/molecules/ListRow';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { Avatar } from '../../../components/ui/Avatar';
import { useNavigation } from '../../../navigation/NavigationContext';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/spacing';
import { SettingsGroup } from '../../settings/SettingsHomeScreen/components/SettingsGroup';
import styles from './styles';

// ─── Member data ──────────────────────────────────────────────────────────────

interface Member {
  id: string;
  name: string;
  isYou?: boolean;
}

const MEMBERS: Member[] = [
  { id: '1', name: 'You', isYou: true },
  { id: '2', name: 'Alex Chen' },
  { id: '3', name: 'Jordan Mills' },
  { id: '4', name: 'Sara Park' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function GroupSettingsScreen() {
  const { goBack, navigate } = useNavigation();
  const [groupName, setGroupName] = useState('Spain Trip 2024');

  const handleRemoveMember = (member: Member) => {
    Alert.alert('Remove Member', `Remove ${member.name} from this group?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => {} },
    ]);
  };

  const handleArchive = () => {
    Alert.alert(
      'Archive Group',
      'Archiving will hide this group from your active list. You can restore it later.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Archive', style: 'destructive', onPress: () => {} },
      ],
    );
  };

  const handleLeave = () => {
    Alert.alert(
      'Leave Group',
      'Are you sure you want to leave Spain Trip 2024?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Leave', style: 'destructive', onPress: () => {} },
      ],
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Group',
      'This will permanently delete Spain Trip 2024 and all its expenses. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {} },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title="Group Settings" onBack={goBack} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Group image + name ─────────────────────────────────────────────── */}
        <View style={styles.imageSection}>
          <View style={styles.imageCircleWrap}>
            <View style={styles.imageCircle}>
              <Icon name="users" size={32} stroke={colors.white} fill="none" />
            </View>
            <Pressable
              style={styles.cameraBadge}
              accessibilityLabel="Change group image"
            >
              <Icon name="camera" size={13} stroke={colors.white} fill="none" />
            </Pressable>
          </View>

          <InputField
            label="Group Name"
            value={groupName}
            onChangeText={setGroupName}
            style={styles.nameInput}
            autoCapitalize="words"
          />
        </View>

        {/* ── Members ───────────────────────────────────────────────────────── */}
        <View style={styles.settingsSection}>
          <SettingsGroup title="MEMBERS">
            {MEMBERS.map(member => (
              <ListRow
                key={member.id}
                title={member.isYou ? 'You (Admin)' : member.name}
                leftIcon={<Avatar name={member.name} size="sm" />}
                leftIconBg="transparent"
                rightElement={
                  member.isYou ? undefined : (
                    <Pressable
                      onPress={() => handleRemoveMember(member)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      accessibilityLabel={`Remove ${member.name}`}
                    >
                      <Icon
                        name="minus"
                        size={sizes.iconMd}
                        stroke={colors.neg}
                        fill="none"
                      />
                    </Pressable>
                  )
                }
                showChevron={false}
              />
            ))}
            <ListRow
              title="Add Member"
              leftIcon={
                <Icon
                  name="plus"
                  size={sizes.iconMd}
                  stroke={colors.brand}
                  fill="none"
                />
              }
              leftIconBg={colors.brandLight}
              onPress={() => navigate('AddMember')}
              showChevron={false}
            />
          </SettingsGroup>

          {/* ── Danger zone ─────────────────────────────────────────────────── */}
          <SettingsGroup title="DANGER ZONE">
            <ListRow
              title="Archive Group"
              leftIcon={
                <Icon
                  name="alert-triangle"
                  size={sizes.iconMd}
                  stroke={colors.pend}
                  fill="none"
                />
              }
              leftIconBg={colors.pendBg}
              onPress={handleArchive}
              showChevron={false}
            />
            <ListRow
              title="Leave Group"
              leftIcon={
                <Icon
                  name="log-out"
                  size={sizes.iconMd}
                  stroke={colors.neg}
                  fill="none"
                />
              }
              leftIconBg={colors.negBg}
              onPress={handleLeave}
              showChevron={false}
            />
            <ListRow
              title="Delete Group"
              leftIcon={
                <Icon
                  name="trash"
                  size={sizes.iconMd}
                  stroke={colors.neg}
                  fill="none"
                />
              }
              leftIconBg={colors.negBg}
              onPress={handleDelete}
              showChevron={false}
            />
          </SettingsGroup>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
