import { StyleSheet } from 'react-native';
import { fontWeights } from '../../../theme/typography';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  sign: {
    fontWeight: fontWeights.semibold,
    marginRight: 1,
  },
  symbol: {
    fontWeight: fontWeights.semibold,
    marginRight: 1,
  },
  whole: {
    fontWeight: fontWeights.bold,
    letterSpacing: -1,
  },
  decimal: {
    fontWeight: fontWeights.semibold,
    letterSpacing: -0.5,
  },
});

export default styles;
