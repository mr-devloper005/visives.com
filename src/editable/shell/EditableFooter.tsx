'use client'

import Link from 'next/link'
import { ArrowUpRight, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const popularCategories = CATEGORY_OPTIONS.slice(0, 8)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center gap-5 px-4 py-12 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left lg:px-8">
          <div>
            <p className="editable-display text-2xl font-medium tracking-[-0.01em] text-white">Got something to share?</p>
            <p className="mt-1.5 text-sm text-white/60">Post your ad and reach {SITE_CONFIG.name}’s local audience today.</p>
          </div>
          <Link href="/create" className="inline-flex shrink-0 items-center gap-2 rounded-full [background:var(--slot4-gradient)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(121,44,162,0.35)] transition hover:-translate-y-0.5">
            <PlusCircle className="h-4 w-4" /> Post an ad
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_0.9fr_1.2fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-white/15">
              <img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} className="h-9 w-9 object-contain" />
            </span>
            <span className="editable-display text-2xl font-medium tracking-[-0.01em] text-white">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">{globalContent.footer?.description || SITE_CONFIG.description}</p>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/40">Site</h3>
          <div className="mt-4 grid gap-2.5">
            {[
              ['Search everything', '/search'],
              ['About', '/about'],
              ['Contact', '/contact'],
              ...(session ? [['Post an ad', '/create']] : [['Login', '/login'], ['Register', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white">
                {label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
            {session ? <button type="button" onClick={logout} className="text-left text-sm font-medium text-white/70 transition hover:text-white">Logout</button> : null}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/40">Popular categories</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {popularCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/search?category=${category.slug}`}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/65 transition hover:border-white/40 hover:text-white"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs font-medium tracking-[0.08em] text-white/45">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
