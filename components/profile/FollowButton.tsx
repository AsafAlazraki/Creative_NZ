'use client';
import { useOptimistic, useTransition } from 'react';
import { togglePostFollow } from '@/app/actions';

export function FollowButton({
  handle,
  initiallyFollowing,
  variant = 'primary',
}: {
  handle: string;
  initiallyFollowing: boolean;
  variant?: 'primary' | 'ghost';
}) {
  const [pending, start] = useTransition();
  const [following, setFollowing] = useOptimistic(initiallyFollowing, (s) => !s);

  const isPrimary = variant === 'primary';
  const label = following ? 'Following' : 'Follow';
  const aria = following ? `Unfollow ${handle}` : `Follow ${handle}`;

  return (
    <button
      onClick={() => {
        start(() => {
          setFollowing(null);
          return togglePostFollow(handle);
        });
      }}
      disabled={pending}
      aria-label={aria}
      aria-pressed={following}
      className="rounded-md px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02] disabled:opacity-60"
      style={
        following
          ? {
              background: 'transparent',
              color: isPrimary ? 'white' : 'var(--ink)',
              border: `2px solid ${isPrimary ? 'rgba(255,255,255,0.5)' : 'var(--hairline)'}`,
            }
          : isPrimary
            ? { background: 'var(--brand)', color: 'var(--brand-ink)' }
            : { background: 'var(--ink)', color: 'var(--surface)' }
      }
    >
      {label}
    </button>
  );
}
