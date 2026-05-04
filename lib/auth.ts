import { cookies } from 'next/headers';
import { findArtistById } from './store';
import type { RoleId } from '@/db/seed-data/types';

export const COOKIE_NAME = 'kavaworks_persona';
export const THEME_COOKIE = 'kavaworks_theme';
export const CULTURAL_COOKIE = 'kavaworks_cultural';

const DEFAULT_PERSONA = 'artist_001';

export type CurrentUser = {
  id: string;
  handle: string;
  name: string;
  role: RoleId;
  primaryNationId: string;
  affiliations: string[];
  city: string;
  verified: boolean;
  elderStatus: boolean;
  elderInGroups: string[];
  culturalTheme: string;
  avatarStyle: string;
};

export async function getCurrentUser(): Promise<CurrentUser> {
  const jar = await cookies();
  const personaId = jar.get(COOKIE_NAME)?.value || DEFAULT_PERSONA;
  const row = findArtistById(personaId) ?? findArtistById(DEFAULT_PERSONA);

  if (!row) throw new Error('No seeded personas available');

  return {
    id: row.id,
    handle: row.handle,
    name: row.name,
    role: row.role as RoleId,
    primaryNationId: row.primaryNationId,
    affiliations: row.affiliations,
    city: row.city,
    verified: row.verified,
    elderStatus: row.elderStatus,
    elderInGroups: row.elderInGroups,
    culturalTheme: row.culturalTheme,
    avatarStyle: row.avatarStyle,
  };
}

export async function getTheme(): Promise<'light' | 'dark'> {
  const jar = await cookies();
  const val = jar.get(THEME_COOKIE)?.value;
  return val === 'dark' ? 'dark' : 'light';
}

export async function getCulturalTheme(): Promise<
  'ula-fala' | 'moana' | 'tapa' | 'niu' | 'koula'
> {
  const jar = await cookies();
  const val = jar.get(CULTURAL_COOKIE)?.value;
  if (val === 'moana' || val === 'tapa' || val === 'niu' || val === 'koula') return val;
  return 'ula-fala';
}
