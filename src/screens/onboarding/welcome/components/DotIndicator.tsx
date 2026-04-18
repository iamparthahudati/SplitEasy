import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles';

interface DotIndicatorProps {
  count: number;
  activeIndex: number;
}

export const DotIndicator = ({
  count,
  activeIndex,
}: DotIndicatorProps): React.ReactElement => {
  return (
    <View style={styles.dotRow}>
      {Array.from({ length: count }, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex ? styles.dotActive : styles.dotInactive,
          ]}
        />
      ))}
    </View>
  );
};
