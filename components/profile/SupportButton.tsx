'use client';
import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { formatPrice } from '@/lib/utils';

export function SupportButton({
  artistName,
  tier,
}: {
  artistName: string;
  tier: { name: string; priceNzd: number; perks: string[] };
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 w-full rounded-md px-4 py-2 font-semibold transition-transform hover:scale-[1.02]"
        style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
      >
        Support {artistName.split(' ')[0]} · {formatPrice(tier.priceNzd)}/mo
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Confirm ${tier.name} support for ${artistName}`}
          className="fixed inset-0 z-50 flex items-end justify-center p-4 md:items-center"
          style={{ background: 'rgba(15,14,12,0.55)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border p-6"
            style={{ background: 'var(--surface)', borderColor: 'var(--hairline)' }}
          >
            <button
              onClick={() => {
                setOpen(false);
                setDone(false);
              }}
              className="absolute right-4 top-4 rounded-md p-2 hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
              aria-label="Close"
            >
              <Icon name="x" size={16} />
            </button>
            {!done ? (
              <>
                <h2 className="font-display text-xl font-semibold">Support {artistName}</h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
                  {tier.name} · <span className="font-mono">{formatPrice(tier.priceNzd)}/month</span>
                </p>
                <ul
                  className="mt-4 space-y-1.5 text-sm"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  {tier.perks.map((p) => (
                    <li key={p} className="flex items-start gap-1.5">
                      <span aria-hidden>·</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <p
                  className="mt-4 rounded-md border-l-2 p-3 text-sm italic"
                  style={{
                    borderColor: 'var(--brand)',
                    color: 'var(--ink-muted)',
                    background: 'color-mix(in srgb, var(--brand) 4%, transparent)',
                  }}
                >
                  This is a demo — no payment will be taken. Your subscription is recorded in the
                  demo DB only.
                </p>
                <button
                  onClick={() => setDone(true)}
                  className="mt-5 w-full rounded-md px-5 py-3 font-semibold"
                  style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
                >
                  Confirm — Support {artistName.split(' ')[0]}
                </button>
              </>
            ) : (
              <>
                <div className="font-display text-xl font-semibold">Fa'afetai.</div>
                <p
                  className="mt-3 font-editorial italic"
                  style={{ color: 'var(--ink-muted)', lineHeight: 1.6, fontSize: 17 }}
                >
                  You're a {tier.name.toLowerCase()} of {artistName} now. 95% of every payment is
                  theirs.
                </p>
                <button
                  onClick={() => {
                    setOpen(false);
                    setDone(false);
                  }}
                  className="mt-5 w-full rounded-md border px-5 py-3 font-semibold"
                  style={{ borderColor: 'var(--hairline)' }}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
