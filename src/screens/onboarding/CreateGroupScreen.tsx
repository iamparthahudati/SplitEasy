import React, { useRef, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../../theme/colors';
import { fontSizes, fontWeights } from '../../theme/typography';
import { spacing, radius, sizes } from '../../theme/spacing';
import type { OnboardingStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, 'CreateGroup'>;

const EMOJI_OPTIONS = [
  '🏠','✈️','🍕','🎉','🏖','🎿','🚗','⛺','🎭','🎵',
  '🏋️','🛒','💡','📚','🎮','🌍','🍻','🎂','💼','🐾',
  '🌺','🏔','🚀','💃','🎯','🌮','☕','🎪','🏄','🎁',
];

const GROUP_COLORS = [
  colors.brand, '#059669', '#D97706', '#DC2626',
  '#7C3AED', '#0891B2', '#BE185D', '#16A34A',
];

export function CreateGroupScreen() {
  const navigation = useNavigation<Nav>();
  const [groupName, setGroupName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJI_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState(GROUP_COLORS[0]);
  const [members, setMembers] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const lastInputRef = useRef<TextInput>(null);

  const addMemberField = () => {
    setMembers(prev => [...prev, '']);
    setTimeout(() => lastInputRef.current?.focus(), 50);
  };

  const updateMember = (index: number, value: string) => {
    setMembers(prev => prev.map((m, i) => (i === index ? value : m)));
  };

  const removeMember = (index: number) => {
    if (members.length <= 1) { return; }
    setMembers(prev => prev.filter((_, i) => i !== index));
  };

  const filledMembers = members.filter(m => m.trim().length > 0);

  const handleCreate = async () => {
    if (!groupName.trim()) { setError('Give your group a name.'); return; }
    if (filledMembers.length === 0) { setError('Add at least one member.'); return; }
    setLoading(true);
    setError('');
    try {
      // TODO: write to Firestore — groups/{groupId}
      navigation.navigate('NotificationPrompt');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Create your group</Text>
        <Text style={styles.sub}>You can always add more people later.</Text>

        <Text style={styles.label}>Group name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Spain Trip, Flat Bills"
          placeholderTextColor={colors.text4}
          autoFocus
          value={groupName}
          onChangeText={t => { setGroupName(t); setError(''); }}
          maxLength={40}
        />

        <Text style={styles.label}>Pick an emoji</Text>
        <View style={styles.emojiGrid}>
          {EMOJI_OPTIONS.map(emoji => (
            <Pressable
              key={emoji}
              style={[styles.emojiCell, selectedEmoji === emoji && styles.emojiCellSelected]}
              onPress={() => setSelectedEmoji(emoji)}
            >
              <Text style={styles.emojiText}>{emoji}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Group color</Text>
        <View style={styles.colorRow}>
          {GROUP_COLORS.map(c => (
            <Pressable
              key={c}
              style={[styles.colorDot, { backgroundColor: c }, selectedColor === c && styles.colorDotSelected]}
              onPress={() => setSelectedColor(c)}
            />
          ))}
        </View>

        <Text style={styles.label}>Members</Text>
        {members.map((name, index) => (
          <View key={index} style={styles.memberRow}>
            <TextInput
              ref={index === members.length - 1 ? lastInputRef : undefined}
              style={[styles.input, styles.memberInput]}
              placeholder={`Member ${index + 1} name`}
              placeholderTextColor={colors.text4}
              value={name}
              onChangeText={v => updateMember(index, v)}
              returnKeyType="next"
              onSubmitEditing={addMemberField}
            />
            {members.length > 1 && (
              <Pressable style={styles.removeBtn} onPress={() => removeMember(index)} hitSlop={8}>
                <Text style={styles.removeText}>✕</Text>
              </Pressable>
            )}
          </View>
        ))}

        <Pressable style={styles.addMemberBtn} onPress={addMemberField}>
          <Text style={styles.addMemberText}>＋ Add another member</Text>
        </Pressable>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          style={[styles.createBtn, loading && styles.btnDisabled]}
          onPress={handleCreate}
          disabled={loading}
        >
          <Text style={styles.createBtnText}>{loading ? 'Creating…' : 'Create Group'}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  container: { paddingHorizontal: spacing[5], paddingTop: 64, paddingBottom: spacing[10] },
  heading: { fontSize: fontSizes['2xl'], fontWeight: fontWeights.bold as any, color: colors.text1, marginBottom: spacing[2] },
  sub: { fontSize: fontSizes.base, color: colors.text3, marginBottom: spacing[6] },
  label: {
    fontSize: fontSizes.sm, fontWeight: fontWeights.semibold as any, color: colors.text2,
    marginBottom: spacing[2], marginTop: spacing[5], textTransform: 'uppercase', letterSpacing: 0.8,
  },
  input: {
    height: sizes.btnHeight, backgroundColor: colors.white, borderRadius: radius.sm,
    borderWidth: 1, borderColor: colors.borderMid, paddingHorizontal: spacing[4],
    fontSize: fontSizes.base, color: colors.text1,
  },
  emojiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] },
  emojiCell: {
    width: 48, height: 48, borderRadius: radius.xs,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border,
  },
  emojiCellSelected: { borderColor: colors.brand, backgroundColor: colors.brandLight },
  emojiText: { fontSize: fontSizes.xl },
  colorRow: { flexDirection: 'row', gap: spacing[3], flexWrap: 'wrap' },
  colorDot: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: 'transparent' },
  colorDotSelected: { borderColor: colors.text1 },
  memberRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing[3], gap: spacing[2] },
  memberInput: { flex: 1 },
  removeBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  removeText: { fontSize: fontSizes.base, color: colors.text4, fontWeight: fontWeights.semibold as any },
  addMemberBtn: { paddingVertical: spacing[3], marginBottom: spacing[4] },
  addMemberText: { fontSize: fontSizes.base, color: colors.brand, fontWeight: fontWeights.medium as any },
  errorText: { fontSize: fontSizes.sm, color: colors.neg, marginBottom: spacing[3] },
  createBtn: {
    height: sizes.btnHeight, backgroundColor: colors.brand, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center', marginTop: spacing[4],
  },
  btnDisabled: { opacity: 0.6 },
  createBtnText: { color: colors.white, fontSize: fontSizes.md, fontWeight: fontWeights.semibold as any },
});
