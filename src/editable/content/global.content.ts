import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Independent reading platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Local listings & classifieds',
    primaryLinks: [
      { label: 'Business Listings', href: '/listing' },
      { label: 'Classifieds', href: '/classified' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Browse listings', href: '/listing' },
      secondary: { label: 'Post an ad', href: '/create' },
    },
  },
  footer: {
    tagline: 'Local listings and classifieds',
    description: 'A connected marketplace for business listings and local classifieds — browse what is nearby, or post your own in minutes.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Business Listings', href: '/listing' },
          { label: 'Classifieds', href: '/classified' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for clean local discovery.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
