import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MOCK_GROUPS } from '../../../mocks/groups';
import { useNavigation } from '../../../navigation/NavigationContext';
import { colors } from '../../../theme/colors';
import { radius, sizes, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

import Icon from '@components/atoms/Icon';
import { BalanceBanner } from './components/BalanceBanner';
import { GroupCard } from './components/GroupCard';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';

// ─── Toggle this to preview the empty state ────────────────────────────────────
const IS_EMPTY_STATE = false;

// ─── Empty State ──────────────────────────────────────────────────────────────
interface EmptyStateProps {
  onCreateGroup: () => void;
  onJoinGroup: () => void;
}

function EmptyState({ onCreateGroup, onJoinGroup }: EmptyStateProps) {
  return (
    <View style={emptyStyles.root}>
      {/* Illustration */}
      <View style={emptyStyles.illustration}>
        <Icon name="plus" size={36} stroke={colors.white} fill="none" />
      </View>

      {/* Copy */}
      <Text style={emptyStyles.title}>No groups yet</Text>
      <Text style={emptyStyles.subtitle}>
        Create your first group to start splitting bills with friends.
      </Text>

      {/* Primary CTA */}
      <Pressable
        style={({ pressed }) => [
          emptyStyles.primaryBtn,
          pressed && emptyStyles.primaryBtnPressed,
        ]}
        onPress={onCreateGroup}
      >
        <Text style={emptyStyles.primaryBtnText}>Create your first group</Text>
      </Pressable>

      {/* Secondary link */}
      <Pressable onPress={onJoinGroup} hitSlop={8}>
        <Text style={emptyStyles.secondaryLink}>Join an existing group</Text>
      </Pressable>
    </View>
  );
}

const emptyStyles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[6],
    paddingBottom: sizes.fabSize + spacing[8],
  },
  illustration: {
    width: spacing[16],
    height: spacing[16],
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[6],
  },
  title: {
    fontSize: 22,
    fontWeight: fontWeights.bold,
    color: colors.text1,
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  subtitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    color: colors.text3,
    textAlign: 'center',
    lineHeight: fontSizes.base * 1.5,
    marginBottom: spacing[8],
  },
  primaryBtn: {
    width: '100%',
    height: sizes.btnHeight,
    backgroundColor: colors.brand,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  primaryBtnPressed: {
    opacity: 0.85,
  },
  primaryBtnText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.white,
  },
  secondaryLink: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.brand,
    textAlign: 'center',
  },
});

// ─── Screen ───────────────────────────────────────────────────────────────────
export function GroupsHomeScreen() {
  const { navigate } = useNavigation();
  const [search, setSearch] = useState('');

  const sourceGroups = IS_EMPTY_STATE ? [] : MOCK_GROUPS;

  const filtered = sourceGroups.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()),
  );

  const hasGroups = sourceGroups.length > 0;

  const handleSettleAll = () => {
    navigate('SettleUp');
  };

  const handleGroupPress = (id: string) => {
    navigate('GroupDetail', { groupId: id });
  };

  const handleAddGroup = () => {
    navigate('CreateGroup');
  };

  const handleJoinGroup = () => {
    // Navigate to join group flow when implemented
    navigate('CreateGroup');
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header
        groupCount={sourceGroups.length}
        onBellPress={() => navigate('Notifications')}
        notificationCount={0}
      />

      {hasGroups ? (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <>
              <BalanceBanner amount="$101.25" onSettleAll={handleSettleAll} />
              <SearchBar value={search} onChangeText={setSearch} />
              <Text style={styles.sectionLabel}>MY GROUPS</Text>
            </>
          }
          ListEmptyComponent={
            <View style={styles.noResultsWrap}>
              <Text style={styles.noResultsText}>
                No groups match &quot;{search}&quot;
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <GroupCard
              emoji={item.emoji}
              color={item.color}
              name={item.name}
              subtitle={item.subtitle}
              balance={item.balance}
              onPress={() => handleGroupPress(item.id)}
            />
          )}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.emptyScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <EmptyState
            onCreateGroup={handleAddGroup}
            onJoinGroup={handleJoinGroup}
          />
        </ScrollView>
      )}

      {/* FAB — always visible */}
      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={handleAddGroup}
      >
        <Icon name="plus" size={24} stroke={colors.white} fill="none" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  // ── Groups list ──────────────────────────────────────────────────────────────
  listContent: {
    paddingBottom: sizes.fabSize + spacing[6] + spacing[4],
  },
  sectionLabel: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: colors.text3,
    letterSpacing: 0.8,
    paddingHorizontal: spacing[4],
    marginBottom: spacing[2],
  },
  noResultsWrap: {
    paddingTop: spacing[10],
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: fontSizes.base,
    color: colors.text4,
    fontWeight: fontWeights.regular,
  },
  // ── Empty state scroll container ─────────────────────────────────────────────
  emptyScrollContent: {
    flexGrow: 1,
  },
  // ── FAB ──────────────────────────────────────────────────────────────────────
  fab: {
    position: 'absolute',
    bottom: spacing[6],
    right: spacing[5],
    width: sizes.fabSize,
    height: sizes.fabSize,
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  fabPressed: {
    opacity: 0.85,
  },
});
