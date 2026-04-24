import { AccessibilityProps } from 'react-native';

/**
 * Returns a minimal set of accessibility props for interactive elements.
 * Marks the element as a button role with accessible=true so screen readers
 * announce it correctly without requiring explicit labels at every call site.
 */
export const a11y = (label?: string): AccessibilityProps => ({
  accessible: true,
  accessibilityRole: 'button',
  ...(label ? { accessibilityLabel: label } : {}),
});
