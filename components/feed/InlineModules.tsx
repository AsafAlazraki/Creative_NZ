import Link from 'next/link';
import { getActiveDrop, getGrants, getArtistById, getWorkById } from '@/lib/repo';
import { daysUntil } from '@/lib/moana-ola-kb';
import { workImageUrl } from '@/lib/images';
import { formatPrice } from '@/lib/utils';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { CountdownClient } from './CountdownClient';

export function DropModule() {
  const drop = getActiveDrop();
  if (!drop) return null;
  const artist = getArtistById(drop.artistId);
  const work = getWorkById(drop.workId);
  if (!artist || !work) return null;
  const img = workImageUrl({ artform: work.artform, nationId: work.nationId, seed: work.id, w: 240, h: 240 });

  return (
    <Link
      href="/drops"
      style={{
        borderRadius: 14, overflow: 'hidden',
        border: '2px solid var(--coral)', background: 'var(--surface)',
        display: 'flex', gap: 0, textDecoration: 'none',
      }}
    >
      <div style={{ width: 120, flexShrink: 0, overflow: 'hidden' }}>
        <img src={img} alt={work.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      </div>
      <div style={{ padding: '14px 16px', flex: 1 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--coral)', marginBottom: 4,
        }}>
          ● Live Drop
        </div>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{work.title}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 8 }}>
          {drop.remainingUnits}/{drop.totalUnits} left · {formatPrice(work.priceNzd)} ea
        </div>
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px',
            borderRadius: 10, background: 'var(--coral)', color: '#fff',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13,
          }}
        >
          ⚡ Claim
        </div>
      </div>
    </Link>
  );
}

export function GrantModule() {
  const grants = getGrants();
  const soon = grants
    .map((g) => ({ g, days: daysUntil(g.deadline) }))
    .filter((x) => x.days > 0 && x.days < 60)
    .sort((a, b) => a.days - b.days)[0];
  if (!soon) return null;

  return (
    <Link
      href={`/grants/${soon.g.id}`}
      style={{
        display: 'block', borderRadius: 14, padding: '14px 16px', textDecoration: 'none',
        border: '1px solid color-mix(in srgb, var(--whetu) 25%, transparent)',
        background: 'color-mix(in srgb, var(--whetu) 5%, transparent)',
      }}
    >
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--whetu)', marginBottom: 6,
      }}>
        Grant closing soon
      </div>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, lineHeight: 1.3 }}>{soon.g.name}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{soon.g.funder}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--whetu)' }}>
          {soon.days}d left
        </span>
      </div>
    </Link>
  );
}

export function PlatformNoteModule({ note, author }: { note: string; author: string }) {
  return (
    <div
      style={{
        borderRadius: 14, padding: '16px 18px',
        borderLeft: '3px solid var(--whetu)',
        border: '1px solid var(--rule)', borderLeftWidth: 3, borderLeftColor: 'var(--whetu)',
        background: 'var(--surface)',
      }}
    >
      <p style={{
        fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
        fontSize: 15, lineHeight: 1.55, margin: '0 0 10px', color: 'var(--ink)',
      }}>
        "{note}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--whetu)' }}>
        <span>✦</span>
        <span style={{ fontWeight: 600 }}>{author}</span>
      </div>
    </div>
  );
}
