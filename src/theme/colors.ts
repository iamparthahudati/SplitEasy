// SplitEasy Design System — Color tokens
// SACRED: Money color language must never be changed

export const colors = {
  // Brand
  brand: '#6366F1',       // Indigo 500
  brandDark: '#4338CA',   // Indigo 700
  brandLight: '#EEF2FF',  // Indigo 50
  brandMid: '#C7D2FE',    // Indigo 200

  // Money color language — SACRED. NEVER BREAK THESE.
  pos: '#059669',         // Emerald 600 — owed TO you
  posBg: '#D1FAE5',       // Emerald 100
  posDark: '#065F46',     // Emerald 900 — text on green bg
  neg: '#DC2626',         // Red 600 — you OWE
  negBg: '#FEE2E2',       // Red 100
  negDark: '#991B1B',     // Red 900
  zero: '#94A3B8',        // Slate 400 — settled
  pend: '#D97706',        // Amber 600 — needs action
  pendBg: '#FEF3C7',      // Amber 100

  // Surfaces
  bg: '#F8FAFC',          // Slate 50 — app bg
  white: '#FFFFFF',       // Cards
  text1: '#0F172A',       // Slate 900
  text2: '#334155',       // Slate 700
  text3: '#64748B',       // Slate 500
  text4: '#94A3B8',       // Slate 400 — hints
  border: '#F1F5F9',      // Slate 100 — subtle
  borderMid: '#E2E8F0',   // Slate 200 — inputs
} as const;

export type Color = keyof typeof colors;
