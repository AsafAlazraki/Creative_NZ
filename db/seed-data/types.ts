export type RoleId = 'artist' | 'audience' | 'collector' | 'org' | 'adviser' | 'elder' | 'admin';

export type ArtistSeed = {
  id: string;
  name: string;
  handle: string;
  role: RoleId;
  primaryNationId: string;
  affiliations: string[];
  city: string;
  bio: string;
  statement: string;
  coverImageCredit?: string;
  avatarStyle: 'illustrated-silhouette' | 'photograph';
  verified: boolean;
  elderStatus: boolean;
  elderInGroups: string[];
  culturalTheme: string;
  artforms: string[];
  yearsActive: number;
  followers: number;
  following: number;
  postsCount: number;
  worksSold: number;
  supporters: number;
  awards: Array<{
    id: string;
    name: string;
    body: string;
    year: number;
    amount: number;
    citation: string;
  }>;
  subscriptionTiers: Array<{ name: string; priceNzd: number; perks: string[] }>;
  exhibitions: Array<{ year: number; title: string; venue: string; role: string }>;
  lineage: {
    apprenticedTo?: string;
    teaches?: string[];
    exhibitedWith?: string[];
  };
  expertise?: string[];
  officeHours?: string;
  orgInfo?: {
    mission: string;
    staff: string[];
    foundedYear: number;
    focus: string[];
  };
};

export type PostSeed = {
  id: string;
  authorId: string;
  mediaType: 'image' | 'video' | 'audio' | 'gallery';
  mediaRef: string;
  posterRef?: string;
  durationSec?: number;
  caption: string;
  captionLang: string;
  captionTranslation?: string;
  tapu: boolean;
  nationId: string;
  artform: string;
  collaboratorHandles: string[];
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  views: number;
  commentsData: Array<{
    authorHandle: string;
    text: string;
    createdAt: string;
    elderMark?: boolean;
  }>;
};

export type WorkSeed = {
  id: string;
  artistId: string;
  title: string;
  description: string;
  priceNzd: number;
  mediaRefs: string[];
  artform: string;
  nationId: string;
  materials: string;
  dimensions: string;
  edition?: { number: number; of: number };
  yearMade: number;
  culturalStory: string;
  status: 'live' | 'sold' | 'reserved' | 'draft';
  shippingFrom: string;
  tapu: boolean;
  createdAt: string;
};
