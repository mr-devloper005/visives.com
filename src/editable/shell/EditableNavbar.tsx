'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle, LogOut } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  // Front-facing menu items. Archive routes for the two primary content types
  // (`/listing`, `/classified`) intentionally stay off the nav — individual
  // post-detail pages are reachable via search and post cards instead.
  const navItems = useMemo(
    () => [
      { label: 'Search', href: '/search' },
      { label: 'Post an ad', href: '/create' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    []
  )

  return (
    <header className="sticky top-0 z-50 bg-[var(--editable-nav-bg)]/95 text-[var(--editable-nav-text)] backdrop-blur-md">
      <div className="h-[3px] [background:var(--slot4-gradient)]" />

      <nav className="mx-auto flex min-h-[78px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(121,44,162,0.18)] ring-1 ring-[var(--editable-border)] transition group-hover:scale-105">
            <img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} className="h-9 w-9 object-contain" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="editable-display block max-w-[220px] truncate text-2xl font-medium leading-none tracking-[-0.01em]">{SITE_CONFIG.name}</span>
            <span className="mt-1 block max-w-[220px] truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]' : 'text-[var(--slot4-page-text)]/75 hover:bg-[var(--slot4-panel-bg)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="mx-auto hidden min-w-0 max-w-xs flex-1 md:flex">
          <label className="flex w-full items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-2.5 transition focus-within:border-[var(--slot4-accent)]">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
            <input
              name="q"
              type="search"
              placeholder="Search the marketplace"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
          </label>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <span className="hidden text-xs font-medium text-[var(--slot4-muted-text)] sm:inline">Hi, {session.name.split(' ')[0]}</span>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                <LogIn className="h-4 w-4" /> Login
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-1.5 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-medium text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] sm:inline-flex"
              >
                <UserPlus className="h-4 w-4" /> Register
              </Link>
            </>
          )}
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-full [background:var(--slot4-gradient)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(121,44,162,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(121,44,162,0.35)]"
          >
            <PlusCircle className="h-4 w-4" /> <span className="hidden sm:inline">Post an ad</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-2.5 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div className="h-px bg-[var(--editable-border)]" />

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-5 lg:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input name="q" type="search" placeholder="Search the marketplace" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
          </form>
          <div className="grid gap-1">
            {[{ label: 'Home', href: '/' }, ...navItems, ...(session ? [] : [{ label: 'Login', href: '/login' }, { label: 'Register', href: '/signup' }])].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium ${
                    active
                      ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                      : 'text-[var(--slot4-page-text)]/75 hover:bg-[var(--slot4-panel-bg)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-xl px-4 py-3 text-left text-sm font-medium text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-panel-bg)]">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
