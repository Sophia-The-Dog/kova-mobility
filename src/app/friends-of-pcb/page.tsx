import type { Metadata } from 'next';
import Link from 'next/link';
import { partners, categoryLabels, categoryDescriptions, type PartnerCategory } from '@/data/partners';

export const metadata: Metadata = {
  title: 'Friends of PCB | Local Partner Directory | Panama City Beach',
  description:
    'Discover the best hotels, restaurants, nightlife venues, and local businesses in Panama City Beach — all connected to Kova Mobility transportation.',
  keywords: [
    'Panama City Beach businesses',
    'things to do in Panama City Beach',
    'Panama City Beach nightlife',
    'PCB transportation services',
    'Panama City Beach restaurants',
    'PCB hotels',
  ].join(', '),
  openGraph: {
    title: 'Friends of PCB | Local Partner Directory',
    description:
      'The best of Panama City Beach — hotels, restaurants, nightlife, and more. All connected to Kova Mobility.',
    url: 'https://www.kovamobility.com/friends-of-pcb',
  },
  alternates: { canonical: 'https://www.kovamobility.com/friends-of-pcb' },
};

export default function FriendsOfPCBPage() {
  const categories = Object.keys(categoryLabels) as PartnerCategory[];

  return (
    <>
      {/* HERO */}
      <section className="hero min-h-[60vh]">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('/images/pcb-sunset.webp')" }}
        />
        <div className="relative z-[2] px-[7%] pb-20 pt-32 max-w-[760px]">
          <div className="section-label text-[var(--color-copper)]">
            <span>Friends of PCB</span>
          </div>
          <h1 className="text-[clamp(2.4rem,5.5vw,4.2rem)] text-white leading-[1.06] mb-4">
            The best of<br /><em className="italic">Panama City Beach.</em>
          </h1>
          <p className="text-[clamp(0.95rem,1.5vw,1.1rem)] text-white/85 leading-relaxed max-w-[500px]">
            Hotels, restaurants, nightlife, and local businesses — all connected
            to Kova Mobility&apos;s transportation network. These are the people
            and places that make PCB run.
          </p>
        </div>
      </section>

      {/* DIRECTORY */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1100px] mx-auto">
          {categories.map((category) => {
            const categoryPartners = partners.filter((p) => p.category === category);
            return (
              <div key={category} className="mb-16 last:mb-0" id={category}>
                <div className="mb-8">
                  <div className="section-label"><span>{categoryLabels[category]}</span></div>
                  <p className="text-[var(--color-text-mid)] max-w-[600px]">
                    {categoryDescriptions[category]}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryPartners.map((partner) => (
                    <div
                      key={partner.id}
                      className={`bg-white rounded-lg border border-[var(--color-rule)] p-6 shadow-sm transition-all hover:shadow-md ${
                        partner.isPlaceholder ? 'border-dashed opacity-70' : ''
                      }`}
                    >
                      <h3 className="text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {partner.name}
                      </h3>
                      <p className="text-xs text-[var(--color-text-light)] tracking-wide uppercase mb-3">
                        {partner.location}
                      </p>
                      <p className="text-sm text-[var(--color-text-mid)] leading-relaxed mb-4">
                        {partner.description}
                      </p>
                      {partner.isPlaceholder ? (
                        <a
                          href="mailto:abennett@kovamobility.com?subject=Partnership%20Inquiry"
                          className="text-[var(--color-copper)] text-xs font-medium tracking-[0.08em] uppercase hover:text-[var(--color-copper-dark)] transition-colors"
                        >
                          Become a Partner &rarr;
                        </a>
                      ) : partner.website ? (
                        <div className="flex gap-4">
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-teal)] text-xs font-medium tracking-[0.08em] uppercase hover:text-[var(--color-teal-mid)] transition-colors"
                          >
                            Visit Website &rarr;
                          </a>
                          <Link
                            href="/party-pass"
                            className="text-[var(--color-copper)] text-xs font-medium tracking-[0.08em] uppercase hover:text-[var(--color-copper-dark)] transition-colors"
                          >
                            Book a Ride
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERNAL LINKS — SEO */}
      <section className="py-16 px-[5%] bg-white">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Getting around Panama City Beach
          </h2>
          <p className="text-[var(--color-text-mid)] max-w-[550px] mx-auto mb-8">
            Whether you&apos;re visiting for the weekend or you live here year-round,
            Kova Mobility connects you to the best of PCB with reliable, pre-scheduled
            transportation.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/party-pass" className="btn-primary">
              Party Pass &rarr;
            </Link>
            <Link href="/membership" className="btn-teal">
              Membership Plans
            </Link>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP CTA */}
      <section className="py-20 px-[5%] bg-[var(--color-teal-dark)] text-center">
        <h2 className="text-3xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Want to join the Kova partner network?
        </h2>
        <p className="text-white/60 max-w-[500px] mx-auto mb-8">
          We partner with hotels, venues, restaurants, and vacation rental hosts
          across Panama City Beach. If your business moves people, we should talk.
        </p>
        <a
          href="mailto:abennett@kovamobility.com?subject=Partnership%20Inquiry"
          className="btn-primary"
        >
          Contact Alexandra Bennett <span>&rarr;</span>
        </a>
      </section>
    </>
  );
}
