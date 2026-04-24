import React, { useCallback } from 'react';
import { SectionList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconName } from '../../../components/atoms/Icon';
import { EmptyState } from '../../../components/molecules/EmptyState';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { useNavigation } from '../../../navigation/NavigationContext';
import { ActivityDateSection } from '../../activity/ActivityScreen/components/ActivityDateSection';
import { ActivityEventRow } from '../../activity/ActivityScreen/components/ActivityEventRow';
import styles from './styles';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeedEvent {
  id: string;
  type: 'expense' | 'settlement';
  description: string;
  groupName: string;
  amount: number;
  date: Date;
  iconName: IconName;
}

interface FeedSection {
  title: string;
  data: FeedEvent[];
}

// ─── Mock data scoped to Spain Trip 2024 ─────────────────────────────────────

const GROUP_NAME = 'Spain Trip 2024';

const FEED_SECTIONS: FeedSection[] = [
  {
    title: 'APR 13',
    data: [
      {
        id: '1',
        type: 'expense',
        description: 'Hotel Barcelona',
        groupName: GROUP_NAME,
        amount: 248.0,
        date: new Date('2024-04-13T18:00:00'),
        iconName: 'home',
      },
      {
        id: '2',
        type: 'settlement',
        description: 'Alex settled up',
        groupName: GROUP_NAME,
        amount: 48.0,
        date: new Date('2024-04-13T10:30:00'),
        iconName: 'check-circle',
      },
    ],
  },
  {
    title: 'APR 12',
    data: [
      {
        id: '3',
        type: 'expense',
        description: 'Dinner at La Boqueria',
        groupName: GROUP_NAME,
        amount: 84.0,
        date: new Date('2024-04-12T20:00:00'),
        iconName: 'receipt',
      },
      {
        id: '4',
        type: 'settlement',
        description: 'Jordan settled up',
        groupName: GROUP_NAME,
        amount: 36.5,
        date: new Date('2024-04-12T14:00:00'),
        iconName: 'check-circle',
      },
    ],
  },
  {
    title: 'APR 11',
    data: [
      {
        id: '5',
        type: 'expense',
        description: 'Airport Transfer',
        groupName: GROUP_NAME,
        amount: 20.0,
        date: new Date('2024-04-11T08:00:00'),
        iconName: 'send',
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ActivityFeedScreen() {
  const { goBack } = useNavigation();

  const renderItem = useCallback(
    ({ item }: { item: FeedEvent }) => (
      <ActivityEventRow
        type={item.type}
        description={item.description}
        groupName={item.groupName}
        amount={item.amount}
        date={item.date}
        iconName={item.iconName}
      />
    ),
    [],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: FeedSection }) => (
      <ActivityDateSection title={section.title} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: FeedEvent) => item.id, []);

  const ListEmpty = (
    <View style={styles.emptyContainer}>
      <EmptyState
        icon="activity"
        title="No activity yet"
        subtitle="Expenses and settlements for this group will appear here."
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader
        title="Activity"
        subtitle="Spain Trip 2024"
        onBack={goBack}
      />
      <SectionList<FeedEvent, FeedSection>
        sections={FEED_SECTIONS}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled
        contentContainerStyle={
          FEED_SECTIONS.length === 0 ? { flex: 1 } : styles.listContent
        }
        ListEmptyComponent={ListEmpty}
      />
    </SafeAreaView>
  );
}
