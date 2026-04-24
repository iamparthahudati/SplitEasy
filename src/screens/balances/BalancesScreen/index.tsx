import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Chip from '../../../components/atoms/Chip';
import { EmptyState } from '../../../components/molecules/EmptyState';
import { SectionHeader } from '../../../components/molecules/SectionHeader';
import { MOCK_BALANCES, MockBalance } from '../../../mocks/groups';
import { useNavigation } from '../../../navigation/NavigationContext';

import { NetSummaryBanner } from './components/NetSummaryBanner';
import { PersonBalanceRow } from './components/PersonBalanceRow';
import styles from './styles';

// ─── Filter ───────────────────────────────────────────────────────────────────

type Filter = 'all' | 'owed' | 'owe';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'owed', label: 'Owed to you' },
  { key: 'owe', label: 'You owe' },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export function BalancesScreen() {
  const { navigate } = useNavigation();
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  // ── Derived totals ──────────────────────────────────────────────────────────
  const owedToYou = useMemo(
    () =>
      MOCK_BALANCES.filter(b => b.balance > 0).reduce(
        (sum, b) => sum + b.balance,
        0,
      ),
    [],
  );

  const youOwe = useMemo(
    () =>
      MOCK_BALANCES.filter(b => b.balance < 0).reduce(
        (sum, b) => sum + Math.abs(b.balance),
        0,
      ),
    [],
  );

  // ── Filtered list ───────────────────────────────────────────────────────────
  const filteredBalances = useMemo<MockBalance[]>(() => {
    switch (activeFilter) {
      case 'owed':
        return MOCK_BALANCES.filter(b => b.balance > 0);
      case 'owe':
        return MOCK_BALANCES.filter(b => b.balance < 0);
      default:
        return MOCK_BALANCES;
    }
  }, [activeFilter]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen title */}
        <View style={styles.headerContainer}>
          <Text style={styles.screenTitle}>Balances</Text>

          {/* Net summary banner */}
          <NetSummaryBanner owedToYou={owedToYou} youOwe={youOwe} />

          {/* Filter chips */}
          <View style={styles.chipRow}>
            {FILTERS.map(f => (
              <Chip
                key={f.key}
                label={f.label}
                selected={activeFilter === f.key}
                onPress={() => setActiveFilter(f.key)}
              />
            ))}
          </View>

          {/* Section label */}
          <View style={styles.sectionHeaderWrapper}>
            <SectionHeader title="BALANCES" compact />
          </View>
        </View>

        {/* Balances card */}
        {filteredBalances.length > 0 ? (
          <View style={styles.cardShell}>
            {filteredBalances.map((item: MockBalance) => (
              <PersonBalanceRow
                key={item.id}
                name={item.name}
                groupCount={1}
                balance={item.balance}
                currency="USD"
                onPress={() => navigate('BalanceDetail', { personId: item.id })}
                onSettle={() => navigate('SettleUp', { memberId: item.id })}
              />
            ))}
          </View>
        ) : (
          <EmptyState
            icon="check-circle"
            title="All settled up"
            subtitle="No outstanding balances"
            style={styles.emptyState}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
