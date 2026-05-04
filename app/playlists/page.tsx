import Link from 'next/link';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';

const PLAYLISTS = [
  { id: 'siapo_year', title: 'A year in siapo', curator: 'Lesā Tupuola Feʻilo', count: 12, pattern: 'pattern-tapa' },
  { id: 'young_voices', title: 'Young voices — emerging Pacific artists 2026', curator: 'KavaWorks editorial', count: 18, pattern: 'pattern-niu' },
  { id: 'elders_teaching', title: 'Elders teaching', curator: 'Matai Tuiʻi Alefaio', count: 9, pattern: 'pattern-koula' },
  { id: 'process_carving', title: 'Process — carving', curator: 'Folasāga Talagi-Pule', count: 14, pattern: 'pattern-koula' },
  { id: 'spoken_word', title: 'Spoken word — Pasifika Aotearoa', curator: 'Aroha Tiatia', count: 22, pattern: 'pattern-niu' },
  { id: 'climate_moana', title: 'Climate + Moana', curator: 'Maluafou Tekeu', count: 11, pattern: 'pattern-tuvalu-fala' },
];

export const metadata = { title: 'Playlists · KavaWorks' };

export default function PlaylistsPage() {
  return (
    <div className="px-4 py-6 lg:px-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
          Playlists
        </div>
        <h1 className="mt-2 font-display text-4xl font-semibold">Curated video collections.</h1>
        <p className="mt-2 max-w-2xl font-editorial italic" style={{ color: 'var(--ink-muted)', fontSize: 17, lineHeight: 1.5 }}>
          Each playlist is curated by a named Pacific artist or adviser. The playlist is part of the
          work, not a neutral filter.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PLAYLISTS.map((p) => (
          <Link
            key={p.id}
            href={`/playlists/${p.id}`}
            className="overflow-hidden rounded-xl border transition-shadow hover:shadow-md"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', textDecoration: 'none' }}
          >
            <CulturalPattern id={p.pattern} opacity={0.18} tone="brand" size={56} className="aspect-[16/9] border-b" />
            <div className="p-5">
              <h2 className="font-display text-lg font-semibold">{p.title}</h2>
              <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
                Curated by {p.curator} · {p.count} videos
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
