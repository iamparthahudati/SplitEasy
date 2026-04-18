/**
 * Format a balance with sign prefix: '+$48.00', '-$22.00', '$0.00'
 * Positive values get a '+' prefix; negative values get a '-' prefix.
 */
export function formatBalance(amount: number, currency = 'USD'): string {
  const abs = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));
  if (amount > 0) {
    return `+${abs}`;
  }
  if (amount < 0) {
    return `-${abs}`;
  }
  return abs;
}

/**
 * Format a number as a currency string.
 * e.g. formatCurrency(1234.5, 'USD') → '$1,234.50'
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a number as a short currency string, omitting cents when zero.
 * e.g. formatCurrencyShort(1234) → '$1,234'
 *      formatCurrencyShort(12.5) → '$12.50'
 */
export function formatCurrencyShort(amount: number, currency = 'USD'): string {
  const hasDecimals = amount % 1 !== 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a Date to a human-readable relative string.
 * e.g. 'Today', 'Yesterday', 'Mon Apr 7'
 */
export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffMs = today.getTime() - target.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }
  if (diffDays < 7) {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a date as 'Apr 7, 2025'
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Truncate a string with ellipsis if it exceeds maxLength.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 1) + '…';
}

/**
 * Get initials from a name (up to 2 chars).
 * e.g. 'Alex Jordan' → 'AJ', 'Alex' → 'AL'
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
