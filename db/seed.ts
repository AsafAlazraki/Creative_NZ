import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import { NATIONS } from './seed-data/nations';
import { ARTISTS_CORE } from './seed-data/artists-core';
import { ARTISTS_EMERGING } from './seed-data/artists-emerging';
import { ARTISTS_REST } from './seed-data/artists-rest';
import { PERSONAS } from './seed-data/personas';
import { WORKS } from './seed-data/works';
import { POSTS } from './seed-data/posts';
import { GRANTS } from './seed-data/grants';
import { AWARDS } from './seed-data/awards';
import { GROUPS } from './seed-data/groups';
import { EVENTS } from './seed-data/events';
import { ORGS } from './seed-data/orgs';
import { ARTICLES_PART_1 } from './seed-data/articles-part-1';
import { ARTICLES_PART_2 } from './seed-data/articles-part-2';
import { DROPS } from './seed-data/drops';

const DB_PATH = path.join(process.cwd(), 'db', 'kavaworks.db');

function run() {
  // Fresh start
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);

  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');

  // ---- Schema (mirrors db/schema.ts) ----
  db.exec(`
    CREATE TABLE nations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      flag TEXT NOT NULL,
      greeting_morning TEXT NOT NULL,
      greeting_evening TEXT NOT NULL,
      cultural_theme TEXT NOT NULL,
      pattern_id TEXT NOT NULL,
      heritage_artforms TEXT NOT NULL,
      language_code TEXT NOT NULL,
      elder_title TEXT NOT NULL,
      cultural_note TEXT NOT NULL
    );
    CREATE TABLE artists (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      handle TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL DEFAULT 'artist',
      primary_nation_id TEXT NOT NULL,
      affiliations TEXT NOT NULL,
      city TEXT NOT NULL,
      bio TEXT NOT NULL,
      statement TEXT NOT NULL,
      cover_image_credit TEXT,
      avatar_style TEXT NOT NULL DEFAULT 'illustrated-silhouette',
      verified INTEGER NOT NULL DEFAULT 0,
      elder_status INTEGER NOT NULL DEFAULT 0,
      elder_in_groups TEXT NOT NULL DEFAULT '[]',
      cultural_theme TEXT NOT NULL,
      artforms TEXT NOT NULL,
      years_active INTEGER NOT NULL DEFAULT 0,
      followers INTEGER NOT NULL DEFAULT 0,
      following INTEGER NOT NULL DEFAULT 0,
      posts_count INTEGER NOT NULL DEFAULT 0,
      works_sold INTEGER NOT NULL DEFAULT 0,
      supporters INTEGER NOT NULL DEFAULT 0,
      awards TEXT NOT NULL DEFAULT '[]',
      subscription_tiers TEXT NOT NULL DEFAULT '[]',
      exhibitions TEXT NOT NULL DEFAULT '[]',
      lineage TEXT NOT NULL DEFAULT '{}',
      expertise TEXT,
      office_hours TEXT,
      org_info TEXT
    );
    CREATE TABLE works (
      id TEXT PRIMARY KEY,
      artist_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price_nzd REAL NOT NULL,
      media_refs TEXT NOT NULL,
      artform TEXT NOT NULL,
      nation_id TEXT NOT NULL,
      materials TEXT NOT NULL,
      dimensions TEXT NOT NULL,
      edition TEXT,
      year_made INTEGER NOT NULL,
      cultural_story TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'live',
      shipping_from TEXT NOT NULL,
      tapu INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
    CREATE TABLE posts (
      id TEXT PRIMARY KEY,
      author_id TEXT NOT NULL,
      media_type TEXT NOT NULL,
      media_ref TEXT NOT NULL,
      poster_ref TEXT,
      duration_sec INTEGER,
      caption TEXT NOT NULL,
      caption_lang TEXT NOT NULL DEFAULT 'en',
      caption_translation TEXT,
      tapu INTEGER NOT NULL DEFAULT 0,
      nation_id TEXT NOT NULL,
      artform TEXT NOT NULL,
      collaborator_handles TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL,
      likes INTEGER NOT NULL DEFAULT 0,
      comments INTEGER NOT NULL DEFAULT 0,
      shares INTEGER NOT NULL DEFAULT 0,
      saves INTEGER NOT NULL DEFAULT 0,
      views INTEGER NOT NULL DEFAULT 0,
      comments_data TEXT NOT NULL DEFAULT '[]'
    );
    CREATE TABLE grants (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      funder TEXT NOT NULL,
      amount_min INTEGER NOT NULL,
      amount_max INTEGER NOT NULL,
      amount_display TEXT NOT NULL,
      duration TEXT,
      pool TEXT NOT NULL,
      tier INTEGER,
      eligibility TEXT NOT NULL,
      open_date TEXT NOT NULL,
      deadline TEXT NOT NULL,
      results_by TEXT,
      assessment_process TEXT NOT NULL,
      plain_english TEXT NOT NULL,
      how_to_apply TEXT NOT NULL,
      similar_grant_ids TEXT NOT NULL DEFAULT '[]',
      source_url TEXT NOT NULL,
      last_synced_at TEXT NOT NULL
    );
    CREATE TABLE awards (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      amount_nzd INTEGER NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      body TEXT NOT NULL,
      established_year INTEGER
    );
    CREATE TABLE groups (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      nation_id TEXT NOT NULL,
      charter TEXT NOT NULL,
      elder_ids TEXT NOT NULL,
      member_count INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      cover_pattern_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      recent_message_count INTEGER NOT NULL DEFAULT 0,
      threads_data TEXT NOT NULL DEFAULT '[]'
    );
    CREATE TABLE events (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      host_org_id TEXT,
      nation_id TEXT NOT NULL,
      venue TEXT NOT NULL,
      starts_at TEXT NOT NULL,
      ends_at TEXT NOT NULL,
      type TEXT NOT NULL,
      description TEXT NOT NULL,
      cover_image_credit TEXT,
      rsvp_count INTEGER NOT NULL DEFAULT 0,
      linked_artist_ids TEXT NOT NULL DEFAULT '[]'
    );
    CREATE TABLE orgs (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      logo TEXT,
      description TEXT NOT NULL,
      city TEXT NOT NULL,
      website TEXT NOT NULL,
      focus TEXT NOT NULL,
      linked_artist_ids TEXT NOT NULL DEFAULT '[]',
      current_programmes TEXT NOT NULL DEFAULT '[]',
      founded_year INTEGER
    );
    CREATE TABLE articles (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      author_role TEXT NOT NULL,
      read_time_min INTEGER NOT NULL,
      category TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      body TEXT NOT NULL,
      pull_quotes TEXT NOT NULL DEFAULT '[]',
      sidebar TEXT NOT NULL DEFAULT '[]',
      published_at TEXT NOT NULL,
      related_article_ids TEXT NOT NULL DEFAULT '[]'
    );
    CREATE TABLE drops (
      id TEXT PRIMARY KEY,
      artist_id TEXT NOT NULL,
      work_id TEXT NOT NULL,
      total_units INTEGER NOT NULL,
      remaining_units INTEGER NOT NULL,
      opens_at TEXT NOT NULL,
      closes_at TEXT NOT NULL,
      status TEXT NOT NULL,
      story_framing TEXT NOT NULL
    );
    CREATE TABLE follows (
      follower_id TEXT NOT NULL,
      followee_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      PRIMARY KEY (follower_id, followee_id)
    );
    CREATE TABLE saves (
      user_id TEXT NOT NULL,
      work_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      PRIMARY KEY (user_id, work_id)
    );
    CREATE TABLE likes (
      user_id TEXT NOT NULL,
      post_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      PRIMARY KEY (user_id, post_id)
    );
    CREATE TABLE collections (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      work_ids TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL
    );
    CREATE TABLE conversations (
      id TEXT PRIMARY KEY,
      conversation_key TEXT NOT NULL UNIQUE,
      user_a TEXT NOT NULL,
      user_b TEXT NOT NULL,
      last_message_at TEXT NOT NULL,
      last_message_preview TEXT
    );
    CREATE TABLE messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT NOT NULL,
      sender_id TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL,
      read_at TEXT
    );
    CREATE INDEX idx_messages_conv ON messages(conversation_id, created_at);
  `);

  // ---- Seed ----
  const insertNation = db.prepare(`
    INSERT INTO nations (id, name, flag, greeting_morning, greeting_evening, cultural_theme, pattern_id, heritage_artforms, language_code, elder_title, cultural_note)
    VALUES (@id, @name, @flag, @greeting_morning, @greeting_evening, @cultural_theme, @pattern_id, @heritage_artforms, @language_code, @elder_title, @cultural_note)
  `);
  for (const n of NATIONS) {
    insertNation.run({
      id: n.id,
      name: n.name,
      flag: n.flag,
      greeting_morning: n.greetingMorning,
      greeting_evening: n.greetingEvening,
      cultural_theme: n.culturalTheme,
      pattern_id: n.patternId,
      heritage_artforms: JSON.stringify(n.heritageArtforms),
      language_code: n.languageCode,
      elder_title: n.elderTitle,
      cultural_note: n.culturalNote,
    });
  }

  const insertArtist = db.prepare(`
    INSERT INTO artists (id, name, handle, role, primary_nation_id, affiliations, city, bio, statement, cover_image_credit, avatar_style, verified, elder_status, elder_in_groups, cultural_theme, artforms, years_active, followers, following, posts_count, works_sold, supporters, awards, subscription_tiers, exhibitions, lineage, expertise, office_hours, org_info)
    VALUES (@id, @name, @handle, @role, @primary_nation_id, @affiliations, @city, @bio, @statement, @cover_image_credit, @avatar_style, @verified, @elder_status, @elder_in_groups, @cultural_theme, @artforms, @years_active, @followers, @following, @posts_count, @works_sold, @supporters, @awards, @subscription_tiers, @exhibitions, @lineage, @expertise, @office_hours, @org_info)
  `);
  const allArtists = [...ARTISTS_CORE, ...ARTISTS_EMERGING, ...ARTISTS_REST, ...PERSONAS];
  for (const a of allArtists) {
    insertArtist.run({
      id: a.id,
      name: a.name,
      handle: a.handle,
      role: a.role,
      primary_nation_id: a.primaryNationId,
      affiliations: JSON.stringify(a.affiliations),
      city: a.city,
      bio: a.bio,
      statement: a.statement,
      cover_image_credit: a.coverImageCredit ?? null,
      avatar_style: a.avatarStyle,
      verified: a.verified ? 1 : 0,
      elder_status: a.elderStatus ? 1 : 0,
      elder_in_groups: JSON.stringify(a.elderInGroups),
      cultural_theme: a.culturalTheme,
      artforms: JSON.stringify(a.artforms),
      years_active: a.yearsActive,
      followers: a.followers,
      following: a.following,
      posts_count: a.postsCount,
      works_sold: a.worksSold,
      supporters: a.supporters,
      awards: JSON.stringify(a.awards),
      subscription_tiers: JSON.stringify(a.subscriptionTiers),
      exhibitions: JSON.stringify(a.exhibitions),
      lineage: JSON.stringify(a.lineage),
      expertise: a.expertise ? JSON.stringify(a.expertise) : null,
      office_hours: a.officeHours ?? null,
      org_info: a.orgInfo ? JSON.stringify(a.orgInfo) : null,
    });
  }

  const insertWork = db.prepare(`
    INSERT INTO works (id, artist_id, title, description, price_nzd, media_refs, artform, nation_id, materials, dimensions, edition, year_made, cultural_story, status, shipping_from, tapu, created_at)
    VALUES (@id, @artist_id, @title, @description, @price_nzd, @media_refs, @artform, @nation_id, @materials, @dimensions, @edition, @year_made, @cultural_story, @status, @shipping_from, @tapu, @created_at)
  `);
  for (const w of WORKS) {
    insertWork.run({
      id: w.id,
      artist_id: w.artistId,
      title: w.title,
      description: w.description,
      price_nzd: w.priceNzd,
      media_refs: JSON.stringify(w.mediaRefs),
      artform: w.artform,
      nation_id: w.nationId,
      materials: w.materials,
      dimensions: w.dimensions,
      edition: w.edition ? JSON.stringify(w.edition) : null,
      year_made: w.yearMade,
      cultural_story: w.culturalStory,
      status: w.status,
      shipping_from: w.shippingFrom,
      tapu: w.tapu ? 1 : 0,
      created_at: w.createdAt,
    });
  }

  const insertPost = db.prepare(`
    INSERT INTO posts (id, author_id, media_type, media_ref, poster_ref, duration_sec, caption, caption_lang, caption_translation, tapu, nation_id, artform, collaborator_handles, created_at, likes, comments, shares, saves, views, comments_data)
    VALUES (@id, @author_id, @media_type, @media_ref, @poster_ref, @duration_sec, @caption, @caption_lang, @caption_translation, @tapu, @nation_id, @artform, @collaborator_handles, @created_at, @likes, @comments, @shares, @saves, @views, @comments_data)
  `);
  for (const p of POSTS) {
    insertPost.run({
      id: p.id,
      author_id: p.authorId,
      media_type: p.mediaType,
      media_ref: p.mediaRef,
      poster_ref: p.posterRef ?? null,
      duration_sec: p.durationSec ?? null,
      caption: p.caption,
      caption_lang: p.captionLang,
      caption_translation: p.captionTranslation ?? null,
      tapu: p.tapu ? 1 : 0,
      nation_id: p.nationId,
      artform: p.artform,
      collaborator_handles: JSON.stringify(p.collaboratorHandles),
      created_at: p.createdAt,
      likes: p.likes,
      comments: p.comments,
      shares: p.shares,
      saves: p.saves,
      views: p.views,
      comments_data: JSON.stringify(p.commentsData),
    });
  }

  const insertGrant = db.prepare(`
    INSERT INTO grants (id, name, funder, amount_min, amount_max, amount_display, duration, pool, tier, eligibility, open_date, deadline, results_by, assessment_process, plain_english, how_to_apply, similar_grant_ids, source_url, last_synced_at)
    VALUES (@id, @name, @funder, @amount_min, @amount_max, @amount_display, @duration, @pool, @tier, @eligibility, @open_date, @deadline, @results_by, @assessment_process, @plain_english, @how_to_apply, @similar_grant_ids, @source_url, @last_synced_at)
  `);
  for (const g of GRANTS) {
    insertGrant.run({
      id: g.id,
      name: g.name,
      funder: g.funder,
      amount_min: g.amountMin,
      amount_max: g.amountMax,
      amount_display: g.amountDisplay,
      duration: g.duration ?? null,
      pool: g.pool,
      tier: g.tier ?? null,
      eligibility: JSON.stringify(g.eligibility),
      open_date: g.openDate,
      deadline: g.deadline,
      results_by: g.resultsBy ?? null,
      assessment_process: g.assessmentProcess,
      plain_english: g.plainEnglish,
      how_to_apply: JSON.stringify(g.howToApply),
      similar_grant_ids: JSON.stringify(g.similarGrantIds),
      source_url: g.sourceUrl,
      last_synced_at: g.lastSyncedAt,
    });
  }

  const insertAward = db.prepare(`
    INSERT INTO awards (id, name, amount_nzd, description, category, body, established_year)
    VALUES (@id, @name, @amount_nzd, @description, @category, @body, @established_year)
  `);
  for (const a of AWARDS) {
    insertAward.run({
      id: a.id,
      name: a.name,
      amount_nzd: a.amountNzd,
      description: a.description,
      category: a.category,
      body: a.body,
      established_year: a.establishedYear ?? null,
    });
  }

  const insertGroup = db.prepare(`
    INSERT INTO groups (id, name, description, nation_id, charter, elder_ids, member_count, status, cover_pattern_id, created_at, recent_message_count, threads_data)
    VALUES (@id, @name, @description, @nation_id, @charter, @elder_ids, @member_count, @status, @cover_pattern_id, @created_at, @recent_message_count, @threads_data)
  `);
  for (const g of GROUPS) {
    insertGroup.run({
      id: g.id,
      name: g.name,
      description: g.description,
      nation_id: g.nationId,
      charter: g.charter,
      elder_ids: JSON.stringify(g.elderIds),
      member_count: g.memberCount,
      status: g.status,
      cover_pattern_id: g.coverPatternId,
      created_at: g.createdAt,
      recent_message_count: g.recentMessageCount,
      threads_data: JSON.stringify(g.threadsData),
    });
  }

  const insertEvent = db.prepare(`
    INSERT INTO events (id, title, host_org_id, nation_id, venue, starts_at, ends_at, type, description, cover_image_credit, rsvp_count, linked_artist_ids)
    VALUES (@id, @title, @host_org_id, @nation_id, @venue, @starts_at, @ends_at, @type, @description, @cover_image_credit, @rsvp_count, @linked_artist_ids)
  `);
  for (const e of EVENTS) {
    insertEvent.run({
      id: e.id,
      title: e.title,
      host_org_id: e.hostOrgId ?? null,
      nation_id: e.nationId,
      venue: e.venue,
      starts_at: e.startsAt,
      ends_at: e.endsAt,
      type: e.type,
      description: e.description,
      cover_image_credit: e.coverImageCredit ?? null,
      rsvp_count: e.rsvpCount,
      linked_artist_ids: JSON.stringify(e.linkedArtistIds),
    });
  }

  const insertOrg = db.prepare(`
    INSERT INTO orgs (id, name, logo, description, city, website, focus, linked_artist_ids, current_programmes, founded_year)
    VALUES (@id, @name, @logo, @description, @city, @website, @focus, @linked_artist_ids, @current_programmes, @founded_year)
  `);
  for (const o of ORGS) {
    insertOrg.run({
      id: o.id,
      name: o.name,
      logo: null,
      description: o.description,
      city: o.city,
      website: o.website,
      focus: JSON.stringify(o.focus),
      linked_artist_ids: JSON.stringify(o.linkedArtistIds),
      current_programmes: JSON.stringify(o.currentProgrammes),
      founded_year: o.foundedYear ?? null,
    });
  }

  const insertArticle = db.prepare(`
    INSERT INTO articles (id, title, author, author_role, read_time_min, category, excerpt, body, pull_quotes, sidebar, published_at, related_article_ids)
    VALUES (@id, @title, @author, @author_role, @read_time_min, @category, @excerpt, @body, @pull_quotes, @sidebar, @published_at, @related_article_ids)
  `);
  const allArticles = [...ARTICLES_PART_1, ...ARTICLES_PART_2];
  for (const a of allArticles) {
    insertArticle.run({
      id: a.id,
      title: a.title,
      author: a.author,
      author_role: a.authorRole,
      read_time_min: a.readTimeMin,
      category: a.category,
      excerpt: a.excerpt,
      body: a.body,
      pull_quotes: JSON.stringify(a.pullQuotes),
      sidebar: JSON.stringify(a.sidebar),
      published_at: a.publishedAt,
      related_article_ids: JSON.stringify(a.relatedArticleIds),
    });
  }

  const insertDrop = db.prepare(`
    INSERT INTO drops (id, artist_id, work_id, total_units, remaining_units, opens_at, closes_at, status, story_framing)
    VALUES (@id, @artist_id, @work_id, @total_units, @remaining_units, @opens_at, @closes_at, @status, @story_framing)
  `);
  for (const d of DROPS) {
    insertDrop.run({
      id: d.id,
      artist_id: d.artistId,
      work_id: d.workId,
      total_units: d.totalUnits,
      remaining_units: d.remainingUnits,
      opens_at: d.opensAt,
      closes_at: d.closesAt,
      status: d.status,
      story_framing: d.storyFraming,
    });
  }

  // ---- Sample interactions ----
  const insertFollow = db.prepare(
    `INSERT OR IGNORE INTO follows (follower_id, followee_id, created_at) VALUES (?, ?, ?)`,
  );
  const now = new Date().toISOString();
  // Persona artist follows a few peers
  for (const peer of ['artist_003', 'artist_004', 'artist_007', 'persona_elder']) {
    insertFollow.run('artist_001', peer, now);
  }
  // Audience persona follows many
  for (const peer of allArtists.filter((a) => a.role === 'artist').slice(0, 12)) {
    insertFollow.run('persona_audience', peer.id, now);
  }
  // Collector persona follows all artists
  for (const peer of allArtists.filter((a) => a.role === 'artist')) {
    insertFollow.run('persona_collector', peer.id, now);
  }
  // Adviser caseload
  for (const peer of ['artist_001', 'artist_002', 'artist_004', 'artist_005', 'artist_010']) {
    insertFollow.run('persona_adviser', peer, now);
  }

  const insertCollection = db.prepare(
    `INSERT INTO collections (id, user_id, title, description, work_ids, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
  );
  insertCollection.run(
    'coll_collector_bark',
    'persona_collector',
    'Pacific bark cloths',
    'Siapo, ngatu, hiapo, kapa, masi — the bark-cloth lineage of the Pacific in our home.',
    JSON.stringify(['work_001', 'work_004', 'work_013', 'work_005']),
    now,
  );
  insertCollection.run(
    'coll_collector_weave',
    'persona_collector',
    'Weaving and textile',
    'Tīvaevae, fala, bilum, kuta.',
    JSON.stringify(['work_007', 'work_008', 'work_009', 'work_015']),
    now,
  );
  insertCollection.run(
    'coll_audience_wishlist',
    'persona_audience',
    'Wishlist 2026',
    'Pieces I would buy if the budget allowed.',
    JSON.stringify(['work_016', 'work_011', 'work_017']),
    now,
  );

  // Seed some conversations so the inbox isn't empty.
  const insertConv = db.prepare(
    `INSERT INTO conversations (id, conversation_key, user_a, user_b, last_message_at, last_message_preview)
     VALUES (?, ?, ?, ?, ?, ?)`,
  );
  const insertMsg = db.prepare(
    `INSERT INTO messages (id, conversation_id, sender_id, body, created_at, read_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  );

  const convKey = (a: string, b: string) => [a, b].sort().join('|');
  const seedConv = (id: string, a: string, b: string, messages: Array<{ from: string; body: string; at: string }>) => {
    const last = messages[messages.length - 1];
    insertConv.run(id, convKey(a, b), a, b, last.at, last.body.slice(0, 80));
    messages.forEach((m, i) =>
      insertMsg.run(`${id}_m${i}`, id, m.from, m.body, m.at, m.at),
    );
  };

  seedConv('conv_1', 'artist_001', 'artist_003', [
    { from: 'artist_003', body: 'Bula Lesā. I saw your Whenua Whakapapa III at Māngere last October. It stopped me.', at: '2026-04-20T10:04:00+12:00' },
    { from: 'artist_001', body: 'Fa\'afetai, Akanisi. Means a lot coming from you. How is the Kirikiriroa youth wānanga?', at: '2026-04-20T11:22:00+12:00' },
    { from: 'artist_003', body: 'Twelve kids this cohort. Two of them are already ready to show — pieces that carry their own voice, not just mine.', at: '2026-04-20T11:41:00+12:00' },
    { from: 'artist_001', body: 'That\'s the work. When can they bring pieces up to Auckland? I\'ll make space at the Saturday wānanga.', at: '2026-04-20T12:00:00+12:00' },
  ]);

  seedConv('conv_2', 'artist_001', 'persona_adviser', [
    { from: 'persona_adviser', body: 'Mālō e lelei Lesā — I\'m reviewing the AOG Pacific Tier 2 round opening in May. Are you thinking about applying with the Saturday wānanga?', at: '2026-04-19T09:00:00+12:00' },
    { from: 'artist_001', body: 'Mālō Semisi. I think so. The wānanga has outgrown my garage. Tuesday 2pm kōrero?', at: '2026-04-19T09:45:00+12:00' },
    { from: 'persona_adviser', body: 'Booked. I\'ll bring the AOG criteria and a template. We\'ll write the first paragraph together.', at: '2026-04-19T09:58:00+12:00' },
  ]);

  seedConv('conv_3', 'artist_001', 'persona_collector', [
    { from: 'persona_collector', body: 'Kia ora Lesā. Hinemoa here. I\'d like to acquire Moana Whakapapa I for our family collection. It belongs with us.', at: '2026-04-18T16:00:00+12:00' },
    { from: 'artist_001', body: 'Tēnā koe Hinemoa. I\'d be honoured. Would you like to visit the studio before you decide?', at: '2026-04-18T17:12:00+12:00' },
    { from: 'persona_collector', body: 'Yes — Friday afternoon if that works.', at: '2026-04-18T17:30:00+12:00' },
  ]);

  seedConv('conv_4', 'artist_001', 'persona_org', [
    { from: 'persona_org', body: 'Talofa Lesā. We\'d love to programme a small solo show of your new series for November. Could we talk?', at: '2026-04-17T10:00:00+12:00' },
    { from: 'artist_001', body: 'Talofa. Yes — absolutely. Let me know a time.', at: '2026-04-17T10:22:00+12:00' },
  ]);

  seedConv('conv_5', 'artist_001', 'artist_005', [
    { from: 'artist_005', body: 'Lesā — my first drop goes live tomorrow. Very nervous. Just wanted to say thank you for all of it.', at: '2026-04-21T20:00:00+12:00' },
    { from: 'artist_001', body: 'Folasāga. The work is good. Inati holds the rest. Breathe.', at: '2026-04-21T20:14:00+12:00' },
  ]);

  db.close();

  console.log(`Seeded ${NATIONS.length} nations, ${allArtists.length} artists, ${WORKS.length} works, ${POSTS.length} posts, ${GRANTS.length} grants, ${AWARDS.length} awards, ${GROUPS.length} groups, ${EVENTS.length} events, ${ORGS.length} orgs, ${allArticles.length} articles, ${DROPS.length} drops.`);
}

run();
