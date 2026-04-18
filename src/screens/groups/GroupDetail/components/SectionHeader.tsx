import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const SectionHeader = ({
  title,
  actionLabel,
  onAction,
}: SectionHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
      <View style={styles.separator} />
      {actionLabel !== undefined && (
        <TouchableOpacity
          onPress={onAction}
          activeOpacity={0.7}
          style={styles.actionButton}
        >
          <Text style={styles.actionLabel}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginHorizontal: 10,
  },
  actionButton: {
    paddingLeft: 4,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6366F1',
  },
});
