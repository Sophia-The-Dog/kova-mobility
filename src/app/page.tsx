'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddressAutocomplete from '@/components/AddressAutocomplete';
import { trackCTAClick } from '@/lib/analytics';
import type { ZoneResult } from '@/lib/zones';

export default function HomePage() {
  const [zoneResult, setZoneResult] = useState<(ZoneResult & { pricing: Record<string, { biweekly: number; label: string; days: number } | null> }) | null>(null);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('/images/hero-index.webp')" }}
        />
        <div className="relative z-[2] px-[7%] pb-24 pt-32 max-w-[760px]">
          <div className="section-label text-[var(--color-copper)]">
            <span>Panama City Beach, Florida</span>
          </div>
          <h1 className="text-[clamp(2.8rem,6.5vw,5.2rem)] text-white leading-[1.06] mb-4">
            Your ride. <em className="italic">Every time.</em>
          </h1>
          <p className="text-[clamp(0.95rem,1.5vw,1.1rem)] text-white/85 leading-relaxed max-w-[500px] mb-2">
            Pre-scheduled, fixed-price transportation with a dedicated driver.
            Built around your life, not an algorithm.
          </p>
          <p className="text-[0.85rem] text-white/60 tracking-wide mb-8">
            Not a taxi. Not rideshare. A membership.
          </p>

          {/* Address Input — Above the Fold */}
          <div className="mb-8 max-w-[520px]">
            <AddressAutocomplete
              onAddressSelect={() => {}}
              onZoneResult={(result) => setZoneResult(result as typeof zoneResult)}
              intentType="inquiry"
              placeholder="Enter your address to check service area..."
              dark
            />
          </div>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap items-center">
            <Link
              href="/apply"
              className="btn-primary"
              onClick={() => trackCTAClick('hero_apply', 'homepage')}
            >
              Become a Member <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
            <Link
              href="/party-pass"
              className="btn-ghost"
              onClick={() => trackCTAClick('hero_party_pass', 'homepage')}
            >
              Party Pass
            </Link>
            <Link
              href="/driver"
              className="btn-ghost"
              onClick={() => trackCTAClick('hero_drive', 'homepage')}
            >
              Drive With Us
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-[var(--color-teal-dark)] grid grid-cols-2 md:grid-cols-4">
        {[
          { num: '6AM–3AM', label: 'Service window' },
          { num: '$228', label: 'Starting biweekly' },
          { num: '48hr', label: 'Advance booking' },
          { num: 'Bay Co.', label: 'Coverage area' },
        ].map((item) => (
          <div
            key={item.label}
            className="py-6 px-4 text-center border-r border-white/5 last:border-r-0"
          >
            <div className="text-[var(--color-copper)] text-2xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {item.num}
            </div>
            <div className="text-white/40 text-xs tracking-[0.1em] uppercase">
              {item.label}
            </div>
          </div>
        ))}
      </section>

      {/* POSITIONING SECTION */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label"><span>What Kova Mobility Is</span></div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-[var(--color-text-primary)] mb-6">
              This is not rideshare.<br />This is not a taxi.
            </h2>
            <p className="text-[var(--color-text-mid)] leading-relaxed mb-5">
              Kova Mobility is a pre-scheduled, fixed-price transportation membership in
              Panama City Beach. You pick your days. We assign your driver. Same stop,
              same time, every scheduled day.
            </p>
            <p className="text-[var(--color-text-mid)] leading-relaxed mb-5">
              No surge pricing. No availability roulette. No judgment. Just reliable
              transportation for people who need to be somewhere.
            </p>
            <p className="text-[var(--color-text-mid)] leading-relaxed">
              Workers with suspended licenses, shift employees, commuters without
              vehicles, nightlife patrons who want a guaranteed ride home. If you need
              consistency, Kova Mobility was built for you.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/kova-suv.webp"
              alt="Kova Mobility vehicle"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section className="py-24 px-[5%] bg-[var(--color-teal-dark)]">
        <div className="max-w-[1100px] mx-auto text-center mb-14">
          <div className="section-label justify-center"><span>Membership Tiers</span></div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] text-white mb-4">
            {zoneResult && zoneResult.pricing?.core
              ? `Starting at $${zoneResult.pricing.core.biweekly}/biweekly`
              : 'Starting at $228/biweekly'}
          </h2>
          <p className="text-white/60 max-w-[500px] mx-auto">
            Zone A included. Fixed biweekly pricing. 48-hour advance booking.
            6 AM to 3 AM service window.
          </p>
        </div>

        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: zoneResult?.pricing?.core?.label || 'Core',
              price: zoneResult?.pricing?.core?.biweekly || 228,
              days: zoneResult?.pricing?.core?.days || 3,
              features: [
                '3 scheduled days per week',
                'Zone A included',
                'Dedicated driver assignment',
                '48-hour advance booking',
                '6 AM – 3 AM service window',
              ],
            },
            {
              name: zoneResult?.pricing?.plus?.label || 'Plus',
              price: zoneResult?.pricing?.plus?.biweekly || 321,
              days: zoneResult?.pricing?.plus?.days || 5,
              featured: true,
              features: [
                '5 scheduled days per week',
                'Zone A included',
                'Priority driver matching',
                '48-hour advance booking',
                '6 AM – 3 AM service window',
                'Schedule flexibility',
              ],
            },
            {
              name: zoneResult?.pricing?.blackLabel?.label || 'Black Label',
              price: zoneResult?.pricing?.blackLabel?.biweekly || 598,
              days: zoneResult?.pricing?.blackLabel?.days || 7,
              features: [
                '7 days per week',
                'Zone A included',
                'Premium vehicle assignment',
                'Same-day schedule changes',
                '6 AM – 3 AM service window',
                'Priority support line',
                'Guest rider privileges',
              ],
            },
          ].map((tier) => (
            <div
              key={tier.name}
              className={`rounded-lg p-8 ${
                tier.featured
                  ? 'bg-[var(--color-copper)] text-[var(--color-teal-dark)] ring-2 ring-[var(--color-copper-light)] scale-[1.02]'
                  : 'bg-white/5 text-white border border-white/10'
              }`}
            >
              {tier.featured && (
                <div className="text-[0.6rem] font-medium tracking-[0.2em] uppercase mb-4 opacity-80">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {tier.name}
              </h3>
              <div className="text-3xl font-medium mb-1">
                ${tier.price}
                <span className="text-base font-normal opacity-70">/biweekly</span>
              </div>
              <p className={`text-sm mb-6 ${tier.featured ? 'opacity-70' : 'text-white/50'}`}>
                {tier.days} days per week
              </p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className={`text-sm flex items-start gap-2 ${tier.featured ? '' : 'text-white/70'}`}>
                    <span className="mt-0.5">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/apply"
                className={`block text-center py-3 rounded-[3px] text-xs font-medium tracking-[0.1em] uppercase transition-all ${
                  tier.featured
                    ? 'bg-[var(--color-teal-dark)] text-white hover:bg-[var(--color-teal)]'
                    : 'bg-[var(--color-copper)] text-[var(--color-teal-dark)] hover:bg-[var(--color-copper-light)]'
                }`}
                onClick={() => trackCTAClick(`tier_${tier.name.toLowerCase().replace(' ', '_')}`, 'homepage')}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[900px] mx-auto text-center mb-14">
          <div className="section-label justify-center"><span>How It Works</span></div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] text-[var(--color-text-primary)]">
            Three steps. That&apos;s it.
          </h2>
        </div>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              step: '01',
              title: 'Apply Online',
              desc: 'Tell us your address, schedule, and which membership tier fits your life. We verify your zone and confirm eligibility.',
            },
            {
              step: '02',
              title: 'Get Matched',
              desc: 'We assign a dedicated driver who knows your route. Same driver, same time, every scheduled day.',
            },
            {
              step: '03',
              title: 'Ride',
              desc: 'Your driver shows up. Every time. Fixed biweekly pricing. No surge. No cancellations. No guessing.',
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-[var(--color-copper)] text-4xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {item.step}
              </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                {item.title}
              </h3>
              <p className="text-[var(--color-text-mid)] text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/apply"
            className="btn-primary"
            onClick={() => trackCTAClick('how_it_works_apply', 'homepage')}
          >
            Start Your Application <span>&rarr;</span>
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 px-[5%] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/pcb-sunset.webp"
            alt="Panama City Beach sunset"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[var(--color-teal-dark)]/85" />
        </div>
        <div className="relative z-[2] max-w-[700px] mx-auto text-center">
          <h2 className="text-[clamp(2rem,4vw,3rem)] text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Stop hoping for a ride.<br />Start scheduling one.
          </h2>
          <p className="text-white/70 mb-8 max-w-[500px] mx-auto">
            Pre-scheduled. Fixed price. A driver who knows your route, respects
            your time, and shows up. Not sometimes. Every time.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/apply"
              className="btn-primary"
              onClick={() => trackCTAClick('final_cta_apply', 'homepage')}
            >
              Apply Now <span>&rarr;</span>
            </Link>
            <Link
              href="/party-pass"
              className="btn-ghost"
              onClick={() => trackCTAClick('final_cta_party', 'homepage')}
            >
              Party Pass
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}