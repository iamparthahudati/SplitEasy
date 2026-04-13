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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../../theme/colors';
import { fontSizes, fontWeights } from '../../theme/typography';
import { spacing, radius, sizes } from '../../theme/spacing';
import { CustomHeader } from '../../components/ui/CustomHeader';
import type { SettingsStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<SettingsStackParamList, 'Profile'>;

// ─── Avatar colour palette ─────────────────────────────────────────────────────

const AVATAR_COLORS = [
  '#6366F1', // brand indigo
  '#EC4899', // pink
  '#F59E0B', // amber
  '#10B981', // emerald
  '#3B82F6', // blue
  '#8B5CF6', // violet
  '#EF4444', // red
  '#14B8A6', // teal
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function ProfileScreen() {
  const navigation = useNavigation<Nav>();

  // Local state — in a real app these would be seeded from the store/Firebase
  const [name, setName] = useState('Partha Hudati');
  const [phone, setPhone] = useState('');
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0]);
  const [saved, setSaved] = useState(false);

  const email = 'partha@example.com'; // from auth, read-only

  function handleSave() {
    // TODO: dispatch SET_USER with updated profile + persist to Firestore
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigation.goBack();
    }, 600);
  }

  const initials = getInitials(name);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <CustomHeader
        title="Profile"
        showBack
        onBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Avatar ─────────────────────────────────────────────── */}
          <View style={styles.avatarSection}>
            <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <Text style={styles.avatarHint}>Choose a colour</Text>
            <View style={styles.colorRow}>
              {AVATAR_COLORS.map(c => (
                <Pressable
                  key={c}
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: c },
                    avatarColor === c && styles.colorSwatchActive,
                  ]}
                  onPress={() => setAvatarColor(c)}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: avatarColor === c }}
                />
              ))}
            </View>
          </View>

          {/* ── Fields ─────────────────────────────────────────────── */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>ACCOUNT</Text>

            <View style={styles.card}>
              {/* Display name */}
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Name</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="Your name"
                  placeholderTextColor={colors.text4}
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>

              <View style={styles.divider} />

              {/* Email — read-only */}
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Email</Text>
                <Text style={styles.fieldReadOnly}>{email}</Text>
              </View>

              <View style={styles.divider} />

              {/* Phone */}
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Phone</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Optional"
                  placeholderTextColor={colors.text4}
                  keyboardType="phone-pad"
                  returnKeyType="done"
                />
              </View>
            </View>
          </View>

          {/* ── Danger zone ────────────────────────────────────────── */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>DANGER ZONE</Text>
            <View style={styles.card}>
              <Pressable style={styles.dangerRow} android_ripple={{ color: colors.negBg }}>
                <Text style={styles.dangerLabel}>Delete Account</Text>
                <Text style={styles.dangerChevron}>›</Text>
              </Pressable>
            </View>
          </View>

          {/* spacer so button sits above keyboard */}
          <View style={{ height: spacing[6] }} />
        </ScrollView>

        {/* ── Save button ─────────────────────────────────────────── */}
        <View style={styles.footer}>
          <Pressable
            style={[styles.saveBtn, saved && styles.saveBtnDone]}
            onPress={handleSave}
            disabled={saved}
          >
            <Text style={styles.saveBtnText}>{saved ? 'Saved ✓' : 'Save Changes'}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  scroll: { paddingBottom: spacing[4] },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    paddingVertical: spacing[8],
    gap: spacing[3],
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  avatarText: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold as any,
    color: colors.white,
  },
  avatarHint: {
    fontSize: fontSizes.sm,
    color: colors.text4,
  },
  colorRow: {
    flexDirection: 'row',
    gap: spacing[2],
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colorSwatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  colorSwatchActive: {
    borderWidth: 3,
    borderColor: colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  // Sections
  section: {
    marginHorizontal: spacing[5],
    marginBottom: spacing[5],
  },
  sectionLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    color: colors.text4,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing[2],
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  // Field rows
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3] + 2,
    gap: spacing[3],
  },
  fieldLabel: {
    width: 56,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium as any,
    color: colors.text2,
  },
  fieldInput: {
    flex: 1,
    fontSize: fontSizes.base,
    color: colors.text1,
    padding: 0,
  },
  fieldReadOnly: {
    flex: 1,
    fontSize: fontSizes.base,
    color: colors.text4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing[4],
  },

  // Danger zone
  dangerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  dangerLabel: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium as any,
    color: colors.neg,
  },
  dangerChevron: {
    fontSize: fontSizes.xl,
    color: colors.neg,
    lineHeight: 24,
  },

  // Footer / save button
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
  saveBtnDone: {
    backgroundColor: colors.pos,
  },
  saveBtnText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
    color: colors.white,
  },
});