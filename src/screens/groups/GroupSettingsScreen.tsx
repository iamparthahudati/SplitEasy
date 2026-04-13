import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors } from '../../theme/colors';
import { fontSizes, fontWeights } from '../../theme/typography';
import { spacing, radius, sizes } from '../../theme/spacing';
import type { GroupsStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<GroupsStackParamList, 'GroupSettings'>;

// ─── Mock data ────────────────────────────────────────────────────────────────

interface MockGroup {
  name: string;
  emoji: string;
  color: string;
  currency: string;
  members: { name: string; isAdmin: boolean }[];
  createdAt: string;
}

const MOCK_GROUPS: Record<string, MockGroup> = {
  '1': {
    name: 'Spain Trip 2024', emoji: '✈️', color: colors.brand, currency: 'USD',
    members: [
      { name: 'You',    isAdmin: true },
      { name: 'Alex',   isAdmin: false },
      { name: 'Jordan', isAdmin: false },
      { name: 'Sam',    isAdmin: false },
      { name: 'Chris',  isAdmin: false },
    ],
    createdAt: 'Apr 6, 2024',
  },
  '2': {
    name: 'Flat Bills', emoji: '🏠', color: '#059669', currency: 'USD',
    members: [
      { name: 'You',  isAdmin: true },
      { name: 'Mike', isAdmin: false },
      { name: 'Emma', isAdmin: false },
    ],
    createdAt: 'Mar 1, 2024',
  },
  '3': {
    name: 'Weekend Ski', emoji: '🎿', color: '#0891B2', currency: 'USD',
    members: [
      { name: 'You',    isAdmin: true },
      { name: 'Riley',  isAdmin: false },
      { name: 'Taylor', isAdmin: false },
      { name: 'Morgan', isAdmin: false },
    ],
    createdAt: 'Feb 10, 2024',
  },
  '4': {
    name: 'Pizza Fridays', emoji: '🍕', color: '#DC2626', currency: 'USD',
    members: [
      { name: 'You',   isAdmin: true },
      { name: 'Ben',   isAdmin: false },
      { name: 'Chloe', isAdmin: false },
      { name: 'Dan',   isAdmin: false },
      { name: 'Eve',   isAdmin: false },
      { name: 'Finn',  isAdmin: false },
    ],
    createdAt: 'Mar 1, 2024',
  },
};

const EMOJI_OPTIONS = ['✈️','🏠','🎿','🍕','🌴','🎉','💼','⚽','🏋️','🎸','🍻','🛒','💡','🚗','🐾'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAvatarColor(name: string) {
  const palette = ['#6366F1', '#059669', '#0891B2', '#DC2626', '#D97706', '#7C3AED'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

function getInitials(name: string) {
  return name === 'You' ? 'Me' : name.slice(0, 2).toUpperCase();
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

function SettingsRow({
  icon, label, value, onPress, destructive,
}: {
  icon: string; label: string; value?: string; onPress: () => void; destructive?: boolean;
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
      <View style={styles.rowRight}>
        {value ? <Text style={styles.rowValue}>{value}</Text> : null}
        <Text style={[styles.chevron, destructive && styles.chevronRed]}>›</Text>
      </View>
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function GroupSettingsScreen({ route, navigation }: Props) {
  const { groupId } = route.params;
  const group = MOCK_GROUPS[groupId];

  const [groupName, setGroupName] = useState(group?.name ?? '');
  const [selectedEmoji, setSelectedEmoji] = useState(group?.emoji ?? '🎉');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [members, setMembers] = useState(group?.members ?? []);
  const [saved, setSaved] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: 'Group Settings' });
  }, [navigation]);

  if (!group) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Group not found</Text>
      </View>
    );
  }

  function handleSave() {
    // TODO: dispatch UPDATE_GROUP + persist to Firestore
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigation.goBack();
    }, 600);
  }

  function handleRemoveMember(name: string) {
    setMembers(prev => prev.filter(m => m.name !== name));
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Group identity ──────────────────────────────────────────── */}
        <View style={styles.identityCard}>
          <Pressable
            style={[styles.emojiBtn, { backgroundColor: group.color + '20' }]}
            onPress={() => setShowEmojiPicker(v => !v)}
          >
            <Text style={styles.emojiBtnText}>{selectedEmoji}</Text>
            <View style={styles.editEmojiChip}>
              <Text style={styles.editEmojiChipText}>✎</Text>
            </View>
          </Pressable>

          {/* Emoji picker */}
          {showEmojiPicker && (
            <View style={styles.emojiGrid}>
              {EMOJI_OPTIONS.map(e => (
                <Pressable
                  key={e}
                  style={[styles.emojiOption, selectedEmoji === e && styles.emojiOptionActive]}
                  onPress={() => { setSelectedEmoji(e); setShowEmojiPicker(false); }}
                >
                  <Text style={styles.emojiOptionText}>{e}</Text>
                </Pressable>
              ))}
            </View>
          )}

          <View style={styles.nameRow}>
            <TextInput
              style={styles.nameInput}
              value={groupName}
              onChangeText={setGroupName}
              placeholder="Group name"
              placeholderTextColor={colors.text4}
              maxLength={40}
              returnKeyType="done"
            />
          </View>
          <Text style={styles.createdAt}>Created {group.createdAt}</Text>
        </View>

        {/* ── Members ─────────────────────────────────────────────────── */}
        <SectionHeader title="Members" />
        <View style={styles.card}>
          {members.map((member, idx) => {
            const bg = getAvatarColor(member.name);
            const isLast = idx === members.length - 1;
            return (
              <React.Fragment key={member.name}>
                <View style={styles.memberRow}>
                  <View style={[styles.memberAvatar, { backgroundColor: bg + '20' }]}>
                    <Text style={[styles.memberInitials, { color: bg }]}>{getInitials(member.name)}</Text>
                  </View>
                  <Text style={styles.memberName}>{member.name}</Text>
                  {member.isAdmin && (
                    <View style={styles.adminBadge}>
                      <Text style={styles.adminBadgeText}>Admin</Text>
                    </View>
                  )}
                  {!member.isAdmin && (
                    <Pressable
                      hitSlop={12}
                      onPress={() => handleRemoveMember(member.name)}
                    >
                      <Text style={styles.removeBtn}>Remove</Text>
                    </Pressable>
                  )}
                </View>
                {!isLast && <View style={styles.divider} />}
              </React.Fragment>
            );
          })}
        </View>

        {/* Add member */}
        <Pressable
          style={styles.addMemberBtn}
          onPress={() => navigation.navigate('AddMember', { groupId })}
        >
          <View style={styles.addMemberIcon}>
            <Text style={styles.addMemberIconText}>＋</Text>
          </View>
          <Text style={styles.addMemberLabel}>Add Member</Text>
        </Pressable>

        {/* ── Preferences ─────────────────────────────────────────────── */}
        <SectionHeader title="Preferences" />
        <View style={styles.card}>
          <SettingsRow
            icon="💱"
            label="Currency"
            value={group.currency}
            onPress={() => {}}
          />
          <View style={styles.divider} />
          <SettingsRow
            icon="📄"
            label="Export to PDF"
            onPress={() => navigation.navigate('ExportPDF', { groupId })}
          />
        </View>

        {/* ── Danger zone ─────────────────────────────────────────────── */}
        <SectionHeader title="Danger Zone" />
        <View style={styles.card}>
          <SettingsRow
            icon="🚪"
            label="Leave Group"
            onPress={() => {}}
            destructive
          />
          <View style={styles.divider} />
          <SettingsRow
            icon="🗑️"
            label="Delete Group"
            onPress={() => {}}
            destructive
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Save button ──────────────────────────────────────────────── */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.saveBtn, saved && styles.saveBtnDone]}
          onPress={handleSave}
          disabled={saved || groupName.trim().length === 0}
        >
          <Text style={styles.saveBtnText}>{saved ? 'Saved ✓' : 'Save Changes'}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: spacing[4] },

  // Identity card
  identityCard: {
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing[7],
    paddingHorizontal: spacing[5],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing[2],
    gap: spacing[3],
  },
  emojiBtn: {
    width: 80,
    height: 80,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiBtnText: { fontSize: 40 },
  editEmojiChip: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.borderMid,
  },
  editEmojiChipText: {
    fontSize: fontSizes.sm,
    color: colors.text3,
  },

  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing[2],
    paddingTop: spacing[2],
  },
  emojiOption: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.borderMid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiOptionActive: {
    borderColor: colors.brand,
    backgroundColor: colors.brandLight,
  },
  emojiOptionText: { fontSize: fontSizes.xl },

  nameRow: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: colors.borderMid,
    borderRadius: radius.sm,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.bg,
  },
  nameInput: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
    color: colors.text1,
    textAlign: 'center',
    padding: 0,
  },
  createdAt: {
    fontSize: fontSizes.xs,
    color: colors.text4,
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

  // Card
  card: {
    marginHorizontal: spacing[5],
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing[2],
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing[4],
  },

  // Members
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3] + 1,
    gap: spacing[3],
  },
  memberAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberInitials: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold as any,
  },
  memberName: {
    flex: 1,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium as any,
    color: colors.text1,
  },
  adminBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    backgroundColor: colors.brandLight,
    borderRadius: radius.pill,
  },
  adminBadgeText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    color: colors.brand,
  },
  removeBtn: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium as any,
    color: colors.neg,
  },

  // Add member button
  addMemberBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing[5],
    marginTop: spacing[2],
    marginBottom: spacing[1],
    gap: spacing[3],
    paddingVertical: spacing[2],
  },
  addMemberIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: colors.brand,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMemberIconText: {
    fontSize: fontSizes.xl,
    color: colors.brand,
    lineHeight: 24,
  },
  addMemberLabel: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium as any,
    color: colors.brand,
  },

  // Settings rows
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
  rowRight: {
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

  // Footer
  footer: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[4],
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  saveBtn: {
    height: sizes.btnHeight,
    backgroundColor: colors.brand,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnDone: { backgroundColor: colors.pos },
  saveBtnText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
    color: colors.white,
  },

  // Not found
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  notFoundText: { fontSize: fontSizes.base, color: colors.text4 },
});