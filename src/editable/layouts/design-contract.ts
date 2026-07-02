import type { CSSProperties } from 'react'

export const editableRootStyle = {
  // Visives system: warm editorial paper, a violet → coral brand gradient,
  // and a modern serif/sans pairing. Flat surfaces, generous spacing, the
  // gradient reserved for accents (buttons, rules, badges) rather than
  // washed across every panel.
  '--slot4-page-bg': '#faf7f2',
  '--slot4-page-text': '#241a33',
  '--slot4-panel-bg': '#f2ecf7',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#6d6478',
  '--slot4-soft-muted-text': '#9992a1',
  '--slot4-accent': '#792ca2',
  '--slot4-accent-fill': '#792ca2',
  '--slot4-accent-soft': '#f1e6f6',
  '--slot4-on-accent': '#ffffff',
  '--slot4-dark-bg': '#221334',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#efe8f5',
  '--slot4-cream': '#faf7f2',
  '--slot4-warm': '#f2ecf7',
  '--slot4-lavender': '#f6f1fa',
  '--slot4-gray': '#f2ecf7',
  '--slot4-coral': '#e05454',
  '--slot4-gradient': 'linear-gradient(90deg, #443199 0%, #792ca2 38%, #c13383 72%, #e05454 100%)',
  '--slot4-body-gradient': 'radial-gradient(1100px 560px at 50% -12%, rgba(121,44,162,0.07), transparent 62%)',
  '--editable-page-bg': '#faf7f2',
  '--editable-page-text': '#241a33',
  '--editable-container': '1500px',
  '--editable-border': '#e6ddee',
  '--editable-nav-bg': '#fffdfb',
  '--editable-nav-text': '#241a33',
  '--editable-nav-active': '#792ca2',
  '--editable-nav-active-text': '#ffffff',
  '--editable-cta-bg': '#792ca2',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#ffffff',
  '--editable-footer-bg': '#221334',
  '--editable-footer-text': '#f3edf9',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  gradientBg: '[background:var(--slot4-gradient)]',
  gradientText: '[background:var(--slot4-gradient)] bg-clip-text text-transparent',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_1px_3px_rgba(36,26,51,0.08)]',
  shadowStrong: 'shadow-[0_18px_44px_rgba(36,26,51,0.14)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(34,19,52,0.05),rgba(34,19,52,0.86))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[150px] shrink-0 snap-start sm:w-[170px]',
  },
  type: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]',
    heroTitle: 'editable-display text-4xl font-medium leading-[1.08] tracking-[-0.01em] sm:text-5xl lg:text-[3.25rem]',
    sectionTitle: 'editable-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-2xl border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-2xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(121,44,162,0.3)] active:scale-[0.98]`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] active:scale-[0.98]`,
    accent: `inline-flex items-center justify-center gap-2 rounded-full ${editablePalette.accentBg} px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:-translate-y-0.5 active:scale-[0.98]`,
    gradient: `inline-flex items-center justify-center gap-2 rounded-full [background:var(--slot4-gradient)] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(121,44,162,0.35)] active:scale-[0.98]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-2xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(36,26,51,0.16)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing, like the MysteryCoder reference layout.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
