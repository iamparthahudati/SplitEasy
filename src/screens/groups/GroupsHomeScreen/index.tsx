import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MOCK_GROUPS } from '../../../mocks/groups';
import { useNavigation } from '../../../navigation/NavigationContext';
import { colors } from '../../../theme/colors';
import { radius, sizes, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

import { BalanceBanner } from './components/BalanceBanner';
import { GroupCard } from './components/GroupCard';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';

const SCREEN_BG = '#F2F3F7';

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
      <Header
        groupCount={MOCK_GROUPS.length}
        onBellPress={() => navigate('Notifications')}
        notificationCount={0}
      />

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

      <Pressable style={styles.fab} onPress={handleAddGroup}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
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
  fabText: {
    fontSize: fontSizes['2xl'],
    color: colors.white,
    fontWeight: fontWeights.regular,
    lineHeight: sizes.fabSize,
    textAlign: 'center',
    includeFontPadding: false,
  },
});
