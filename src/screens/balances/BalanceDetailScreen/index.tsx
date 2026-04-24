import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AmountDisplay } from '../../../components/molecules/AmountDisplay';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { SectionHeader } from '../../../components/molecules/SectionHeader';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { getMockPersonDetail } from '../../../mocks/groups';
import { useNavigation } from '../../../navigation/NavigationContext';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

// ─── Screen ───────────────────────────────────────────────────────────────────

export function BalanceDetailScreen() {
  const { goBack, navigate, currentParams } = useNavigation();
  const person = getMockPersonDetail(currentParams.personId ?? '1');

  const isOwed = person.totalBalance > 0;
  const isSettled = person.totalBalance === 0;

  const amountColor = isSettled
    ? colors.text3
    : isOwed
    ? colors.pos
    : colors.neg;

  const relationLabel = isSettled
    ? 'All settled up'
    : isOwed
    ? `${person.name} owes you`
    : `You owe ${person.name}`;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title={person.name} onBack={goBack} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero card ── */}
        <View style={styles.heroCard}>
          <Avatar name={person.name} size="lg" />
          <Text style={styles.heroName}>{person.name}</Text>
          <Text style={styles.heroEmail}>{person.email}</Text>

          <View style={styles.heroAmountRow}>
            <AmountDisplay
              amount={person.totalBalance}
              currency="USD"
              size="xl"
              showSign
            />
          </View>
          <Text style={[styles.relationLabel, { color: amountColor }]}>
            {relationLabel}
          </Text>
        </View>

        {/* ── Group breakdown ── */}
        <SectionHeader title="SHARED GROUPS" />
        <View style={styles.card}>
          {person.groups.map((g, index) => {
            const isLast = index === person.groups.length - 1;

            return (
              <View key={g.groupId} style={styles.groupRow}>
                {/* Emoji + name */}
                <View style={styles.groupIconWrap}>
                  <Text style={styles.groupEmoji}>{g.groupEmoji}</Text>
                </View>
                <Text style={styles.groupName} numberOfLines={1}>
                  {g.groupName}
                </Text>

                {/* Balance */}
                <AmountDisplay
                  amount={g.balance}
                  currency="USD"
                  size="sm"
                  showSign
                />

                {/* Separator */}
                {!isLast && <View style={styles.rowSeparator} />}
              </View>
            );
          })}
        </View>

        {/* ── Settle CTA ── */}
        {!isSettled && (
          <Button
            label="Settle Up"
            variant="primary"
            onPress={() => navigate('SettleUp', { memberId: person.id })}
            style={styles.settleBtn}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[10],
  },

  // ── Hero card ──
  heroCard: {
    margin: spacing[4],
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing[5],
    alignItems: 'center',
  },
  heroName: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    color: colors.text1,
    marginTop: spacing[3],
  },
  heroEmail: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: colors.text3,
    marginTop: 2,
  },
  heroAmountRow: {
    marginTop: spacing[4],
    marginBottom: spacing[1],
  },
  relationLabel: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    marginTop: spacing[1],
  },

  // ── Group breakdown card ──
  card: {
    marginHorizontal: spacing[4],
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing[4],
  },
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[3],
  },
  groupIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  groupEmoji: {
    fontSize: 18,
  },
  groupName: {
    flex: 1,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.text1,
  },
  rowSeparator: {
    position: 'absolute',
    bottom: 0,
    left: spacing[4],
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },

  // ── CTA ──
  settleBtn: {
    marginHorizontal: spacing[4],
  },
});
