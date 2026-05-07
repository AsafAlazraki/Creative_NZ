'use client';
import { useEffect, useState } from 'react';
import { greetingFor, proverbOfTheDay, PACIFIC_PROVERBS } from '@/lib/tauhi-va-kb';

const PATTERN_SVG = {
  tapa: `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><g fill='none' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='square'><rect x="4" y="4" width="16" height="16"/><rect x="28" y="4" width="16" height="16"/><rect x="4" y="28" width="16" height="16"/><rect x="28" y="28" width="16" height="16"/></g></svg>`,
  moana: `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><g fill='none' stroke='%23ffffff' stroke-width='1.5'><path d="M0 12 Q12 6 24 12 T48 12"/><path d="M0 24 Q12 18 24 24 T48 24"/><path d="M0 36 Q12 30 24 36 T48 36"/></g></svg>`,
  niu: `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><g fill='none' stroke='%23ffffff' stroke-width='1.5'><path d="M24 0 L48 24 L24 48 L0 24 Z"/><path d="M24 12 L36 24 L24 36 L12 24 Z"/><circle cx="24" cy="24" r="3"/></g></svg>`,
  koula: `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><g fill='none' stroke='%23ffffff' stroke-width='1.5'><path d="M0 0 L24 24 L0 48 M48 0 L24 24 L48 48"/><circle cx="12" cy="12" r="1.5"/><circle cx="36" cy="12" r="1.5"/><circle cx="12" cy="36" r="1.5"/><circle cx="36" cy="36" r="1.5"/></g></svg>`,
  'ula-fala': `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><g fill='none' stroke='%23ffffff' stroke-width='1.5'><path d="M0 24 L12 12 L24 24 L36 12 L48 24"/><path d="M0 36 L12 24 L24 36 L36 24 L48 36"/></g></svg>`,
};

const NATION_PATTERN: Record<string, keyof typeof PATTERN_SVG> = {
  samoa: 'tapa', tonga: 'koula', fiji: 'moana', cooks: 'ula-fala',
  aotearoa: 'niu', hawaii: 'moana', tahiti: 'tapa', niue: 'koula',
  png: 'niu', vanuatu: 'ula-fala', solomons: 'moana', tuvalu: 'ula-fala',
  tokelau: 'moana', kiribati: 'koula',
};

export function GreetingStrip({ name, nationId }: { name: string; nationId: string }) {
  const [state, setState] = useState<{
    greeting: string;
    proverb: (typeof PACIFIC_PROVERBS)[number];
  } | null>(null);

  useEffect(() => {
    const now = new Date();
    const greeting = greetingFor(nationId, now.getHours());
    const proverb = proverbOfTheDay(now.getTime());
    setState({ greeting, proverb });
  }, [nationId]);

  const patternKey = NATION_PATTERN[nationId] ?? 'moana';
  const patternSvg = PATTERN_SVG[patternKey];
  const patternUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(patternSvg)}")`;

  if (!state) {
    return <div className="mb-6 rounded-2xl skeleton" style={{ minHeight: 180 }} aria-busy />;
  }

  return (
    <div
      className="mb-6 rounded-2xl overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #0a3654 0%, #0b3d5c 40%, #134a6a 100%)',
        color: '#fff',
        minHeight: 200,
        padding: 'clamp(24px, 4vw, 48px)',
      }}
    >
      {/* Soft warm highlight (top-left) — adds atmospheric depth */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 12% 18%, rgba(232, 195, 122, 0.16) 0%, transparent 45%)',
      }} />

      {/* Repeating motif overlay across whole card */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none',
        backgroundImage: patternUrl, backgroundSize: 56,
      }} />

      {/* Larger anchor motif on the right — gives the empty side a visual weight */}
      <div
        aria-hidden
        style={{
          position: 'absolute', top: '-25%', right: '-8%', width: 360, height: 360,
          opacity: 0.18, pointerEvents: 'none',
          backgroundImage: patternUrl, backgroundSize: 240, backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          maskImage: 'radial-gradient(circle at center, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at center, #000 30%, transparent 75%)',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 8, fontWeight: 500, letterSpacing: '0.02em' }}>
          {state.greeting}, {name.split(' ')[0]}
        </div>
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800,
            letterSpacing: '-0.02em', margin: '0 0 12px', lineHeight: 1.15,
          }}
        >
          Your Pacific arts community
        </h1>
        <blockquote style={{
          fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
          fontSize: 15, opacity: 0.85, maxWidth: 440, lineHeight: 1.5, margin: 0,
        }}>
          &ldquo;{state.proverb.text}&rdquo;
          <footer style={{ marginTop: 6, fontSize: 12, opacity: 0.65, fontStyle: 'normal' }}>
            &mdash; {state.proverb.language}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
