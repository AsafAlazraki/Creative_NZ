import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPosts, getArtistById } from '@/lib/repo';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { VerifiedBadge } from '@/components/cultural/Badges';
import { postImageUrl } from '@/lib/images';

const PLAYLISTS = [
  {
    id: 'siapo_year',
    title: 'A year in siapo',
    curator: 'Lesā Tupuola Feʻilo',
    count: 12,
    pattern: 'pattern-tapa',
    description: 'A full year of siapo making captured on camera — bark preparation, dye extraction, and the slow patience of pressing.',
    artforms: ['siapo', 'tapa'],
  },
  {
    id: 'young_voices',
    title: 'Young voices — emerging Pacific artists 2026',
    curator: 'KavaWorks editorial',
    count: 18,
    pattern: 'pattern-niu',
    description: 'Eighteen artists under thirty sharing work that refuses easy categorisation. Collage, code, clay, and conversation.',
    artforms: [],
  },
  {
    id: 'elders_teaching',
    title: 'Elders teaching',
    curator: 'Matai Tuiʻi Alefaio',
    count: 9,
    pattern: 'pattern-koula',
    description: 'Kaumatua and matai share technique and story. Watch, listen, remember.',
    artforms: [],
  },
  {
    id: 'process_carving',
    title: 'Process — carving',
    curator: 'Folasāga Talagi-Pule',
    count: 14,
    pattern: 'pattern-koula',
    description: 'From raw timber to finished work — carvers across the Pacific share their process without narration, letting the hands speak.',
    artforms: ['carving', 'sculpture', 'woodwork'],
  },
  {
    id: 'spoken_word',
    title: 'Spoken word — Pasifika Aotearoa',
    curator: 'Aroha Tiatia',
    count: 22,
    pattern: 'pattern-niu',
    description: 'Pasifika poets and spoken word artists performing in Auckland, Wellington, Christchurch, and online. Language, land, and the body.',
    artforms: ['spoken word', 'poetry', 'performance'],
  },
  {
    id: 'climate_moana',
    title: 'Climate + Moana',
    curator: 'Maluafou Tekeu',
    count: 11,
    pattern: 'pattern-tuvalu-fala',
    description: 'Artists responding to sea level rise, coral bleaching, and the politics of climate displacement. Not despair — action, beauty, survival.',
    artforms: ['photography', 'video', 'installation'],
  },
];

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const playlist = PLAYLISTS.find((p) => p.id === id);
  if (!playlist) return {};
  return { title: `${playlist.title} · KavaWorks` };
}

export default async function PlaylistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const playlist = PLAYLISTS.find((p) => p.id === id);
  if (!playlist) notFound();

  const allPosts = getPosts({ limit: 100 });
  let posts = playlist.artforms.length
    ? allPosts.filter((p) =>
        playlist.artforms.some((a) =>
          p.artform.toLowerCase().includes(a.toLowerCase()),
        ),
      )
    : allPosts;

  if (posts.length < 6) posts = allPosts;
  posts = posts.slice(0, playlist.count);

  return (
    <div className="px-4 py-6 lg:px-10">
      <nav className="mb-6 text-sm" style={{ color: 'var(--ink-muted)' }}>
        <Link href="/playlists" className="hover:underline">
          Playlists
        </Link>
        <span className="mx-2">/</span>
        <span>{playlist.title}</span>
      </nav>

      <CulturalPattern
        id={playlist.pattern}
        opacity={0.14}
        tone="brand"
        size={72}
        className="mb-8 overflow-hidden rounded-2xl border aspect-[21/6]"
      >
        <div
          className="flex h-full flex-col justify-end p-8"
          style={{ background: 'color-mix(in srgb, var(--paper) 60%, transparent)' }}
        >
          <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
            Playlist · {posts.length} videos
          </div>
          <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{playlist.title}</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
            Curated by {playlist.curator}
          </p>
        </div>
      </CulturalPattern>

      <p className="mb-8 max-w-2xl font-editorial italic" style={{ color: 'var(--ink-muted)', fontSize: 17, lineHeight: 1.55 }}>
        {playlist.description}
      </p>

      <div className="space-y-3">
        {posts.map((post, i) => {
          const artist = getArtistById(post.authorId);
          const thumb = postImageUrl({
            artform: post.artform,
            nationId: post.nationId,
            caption: post.caption,
            mediaType: 'image',
            seed: post.id,
            w: 240,
            h: 135,
          });

          return (
            <div
              key={post.id}
              className="flex items-center gap-4 rounded-xl border p-3 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <div className="font-mono text-sm w-6 text-center shrink-0" style={{ color: 'var(--ink-soft)' }}>
                {i + 1}
              </div>
              <div className="relative shrink-0 w-28 rounded-lg overflow-hidden aspect-video bg-[var(--surface-2)]">
                <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div style={{
                    background: 'rgba(0,0,0,0.55)', borderRadius: 99,
                    width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, color: '#fff',
                  }}>▶</div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{post.caption.slice(0, 72)}{post.caption.length > 72 ? '…' : ''}</div>
                {artist && (
                  <div className="mt-1 flex items-center gap-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
                    <AvatarIllustrated nationId={artist.primaryNationId} size={18} name={artist.name} />
                    <span>{artist.name}</span>
                    {artist.verified && <VerifiedBadge />}
                    <span>· {post.artform}</span>
                  </div>
                )}
              </div>
              <div className="text-xs shrink-0" style={{ color: 'var(--ink-soft)' }}>
                ♡ {post.likes}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
