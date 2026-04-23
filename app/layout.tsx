import type { Metadata, Viewport } from 'next';
import './globals.css';
import { getCurrentUser, getTheme, getCulturalTheme } from '@/lib/auth';
import { DesktopNav } from '@/components/nav/DesktopNav';
import { BottomNav } from '@/components/nav/BottomNav';
import { RoleSwitcher } from '@/components/nav/RoleSwitcher';
import { ThemeControls } from '@/components/nav/ThemeControls';

export const metadata: Metadata = {
  title: 'KavaWorks — A home for Pacific arts',
  description:
    'Digital community platform for Pacific Island artists across the 14 nations of Te Moana-nui-a-Kiwa.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F2EFE9' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0E0C' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, theme, cultural] = await Promise.all([
    getCurrentUser(),
    getTheme(),
    getCulturalTheme(),
  ]);

  return (
    <html
      lang="en-NZ"
      data-theme={theme}
      data-theme-cultural={cultural}
      data-role={user.role}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen"
        style={{ fontFamily: 'var(--font-body)', background: 'var(--bg)', color: 'var(--ink)' }}
      >
        <a
          href="#main"
          className="absolute left-2 top-2 -translate-y-20 rounded px-3 py-1 text-sm focus:translate-y-0"
          style={{ background: 'var(--brand)', color: 'var(--brand-ink)', zIndex: 100 }}
        >
          Skip to content
        </a>
        <div className="mx-auto flex min-h-screen w-full max-w-[1400px]">
          <DesktopNav user={user} />
          <main id="main" className="flex-1 min-w-0 pb-24 lg:pb-12" role="main">
            <div className="sticky top-0 z-40 flex items-center justify-end gap-2 border-b px-4 py-2 lg:px-8"
              style={{ background: 'color-mix(in srgb, var(--bg) 92%, transparent)', backdropFilter: 'blur(8px)', borderColor: 'var(--hairline)' }}
            >
              <ThemeControls theme={theme} cultural={cultural} />
              <RoleSwitcher currentRole={user.role} />
            </div>
            <div className="page-fade-in">{children}</div>
          </main>
        </div>
        <BottomNav user={user} />
      </body>
    </html>
  );
}
