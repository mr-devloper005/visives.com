// ✏️ EDITABLE — theme the ads to match this site. Devs own this file.
// You control the LOOK here (radius, border, shadow, background, label color).
// You CANNOT change the ad's shape/fit from here — that stays locked in
// src/lib/ad-slots.ts, so the ad always displays correctly no matter what.

import type { AdSkin } from '@/lib/ads/ad-frame'

// Site-wide default skin — tune to your brand.
export const adSkin: AdSkin = {
  radius: '20px',
  border: '1px solid rgba(121,44,162,0.14)',
  shadow: '0 12px 34px rgba(36,26,51,0.08)',
  background: '#ffffff',
  labelClassName: 'bg-[#792ca2] text-white',
}

// Optional per-slot overrides — adjust only where you need to.
export const adSkinBySlot: Partial<Record<string, AdSkin>> = {
  sidebar: { radius: '16px', shadow: 'none', border: '1px solid rgba(121,44,162,0.16)' },
  popup: { radius: '24px' },
  header: { radius: '20px', background: '#f8f4fb' },
}

/** Merge site default + per-slot override for a slot. */
export function skinFor(slot: string): AdSkin {
  return { ...adSkin, ...(adSkinBySlot[slot] ?? {}) }
}
// junior tweak
