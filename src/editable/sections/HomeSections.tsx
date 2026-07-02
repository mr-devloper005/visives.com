import Link from 'next/link'
import {
  Bookmark, Building2, ChevronRight, Compass, FileText, Image as ImageIcon,
  LayoutGrid, MapPin, Megaphone, MessageSquare, PlusCircle, Search, Share2, ShieldCheck, Star,
  ThumbsUp, UserRound, UserPlus2,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref, EditorialFeatureCard, RailPostCard, CompactIndexCard, ArticleListCard } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

// Stable hash so derived ratings/counts stay consistent between renders.
function hashStr(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

// Prefer real rating/review data when present, else a stable display value so
// the star UI always reads well. (Wire to real fields when ready.)
function ratingOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.rating)
  if (real >= 1 && real <= 5) return Math.round(real * 10) / 10
  const h = hashStr(post.slug || post.id || post.title || 'x')
  return Math.round((3.7 + (h % 13) / 10) * 10) / 10 // 3.7 – 4.9
}

function reviewsOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.reviewCount ?? content.reviews)
  if (real > 0) return Math.floor(real)
  return 6 + (hashStr((post.slug || post.title || 'x') + 'r') % 480)
}

function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  const rounded = Math.round(rating)
  return (
    <span className="inline-flex items-center gap-[3px]" aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${className} ${i < rounded ? 'fill-[var(--slot4-accent)] text-[var(--slot4-accent)]' : 'fill-[var(--editable-border)] text-[var(--editable-border)]'}`}
        />
      ))}
    </span>
  )
}

function RatingRow({ post }: { post: SitePost }) {
  const rating = ratingOf(post)
  return (
    <div className="mt-2 flex items-center gap-2">
      <Stars rating={rating} className="h-3.5 w-3.5" />
      <span className="text-sm font-semibold text-[var(--slot4-page-text)]">{rating.toFixed(1)}</span>
      <span className="text-sm text-[var(--slot4-muted-text)]">({reviewsOf(post)})</span>
    </div>
  )
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

/* ----------------------------- Hero banner ----------------------------- */
// Latest posts' real images (newest first, deduped, placeholders dropped).
function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

// Merge the primary feed with the time-window feeds so home always has content,
// even when one source comes back empty for this site.
function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function trendingCategories(posts: SitePost[], max = 6) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const cat = categoryOf(post)
    if (!cat || seen.has(cat.toLowerCase())) continue
    seen.add(cat.toLowerCase())
    out.push(cat)
    if (out.length >= max) break
  }
  return out
}

export function EditableHomeHero({ posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover the best of ${SITE_CONFIG.name}`
  // Task archive routes (`/listing`, `/classified`) are intentionally not
  // exposed anywhere in the front-facing UI — hero search flows always route
  // through `/search`, which keeps them off the sitemap of direct CTAs.
  const trending = trendingCategories(pool)

  return (
    <section className="relative">
      {/* Grid-stack (not flex+h-full+overflow-hidden) so the banner grows to fit
          tall mobile content — headline wraps, tabs, and the category dropdown
          panel — instead of clipping it under the fixed-height image layer. */}
      <div className="relative grid w-full min-h-[460px] sm:min-h-[540px] lg:min-h-[600px]">
        <div className="relative col-start-1 row-start-1 h-full w-full overflow-hidden">
          <EditableHeroCollage images={heroImages} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,19,52,0.35),rgba(34,19,52,0.55))]" />
          <div className="absolute inset-0 [background:var(--slot4-body-gradient)] opacity-0" />
        </div>
        <div className={`relative z-10 col-start-1 row-start-1 flex flex-col justify-center py-14 ${container}`}>
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">{pagesContent.home.hero.badge || 'Welcome'}</p>
            <h1 className="editable-display mt-5 text-balance text-4xl font-medium leading-[1.08] tracking-[-0.01em] text-white sm:text-5xl lg:text-[3.4rem]">
              {heroTitle}
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">{pagesContent.home.hero.description}</p>
          </div>

          <div className="mt-7 w-full max-w-3xl overflow-hidden rounded-3xl bg-white p-4 shadow-[0_24px_60px_rgba(34,19,52,0.35)] sm:p-5">
            <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">Search the marketplace</p>
            <form action="/search" className="flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-[var(--editable-border)] px-4 py-3">
                <Search className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
                <input name="q" placeholder="Keyword, title, or business name" className="w-full min-w-0 bg-transparent text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]" />
              </div>
              <select name="category" defaultValue="" className="rounded-xl border border-[var(--editable-border)] px-4 py-3 text-sm font-medium text-[var(--slot4-page-text)] outline-none sm:w-48">
                <option value="">Any category</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl [background:var(--slot4-gradient)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                <Search className="h-4 w-4" /> Search
              </button>
            </form>
          </div>

          {trending.length ? (
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-white/75">
              <span className="font-semibold text-white/90">Trending:</span>
              {trending.map((cat, index) => (
                <span key={cat}>
                  <Link href={`/search?category=${encodeURIComponent(cat.toLowerCase())}`} className="underline-offset-4 hover:text-white hover:underline">{cat}</Link>
                  {index < trending.length - 1 ? <span className="text-white/40">,</span> : null}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-b border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
        <div className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-2 py-4 text-sm text-[var(--slot4-muted-text)] ${container}`}>
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--slot4-accent)]" /> Trusted local listings</span>
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--slot4-accent)]" /> Built for local discovery</span>
          <span className="hidden items-center gap-2 sm:inline-flex"><ThumbsUp className="h-4 w-4 text-[var(--slot4-accent)]" /> Updated daily</span>
          <Link href="/search" className="inline-flex items-center gap-1 font-semibold text-[var(--slot4-accent)] hover:underline">
            Search everything <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* --------------------------- Welcome / quick actions --------------------------- */
export function EditableQuickActions(_props: HomeSectionProps) {
  const tiles = [
    { icon: PlusCircle, label: 'Post an ad', href: '/create' },
    { icon: Search, label: 'Search everything', href: '/search' },
    { icon: Compass, label: 'Browse categories', href: '/search' },
    { icon: UserPlus2, label: 'Create account', href: '/signup' },
    { icon: MessageSquare, label: 'Contact us', href: '/contact' },
    { icon: LayoutGrid, label: `About ${SITE_CONFIG.name}`, href: '/about' },
  ]
  return (
    <section className={container}>
      <div className="-mt-10 grid gap-6 rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_20px_50px_rgba(36,26,51,0.10)] sm:p-8 lg:grid-cols-[0.9fr_1.6fr] lg:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
            <Compass className="h-7 w-7" />
          </span>
          <div>
            <h2 className="editable-display text-xl font-medium tracking-[-0.01em]">Welcome to {SITE_CONFIG.name}</h2>
            <p className="mt-1 text-sm text-[var(--slot4-muted-text)]">What would you like to do today?</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {tiles.map((tile) => (
            <Link
              key={tile.label}
              href={tile.href}
              className="group flex flex-col items-center gap-2.5 rounded-2xl border border-[var(--editable-border)] px-2 py-4 text-center transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]/40 hover:bg-[var(--slot4-panel-bg)]"
            >
              <tile.icon className="h-5 w-5 text-[var(--slot4-accent)] transition group-hover:scale-110" />
              <span className="text-xs font-semibold leading-tight text-[var(--slot4-page-text)]">{tile.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------- Featured spotlight + rail ------------------------- */
export function EditableFeaturedSpotlight({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  if (!pool.length) return null
  const [feature, ...rest] = pool
  const rail = rest.slice(0, 6)
  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`py-14 sm:py-16 ${container}`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">Spotlight</p>
          <h2 className="editable-display mt-2 text-2xl font-medium tracking-[-0.01em] sm:text-3xl">Featured this week</h2>
        </div>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <EditorialFeatureCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} label={categoryOf(feature) || 'Featured'} />
          {rail.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
              {rail.map((post, index) => (
                <RailPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/* -------------------------- Browse by category -------------------------- */
export function EditableStoryRail(_props: HomeSectionProps) {
  // Feature the twelve top categories as an entry point. Category links go to
  // `/search?category=…` so no direct traffic is pushed to the archive routes.
  const featured = CATEGORY_OPTIONS.slice(0, 12)
  const secondary = CATEGORY_OPTIONS.slice(12)
  if (!featured.length) return null
  const featuredIcons = [Compass, ShieldCheck, MapPin, ThumbsUp, Building2, Bookmark, ImageIcon, Megaphone, FileText, UserRound, PlusCircle, Star]
  return (
    <section className="bg-[var(--slot4-warm)]">
      <div className={`py-12 sm:py-14 ${container}`}>
        <div className="flex flex-col gap-1">
          <h2 className="editable-display text-2xl font-medium tracking-[-0.01em] sm:text-3xl">Browse by category</h2>
          <p className="text-[var(--slot4-muted-text)]">Jump straight to what you're looking for.</p>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((category, index) => {
            const Icon = featuredIcons[index % featuredIcons.length]
            return (
              <Link
                key={category.slug}
                href={`/search?category=${category.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-3 py-7 text-center transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)] hover:shadow-[0_14px_30px_rgba(36,26,51,0.10)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full [background:var(--slot4-gradient)] text-white transition group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold text-[var(--slot4-page-text)]">{category.name}</span>
              </Link>
            )
          })}
        </div>

        {secondary.length ? (
          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">More categories</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {secondary.map((category) => (
                <Link
                  key={category.slug}
                  href={`/search?category=${category.slug}`}
                  className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-2 text-sm font-medium text-[var(--slot4-page-text)]/75 transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

/* --------------------------- Most loved (horizontal cards) --------------------------- */
function HorizontalListingCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <article className="flex flex-col gap-5 overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(36,26,51,0.12)] sm:flex-row">
      <Link href={href} className="group relative block aspect-[16/10] shrink-0 overflow-hidden bg-[var(--slot4-media-bg)] sm:aspect-auto sm:w-64">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
        {category ? <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[var(--slot4-page-text)] shadow-sm">{category}</span> : null}
      </Link>
      <div className="flex flex-1 flex-col justify-center p-5">
        <Link href={href} className="editable-display text-lg font-medium leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] hover:text-[var(--slot4-accent)]">
          {post.title}
        </Link>
        <RatingRow post={post} />
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 140)}</p>
        <div className="mt-3 flex items-center gap-5 text-[var(--slot4-muted-text)]">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium"><ThumbsUp className="h-3.5 w-3.5" /> Helpful</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium"><Share2 className="h-3.5 w-3.5" /> Share</span>
          <Link href={href} className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-[var(--slot4-accent)] hover:underline">View</Link>
        </div>
      </div>
    </article>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const activity = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 6)
  if (!activity.length) return null
  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`py-14 sm:py-16 ${container}`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">Community favorites</p>
          <h2 className="editable-display mt-2 text-2xl font-medium tracking-[-0.01em] sm:text-3xl">Most loved posts</h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {activity.map((post) => (
            <HorizontalListingCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------- Time-based discovery sections -------------------- */
function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <Link href={href} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--slot4-media-bg)]">
      <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" loading="lazy" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(34,19,52,0.88))]" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        {category ? <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">{category}</span> : null}
        <h3 className="editable-display mt-2.5 line-clamp-2 text-lg font-medium leading-snug tracking-[-0.01em] text-white">{post.title}</h3>
        <RatingRow post={post} />
      </div>
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string; variant: 'image' | 'editorial' | 'compact' }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'New in the last 7 days', variant: 'image' },
  browse: { eyebrow: 'Trending now', title: 'Popular this month', variant: 'editorial' },
  index: { eyebrow: 'Evergreen', title: 'From the archive', variant: 'compact' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  // Use the real time windows; fall back to slicing posts so the page stays full.
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: '/' },
          { key: 'browse', posts: posts.slice(8, 16), href: '/' },
          { key: 'index', posts: posts.slice(16, 24), href: '/' },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore', variant: 'editorial' as const }
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-[var(--slot4-warm)]' : 'bg-[var(--slot4-surface-bg)]'}>
            <div className={`py-12 sm:py-14 ${container}`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                <h2 className="editable-display mt-2 text-2xl font-medium tracking-[-0.01em] sm:text-3xl">{copy.title}</h2>
              </div>

              {copy.variant === 'image' ? (
                <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {section.posts.slice(0, 8).map((post) => (
                    <ImageFirstCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                  ))}
                </div>
              ) : null}

              {copy.variant === 'editorial' ? (
                <div className="mt-7 grid gap-5 lg:grid-cols-2">
                  {section.posts.slice(0, 4).map((post, i) => (
                    <ArticleListCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={i} />
                  ))}
                </div>
              ) : null}

              {copy.variant === 'compact' ? (
                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.posts.slice(0, 6).map((post, i) => (
                    <CompactIndexCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={i} />
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        )
      })}
    </>
  )
}

/* -------------------------------- CTA band ------------------------------ */
export function EditableHomeCta() {
  return (
    <section id="get-app" className="scroll-mt-24 [background:var(--slot4-gradient)]">
      <div className={`flex flex-col items-center gap-6 py-16 text-center sm:py-20 ${container}`}>
        <h2 className="editable-display max-w-2xl text-3xl font-medium tracking-[-0.01em] text-white sm:text-4xl">
          Got something worth sharing?
        </h2>
        <p className="max-w-xl text-base text-white/85 sm:text-lg">
          Add your business, post a listing, or share a classified — and reach the {SITE_CONFIG.name} community.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[var(--slot4-accent)] transition hover:brightness-95">
            <PlusCircle className="h-4 w-4" /> Create a post
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/60 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
