import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fontSizes, fontWeights } from '../../theme/typography';

interface Props {
  name: string;
}

export function PlaceholderScreen({ name }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.hint}>— placeholder —</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  name: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    color: colors.text1,
    marginBottom: 4,
  },
  hint: {
    fontSize: fontSizes.sm,
    color: colors.text4,
  },
});
