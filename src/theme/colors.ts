// SplitEasy Design System — Color tokens
// SACRED: Money color language must never be changed

export const colors = {
  // ─── Brand ───────────────────────────────────────────────────────────────
  brand: '#6366F1', // Indigo 500
  brandDark: '#4338CA', // Indigo 700
  brandLight: '#EEF2FF', // Indigo 50
  brandMid: '#C7D2FE', // Indigo 200

  // ─── Brand Gradient References (pass to LinearGradient colors prop) ──────
  brandGradient: ['#6366F1', '#8B5CF6'] as string[], // Indigo → Violet
  brandGradientDeep: ['#4338CA', '#6366F1'] as string[], // Deep Indigo → Indigo

  // ─── Premium / Gold Accent ───────────────────────────────────────────────
  premiumGold: '#F59E0B', // Amber 500
  premiumGoldLight: '#FEF3C7', // Amber 100
  premiumGoldDark: '#92400E', // Amber 900

  // ─── Money color language — SACRED. NEVER BREAK THESE. ──────────────────
  pos: '#059669', // Emerald 600 — owed TO you
  posBg: '#D1FAE5', // Emerald 100
  posDark: '#065F46', // Emerald 900 — text on green bg
  neg: '#DC2626', // Red 600 — you OWE
  negBg: '#FEE2E2', // Red 100
  negDark: '#991B1B', // Red 900
  zero: '#94A3B8', // Slate 400 — settled
  pend: '#D97706', // Amber 600 — needs action
  pendBg: '#FEF3C7', // Amber 100

  // ─── Surfaces ────────────────────────────────────────────────────────────
  bg: '#F8FAFC', // Slate 50 — app background
  white: '#FFFFFF', // Pure white — cards
  surface: '#FFFFFF', // Default card / sheet surface
  surfaceElevated: '#F8FAFC', // Slightly lifted surface (Slate 50)
  surfaceDeep: '#F1F5F9', // Recessed / tray surface (Slate 100)

  // ─── Dark Surfaces ───────────────────────────────────────────────────────
  darkSurface: '#0F172A', // Slate 900 — dark card / bottom sheet
  darkSurfaceMid: '#1E293B', // Slate 800 — dark elevated
  darkSurfaceLight: '#334155', // Slate 700 — dark subtle

  // ─── Glass Effect ────────────────────────────────────────────────────────
  glass: 'rgba(255,255,255,0.12)', // Frosted glass fill
  glassBorder: 'rgba(255,255,255,0.20)', // Frosted glass border
  glassDark: 'rgba(15,23,42,0.40)', // Dark frosted glass fill

  // ─── Overlay ─────────────────────────────────────────────────────────────
  overlay: 'rgba(15,23,42,0.60)', // Modal / bottom-sheet scrim

  // ─── Shadow ──────────────────────────────────────────────────────────────
  shadow: '#6366F1', // Brand-tinted shadow color (use with shadowColor)
  shadowNeutral: '#0F172A', // Neutral shadow for cards
  shadowSuccess: '#059669', // Success-tinted shadow

  // ─── Typography ──────────────────────────────────────────────────────────
  text1: '#0F172A', // Slate 900 — primary
  text2: '#334155', // Slate 700 — secondary
  text3: '#64748B', // Slate 500 — tertiary / captions
  text4: '#94A3B8', // Slate 400 — hints / placeholders

  // Ink aliases (semantic aliases for text tokens)
  ink1: '#0F172A', // alias → text1
  ink2: '#334155', // alias → text2
  ink3: '#64748B', // alias → text3
  ink4: '#94A3B8', // alias → text4

  // ─── Borders ─────────────────────────────────────────────────────────────
  border: '#F1F5F9', // Slate 100 — subtle dividers
  borderMid: '#E2E8F0', // Slate 200 — inputs / cards
  borderStrong: '#CBD5E1', // Slate 300 — emphasis borders
} as const;

export type Color = keyof typeof colors;

// ─── Named Gradient Arrays ────────────────────────────────────────────────────
// Use these directly as the `colors` prop on LinearGradient components.
// Gradient simulation: layer two Views with backgroundColor + opacity when
// LinearGradient is unavailable.

export const gradients = {
  /** Primary brand gradient — Indigo 500 → Violet 500 */
  brand: ['#6366F1', '#8B5CF6'],

  /** Deep brand gradient — Indigo 700 → Indigo 500 */
  brandDeep: ['#4338CA', '#6366F1'],

  /** Success / positive balance gradient — Emerald 600 → Emerald 400 */
  success: ['#059669', '#34D399'],

  /** Premium gold gradient — Amber 500 → Amber 300 */
  premium: ['#F59E0B', '#FCD34D'],

  /** Splash / hero gradient — Deep Indigo → Violet → Indigo */
  splash: ['#312E81', '#6366F1', '#8B5CF6'],

  /** Danger / negative balance gradient — Red 600 → Rose 400 */
  danger: ['#DC2626', '#FB7185'],

  /** Neutral surface gradient — White → Slate 50 */
  surface: ['#FFFFFF', '#F8FAFC'],

  /** Dark overlay gradient — transparent → Slate 900 */
  darkFade: ['rgba(15,23,42,0)', 'rgba(15,23,42,0.90)'],
} as const;

export type GradientKey = keyof typeof gradients;
