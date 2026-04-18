import { colors } from '../theme/colors';

export const formatCurrency = (
  amount: number,
  currency: string = '$',
): string => {
  return `${currency}${Math.abs(amount).toFixed(2)}`;
};

export const formatBalance = (amount: number): string => {
  if (amount > 0) {
    return `+${formatCurrency(amount)}`;
  }
  if (amount < 0) {
    return `-${formatCurrency(amount)}`;
  }
  return '$0.00';
};

export const getBalanceColor = (amount: number): string => {
  if (amount > 0) return colors.posAlt;
  if (amount < 0) return colors.neg;
  return colors.zero;
};
