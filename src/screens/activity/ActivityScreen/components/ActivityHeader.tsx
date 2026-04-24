import React from 'react';
import { Text, View } from 'react-native';
import Chip from '../../../../components/atoms/Chip';
import styles from '../styles';

type FilterType = 'all' | 'expenses' | 'settlements';

interface ActivityHeaderProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function ActivityHeader({
  activeFilter,
  onFilterChange,
}: ActivityHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Activity</Text>
      <View style={styles.headerChips}>
        <Chip
          label="All"
          selected={activeFilter === 'all'}
          onPress={() => onFilterChange('all')}
        />
        <Chip
          label="Expenses"
          selected={activeFilter === 'expenses'}
          onPress={() => onFilterChange('expenses')}
        />
        <Chip
          label="Settlements"
          selected={activeFilter === 'settlements'}
          onPress={() => onFilterChange('settlements')}
        />
      </View>
    </View>
  );
}
