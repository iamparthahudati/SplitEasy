import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const OrDivider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>or</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  text: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 12,
  },
});
