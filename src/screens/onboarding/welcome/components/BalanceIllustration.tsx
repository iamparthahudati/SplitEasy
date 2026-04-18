import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';
import { illustStyles } from '../styles';

const AVATAR_SIZE = 84;
const CIRCLE_SIZE = AVATAR_SIZE + 16; // 100

const POLE_WIDTH = 6;
const POLE_HEIGHT = 36;
const DIVIDER_HEIGHT = 1;

export const BalanceIllustration: React.FC = () => {
  return (
    <View style={illustStyles.wrapper}>
      {/* Circles row */}
      <View style={styles.row}>
        {/* You circle */}
        <View style={[styles.circle, styles.circleLeft]}>
          <Text style={styles.circleLabel}>You</Text>
          <Text style={styles.circleAmount}>$35</Text>
        </View>

        {/* Centre pole + divider */}
        <View style={styles.centreColumn}>
          <View style={styles.pole} />
          <View style={styles.divider} />
        </View>

        {/* Alex circle */}
        <View style={[styles.circle, styles.circleRight]}>
          <Text style={styles.circleLabel}>Alex</Text>
          <Text style={styles.circleAmount}>$35</Text>
        </View>
      </View>

      {/* Balanced label */}
      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Balanced</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Circles
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleLeft: {
    backgroundColor: '#4B44B8',
  },
  circleRight: {
    backgroundColor: '#3730A3',
  },
  circleLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  circleAmount: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    color: colors.white,
  },

  // Centre column: pole + divider
  centreColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing[4],
  },
  pole: {
    width: POLE_WIDTH,
    height: POLE_HEIGHT,
    borderRadius: radius.pill,
    backgroundColor: colors.borderMid,
    marginBottom: spacing[1],
  },
  divider: {
    width: 56,
    height: DIVIDER_HEIGHT,
    backgroundColor: colors.borderMid,
    marginTop: spacing[1],
  },

  // Balanced badge
  badgeRow: {
    alignItems: 'center',
    marginTop: spacing[5],
  },
  badge: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[2],
    borderRadius: radius.pill,
    backgroundColor: colors.brandLight,
  },
  badgeText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: colors.brandDark,
    letterSpacing: 0.3,
  },
});
