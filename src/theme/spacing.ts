// Spacing scale (4px base unit)
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
} as const;

// Border radius tokens
export const radius = {
  xl: 24,   // sheets, paywall
  lg: 16,   // hero cards
  md: 12,   // regular cards
  sm: 10,   // inputs, buttons
  xs: 8,    // small chips
  pill: 999,
} as const;

// Component-level size tokens
export const sizes = {
  btnHeight: 56,
  btnHeightSm: 44,
  tabBarHeight: 64,
  headerHeight: 56,
  avatarSm: 32,
  avatarMd: 40,
  avatarLg: 56,
  fabSize: 56,
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
} as const;

export type SpacingKey = keyof typeof spacing;
