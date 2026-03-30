import type { Metadata } from 'next';
import Image from 'next/image';
import TeamCard from '@/components/TeamCard';
import { teamMembers } from '@/data/team';

export const metadata: Metadata = {
  title: 'About Kova Mobility | Our Story & Team',
  description:
    "Kova Mobility was built because reliable transportation didn't exist for workers who couldn't drive. Learn our story, meet the team, and see what drives us.",
  openGraph: {
    title: 'About Kova Mobility | Our Story & Team',
    description:
      'Built because the problem was real. Pre-scheduled membership transportation in Panama City Beach, FL.',
    url: 'https://www.kovamobility.com/about',
  },
  alternates: { canonical: 'https://www.kovamobility.com/about' },
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="hero min-h-[60vh]">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('/images/hero-dawn.webp')" }}
        />
        <div className="relative z-[2] px-[7%] pb-20 pt-32 max-w-[760px]">
          <div className="section-label text-[var(--color-copper)]">
            <span>About Kova Mobility</span>
          </div>
          <h1 className="text-[clamp(2.4rem,5.5vw,4.2rem)] text-white leading-[1.06] mb-4">
            Built because the<br /><em className="italic">problem was real.</em>
          </h1>
          <p className="text-[clamp(0.95rem,1.5vw,1.1rem)] text-white/85 leading-relaxed max-w-[500px]">
            Pre-scheduled membership transportation in Panama City Beach, FL.
            For people who need to be somewhere — every single day.
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 px-[5%]" id="team">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <div className="section-label justify-center"><span>Leadership</span></div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-[var(--color-text-primary)] mb-3">
              The people behind the service.
            </h2>
            <p className="text-[var(--color-text-mid)] max-w-[550px] mx-auto">
              Kova Mobility is not a faceless platform. These are the people who
              make the service work, who answer the phone, and who hold the
              standard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1280px] mx-auto">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-24 px-[5%] bg-white" id="story">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="section-label"><span>Our Story</span></div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-[var(--color-text-primary)] mb-6">
              We didn&apos;t start with a<br />business plan. We started<br />with a real problem.
            </h2>
            <p className="text-[var(--color-text-mid)] leading-relaxed mb-5">
              The idea for Kova Mobility came from a frustrating reality: workers in
              Bay County with suspended licenses, post-DUI situations, or vehicle
              gaps had almost no reliable way to get to work. Uber was charging
              $35&ndash;$58 each way. The Bay Town Trolley didn&apos;t cover most routes.
              And nobody was offering a consistent, pre-scheduled solution for people
              who needed to be somewhere every single day.
            </p>
            <p className="text-[var(--color-text-mid)] leading-relaxed mb-5">
              So we built Kova Mobility. A membership model built around
              predictability &mdash; pre-scheduled pickups, fixed biweekly pricing,
              vetted drivers, and a service window from 6 AM to 3 AM. No surge.
              No availability roulette. No judgment.
            </p>
            <p className="text-[var(--color-text-mid)] leading-relaxed">
              Kova Mobility isn&apos;t for everyone. It&apos;s for the person who has to be
              at work at 6 AM and can&apos;t afford to hope a driver accepts their
              request. It&apos;s for the commuter who needs the same pickup five days
              a week. It&apos;s for the person who got knocked down by a license
              suspension and just needs a way back on track.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <blockquote className="bg-[var(--color-off-white)] p-8 rounded-lg border-l-4 border-[var(--color-copper)]">
              <p className="text-lg italic text-[var(--color-text-primary)] leading-relaxed mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                &ldquo;Pre-scheduled. Fixed price. A driver who knows your route,
                respects your time, and shows up. Not sometimes. Every time.&rdquo;
              </p>
              <cite className="text-sm text-[var(--color-copper)] not-italic">
                Timothy Clarke &mdash; Operations &amp; Driver Relations
              </cite>
            </blockquote>
            <div className="bg-[var(--color-teal-dark)] rounded-lg p-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-[var(--color-copper)] text-2xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>48hr</div>
                <div className="text-white/40 text-xs tracking-[0.1em] uppercase">Advance booking</div>
              </div>
              <div className="text-center">
                <div className="text-[var(--color-copper)] text-2xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>1099</div>
                <div className="text-white/40 text-xs tracking-[0.1em] uppercase">Vetted drivers</div>
              </div>
              <div className="text-center">
                <div className="text-[var(--color-copper)] text-2xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Bay Co.</div>
                <div className="text-white/40 text-xs tracking-[0.1em] uppercase">Coverage area</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 px-[5%]" id="values">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-14">
            <div className="section-label"><span>What We Stand For</span></div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-[var(--color-text-primary)]">
              The principles behind<br />every single ride.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Reliability Is the Product', desc: 'We do not sell convenience. We sell certainty. If you are scheduled, your driver shows up. Period.' },
              { title: 'No Judgment', desc: 'Suspended license. DUI. No vehicle. We do not ask why. We ask when your next pickup is.' },
              { title: 'Fixed Pricing', desc: 'No surge. No dynamic multiplier. You know what you pay before you pay it.' },
              { title: 'Dedicated Drivers', desc: 'Same driver. Same route. Same time. Relationships, not transactions.' },
              { title: 'Community First', desc: 'Kova Mobility exists to serve Bay County. The workers, the businesses, the people who keep PCB running.' },
              { title: 'Professional Standards', desc: 'Clean vehicles. On-time arrivals. Respectful service. This is not rideshare. This is a standard.' },
            ].map((value) => (
              <div key={value.title} className="bg-white p-6 rounded-lg border border-[var(--color-rule)] shadow-sm">
                <h4 className="text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {value.title}
                </h4>
                <p className="text-sm text-[var(--color-text-mid)] leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
