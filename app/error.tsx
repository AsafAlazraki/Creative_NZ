'use client';

import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <p
        className="font-display text-2xl"
        style={{ color: 'var(--ink)' }}
      >
        The vā is quiet right now.
      </p>
      <p
        className="mt-3 font-editorial italic"
        style={{ color: 'var(--ink-muted)', fontSize: 18, lineHeight: 1.5 }}
      >
        Something didn't load as it should. Try again, or step back to the feed.
      </p>
      {error.digest && (
        <p
          className="mt-4 font-mono text-xs"
          style={{ color: 'var(--ink-soft)' }}
        >
          ref: {error.digest}
        </p>
      )}
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => reset()}
          className="rounded-md px-5 py-2.5 font-semibold"
          style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md border px-5 py-2.5 font-semibold"
          style={{ borderColor: 'var(--hairline)' }}
        >
          Back to feed
        </Link>
      </div>
    </div>
  );
}
