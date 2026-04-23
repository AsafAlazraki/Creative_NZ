import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NZD = new Intl.NumberFormat('en-NZ', {
  style: 'currency',
  currency: 'NZD',
  maximumFractionDigits: 0,
});

export function formatPrice(nzd: number): string {
  return NZD.format(nzd);
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${Math.round(n / 1000)}k`;
  if (n >= 1_000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function timeAgo(iso: string, now = new Date()): string {
  const t = new Date(iso).getTime();
  const diff = Math.max(0, now.getTime() - t);
  const s = Math.floor(diff / 1000);
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d`;
  const w = Math.floor(d / 7);
  if (w < 4) return `${w}w`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo`;
  return `${Math.floor(d / 365)}y`;
}

export function countdown(iso: string, now = new Date()): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const diff = Math.max(0, new Date(iso).getTime() - now.getTime());
  const total = diff;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, total };
}

export function parseJson<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function artistShare(total: number) {
  const artist = Math.round(total * 95) / 100;
  const platform = Math.round(total * 5) / 100;
  return { artist, platform, total };
}
