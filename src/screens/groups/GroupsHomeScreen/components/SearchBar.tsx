import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from '../../../../components/atoms/Icon';
import { colors } from '../../../../theme/colors';
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
        <Icon name="search" size={18} stroke={colors.text3} fill="none" />
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search groups..."
        placeholderTextColor={colors.text4}
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
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderMid,
    paddingHorizontal: 14,
  },
  iconWrapper: {
    width: 18,
    height: 18,
    marginRight: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: fontSizes.base,
    color: colors.text1,
    paddingVertical: 0,
  },
});
