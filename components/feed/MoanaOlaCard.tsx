import { BEST_TIMES, upcomingSeasonalMoment, daysUntil } from '@/lib/moana-ola-kb';
import type { CurrentUser } from '@/lib/auth';
import { Icon } from '@/components/ui/Icon';

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

  return (
    <div
      className="mb-6 rounded-xl border p-5"
      style={{
        borderColor: 'color-mix(in srgb, var(--brand) 30%, transparent)',
        background: 'color-mix(in srgb, var(--brand) 4%, transparent)',
      }}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider" style={{ color: 'var(--brand)' }}>
        <Icon name="activity" size={14} />
        <span>Moana Ola · today</span>
      </div>
      <h3 className="mt-2 font-display text-lg font-semibold">
        {suggestion.multiplier} for craft posts in this window.
      </h3>
      <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)', lineHeight: 1.5 }}>
        {suggestion.reason} Window: <span className="font-semibold">{suggestion.window}</span>.
      </p>
      {moment && daysUntil(moment.startDate) < 90 && (
        <p className="mt-3 text-sm" style={{ color: 'var(--ink-muted)' }}>
          <span className="font-semibold">{moment.name}</span> starts in{' '}
          <span className="font-semibold">{daysUntil(moment.startDate)}</span> days. {moment.guidance}
        </p>
      )}
    </div>
  );
}
