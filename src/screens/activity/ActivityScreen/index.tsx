import React, { useMemo, useState } from 'react';
import { SectionList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconName } from '../../../components/atoms/Icon';
import { EmptyState } from '../../../components/molecules/EmptyState';
import { formatRelativeDate } from '../../../utils/formatters';
import { ActivityDateSection } from './components/ActivityDateSection';
import { ActivityEventRow } from './components/ActivityEventRow';
import { ActivityHeader } from './components/ActivityHeader';
import styles from './styles';

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterType = 'all' | 'expenses' | 'settlements';

interface ActivityEvent {
  id: string;
  type: 'expense' | 'settlement';
  description: string;
  groupName: string;
  amount: number;
  date: Date;
  iconName: IconName;
  paidBy: string;
}

interface ActivitySection {
  title: string;
  data: ActivityEvent[];
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const now = new Date();

function daysAgo(n: number): Date {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  return d;
}

const MOCK_ACTIVITY: ActivityEvent[] = [
  {
    id: '1',
    type: 'expense',
    description: 'Dinner at Nobu',
    groupName: 'Tokyo Trip',
    amount: 124.5,
    date: daysAgo(0),
    iconName: 'receipt',
    paidBy: 'Alex',
  },
  {
    id: '2',
    type: 'settlement',
    description: 'Alex settled up',
    groupName: 'Tokyo Trip',
    amount: 48.0,
    date: daysAgo(0),
    iconName: 'check-circle',
    paidBy: 'Alex',
  },
  {
    id: '3',
    type: 'expense',
    description: 'Shinkansen tickets',
    groupName: 'Tokyo Trip',
    amount: 210.0,
    date: daysAgo(1),
    iconName: 'credit-card',
    paidBy: 'Jordan',
  },
  {
    id: '4',
    type: 'expense',
    description: 'Airbnb — 3 nights',
    groupName: 'Beach Weekend',
    amount: 360.0,
    date: daysAgo(1),
    iconName: 'home',
    paidBy: 'Sam',
  },
  {
    id: '5',
    type: 'settlement',
    description: 'Jordan settled up',
    groupName: 'Beach Weekend',
    amount: 90.0,
    date: daysAgo(1),
    iconName: 'check-circle',
    paidBy: 'Jordan',
  },
  {
    id: '6',
    type: 'expense',
    description: 'Groceries run',
    groupName: 'Apartment',
    amount: 67.3,
    date: daysAgo(16),
    iconName: 'tag',
    paidBy: 'Alex',
  },
  {
    id: '7',
    type: 'expense',
    description: 'Electricity bill',
    groupName: 'Apartment',
    amount: 112.0,
    date: daysAgo(16),
    iconName: 'dollar',
    paidBy: 'Sam',
  },
  {
    id: '8',
    type: 'settlement',
    description: 'Sam settled up',
    groupName: 'Apartment',
    amount: 56.0,
    date: daysAgo(16),
    iconName: 'check-circle',
    paidBy: 'Sam',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function groupByDate(events: ActivityEvent[]): ActivitySection[] {
  const map = new Map<string, ActivityEvent[]>();

  for (const event of events) {
    const key = formatRelativeDate(event.date);
    const bucket = map.get(key);
    if (bucket) {
      bucket.push(event);
    } else {
      map.set(key, [event]);
    }
  }

  return Array.from(map.entries()).map(([title, data]) => ({ title, data }));
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function ActivityScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredEvents = useMemo<ActivityEvent[]>(() => {
    if (activeFilter === 'all') {
      return MOCK_ACTIVITY;
    }
    const typeKey = activeFilter === 'expenses' ? 'expense' : 'settlement';
    return MOCK_ACTIVITY.filter(e => e.type === typeKey);
  }, [activeFilter]);

  const sections = useMemo<ActivitySection[]>(
    () => groupByDate(filteredEvents),
    [filteredEvents],
  );

  const isEmpty = filteredEvents.length === 0;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ActivityHeader
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <EmptyState
            icon="activity"
            title="No activity yet"
            subtitle="Your expense and settlement history will appear here"
          />
        </View>
      ) : (
        <SectionList<ActivityEvent, ActivitySection>
          sections={sections}
          keyExtractor={item => item.id}
          stickySectionHeadersEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderSectionHeader={({ section }) => (
            <ActivityDateSection title={section.title} />
          )}
          renderItem={({ item }) => (
            <ActivityEventRow
              type={item.type}
              description={item.description}
              groupName={item.groupName}
              amount={item.amount}
              date={item.date}
              iconName={item.iconName}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
