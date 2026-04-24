import type { Metadata, Viewport } from 'next';
import './globals.css';
import { getCurrentUser, getTheme, getCulturalTheme } from '@/lib/auth';
import { DesktopNav } from '@/components/nav/DesktopNav';
import { BottomNav } from '@/components/nav/BottomNav';
import { RoleSwitcher } from '@/components/nav/RoleSwitcher';
import { ThemeControls } from '@/components/nav/ThemeControls';
import { PwaRegister } from '@/components/PwaRegister';

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
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@500;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
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
        <div className="flex min-h-screen w-full">
          <DesktopNav user={user} />
          <main id="main" className="flex-1 min-w-0 pb-24 lg:pb-12" role="main">
            <div
              className="sticky top-0 z-40 flex items-center justify-between gap-2 px-4 py-3 xl:px-10"
              style={{
                background: 'var(--ground)',
                color: 'var(--paper)',
                borderBottom: 'var(--line-bold)',
              }}
            >
              <div className="flex items-center gap-3 lg:hidden">
                <span className="font-display text-xl tracking-tight" style={{ letterSpacing: '-0.03em' }}>
                  KAVAWORKS.
                </span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <ThemeControls theme={theme} cultural={cultural} />
                <RoleSwitcher currentRole={user.role} />
              </div>
            </div>
            <div className="page-fade-in">{children}</div>
          </main>
        </div>
        <BottomNav user={user} />
        <PwaRegister />
      </body>
    </html>
  );
}
