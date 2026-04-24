import Link from 'next/link';
import { getCurrentUser, getTheme, getCulturalTheme } from '@/lib/auth';
import { signOut } from '@/app/actions';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { NationBadge } from '@/components/cultural/NationBadge';

export const metadata = { title: 'Settings · KavaWorks' };

export default async function SettingsPage() {
  const [me, theme, cultural] = await Promise.all([
    getCurrentUser(),
    getTheme(),
    getCulturalTheme(),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 lg:px-10">
      <header className="mb-8">
        <div
          className="text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: 'var(--ink-soft)' }}
        >
          Settings
        </div>
        <h1 className="mt-2 font-display text-3xl font-semibold">Your account.</h1>
      </header>

      <section
        className="mb-6 flex items-center gap-4 rounded-2xl border p-5"
        style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
      >
        <AvatarIllustrated nationId={me.primaryNationId} size={64} name={me.name} />
        <div className="flex-1 min-w-0">
          <div className="font-display text-xl font-semibold">{me.name}</div>
          <div className="mt-1 flex items-center gap-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
            <span className="font-mono">@{me.handle}</span>
            <span>·</span>
            <NationBadge nationId={me.primaryNationId} size="xs" />
          </div>
        </div>
        <Link
          href={`/artist/${me.handle}`}
          className="rounded-md border px-4 py-2 text-sm font-semibold"
          style={{ borderColor: 'var(--hairline)' }}
        >
          View profile
        </Link>
      </section>

      <section
        className="mb-6 rounded-2xl border p-5"
        style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
      >
        <h2 className="font-display text-lg font-semibold">Appearance</h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
          Use the controls in the top bar to switch theme and cultural ceremony.
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Mode
            </dt>
            <dd className="mt-0.5 font-semibold capitalize">{theme}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Ceremony
            </dt>
            <dd className="mt-0.5 font-semibold capitalize">{cultural.replace('-', ' ')}</dd>
          </div>
        </dl>
      </section>

      <section
        className="mb-6 rounded-2xl border p-5"
        style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
      >
        <h2 className="font-display text-lg font-semibold">Help & community</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link href="/kete" className="underline">
              Kete Toolkit — practitioner-written guidance
            </Link>
          </li>
          <li>
            <Link href="/grants" className="underline">
              Creative New Zealand grants
            </Link>
          </li>
          <li>
            <Link href="/groups" className="underline">
              Community groups
            </Link>
          </li>
        </ul>
      </section>

      <section
        className="mb-6 rounded-2xl border p-5"
        style={{ borderColor: 'var(--hairline)', background: 'var(--surface-2)' }}
      >
        <h2 className="font-display text-lg font-semibold">Sign out</h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
          You'll be returned to the demo persona splash. Your cultural theme and dark-mode
          preference will reset.
        </p>
        <form action={signOut} className="mt-4">
          <button
            type="submit"
            className="rounded-md border px-5 py-2.5 text-sm font-semibold"
            style={{
              borderColor: 'var(--accent-coral, #e07856)',
              color: 'var(--accent-coral, #e07856)',
            }}
          >
            Sign out
          </button>
        </form>
      </section>

      <p className="text-center text-xs" style={{ color: 'var(--ink-soft)' }}>
        KavaWorks · v0.1 · This is a local demo. No data leaves your machine.
      </p>
    </div>
  );
}
