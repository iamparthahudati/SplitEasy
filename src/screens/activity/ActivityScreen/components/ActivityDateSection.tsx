import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';

interface ActivityDateSectionProps {
  title: string;
}

export function ActivityDateSection({ title }: ActivityDateSectionProps) {
  return (
    <View style={styles.dateSectionContainer}>
      <Text style={styles.dateSectionLabel}>{title}</Text>
    </View>
  );
}
