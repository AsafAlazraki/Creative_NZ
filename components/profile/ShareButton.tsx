'use client';
import { useState } from 'react';

export function ShareButton({ handle, name, variant = 'ghost' }: { handle: string; name: string; variant?: 'ghost' | 'plain' }) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    if (typeof window === 'undefined') return;
    const url = `${window.location.origin}/artist/${handle}`;
    try {
      if (navigator.share) {
        await navigator.share({ url, title: name, text: `${name} on KavaWorks` });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled */
    }
  };

  if (variant === 'ghost') {
    return (
      <button
        onClick={onClick}
        className="rounded-md px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.03]"
        style={{ background: 'var(--accent-coral)' }}
        aria-label={`Share ${name}'s profile`}
      >
        {copied ? 'Link copied' : 'Share'}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="rounded-md border px-4 py-2 text-sm font-semibold"
      style={{ borderColor: 'var(--hairline)' }}
      aria-label={`Share ${name}'s profile`}
    >
      {copied ? 'Link copied' : 'Share'}
    </button>
  );
}
