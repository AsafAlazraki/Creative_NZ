import { cookies } from 'next/headers';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { parseJson } from './utils';
import { ROLES, type RoleId } from './role';

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
  const row = db
    .select()
    .from(schema.artists)
    .where(eq(schema.artists.id, personaId))
    .get();

  const effective = row ?? db
    .select()
    .from(schema.artists)
    .where(eq(schema.artists.id, DEFAULT_PERSONA))
    .get();

  if (!effective) {
    throw new Error('No seeded personas available');
  }

  return {
    id: effective.id,
    handle: effective.handle,
    name: effective.name,
    role: effective.role as RoleId,
    primaryNationId: effective.primaryNationId,
    affiliations: parseJson<string[]>(effective.affiliations, []),
    city: effective.city,
    verified: Boolean(effective.verified),
    elderStatus: Boolean(effective.elderStatus),
    elderInGroups: parseJson<string[]>(effective.elderInGroups, []),
    culturalTheme: effective.culturalTheme,
    avatarStyle: effective.avatarStyle,
  };
}

export function personaForRole(role: RoleId) {
  return ROLES.find((r) => r.id === role) ?? ROLES[0];
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
