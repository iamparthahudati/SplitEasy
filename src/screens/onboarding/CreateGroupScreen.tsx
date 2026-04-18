import React, { useRef, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useNavigation } from '../../navigation/NavigationContext';
import { colors } from '../../theme/colors';
import { radius, sizes, spacing } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

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

// ─── Camera badge icon ────────────────────────────────────────────────────────
function CameraIcon() {
  return (
    <View style={camStyles.wrap}>
      <View style={camStyles.body} />
      <View style={camStyles.lens} />
      <View style={camStyles.bump} />
    </View>
  );
}

const camStyles = StyleSheet.create({
  wrap: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    position: 'absolute',
    width: 20,
    height: 14,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    bottom: 1,
  },
  lens: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    bottom: 5,
    zIndex: 1,
  },
  bump: {
    position: 'absolute',
    width: 6,
    height: 4,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: '#FFFFFF',
    top: 3,
    left: 5,
  },
});

// ─── Group image picker ───────────────────────────────────────────────────────
interface GroupImagePickerProps {
  imageUri: string | null;
  color: string;
  groupName: string;
  onPickImage: () => void;
}

function GroupImagePicker({
  imageUri,
  color,
  groupName,
  onPickImage,
}: GroupImagePickerProps) {
  const initials = groupName.trim().slice(0, 2).toUpperCase() || 'GR';

  return (
    <View style={pickerStyles.wrapper}>
      <Pressable onPress={onPickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={pickerStyles.image} />
        ) : (
          <View style={[pickerStyles.placeholder, { backgroundColor: color }]}>
            <Text style={pickerStyles.initials}>{initials}</Text>
          </View>
        )}
        {/* Camera badge */}
        <View style={pickerStyles.badge}>
          <CameraIcon />
        </View>
      </Pressable>
      <Text style={pickerStyles.hint}>Tap to add a group photo</Text>
    </View>
  );
}

const pickerStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: spacing[4],
    marginBottom: spacing[6],
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold as any,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: colors.bg,
  },
  hint: {
    marginTop: spacing[3],
    fontSize: fontSizes.sm,
    color: colors.text3,
    fontWeight: fontWeights.medium as any,
  },
});

// ─── Screen ───────────────────────────────────────────────────────────────────
export function CreateGroupScreen() {
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
      style={screenStyles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={screenStyles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={screenStyles.heading}>Create your group</Text>
        <Text style={screenStyles.sub}>
          You can always add more people later.
        </Text>

        {/* Group image picker */}
        <GroupImagePicker
          imageUri={groupImage}
          color={selectedColor}
          groupName={groupName}
          onPickImage={handlePickImage}
        />

        {/* Group name */}
        <Text style={screenStyles.label}>Group name</Text>
        <TextInput
          style={screenStyles.input}
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
        <Text style={screenStyles.label}>Group color</Text>
        <View style={screenStyles.colorRow}>
          {GROUP_COLORS.map(c => (
            <Pressable
              key={c}
              style={[
                screenStyles.colorDot,
                { backgroundColor: c },
                selectedColor === c && screenStyles.colorDotSelected,
              ]}
              onPress={() => setSelectedColor(c)}
            />
          ))}
        </View>

        {/* Members */}
        <Text style={screenStyles.label}>Members</Text>
        {members.map((name, index) => (
          <View key={index} style={screenStyles.memberRow}>
            <TextInput
              ref={index === members.length - 1 ? lastInputRef : undefined}
              style={[screenStyles.input, screenStyles.memberInput]}
              placeholder={`Member ${index + 1} name`}
              placeholderTextColor={colors.text4}
              value={name}
              onChangeText={v => updateMember(index, v)}
              returnKeyType="next"
              onSubmitEditing={addMemberField}
            />
            {members.length > 1 && (
              <Pressable
                style={screenStyles.removeBtn}
                onPress={() => removeMember(index)}
                hitSlop={8}
              >
                <Text style={screenStyles.removeText}>✕</Text>
              </Pressable>
            )}
          </View>
        ))}

        <Pressable style={screenStyles.addMemberBtn} onPress={addMemberField}>
          <Text style={screenStyles.addMemberText}>＋ Add another member</Text>
        </Pressable>

        {error ? <Text style={screenStyles.errorText}>{error}</Text> : null}

        <Pressable
          style={[screenStyles.createBtn, loading && screenStyles.btnDisabled]}
          onPress={handleCreate}
          disabled={loading}
        >
          <Text style={screenStyles.createBtnText}>
            {loading ? 'Creating…' : 'Create Group'}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Screen styles ────────────────────────────────────────────────────────────
const screenStyles = StyleSheet.create({
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
    fontWeight: fontWeights.bold as any,
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
    fontWeight: fontWeights.semibold as any,
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
    fontWeight: fontWeights.semibold as any,
  },
  addMemberBtn: {
    paddingVertical: spacing[3],
    marginBottom: spacing[4],
  },
  addMemberText: {
    fontSize: fontSizes.base,
    color: colors.brand,
    fontWeight: fontWeights.medium as any,
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
    fontWeight: fontWeights.semibold as any,
  },
});
