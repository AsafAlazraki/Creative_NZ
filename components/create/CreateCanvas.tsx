import { Icon } from '@/components/ui/Icon';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { ARTFORM_NOTES } from '@/lib/tauhi-va-kb';

type CreateType = 'image' | 'short' | 'long' | 'audio' | 'listing';

const UPLOAD_HINTS: Record<CreateType, { title: string; help: string; ratio: string }> = {
  image: {
    title: 'Upload photo',
    help: 'JPG or PNG, up to 10MB. We keep your original resolution.',
    ratio: '1:1, 4:5, or 16:9',
  },
  short: {
    title: 'Upload short',
    help: 'Vertical video, under 90 seconds. MP4 preferred.',
    ratio: '9:16 vertical',
  },
  long: {
    title: 'Upload long video',
    help: 'Up to 15 minutes. Editorial process, interviews, full performances.',
    ratio: '16:9 or 9:16',
  },
  audio: {
    title: 'Upload audio',
    help: 'Spoken word, music, recorded kōrero. MP3 or WAV.',
    ratio: 'Up to 30 minutes',
  },
  listing: {
    title: 'Upload up to 6 photos of your work',
    help: 'Include front, detail, and a scale reference. High-res preferred.',
    ratio: 'Minimum 1600px',
  },
};

export function CreateCanvas({ type }: { type: CreateType }) {
  const hint = UPLOAD_HINTS[type];

  return (
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
            className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
          >
            <Icon name={type === 'short' || type === 'long' ? 'film' : type === 'audio' ? 'activity' : type === 'listing' ? 'shopping-bag' : 'plus-square'} size={20} />
          </div>
          <div className="font-display text-2xl font-semibold">{hint.title}</div>
          <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
            {hint.help}
          </p>
          <p className="mt-1 font-mono text-xs" style={{ color: 'var(--ink-soft)' }}>
            {hint.ratio}
          </p>
        </div>
      </CulturalPattern>

      <form className="space-y-5" aria-label={`Create ${type}`} action="#">
        {type !== 'listing' && (
          <Field label="Caption">
            <textarea
              name="caption"
              className="w-full rounded-md border bg-transparent p-3 font-editorial"
              style={{ borderColor: 'var(--hairline)', minHeight: type === 'long' ? 160 : 120, lineHeight: 1.5 }}
              placeholder="Ua mae a uō…"
            />
          </Field>
        )}

        {type === 'listing' && (
          <>
            <Field label="Title">
              <input
                name="title"
                className="w-full rounded-md border bg-transparent px-3 py-2"
                style={{ borderColor: 'var(--hairline)' }}
                placeholder="Moana Whakapapa I"
              />
            </Field>
            <Field label="Description">
              <textarea
                name="description"
                className="w-full rounded-md border bg-transparent p-3 font-editorial"
                style={{ borderColor: 'var(--hairline)', minHeight: 140, lineHeight: 1.5 }}
                placeholder="A siapo on hand-beaten u'a…"
              />
            </Field>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Price (NZD)">
                <input
                  name="price"
                  type="number"
                  min="0"
                  className="w-full rounded-md border bg-transparent px-3 py-2 font-mono"
                  style={{ borderColor: 'var(--hairline)' }}
                  placeholder="4800"
                />
              </Field>
              <Field label="Dimensions">
                <input
                  name="dimensions"
                  className="w-full rounded-md border bg-transparent px-3 py-2"
                  style={{ borderColor: 'var(--hairline)' }}
                  placeholder="1.8m × 1.2m"
                />
              </Field>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Materials">
                <input
                  name="materials"
                  className="w-full rounded-md border bg-transparent px-3 py-2"
                  style={{ borderColor: 'var(--hairline)' }}
                  placeholder="U'a, ʻoʻa, kōkōwai"
                />
              </Field>
              <Field label="Year made">
                <input
                  name="year"
                  type="number"
                  className="w-full rounded-md border bg-transparent px-3 py-2 font-mono"
                  style={{ borderColor: 'var(--hairline)' }}
                  placeholder="2026"
                />
              </Field>
            </div>
            <Field label="Cultural story (permanent attribution)">
              <textarea
                name="story"
                className="w-full rounded-md border bg-transparent p-3 font-editorial"
                style={{ borderColor: 'var(--hairline)', minHeight: 120, lineHeight: 1.5 }}
                placeholder="This siapo carries the patterns of Leulumoega, passed from my grandmother…"
              />
              <p className="mt-1 text-xs" style={{ color: 'var(--ink-soft)' }}>
                Travels with the work forever. Cannot be removed after first sale.
              </p>
            </Field>
            <div
              className="rounded-lg border p-4"
              style={{
                borderColor: 'color-mix(in srgb, var(--accent-jade) 30%, transparent)',
                background: 'color-mix(in srgb, var(--accent-jade) 5%, transparent)',
              }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-jade)' }}>
                Inati — 95% to you
              </div>
              <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
                When someone purchases this work, 95% of the price is yours. 5% covers payment
                processing and operations. This split is hard-coded and visible to every buyer.
              </p>
            </div>
          </>
        )}

        <Field label="Artform">
          <select
            name="artform"
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

        {type !== 'listing' && (
          <>
            <Field label="Caption language">
              <select
                name="lang"
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

            <Field label="Link a marketplace work (optional) — makes this post shoppable">
              <input
                name="linkedWork"
                className="w-full rounded-md border bg-transparent px-3 py-2 font-mono"
                style={{ borderColor: 'var(--hairline)' }}
                placeholder="work_001"
              />
              <p className="mt-1 text-xs" style={{ color: 'var(--ink-soft)' }}>
                A product card will float over the video and in post cards.
              </p>
            </Field>
          </>
        )}

        <div
          className="flex items-start gap-3 rounded-xl border p-4"
          style={{ borderColor: 'var(--hairline)', background: 'var(--surface-2)' }}
        >
          <input type="checkbox" id="tapu" name="tapu" className="mt-1" />
          <label htmlFor="tapu" className="text-sm">
            <div className="font-semibold">Mark this tapu</div>
            <div className="mt-0.5" style={{ color: 'var(--ink-muted)' }}>
              Visible only to members of your primary nation group. Kaitiakitanga — you decide what's
              shared.
            </div>
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-md px-6 py-3 font-semibold shadow-lg transition-transform hover:scale-[1.02]"
            style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
          >
            {type === 'listing' ? 'List this work' : 'Share with respect'}
          </button>
          <button
            type="button"
            className="rounded-md border px-5 py-3 font-semibold"
            style={{ borderColor: 'var(--hairline)' }}
          >
            Save draft
          </button>
        </div>
      </form>
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
