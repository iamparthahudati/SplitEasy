import React, { useMemo } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { colors } from '../../../theme/colors';
import { fontSizes } from '../../../theme/typography';
import styles from './styles';

type Size = 'sm' | 'md' | 'lg' | 'xl';

export interface AmountDisplayProps {
  amount: number;
  currency?: string;
  size?: Size;
  showSign?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '\u20AC',
  GBP: '\u00A3',
  JPY: '\u00A5',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'Fr',
  INR: '\u20B9',
  PHP: '\u20B1',
  SGD: 'S$',
};

function formatAmount(
  amount: number,
  currency: string,
): { symbol: string; whole: string; decimal: string } {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  const abs = Math.abs(amount);

  // JPY and similar zero-decimal currencies
  const noDecimals = ['JPY', 'KRW', 'VND', 'IDR'].includes(currency);

  if (noDecimals) {
    return {
      symbol,
      whole: Math.round(abs).toLocaleString(),
      decimal: '',
    };
  }

  const fixed = abs.toFixed(2);
  const [whole, decimal] = fixed.split('.');
  return {
    symbol,
    whole: Number(whole).toLocaleString(),
    decimal,
  };
}

const sizeConfig: Record<
  Size,
  {
    symbolSize: number;
    wholeSize: number;
    decimalSize: number;
    signSize: number;
    symbolOffset: number;
  }
> = {
  sm: {
    symbolSize: fontSizes.sm,
    wholeSize: fontSizes.lg,
    decimalSize: fontSizes.sm,
    signSize: fontSizes.sm,
    symbolOffset: 4,
  },
  md: {
    symbolSize: fontSizes.base,
    wholeSize: fontSizes.xl,
    decimalSize: fontSizes.base,
    signSize: fontSizes.base,
    symbolOffset: 5,
  },
  lg: {
    symbolSize: fontSizes.md,
    wholeSize: fontSizes['2xl'],
    decimalSize: fontSizes.md,
    signSize: fontSizes.md,
    symbolOffset: 6,
  },
  xl: {
    symbolSize: fontSizes.xl,
    wholeSize: 48,
    decimalSize: fontSizes.xl,
    signSize: fontSizes.xl,
    symbolOffset: 10,
  },
};

export function AmountDisplay({
  amount,
  currency = 'USD',
  size = 'lg',
  showSign = false,
  style,
}: AmountDisplayProps) {
  const { symbol, whole, decimal } = useMemo(
    () => formatAmount(amount, currency),
    [amount, currency],
  );

  const cfg = sizeConfig[size];

  const isPositive = amount > 0;
  const isNegative = amount < 0;
  const isZero = amount === 0;

  const amountColor = isZero
    ? colors.text3
    : isPositive
    ? colors.pos
    : colors.neg;

  const signPrefix =
    showSign && !isZero ? (isPositive ? '+' : '-') : isNegative ? '-' : '';

  return (
    <View style={[styles.container, style]}>
      {/* Sign */}
      {signPrefix ? (
        <Text
          style={[
            styles.sign,
            {
              fontSize: cfg.signSize,
              color: amountColor,
              marginBottom: cfg.symbolOffset,
            },
          ]}
        >
          {signPrefix}
        </Text>
      ) : null}

      {/* Currency symbol */}
      <Text
        style={[
          styles.symbol,
          {
            fontSize: cfg.symbolSize,
            color: amountColor,
            marginBottom: cfg.symbolOffset,
          },
        ]}
      >
        {symbol}
      </Text>

      {/* Whole part */}
      <Text
        style={[
          styles.whole,
          {
            fontSize: cfg.wholeSize,
            color: amountColor,
          },
        ]}
      >
        {whole}
      </Text>

      {/* Decimal part */}
      {decimal ? (
        <Text
          style={[
            styles.decimal,
            {
              fontSize: cfg.decimalSize,
              color: amountColor,
              marginBottom: cfg.symbolOffset,
            },
          ]}
        >
          .{decimal}
        </Text>
      ) : null}
    </View>
  );
}
