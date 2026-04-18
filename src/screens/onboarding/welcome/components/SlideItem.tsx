import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';

interface SlideItemProps {
  illustration: React.ReactNode;
  title: string;
  body: string;
  sub: string;
  width: number;
}

export const SlideItem = ({
  illustration,
  title,
  body,
  sub,
  width,
}: SlideItemProps): React.JSX.Element => {
  return (
    <View style={[styles.slide, { width }]}>
      <View style={styles.illustrationWrap}>{illustration}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <Text style={styles.sub}>{sub}</Text>
    </View>
  );
};
