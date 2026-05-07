import { BEST_TIMES, upcomingSeasonalMoment, daysUntil } from '@/lib/moana-ola-kb';
import type { CurrentUser } from '@/lib/auth';

/**
 * Moana Ola — dark editorial card. Pulses an orange dot to signal
 * "this is a live insight today", then leads with the multiplier as
 * the headline (display-bold, 2xl) so the value lands first. Detail
 * copy underneath, optional "Coming up" note pinned to the bottom.
 */
export function MoanaOlaCard({ user: _user }: { user: CurrentUser }) {
  const now = new Date();
  const day = now.getDay();
  const moment = upcomingSeasonalMoment(now);

  const suggestion =
    day === 6
      ? BEST_TIMES.craftPost
      : day === 4
        ? BEST_TIMES.processVideo
        : day === 0
          ? BEST_TIMES.finishedWork
          : BEST_TIMES.announcement;

  const upcomingDays = moment ? daysUntil(moment.startDate) : null;
  const showUpcoming = moment && upcomingDays !== null && upcomingDays < 90;

  return (
    <div className="mb-6 rounded-2xl p-5 text-white" style={{ background: 'var(--ink)' }}>
      <div className="mb-3 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f59e0b] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f59e0b]" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#fbbf24]">
          Moana Ola · today
        </span>
      </div>

      <p className="mb-2 font-display text-2xl font-bold leading-tight text-white">
        {suggestion.multiplier} for craft posts in this window.
      </p>
      <p className="mb-4 text-sm leading-relaxed text-white/75">
        {suggestion.reason} Window: <span className="font-semibold text-white">{suggestion.window}</span>.
      </p>

      {showUpcoming && moment && (
        <div className="rounded-xl border border-white/15 bg-white/[0.06] p-3">
          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Coming up
          </p>
          <p className="text-sm text-white">
            <span className="font-semibold">{moment.name}</span>{' '}
            <span className="text-white/70">
              starts in {upcomingDays} days. {moment.guidance}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
