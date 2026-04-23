import { sqliteTable, text, integer, real, primaryKey } from 'drizzle-orm/sqlite-core';

export const nations = sqliteTable('nations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  flag: text('flag').notNull(),
  greetingMorning: text('greeting_morning').notNull(),
  greetingEvening: text('greeting_evening').notNull(),
  culturalTheme: text('cultural_theme').notNull(),
  patternId: text('pattern_id').notNull(),
  heritageArtforms: text('heritage_artforms').notNull(),
  languageCode: text('language_code').notNull(),
  elderTitle: text('elder_title').notNull(),
  culturalNote: text('cultural_note').notNull(),
});

export const artists = sqliteTable('artists', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  handle: text('handle').notNull().unique(),
  role: text('role').notNull().default('artist'),
  primaryNationId: text('primary_nation_id').notNull(),
  affiliations: text('affiliations').notNull(),
  city: text('city').notNull(),
  bio: text('bio').notNull(),
  statement: text('statement').notNull(),
  coverImageCredit: text('cover_image_credit'),
  avatarStyle: text('avatar_style').notNull().default('illustrated-silhouette'),
  verified: integer('verified', { mode: 'boolean' }).notNull().default(false),
  elderStatus: integer('elder_status', { mode: 'boolean' }).notNull().default(false),
  elderInGroups: text('elder_in_groups').notNull().default('[]'),
  culturalTheme: text('cultural_theme').notNull(),
  artforms: text('artforms').notNull(),
  yearsActive: integer('years_active').notNull().default(0),
  followers: integer('followers').notNull().default(0),
  following: integer('following').notNull().default(0),
  postsCount: integer('posts_count').notNull().default(0),
  worksSold: integer('works_sold').notNull().default(0),
  supporters: integer('supporters').notNull().default(0),
  awards: text('awards').notNull().default('[]'),
  subscriptionTiers: text('subscription_tiers').notNull().default('[]'),
  exhibitions: text('exhibitions').notNull().default('[]'),
  lineage: text('lineage').notNull().default('{}'),
  expertise: text('expertise'),
  officeHours: text('office_hours'),
  orgInfo: text('org_info'),
});

export const works = sqliteTable('works', {
  id: text('id').primaryKey(),
  artistId: text('artist_id').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  priceNzd: real('price_nzd').notNull(),
  mediaRefs: text('media_refs').notNull(),
  artform: text('artform').notNull(),
  nationId: text('nation_id').notNull(),
  materials: text('materials').notNull(),
  dimensions: text('dimensions').notNull(),
  edition: text('edition'),
  yearMade: integer('year_made').notNull(),
  culturalStory: text('cultural_story').notNull(),
  status: text('status').notNull().default('live'),
  shippingFrom: text('shipping_from').notNull(),
  tapu: integer('tapu', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
});

export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  authorId: text('author_id').notNull(),
  mediaType: text('media_type').notNull(),
  mediaRef: text('media_ref').notNull(),
  posterRef: text('poster_ref'),
  durationSec: integer('duration_sec'),
  caption: text('caption').notNull(),
  captionLang: text('caption_lang').notNull().default('en'),
  captionTranslation: text('caption_translation'),
  tapu: integer('tapu', { mode: 'boolean' }).notNull().default(false),
  nationId: text('nation_id').notNull(),
  artform: text('artform').notNull(),
  collaboratorHandles: text('collaborator_handles').notNull().default('[]'),
  createdAt: text('created_at').notNull(),
  likes: integer('likes').notNull().default(0),
  comments: integer('comments').notNull().default(0),
  shares: integer('shares').notNull().default(0),
  saves: integer('saves').notNull().default(0),
  views: integer('views').notNull().default(0),
  commentsData: text('comments_data').notNull().default('[]'),
});

export const grants = sqliteTable('grants', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  funder: text('funder').notNull(),
  amountMin: integer('amount_min').notNull(),
  amountMax: integer('amount_max').notNull(),
  amountDisplay: text('amount_display').notNull(),
  duration: text('duration'),
  pool: text('pool').notNull(),
  tier: integer('tier'),
  eligibility: text('eligibility').notNull(),
  openDate: text('open_date').notNull(),
  deadline: text('deadline').notNull(),
  resultsBy: text('results_by'),
  assessmentProcess: text('assessment_process').notNull(),
  plainEnglish: text('plain_english').notNull(),
  howToApply: text('how_to_apply').notNull(),
  similarGrantIds: text('similar_grant_ids').notNull().default('[]'),
  sourceUrl: text('source_url').notNull(),
  lastSyncedAt: text('last_synced_at').notNull(),
});

export const awards = sqliteTable('awards', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  amountNzd: integer('amount_nzd').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  body: text('body').notNull(),
  establishedYear: integer('established_year'),
});

export const groups = sqliteTable('groups', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  nationId: text('nation_id').notNull(),
  charter: text('charter').notNull(),
  elderIds: text('elder_ids').notNull(),
  memberCount: integer('member_count').notNull(),
  status: text('status').notNull().default('active'),
  coverPatternId: text('cover_pattern_id').notNull(),
  createdAt: text('created_at').notNull(),
  recentMessageCount: integer('recent_message_count').notNull().default(0),
  threadsData: text('threads_data').notNull().default('[]'),
});

export const events = sqliteTable('events', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  hostOrgId: text('host_org_id'),
  nationId: text('nation_id').notNull(),
  venue: text('venue').notNull(),
  startsAt: text('starts_at').notNull(),
  endsAt: text('ends_at').notNull(),
  type: text('type').notNull(),
  description: text('description').notNull(),
  coverImageCredit: text('cover_image_credit'),
  rsvpCount: integer('rsvp_count').notNull().default(0),
  linkedArtistIds: text('linked_artist_ids').notNull().default('[]'),
});

export const orgs = sqliteTable('orgs', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  logo: text('logo'),
  description: text('description').notNull(),
  city: text('city').notNull(),
  website: text('website').notNull(),
  focus: text('focus').notNull(),
  linkedArtistIds: text('linked_artist_ids').notNull().default('[]'),
  currentProgrammes: text('current_programmes').notNull().default('[]'),
  foundedYear: integer('founded_year'),
});

export const articles = sqliteTable('articles', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  authorRole: text('author_role').notNull(),
  readTimeMin: integer('read_time_min').notNull(),
  category: text('category').notNull(),
  excerpt: text('excerpt').notNull(),
  body: text('body').notNull(),
  pullQuotes: text('pull_quotes').notNull().default('[]'),
  sidebar: text('sidebar').notNull().default('[]'),
  publishedAt: text('published_at').notNull(),
  relatedArticleIds: text('related_article_ids').notNull().default('[]'),
});

export const drops = sqliteTable('drops', {
  id: text('id').primaryKey(),
  artistId: text('artist_id').notNull(),
  workId: text('work_id').notNull(),
  totalUnits: integer('total_units').notNull(),
  remainingUnits: integer('remaining_units').notNull(),
  opensAt: text('opens_at').notNull(),
  closesAt: text('closes_at').notNull(),
  status: text('status').notNull(),
  storyFraming: text('story_framing').notNull(),
});

export const follows = sqliteTable(
  'follows',
  {
    followerId: text('follower_id').notNull(),
    followeeId: text('followee_id').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (t) => [primaryKey({ columns: [t.followerId, t.followeeId] })],
);

export const saves = sqliteTable(
  'saves',
  {
    userId: text('user_id').notNull(),
    workId: text('work_id').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.workId] })],
);

export const likes = sqliteTable(
  'likes',
  {
    userId: text('user_id').notNull(),
    postId: text('post_id').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.postId] })],
);

export const collections = sqliteTable('collections', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  workIds: text('work_ids').notNull().default('[]'),
  createdAt: text('created_at').notNull(),
});

export type Nation = typeof nations.$inferSelect;
export type Artist = typeof artists.$inferSelect;
export type Work = typeof works.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Grant = typeof grants.$inferSelect;
export type Award = typeof awards.$inferSelect;
export type Group = typeof groups.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Org = typeof orgs.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Drop = typeof drops.$inferSelect;
export type Collection = typeof collections.$inferSelect;
