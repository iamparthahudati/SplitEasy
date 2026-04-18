import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { spacing } from '../../../../theme/spacing';
import { fontSizes } from '../../../../theme/typography';

interface SearchBarProps {
  value: string;
  onChangeText: (t: string) => void;
}

export const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <View style={styles.iconCircle} />
        <View style={styles.iconHandle} />
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search groups..."
        placeholderTextColor="#94A3B8"
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
  },
  iconWrapper: {
    width: 18,
    height: 18,
    marginRight: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#94A3B8',
    backgroundColor: 'transparent',
  },
  iconHandle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 2,
    height: 7,
    borderRadius: 1,
    backgroundColor: '#94A3B8',
    transform: [{ rotate: '-45deg' }],
  },
  input: {
    flex: 1,
    fontSize: fontSizes.base,
    color: '#1E293B',
    paddingVertical: 0,
  },
});
