import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ARTFORM_NOTES } from '@/lib/tauhi-va-kb';
import { BEST_TIMES, HASHTAG_TRENDS } from '@/lib/moana-ola-kb';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { Icon } from '@/components/ui/Icon';

export const metadata = { title: 'Create · KavaWorks' };

export default async function CreatePage() {
  const user = await getCurrentUser();
  if (user.role !== 'artist' && user.role !== 'elder') redirect('/');

  return (
    <div className="px-4 py-6 lg:px-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
          Create
        </div>
        <h1 className="mt-2 font-display text-4xl font-semibold">Share with respect.</h1>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <CulturalPattern
            id="pattern-tapa"
            opacity={0.12}
            tone="brand"
            size={48}
            className="mb-6 overflow-hidden rounded-2xl border border-dashed"
          >
            <div className="flex aspect-[16/9] flex-col items-center justify-center p-10 text-center">
              <div
                className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
              >
                <Icon name="plus-square" size={18} />
              </div>
              <div className="font-display text-xl font-semibold">Upload a work or drag here</div>
              <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
                Image, video up to 90s, or audio.
              </p>
            </div>
          </CulturalPattern>

          <form
            className="space-y-5"
            aria-label="Create post form"
            action="#"
          >
            <Field label="Artform">
              <select
                className="w-full rounded-md border bg-transparent px-3 py-2"
                style={{ borderColor: 'var(--hairline)' }}
                defaultValue="siapo"
              >
                {Object.keys(ARTFORM_NOTES).map((k) => (
                  <option key={k} value={k}>
                    {k.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Caption">
              <textarea
                className="w-full rounded-md border bg-transparent p-3 font-editorial"
                style={{ borderColor: 'var(--hairline)', minHeight: 120, lineHeight: 1.5 }}
                placeholder="Ua mae a uō..."
              />
            </Field>

            <Field label="Caption language">
              <select
                className="w-full rounded-md border bg-transparent px-3 py-2"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <option value="en">English</option>
                <option value="sm">Sāmoan</option>
                <option value="to">Tongan</option>
                <option value="fj">Fijian</option>
                <option value="rar">Cook Islands Māori</option>
                <option value="niu">Niuean</option>
                <option value="ty">Tahitian</option>
                <option value="haw">Hawaiian</option>
                <option value="mi">te reo Māori</option>
                <option value="bi">Bislama</option>
                <option value="tpi">Tok Pisin</option>
              </select>
            </Field>

            <div
              className="flex items-start gap-3 rounded-xl border p-4"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface-2)' }}
            >
              <input type="checkbox" id="tapu" className="mt-1" />
              <label htmlFor="tapu" className="text-sm">
                <div className="font-semibold">Mark this work tapu</div>
                <div className="mt-0.5" style={{ color: 'var(--ink-muted)' }}>
                  Visible only to members of your primary nation group. Kaitiakitanga — you decide
                  what's shared.
                </div>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                className="rounded-md px-5 py-2.5 font-semibold"
                style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
              >
                Share with respect
              </button>
              <button
                className="rounded-md border px-5 py-2.5 font-semibold"
                style={{ borderColor: 'var(--hairline)' }}
              >
                Save draft
              </button>
            </div>
          </form>
        </div>

        <aside className="space-y-5">
          <section
            className="rounded-xl border p-4"
            style={{
              borderColor: 'color-mix(in srgb, var(--brand) 30%, transparent)',
              background: 'color-mix(in srgb, var(--brand) 4%, transparent)',
            }}
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider" style={{ color: 'var(--brand)' }}>
              <Icon name="activity" size={12} /> Moana Ola · timing
            </div>
            <p className="mt-2 text-sm" style={{ color: 'var(--ink)', lineHeight: 1.5 }}>
              {BEST_TIMES.craftPost.reason}
            </p>
            <p className="mt-2 font-mono text-xs">{BEST_TIMES.craftPost.window}</p>
          </section>
          <section
            className="rounded-xl border p-4"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
          >
            <h3 className="mb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Suggested hashtags
            </h3>
            <div className="flex flex-wrap gap-2">
              {HASHTAG_TRENDS.slice(0, 6).map((t) => (
                <span
                  key={t.tag}
                  className="rounded-full border px-2 py-1 text-xs"
                  style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}
                >
                  {t.tag}
                </span>
              ))}
            </div>
          </section>
          <section
            className="rounded-xl border p-4"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
          >
            <h3 className="mb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Attribution preview
            </h3>
            <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
              {user.name} · {user.city} · attribution is permanent and cannot be removed after
              first sale.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
        {label}
      </label>
      {children}
    </div>
  );
}
