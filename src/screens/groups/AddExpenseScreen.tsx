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

type Props = NativeStackScreenProps<GroupsStackParamList, 'AddExpense'>;

// ─── Mock group members ───────────────────────────────────────────────────────

const GROUP_MEMBERS: Record<string, string[]> = {
  '1': ['You', 'Alex', 'Jordan', 'Sam', 'Chris'],
  '2': ['You', 'Mike', 'Emma'],
  '3': ['You', 'Riley', 'Taylor', 'Morgan'],
  '4': ['You', 'Ben', 'Chloe', 'Dan', 'Eve', 'Finn'],
};

// ─── Categories ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  { key: 'food',     label: 'Food',     icon: '🍽️' },
  { key: 'travel',   label: 'Travel',   icon: '✈️' },
  { key: 'stay',     label: 'Stay',     icon: '🏠' },
  { key: 'grocery',  label: 'Grocery',  icon: '🛒' },
  { key: 'utility',  label: 'Utility',  icon: '💡' },
  { key: 'fun',      label: 'Fun',      icon: '🎉' },
  { key: 'activity', label: 'Activity', icon: '⚽' },
  { key: 'other',    label: 'Other',    icon: '📦' },
];

// ─── Split methods ────────────────────────────────────────────────────────────

const SPLIT_METHODS = [
  { key: 'equal',      label: 'Equal',   icon: '=' },
  { key: 'exact',      label: 'Exact',   icon: '$' },
  { key: 'percentage', label: 'Percent', icon: '%' },
] as const;

type SplitMethod = typeof SPLIT_METHODS[number]['key'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name === 'You' ? 'You' : name.slice(0, 2).toUpperCase();
}

function getAvatarColor(name: string) {
  const palette = ['#6366F1', '#059669', '#0891B2', '#DC2626', '#D97706', '#7C3AED'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

function Divider() {
  return <View style={styles.divider} />;
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function AddExpenseScreen({ route, navigation }: Props) {
  const { groupId } = route.params;
  const members = GROUP_MEMBERS[groupId] ?? ['You'];

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [paidBy, setPaidBy] = useState('You');
  const [splitMethod, setSplitMethod] = useState<SplitMethod>('equal');
  const [note, setNote] = useState('');
  // For exact / percentage splits: per-member overrides
  const [exactAmounts, setExactAmounts] = useState<Record<string, string>>({});
  const [percentages, setPercentages] = useState<Record<string, string>>({});

  const parsedAmount = parseFloat(amount) || 0;

  // ── Computed splits ──────────────────────────────────────────────────────

  function getEqualShare() {
    return members.length > 0 ? parsedAmount / members.length : 0;
  }

  function getMemberShare(member: string): number {
    if (splitMethod === 'equal') return getEqualShare();
    if (splitMethod === 'exact') return parseFloat(exactAmounts[member] ?? '0') || 0;
    if (splitMethod === 'percentage') {
      const pct = parseFloat(percentages[member] ?? '0') || 0;
      return (parsedAmount * pct) / 100;
    }
    return 0;
  }

  function totalAssigned(): number {
    if (splitMethod === 'equal') return parsedAmount;
    return members.reduce((s, m) => s + getMemberShare(m), 0);
  }

  const remaining = parsedAmount - totalAssigned();
  const isValid = description.trim().length > 0 && parsedAmount > 0 && Math.abs(remaining) < 0.01;

  // ── Handlers ─────────────────────────────────────────────────────────────

  function handleSave() {
    // TODO: dispatch ADD_EXPENSE action
    navigation.goBack();
  }

  function handleAmountChange(text: string) {
    // Allow only numeric + single decimal point
    const cleaned = text.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    setAmount(cleaned);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Amount hero ─────────────────────────────────────────────── */}
        <View style={styles.amountCard}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={colors.borderMid}
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={handleAmountChange}
            maxLength={10}
          />
        </View>

        {/* ── Description ─────────────────────────────────────────────── */}
        <View style={styles.card}>
          <TextInput
            style={styles.descriptionInput}
            placeholder="What was it for?"
            placeholderTextColor={colors.text4}
            value={description}
            onChangeText={setDescription}
            returnKeyType="done"
            maxLength={60}
          />
        </View>

        {/* ── Category ────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <SectionLabel>Category</SectionLabel>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {CATEGORIES.map(c => {
              const active = category === c.key;
              return (
                <Pressable
                  key={c.key}
                  style={[styles.categoryChip, active && styles.categoryChipActive]}
                  onPress={() => setCategory(c.key)}
                >
                  <Text style={styles.categoryIcon}>{c.icon}</Text>
                  <Text style={[styles.categoryLabel, active && styles.categoryLabelActive]}>
                    {c.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <Divider />

        {/* ── Paid by ─────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <SectionLabel>Paid by</SectionLabel>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.memberRow}
          >
            {members.map(m => {
              const active = paidBy === m;
              const bg = getAvatarColor(m);
              return (
                <Pressable
                  key={m}
                  style={styles.memberChip}
                  onPress={() => setPaidBy(m)}
                >
                  <View style={[
                    styles.avatar,
                    { backgroundColor: active ? bg : colors.bg },
                    active && styles.avatarActive,
                  ]}>
                    <Text style={[styles.avatarText, active && styles.avatarTextActive]}>
                      {getInitials(m)}
                    </Text>
                  </View>
                  <Text style={[styles.memberName, active && styles.memberNameActive]}>
                    {m}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <Divider />

        {/* ── Split method ─────────────────────────────────────────────── */}
        <View style={styles.section}>
          <SectionLabel>Split</SectionLabel>
          <View style={styles.splitTabs}>
            {SPLIT_METHODS.map(s => {
              const active = splitMethod === s.key;
              return (
                <Pressable
                  key={s.key}
                  style={[styles.splitTab, active && styles.splitTabActive]}
                  onPress={() => setSplitMethod(s.key)}
                >
                  <Text style={[styles.splitTabIcon, active && styles.splitTabIconActive]}>
                    {s.icon}
                  </Text>
                  <Text style={[styles.splitTabLabel, active && styles.splitTabLabelActive]}>
                    {s.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Split preview table */}
          <View style={styles.splitTable}>
            {members.map((m, i) => (
              <View
                key={m}
                style={[styles.splitRow, i < members.length - 1 && styles.splitRowBorder]}
              >
                {/* Avatar */}
                <View style={[styles.splitAvatar, { backgroundColor: getAvatarColor(m) + '20' }]}>
                  <Text style={[styles.splitAvatarText, { color: getAvatarColor(m) }]}>
                    {getInitials(m)}
                  </Text>
                </View>

                {/* Name */}
                <Text style={styles.splitMemberName}>{m}</Text>

                {/* Input or display */}
                {splitMethod === 'equal' && (
                  <Text style={styles.splitAmount}>
                    ${parsedAmount > 0 ? getEqualShare().toFixed(2) : '—'}
                  </Text>
                )}

                {splitMethod === 'exact' && (
                  <View style={styles.splitInputWrap}>
                    <Text style={styles.splitInputPrefix}>$</Text>
                    <TextInput
                      style={styles.splitInput}
                      keyboardType="decimal-pad"
                      placeholder="0.00"
                      placeholderTextColor={colors.text4}
                      value={exactAmounts[m] ?? ''}
                      onChangeText={v =>
                        setExactAmounts(prev => ({ ...prev, [m]: v.replace(/[^0-9.]/g, '') }))
                      }
                    />
                  </View>
                )}

                {splitMethod === 'percentage' && (
                  <View style={styles.splitInputWrap}>
                    <TextInput
                      style={styles.splitInput}
                      keyboardType="decimal-pad"
                      placeholder="0"
                      placeholderTextColor={colors.text4}
                      value={percentages[m] ?? ''}
                      onChangeText={v =>
                        setPercentages(prev => ({ ...prev, [m]: v.replace(/[^0-9.]/g, '') }))
                      }
                    />
                    <Text style={styles.splitInputSuffix}>%</Text>
                  </View>
                )}
              </View>
            ))}

            {/* Remainder indicator for exact / percentage */}
            {splitMethod !== 'equal' && parsedAmount > 0 && (
              <View style={[
                styles.remainderRow,
                Math.abs(remaining) < 0.01 ? styles.remainderOk : styles.remainderWarn,
              ]}>
                <Text style={[
                  styles.remainderText,
                  Math.abs(remaining) < 0.01 ? styles.remainderTextOk : styles.remainderTextWarn,
                ]}>
                  {Math.abs(remaining) < 0.01
                    ? '✓ Splits add up'
                    : remaining > 0
                      ? `$${remaining.toFixed(2)} left to assign`
                      : `$${Math.abs(remaining).toFixed(2)} over budget`}
                </Text>
              </View>
            )}
          </View>
        </View>

        <Divider />

        {/* ── Note ────────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <SectionLabel>Note (optional)</SectionLabel>
          <View style={styles.noteWrap}>
            <TextInput
              style={styles.noteInput}
              placeholder="Add a note…"
              placeholderTextColor={colors.text4}
              value={note}
              onChangeText={setNote}
              multiline
              numberOfLines={2}
              maxLength={200}
            />
          </View>
        </View>

        {/* Bottom spacer for button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Sticky save button ───────────────────────────────────────── */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.saveBtn, !isValid && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={!isValid}
        >
          <Text style={styles.saveBtnText}>Add Expense</Text>
          {parsedAmount > 0 && (
            <View style={styles.saveBtnBadge}>
              <Text style={styles.saveBtnBadgeText}>${parsedAmount.toFixed(2)}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  scroll: {
    paddingBottom: spacing[4],
  },

  // Amount hero
  amountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing[7],
    gap: spacing[1],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  currencySymbol: {
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold as any,
    color: colors.brand,
    lineHeight: 44,
    marginTop: 4,
  },
  amountInput: {
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
    minWidth: 120,
    textAlign: 'center',
    letterSpacing: -1,
    padding: 0,
  },

  // Description
  card: {
    backgroundColor: colors.white,
    marginTop: spacing[3],
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[1],
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  descriptionInput: {
    fontSize: fontSizes.md,
    color: colors.text1,
    paddingVertical: spacing[4],
  },

  // Sections
  section: {
    backgroundColor: colors.white,
    paddingTop: spacing[4],
    paddingBottom: spacing[3],
  },
  sectionLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    color: colors.text3,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: spacing[5],
    marginBottom: spacing[3],
  },
  divider: {
    height: spacing[3],
    backgroundColor: colors.bg,
  },

  // Category
  categoryRow: {
    paddingHorizontal: spacing[5],
    gap: spacing[2],
  },
  categoryChip: {
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.borderMid,
    backgroundColor: colors.white,
    minWidth: 64,
    gap: spacing[1],
  },
  categoryChipActive: {
    borderColor: colors.brand,
    backgroundColor: colors.brandLight,
  },
  categoryIcon: { fontSize: fontSizes.lg },
  categoryLabel: {
    fontSize: fontSizes.xs,
    color: colors.text3,
    fontWeight: fontWeights.medium as any,
  },
  categoryLabelActive: {
    color: colors.brand,
    fontWeight: fontWeights.semibold as any,
  },

  // Paid by
  memberRow: {
    paddingHorizontal: spacing[5],
    gap: spacing[4],
  },
  memberChip: {
    alignItems: 'center',
    gap: spacing[1],
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.borderMid,
  },
  avatarActive: {
    borderColor: 'transparent',
  },
  avatarText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold as any,
    color: colors.text3,
  },
  avatarTextActive: {
    color: colors.white,
  },
  memberName: {
    fontSize: fontSizes.xs,
    color: colors.text4,
    fontWeight: fontWeights.medium as any,
  },
  memberNameActive: {
    color: colors.brand,
    fontWeight: fontWeights.semibold as any,
  },

  // Split method tabs
  splitTabs: {
    flexDirection: 'row',
    marginHorizontal: spacing[5],
    backgroundColor: colors.bg,
    borderRadius: radius.sm,
    padding: 3,
    marginBottom: spacing[3],
  },
  splitTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[2],
    borderRadius: radius.xs,
    gap: spacing[1],
  },
  splitTabActive: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  splitTabIcon: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold as any,
    color: colors.text4,
  },
  splitTabIconActive: { color: colors.brand },
  splitTabLabel: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium as any,
    color: colors.text4,
  },
  splitTabLabelActive: {
    color: colors.brand,
    fontWeight: fontWeights.semibold as any,
  },

  // Split table
  splitTable: {
    marginHorizontal: spacing[5],
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderMid,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[3],
  },
  splitRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  splitAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splitAvatarText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold as any,
  },
  splitMemberName: {
    flex: 1,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium as any,
    color: colors.text1,
  },
  splitAmount: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold as any,
    color: colors.text1,
  },
  splitInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderMid,
    borderRadius: radius.xs,
    paddingHorizontal: spacing[2],
    height: 36,
    minWidth: 90,
  },
  splitInputPrefix: {
    fontSize: fontSizes.base,
    color: colors.text3,
    marginRight: 2,
  },
  splitInputSuffix: {
    fontSize: fontSizes.base,
    color: colors.text3,
    marginLeft: 2,
  },
  splitInput: {
    fontSize: fontSizes.base,
    color: colors.text1,
    fontWeight: fontWeights.medium as any,
    flex: 1,
    padding: 0,
    textAlign: 'right',
  },
  remainderRow: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  remainderOk: { backgroundColor: colors.posBg },
  remainderWarn: { backgroundColor: colors.pendBg },
  remainderText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium as any,
    textAlign: 'center',
  },
  remainderTextOk: { color: colors.pos },
  remainderTextWarn: { color: colors.pend },

  // Note
  noteWrap: {
    marginHorizontal: spacing[5],
    borderWidth: 1,
    borderColor: colors.borderMid,
    borderRadius: radius.sm,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    backgroundColor: colors.white,
  },
  noteInput: {
    fontSize: fontSizes.base,
    color: colors.text1,
    minHeight: 56,
    textAlignVertical: 'top',
    padding: 0,
  },

  // Footer save button
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing[4],
    paddingBottom: Platform.OS === 'ios' ? spacing[8] : spacing[4],
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  saveBtn: {
    height: sizes.btnHeight,
    backgroundColor: colors.brand,
    borderRadius: radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[3],
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnDisabled: {
    backgroundColor: colors.borderMid,
    shadowOpacity: 0,
    elevation: 0,
  },
  saveBtnText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
    color: colors.white,
  },
  saveBtnBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.pill,
  },
  saveBtnBadgeText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as any,
    color: colors.white,
  },
});