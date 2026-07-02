import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  Visives task surfaces.

  Every task (archive + detail) shares one cohesive editorial identity: warm
  paper surfaces, a modern serif display face, and the violet → coral brand
  accent. Per-task copy (kicker / note) still varies so each section keeps a
  little voice, but the visual language is unified. Tokens are delivered via
  CSS variables (`--tk-*`).
*/

export type TaskTheme = {
  /** short flavour word shown as an eyebrow kicker */
  kicker: string
  /** one-line mood note for the page intro */
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Fraunces', 'Iowan Old Style', Georgia, serif"
const BODY_FONT = "'DM Sans', 'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

// Shared Visives palette — every task inherits this; only kicker/note differ.
const base = {
  dark: false,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#faf7f2',
  surface: '#ffffff',
  raised: '#f2ecf7',
  text: '#241a33',
  muted: '#6d6478',
  line: '#e6ddee',
  accent: '#792ca2',
  accentSoft: '#f1e6f6',
  onAccent: '#ffffff',
  glow: 'rgba(121,44,162,0.08)',
  radius: '1.25rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Articles', note: 'In-depth reads, guides and stories worth your time.' },
  listing: { ...base, kicker: 'Businesses', note: 'Find, compare and connect with local businesses near you.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Fresh local offers and classifieds, ready to act on today.' },
  image: { ...base, kicker: 'Photos', note: 'A visual feed of standout images and galleries.' },
  sbm: { ...base, kicker: 'Bookmarks', note: 'Curated resources and links worth saving.' },
  pdf: { ...base, kicker: 'Documents', note: 'Downloadable guides, reports and references.' },
  profile: { ...base, kicker: 'People', note: 'Discover creators, businesses and profiles.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

/** All `--tk-*` tokens + font overrides for a task surface, ready for `style`. */
export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    // Re-point the shared article-body accent vars so post HTML (headings,
    // links) inherits this task's accent instead of the global site accent.
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
