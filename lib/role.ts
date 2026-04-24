export type RoleId = 'artist' | 'audience' | 'collector' | 'org' | 'adviser' | 'elder' | 'admin';

export const ROLES: Array<{
  id: RoleId;
  label: string;
  personaId: string;
  description: string;
  badge: 'gold' | 'jade' | 'coral' | 'ocean' | 'none';
}> = [
  {
    id: 'artist',
    label: 'Artist',
    personaId: 'artist_001',
    description: 'A Pacific artist making work. Primary creator role.',
    badge: 'none',
  },
  {
    id: 'audience',
    label: 'Audience',
    personaId: 'persona_audience',
    description: 'Viewer, follower, collector at small scale.',
    badge: 'none',
  },
  {
    id: 'collector',
    label: 'Collector',
    personaId: 'persona_collector',
    description: 'Verified collector with a documented Pacific-arts collection.',
    badge: 'jade',
  },
  {
    id: 'org',
    label: 'Arts Organisation',
    personaId: 'persona_org',
    description: 'Gallery, collective, studio, or festival. Programmes artists.',
    badge: 'ocean',
  },
  {
    id: 'adviser',
    label: 'Arts Adviser',
    personaId: 'persona_adviser',
    description: 'Modelled on Creative New Zealand Pacific Arts Practice Adviser.',
    badge: 'coral',
  },
  {
    id: 'elder',
    label: 'Elder / Kaumātua',
    personaId: 'persona_elder',
    description: 'Designated cultural senior in Groups. Additive to artist role.',
    badge: 'gold',
  },
  {
    id: 'admin',
    label: 'Administrator',
    personaId: 'persona_admin',
    description: 'Platform administrator. Moderation and featured content.',
    badge: 'none',
  },
];

export function roleByPersona(handle: string): RoleId {
  const match = ROLES.find((r) => r.personaId === handle);
  return match?.id ?? 'audience';
}

/**
 * Navigation — Facebook/Instagram style. Everyone gets the same primary
 * nav. Admin gets an extra Admin link. Role stays a property of the user
 * (shown as profile badge), not a gate for seeing different apps.
 */
const BASE_NAV = [
  'feed',
  'explore',
  'market',
  'drops',
  'messages',
  'create',
  'groups',
  'events',
  'grants',
  'kete',
  'collections',
];

export const ROLE_NAV: Record<RoleId, string[]> = {
  artist: BASE_NAV,
  audience: BASE_NAV,
  collector: BASE_NAV,
  org: BASE_NAV,
  adviser: BASE_NAV,
  elder: BASE_NAV,
  admin: [...BASE_NAV, 'admin'],
};

export const SCREENS: Record<string, { label: string; href: string; icon: string }> = {
  feed: { label: 'Home', href: '/', icon: 'home' },
  explore: { label: 'Explore', href: '/explore', icon: 'compass' },
  discover: { label: 'Search', href: '/discover', icon: 'search' },
  create: { label: 'Create', href: '/create', icon: 'plus-square' },
  reels: { label: 'Reels', href: '/reels', icon: 'film' },
  playlists: { label: 'Playlists', href: '/playlists', icon: 'list' },
  events: { label: 'Events', href: '/events', icon: 'calendar' },
  drops: { label: 'Drops', href: '/drops', icon: 'zap' },
  market: { label: 'Marketplace', href: '/market', icon: 'shopping-bag' },
  profile: { label: 'Profile', href: '/profile', icon: 'user' },
  messages: { label: 'Messages', href: '/messages', icon: 'message-circle' },
  grants: { label: 'Grants', href: '/grants', icon: 'award' },
  groups: { label: 'Groups', href: '/groups', icon: 'users' },
  orgs: { label: 'Organisations', href: '/orgs', icon: 'building' },
  analytics: { label: 'Analytics', href: '/analytics', icon: 'bar-chart-2' },
  moana: { label: 'Moana Ola', href: '/moana', icon: 'activity' },
  affiliate: { label: 'Affiliate', href: '/affiliate', icon: 'share-2' },
  collections: { label: 'Collections', href: '/collections', icon: 'bookmark' },
  kete: { label: 'Kete Toolkit', href: '/kete', icon: 'book-open' },
  admin: { label: 'Admin', href: '/admin', icon: 'shield' },
};
