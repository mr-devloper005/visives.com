import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Local business listings and classifieds',
      description: 'Browse verified business listings and fresh local classifieds, then post your own in minutes.',
      openGraphTitle: 'Local business listings and classifieds',
      openGraphDescription: 'Browse verified business listings and fresh local classifieds, then post your own in minutes.',
      keywords: ['business listings', 'local classifieds', 'business directory', 'post a listing'],
    },
    hero: {
      badge: 'Local listings & classifieds',
      title: ['Find local businesses,', 'and post your own listing today.'],
      description: 'Browse verified business listings and fresh classifieds from your area, or post your own offer in a few minutes — no clutter, just what you came for.',
      primaryCta: { label: 'Browse listings', href: '/listing' },
      secondaryCta: { label: 'View classifieds', href: '/classified' },
      searchPlaceholder: 'Search businesses, offers, and categories',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Recently posted listings shape the homepage.',
      featureCardDescription: 'Fresh listings and classifieds stay at the center of the experience without changing any core platform behavior.',
    },
    intro: {
      badge: 'About Visives',
      title: 'Built for local business owners to be found, and for neighbors to find what they need.',
      paragraphs: [
        'This site brings business listings and classifieds together so visitors can browse, compare, and act quickly.',
        'Instead of splitting listings and offers across disconnected pages, Visives keeps them in one place with consistent navigation and simple filtering.',
        'Whether someone starts from a business listing or a classified post, they can keep discovering related offers without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'A search-first homepage built around businesses and offers near you.',
        'Connected sections for business listings and local classifieds.',
        'Simple category filters that make browsing feel effortless.',
        'A quick posting flow so any business can go live in minutes.',
      ],
      primaryLink: { label: 'Browse listings', href: '/listing' },
      secondaryLink: { label: 'See classifieds', href: '/classified' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Browse listings, post a classified, or grow your business presence — all in one place.',
      description: 'Move between business listings and classifieds through one clear, connected experience built for local discovery.',
      primaryCta: { label: 'Browse Listings', href: '/listing' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A simpler way to find and be found locally.',
    description: `${slot4BrandConfig.siteName} brings business listings and local classifieds together in one clear, easy-to-browse place.`,
    paragraphs: [
      'Instead of splitting listings and offers across disconnected pages, we keep related content easy to move through and easy to understand.',
      'Whether someone starts with a business listing or a classified post, they can continue exploring without losing context.',
    ],
    values: [
      {
        title: 'Discovery-first experience',
        description: 'We prioritize clarity and structure so visitors can browse, compare, and decide without noise.',
      },
      {
        title: 'Connected listings & classifieds',
        description: 'Business listings and classifieds stay connected so discovery feels natural across the site.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear page structure to help visitors find useful listings faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A support page that matches the product, not a generic contact form.',
    description: 'Tell us what you are trying to list, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search business listings, classifieds, and categories across the site.',
    },
    hero: {
      badge: 'Search the marketplace',
      title: 'Find listings, offers, and categories faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the site.',
      placeholder: 'Search by keyword, category, or business name',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Post an ad',
      description: 'Post a business listing or classified ad on the site.',
    },
    locked: {
      badge: 'Poster access',
      title: 'Login to post a new listing.',
      description: 'Use your account to open the posting workspace and add listings or classifieds to the active sections of this site.',
    },
    hero: {
      badge: 'Posting workspace',
      title: 'Post a listing or classified in minutes.',
      description: 'Choose the type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Listing details',
    submitLabel: 'Submit listing',
    successTitle: 'Your post was submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back.',
      description: 'Login to continue browsing, manage your submissions, and post new listings from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start posting.',
      description: 'Create an account to post listings, save details, and manage your submissions through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
