import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '../../../navigation/NavigationContext';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

import { BalanceBanner } from './components/BalanceBanner';
import { GroupCard } from './components/GroupCard';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_GROUPS = [
  {
    id: '1',
    emoji: '✈️',
    color: '#3B82F6',
    name: 'Spain Trip 2024',
    subtitle: '5 members · Hotel Barcelona',
    balance: 124.5,
  },
  {
    id: '2',
    emoji: '🏠',
    color: '#EF4444',
    name: 'Flat Bills',
    subtitle: '3 members · Netflix',
    balance: -42.0,
  },
  {
    id: '3',
    emoji: '🍕',
    color: '#F59E0B',
    name: 'Pizza Fridays',
    subtitle: '4 members · Last: Mar 28',
    balance: 0,
  },
  {
    id: '4',
    emoji: '🎂',
    color: '#EF4444',
    name: "Jake's Birthday",
    subtitle: '6 members · Dinner',
    balance: -18.75,
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────
export function GroupsHomeScreen() {
  const { navigate } = useNavigation();
  const [search, setSearch] = useState('');

  const filtered = MOCK_GROUPS.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSettleAll = () => {
    navigate('SettleUp');
  };

  const handleGroupPress = (id: string) => {
    navigate('GroupDetail', { groupId: id });
  };

  const handleAddGroup = () => {
    navigate('CreateGroup');
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <Header
        groupCount={MOCK_GROUPS.length}
        onBellPress={() => navigate('Notifications')}
        notificationCount={1}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* Balance banner */}
            <BalanceBanner amount="$101.25" onSettleAll={handleSettleAll} />

            {/* Search */}
            <View style={styles.searchWrap}>
              <SearchBar value={search} onChangeText={setSearch} />
            </View>

            {/* Section label */}
            <Text style={styles.sectionLabel}>MY GROUPS</Text>
          </>
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

      {/* FAB */}
      <Pressable style={styles.fab} onPress={handleAddGroup}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F2F3F7',
  },
  listContent: {
    paddingBottom: 100,
  },
  searchWrap: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
  },
  sectionLabel: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: colors.text3,
    letterSpacing: 0.8,
    paddingHorizontal: spacing[4],
    marginBottom: spacing[2],
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
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
  fabText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: fontWeights.regular,
    lineHeight: 32,
  },
});
