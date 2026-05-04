import { getCurrentUser } from '@/lib/auth';
import { getArtistByHandle } from '@/lib/repo';
import { updateProfile } from '@/app/actions';

export const metadata = { title: 'Edit profile · KavaWorks' };

export default async function EditProfilePage() {
  const user = await getCurrentUser();
  const artist = getArtistByHandle(user.handle);
  if (!artist) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 lg:px-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
          Settings
        </div>
        <h1 className="mt-2 font-display text-4xl font-semibold">Edit profile</h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
          Changes are reflected on your public artist page.
        </p>
      </header>

      <form action={updateProfile} className="space-y-7">
        <fieldset
          className="rounded-xl border p-6"
          style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
        >
          <legend className="mb-5 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
            Profile details
          </legend>

          <div className="space-y-5">
            <div>
              <label htmlFor="city" className="block text-sm font-semibold mb-1">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                defaultValue={artist.city}
                className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent outline-none focus:ring-2"
                style={{
                  borderColor: 'var(--hairline)',
                  color: 'var(--ink)',
                  // @ts-expect-error -- CSS custom property
                  '--tw-ring-color': 'var(--moana)',
                }}
              />
            </div>

            <div>
              <label htmlFor="artforms" className="block text-sm font-semibold mb-1">
                Artforms
                <span className="ml-2 font-normal" style={{ color: 'var(--ink-soft)' }}>
                  (comma-separated)
                </span>
              </label>
              <input
                id="artforms"
                name="artforms"
                type="text"
                defaultValue={artist.artforms.join(', ')}
                className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent outline-none focus:ring-2"
                style={{ borderColor: 'var(--hairline)', color: 'var(--ink)' }}
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-semibold mb-1">
                Short bio
                <span className="ml-2 font-normal" style={{ color: 'var(--ink-soft)' }}>
                  (shown in search results)
                </span>
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                defaultValue={artist.bio}
                className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent outline-none resize-none focus:ring-2"
                style={{ borderColor: 'var(--hairline)', color: 'var(--ink)' }}
              />
            </div>

            <div>
              <label htmlFor="statement" className="block text-sm font-semibold mb-1">
                Artist statement
                <span className="ml-2 font-normal" style={{ color: 'var(--ink-soft)' }}>
                  (shown on your profile page)
                </span>
              </label>
              <textarea
                id="statement"
                name="statement"
                rows={8}
                defaultValue={artist.statement}
                className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent outline-none resize-none focus:ring-2 font-editorial"
                style={{ borderColor: 'var(--hairline)', color: 'var(--ink)', lineHeight: 1.6, fontSize: 15 }}
              />
              <p className="mt-1 text-xs" style={{ color: 'var(--ink-soft)' }}>
                Separate paragraphs with a blank line. A strong sentence mid-statement will be highlighted as a pull quote.
              </p>
            </div>
          </div>
        </fieldset>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-md px-6 py-2.5 text-sm font-semibold"
            style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
          >
            Save changes
          </button>
          <a
            href={`/artist/${user.handle}`}
            className="rounded-md px-6 py-2.5 text-sm font-semibold border"
            style={{ borderColor: 'var(--hairline)', color: 'var(--ink)' }}
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
