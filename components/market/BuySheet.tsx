'use client';
import { useState } from 'react';
import type { HydratedArtist, HydratedWork } from '@/lib/repo';
import { artistShare, formatPrice } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export function BuySheet({ work, artist }: { work: HydratedWork; artist: HydratedArtist }) {
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const share = artistShare(work.priceNzd);

  if (work.status !== 'live') {
    return (
      <button
        className="rounded-md border px-5 py-3 font-semibold cursor-not-allowed"
        style={{ borderColor: 'var(--hairline)', color: 'var(--ink-soft)' }}
        disabled
      >
        {work.status === 'sold' ? 'Sold' : 'Unavailable'}
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md px-5 py-3 font-semibold transition-transform hover:scale-[1.02]"
        style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
      >
        Claim this piece
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 md:items-center"
          style={{ background: 'rgba(15,14,12,0.55)' }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border p-6 md:p-8"
            style={{ background: 'var(--surface)', borderColor: 'var(--hairline)' }}
          >
            <button
              onClick={() => {
                setOpen(false);
                setComplete(false);
              }}
              className="absolute right-4 top-4 rounded-md p-2 hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
              aria-label="Close"
            >
              <Icon name="x" size={16} />
            </button>
            {!complete ? (
              <div>
                <div
                  className="text-xs uppercase tracking-wider"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  Purchase
                </div>
                <h2 className="mt-1 font-display text-2xl font-semibold">{work.title}</h2>
                <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
                  by {artist.name} · {work.dimensions}
                </p>

                <div
                  className="mt-6 rounded-lg border p-4"
                  style={{ borderColor: 'var(--hairline)', background: 'var(--surface-2)' }}
                >
                  <div className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                    Inati — transparent split
                  </div>
                  <div className="flex items-baseline justify-between font-mono">
                    <span style={{ color: 'var(--ink-muted)' }}>Price</span>
                    <span>{formatPrice(share.total)}</span>
                  </div>
                  <div
                    className="mt-2 flex items-baseline justify-between font-mono"
                    style={{ color: 'var(--accent-jade)' }}
                  >
                    <span>to {artist.name.split(' ')[0]}</span>
                    <span>{formatPrice(share.artist)} <span className="text-xs">(95%)</span></span>
                  </div>
                  <div
                    className="flex items-baseline justify-between font-mono"
                    style={{ color: 'var(--ink-soft)' }}
                  >
                    <span>Platform (payment + ops)</span>
                    <span>{formatPrice(share.platform)} <span className="text-xs">(5%)</span></span>
                  </div>
                </div>

                <p
                  className="mt-4 rounded-md border-l-2 p-3 text-sm italic"
                  style={{
                    borderColor: 'var(--brand)',
                    color: 'var(--ink-muted)',
                    background: 'color-mix(in srgb, var(--brand) 4%, transparent)',
                  }}
                >
                  This is a demo. No payment will be taken. Your purchase is recorded in the demo
                  DB only.
                </p>

                <button
                  onClick={() => setComplete(true)}
                  className="mt-5 w-full rounded-md px-5 py-3 font-semibold"
                  style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
                >
                  Complete purchase
                </button>
              </div>
            ) : (
              <div>
                <div className="font-display text-2xl font-semibold">Fa'afetai.</div>
                <p
                  className="mt-3 font-editorial italic"
                  style={{ color: 'var(--ink-muted)', lineHeight: 1.6, fontSize: 18 }}
                >
                  Your support goes to {artist.name} — {formatPrice(share.artist)} of this payment is theirs.
                </p>
                <p className="mt-3 text-sm" style={{ color: 'var(--ink-muted)' }}>
                  Attribution for this piece — artist, island, nation, and cultural story — travels
                  with the work, always.
                </p>
                <button
                  onClick={() => {
                    setOpen(false);
                    setComplete(false);
                  }}
                  className="mt-5 w-full rounded-md border px-5 py-3 font-semibold"
                  style={{ borderColor: 'var(--hairline)' }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
