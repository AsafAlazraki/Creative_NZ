import { getArticles } from '@/lib/repo';
import {
  KeteHero,
  SectionHeader,
  FeatureCard,
  CompactCard,
  WideHorizontalCard,
  KoreroMaiCTA,
} from '@/components/kete/KeteCards';
import { KeteTopicNav } from '@/components/kete/KeteTopicNav';

export const metadata = { title: 'Kete Toolkit · KavaWorks' };

const ROLE_LABELS: Record<string, string> = {
  artist: 'Practitioner',
  adviser: 'Arts Adviser',
  elder: 'Elder',
  historian: 'Historian',
};

function initialsFor(name: string): string {
  return name
    .split(/[\s'-]+/)
    .map((w) => w[0]?.toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join('');
}

export default async function KetePage() {
  const articles = getArticles();
  const byCategory = articles.reduce<Record<string, typeof articles>>((acc, a) => {
    (acc[a.category] ??= []).push(a);
    return acc;
  }, {});

  const shipping = byCategory['shipping-logistics']?.[0];
  const living = byCategory['making-a-living']?.[0];
  const grants = byCategory['navigating-grants']?.[0];
  const protocols = byCategory['cultural-protocols'] ?? [];
  const [proto1, proto2, proto3] = protocols;

  return (
    <div className="page-fade-in flex flex-col gap-7 px-4 py-6 lg:px-6">
      <KeteHero articleCount={articles.length} threadCount={Object.keys(byCategory).length} />

      <KeteTopicNav />

      {shipping && (
        <section id="shipping" className="scroll-mt-20">
          <SectionHeader title="Shipping & logistics" count={1} />
          <FeatureCard
            bgColor="#0c2d4a"
            watermarkWord="SHIP"
            readTime={shipping.readTimeMin}
            title={shipping.title}
            excerpt={shipping.excerpt}
            authorInitials={initialsFor(shipping.author)}
            authorName={shipping.author}
            authorRole={ROLE_LABELS[shipping.authorRole] ?? shipping.authorRole}
            slug={shipping.id}
          />
        </section>
      )}

      {living && (
        <section id="living" className="scroll-mt-20">
          <SectionHeader title="Making a living" count={1} />
          <FeatureCard
            bgColor="#2a1500"
            watermarkWord="MANA"
            readTime={living.readTimeMin}
            title={living.title}
            excerpt={living.excerpt}
            authorInitials={initialsFor(living.author)}
            authorName={living.author}
            authorRole={ROLE_LABELS[living.authorRole] ?? living.authorRole}
            slug={living.id}
          />
        </section>
      )}

      {grants && (
        <section id="grants" className="scroll-mt-20">
          <SectionHeader title="Navigating grants" count={1} />
          <FeatureCard
            bgColor="#042e20"
            watermarkWord="AOG"
            readTime={grants.readTimeMin}
            title={grants.title}
            excerpt={grants.excerpt}
            authorInitials={initialsFor(grants.author)}
            authorName={grants.author}
            authorRole={ROLE_LABELS[grants.authorRole] ?? grants.authorRole}
            slug={grants.id}
          />
        </section>
      )}

      {protocols.length > 0 && (
        <section id="protocols" className="scroll-mt-20">
          <SectionHeader title="Cultural protocols" count={protocols.length} />
          {proto1 && proto2 && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <CompactCard
                readTime={proto1.readTimeMin}
                title={proto1.title}
                excerpt={proto1.excerpt}
                authorName={proto1.author}
                authorRole={ROLE_LABELS[proto1.authorRole] ?? proto1.authorRole}
                slug={proto1.id}
              />
              <CompactCard
                readTime={proto2.readTimeMin}
                title={proto2.title}
                excerpt={proto2.excerpt}
                authorName={proto2.author}
                authorRole={ROLE_LABELS[proto2.authorRole] ?? proto2.authorRole}
                slug={proto2.id}
              />
            </div>
          )}
          {proto3 && (
            <div className="mt-2">
              <WideHorizontalCard
                readTime={proto3.readTimeMin}
                title={proto3.title}
                excerpt={proto3.excerpt}
                authorName={proto3.author}
                authorRole={ROLE_LABELS[proto3.authorRole] ?? proto3.authorRole}
                slug={proto3.id}
              />
            </div>
          )}
        </section>
      )}

      <KoreroMaiCTA />
    </div>
  );
}
