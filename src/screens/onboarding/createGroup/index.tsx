import React, { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useNavigation } from '../../../navigation/NavigationContext';
import { colors } from '../../../theme/colors';
import { radius, sizes, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';
import { GroupImagePicker } from './components/GroupImagePicker';

// ─── Group color swatches ─────────────────────────────────────────────────────

const GROUP_COLORS = [
  colors.brand,
  '#059669',
  '#D97706',
  '#DC2626',
  '#7C3AED',
  '#0891B2',
  '#BE185D',
  '#16A34A',
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export function CreateGroupScreen(): React.JSX.Element {
  const { navigate } = useNavigation();
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(GROUP_COLORS[0]);
  const [members, setMembers] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const lastInputRef = useRef<TextInput>(null);

  // ── Image picker ────────────────────────────────────────────────────────────

  const handlePickImage = () => {
    Alert.alert('Group Photo', 'Choose a photo for your group', [
      {
        text: 'Camera',
        onPress: () => {
          // TODO: wire react-native-image-picker — launchCamera
        },
      },
      {
        text: 'Photo Library',
        onPress: () => {
          // TODO: wire react-native-image-picker — launchImageLibrary
        },
      },
      ...(groupImage
        ? [
            {
              text: 'Remove Photo',
              style: 'destructive' as const,
              onPress: () => setGroupImage(null),
            },
          ]
        : []),
      { text: 'Cancel', style: 'cancel' as const },
    ]);
  };

  // ── Members ─────────────────────────────────────────────────────────────────

  const addMemberField = () => {
    setMembers(prev => [...prev, '']);
    setTimeout(() => lastInputRef.current?.focus(), 50);
  };

  const updateMember = (index: number, value: string) => {
    setMembers(prev => prev.map((m, i) => (i === index ? value : m)));
  };

  const removeMember = (index: number) => {
    if (members.length <= 1) {
      return;
    }
    setMembers(prev => prev.filter((_, i) => i !== index));
  };

  // ── Create ──────────────────────────────────────────────────────────────────

  const handleCreate = async () => {
    if (!groupName.trim()) {
      setError('Give your group a name.');
      return;
    }
    const filled = members.filter(m => m.trim().length > 0);
    if (filled.length === 0) {
      setError('Add at least one member.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // TODO: upload groupImage to Firebase Storage
      // TODO: write to Firestore — groups/{groupId}
      navigate('NotificationPrompt');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={s.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={s.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.heading}>Create your group</Text>
        <Text style={s.sub}>You can always add more people later.</Text>

        {/* Group image picker */}
        <GroupImagePicker
          imageUri={groupImage}
          color={selectedColor}
          groupName={groupName}
          onPickImage={handlePickImage}
        />

        {/* Group name */}
        <Text style={s.label}>Group name</Text>
        <TextInput
          style={s.input}
          placeholder="e.g. Spain Trip, Flat Bills"
          placeholderTextColor={colors.text4}
          autoFocus
          value={groupName}
          onChangeText={t => {
            setGroupName(t);
            setError('');
          }}
          maxLength={40}
        />

        {/* Color picker */}
        <Text style={s.label}>Group color</Text>
        <View style={s.colorRow}>
          {GROUP_COLORS.map(c => (
            <Pressable
              key={c}
              style={[
                s.colorDot,
                { backgroundColor: c },
                selectedColor === c && s.colorDotSelected,
              ]}
              onPress={() => setSelectedColor(c)}
            />
          ))}
        </View>

        {/* Members */}
        <Text style={s.label}>Members</Text>
        {members.map((name, index) => (
          <View key={index} style={s.memberRow}>
            <TextInput
              ref={index === members.length - 1 ? lastInputRef : undefined}
              style={[s.input, s.memberInput]}
              placeholder={`Member ${index + 1} name`}
              placeholderTextColor={colors.text4}
              value={name}
              onChangeText={v => updateMember(index, v)}
              returnKeyType="next"
              onSubmitEditing={addMemberField}
            />
            {members.length > 1 && (
              <Pressable
                style={s.removeBtn}
                onPress={() => removeMember(index)}
                hitSlop={8}
              >
                <Text style={s.removeText}>✕</Text>
              </Pressable>
            )}
          </View>
        ))}

        <Pressable style={s.addMemberBtn} onPress={addMemberField}>
          <Text style={s.addMemberText}>＋ Add another member</Text>
        </Pressable>

        {error ? <Text style={s.errorText}>{error}</Text> : null}

        <Pressable
          style={[s.createBtn, loading && s.btnDisabled]}
          onPress={handleCreate}
          disabled={loading}
        >
          <Text style={s.createBtnText}>
            {loading ? 'Creating…' : 'Create Group'}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    paddingHorizontal: spacing[5],
    paddingTop: 64,
    paddingBottom: spacing[10],
  },
  heading: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.text1,
    marginBottom: spacing[2],
  },
  sub: {
    fontSize: fontSizes.base,
    color: colors.text3,
    marginBottom: spacing[2],
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: colors.text2,
    marginBottom: spacing[2],
    marginTop: spacing[5],
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    height: sizes.btnHeight,
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.borderMid,
    paddingHorizontal: spacing[4],
    fontSize: fontSizes.base,
    color: colors.text1,
  },
  colorRow: {
    flexDirection: 'row',
    gap: spacing[3],
    flexWrap: 'wrap',
  },
  colorDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2.5,
    borderColor: 'transparent',
  },
  colorDotSelected: {
    borderColor: colors.text1,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
    gap: spacing[2],
  },
  memberInput: {
    flex: 1,
  },
  removeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    fontSize: fontSizes.base,
    color: colors.text4,
    fontWeight: fontWeights.semibold,
  },
  addMemberBtn: {
    paddingVertical: spacing[3],
    marginBottom: spacing[4],
  },
  addMemberText: {
    fontSize: fontSizes.base,
    color: colors.brand,
    fontWeight: fontWeights.medium,
  },
  errorText: {
    fontSize: fontSizes.sm,
    color: colors.neg,
    marginBottom: spacing[3],
  },
  createBtn: {
    height: sizes.btnHeight,
    backgroundColor: colors.brand,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing[4],
  },
  btnDisabled: {
    opacity: 0.6,
  },
  createBtnText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
  },
});
