'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddressAutocomplete from '@/components/AddressAutocomplete';
import { trackCTAClick } from '@/lib/analytics';
import type { ZoneResult } from '@/lib/zones';

export default function MembershipPage() {
  const [zoneResult, setZoneResult] = useState<(ZoneResult & { pricing: Record<string, { biweekly: number; label: string; days: number } | null> }) | null>(null);

  const getPrice = (tier: 'core' | 'plus' | 'blackLabel', fallback: number) => {
    if (zoneResult?.pricing?.[tier]) {
      return zoneResult.pricing[tier]!.biweekly;
    }
    return fallback;
  };

  return (
    <>
      {/* HERO */}
      <section className="hero min-h-[70vh]">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('/images/hero-interior.webp')" }}
        />
        <div className="relative z-[2] px-[7%] pb-20 pt-32 max-w-[760px]">
          <div className="section-label text-[var(--color-copper)]">
            <span>Membership Plans</span>
          </div>
          <h1 className="text-[clamp(2.4rem,5.5vw,4.2rem)] text-white leading-[1.06] mb-4">
            From ${getPrice('core', 228)}/Biweekly
          </h1>
          <p className="text-[clamp(0.95rem,1.5vw,1.1rem)] text-white/85 leading-relaxed max-w-[500px] mb-6">
            Pre-scheduled transportation built around your schedule. Core, Plus,
            and Black Label tiers. Fixed pricing. Dedicated driver. No surprises.
          </p>
          <div className="max-w-[520px]">
            <AddressAutocomplete
              onAddressSelect={() => {}}
              onZoneResult={(result) => setZoneResult(result as typeof zoneResult)}
              intentType="member"
              placeholder="Check your zone for exact pricing..."
              dark
            />
          </div>
        </div>
      </section>

      {/* TIER CARDS */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <div className="section-label justify-center"><span>Choose Your Tier</span></div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-[var(--color-text-primary)] mb-3">
              Three tiers. One standard: reliability.
            </h2>
            <p className="text-[var(--color-text-mid)] max-w-[550px] mx-auto">
              Every tier includes Zone A service, 48-hour advance booking, a dedicated
              driver, and a 6 AM to 3 AM service window.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Core */}
            <div className="bg-white rounded-lg border border-[var(--color-rule)] p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[var(--color-copper)] mb-3">
                Essential Reliability
              </div>
              <h3 className="text-3xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Core
              </h3>
              <div className="text-4xl font-medium text-[var(--color-teal)] mb-1">
                ${getPrice('core', 228)}
                <span className="text-lg font-normal text-[var(--color-text-light)]">/biweekly</span>
              </div>
              <p className="text-sm text-[var(--color-text-mid)] mb-6">3 scheduled days per week</p>
              <div className="w-full h-px bg-[var(--color-rule)] mb-6" />
              <ul className="space-y-3 mb-8">
                {[
                  '3 pre-scheduled days per week',
                  'Zone A included',
                  'Dedicated driver assignment',
                  '48-hour advance booking',
                  '6 AM – 3 AM service window',
                  'Text & call support',
                ].map((f) => (
                  <li key={f} className="text-sm text-[var(--color-text-mid)] flex items-start gap-2">
                    <span className="text-[var(--color-teal)] mt-0.5">&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/apply?tier=core"
                className="btn-teal w-full text-center justify-center"
                onClick={() => trackCTAClick('membership_core', 'membership')}
              >
                Choose Core
              </Link>
            </div>

            {/* Plus */}
            <div className="bg-[var(--color-copper)] rounded-lg p-8 text-[var(--color-teal-dark)] ring-2 ring-[var(--color-copper-light)] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-teal-dark)] text-[var(--color-copper)] text-[0.6rem] tracking-[0.2em] uppercase font-medium px-4 py-1 rounded-full">
                Most Popular
              </div>
              <div className="text-[0.65rem] font-medium tracking-[0.2em] uppercase opacity-70 mb-3">
                Best Value
              </div>
              <h3 className="text-3xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Plus
              </h3>
              <div className="text-4xl font-medium mb-1">
                ${getPrice('plus', 321)}
                <span className="text-lg font-normal opacity-60">/biweekly</span>
              </div>
              <p className="text-sm opacity-70 mb-6">5 scheduled days per week</p>
              <div className="w-full h-px bg-[var(--color-teal-dark)]/20 mb-6" />
              <ul className="space-y-3 mb-8">
                {[
                  '5 pre-scheduled days per week',
                  'Zone A included',
                  'Priority driver matching',
                  '48-hour advance booking',
                  '6 AM – 3 AM service window',
                  'Schedule flexibility',
                  'Priority support',
                ].map((f) => (
                  <li key={f} className="text-sm flex items-start gap-2">
                    <span className="mt-0.5">&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/apply?tier=plus"
                className="block w-full text-center py-3 rounded-[3px] text-xs font-medium tracking-[0.1em] uppercase bg-[var(--color-teal-dark)] text-white hover:bg-[var(--color-teal)] transition-colors"
                onClick={() => trackCTAClick('membership_plus', 'membership')}
              >
                Choose Plus
              </Link>
            </div>

            {/* Black Label */}
            <div className="bg-[var(--color-teal-dark)] rounded-lg p-8 text-white border border-white/10">
              <div className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[var(--color-copper)] mb-3">
                Premium
              </div>
              <h3 className="text-3xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Black Label
              </h3>
              <div className="text-4xl font-medium text-[var(--color-copper)] mb-1">
                ${getPrice('blackLabel', 598)}
                <span className="text-lg font-normal text-white/40">/biweekly</span>
              </div>
              <p className="text-sm text-white/50 mb-6">7 days per week</p>
              <div className="w-full h-px bg-white/10 mb-6" />
              <ul className="space-y-3 mb-8">
                {[
                  '7 days per week — full coverage',
                  'Zone A included',
                  'Premium vehicle assignment',
                  'Same-day schedule changes',
                  '6 AM – 3 AM service window',
                  'Priority support line',
                  'Guest rider privileges',
                  'Route optimization',
                ].map((f) => (
                  <li key={f} className="text-sm text-white/70 flex items-start gap-2">
                    <span className="text-[var(--color-copper)] mt-0.5">&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/apply?tier=black-label"
                className="btn-primary w-full text-center justify-center"
                onClick={() => trackCTAClick('membership_black_label', 'membership')}
              >
                Choose Black Label
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-16 px-[5%] bg-white">
        <div className="max-w-[900px] mx-auto">
          <h3 className="text-2xl text-center mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
            Compare All Tiers
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--color-rule)]">
                  <th className="text-left py-3 pr-4 font-medium text-[var(--color-text-mid)]">Feature</th>
                  <th className="text-center py-3 px-4 font-medium">Core</th>
                  <th className="text-center py-3 px-4 font-medium text-[var(--color-copper-dark)]">Plus</th>
                  <th className="text-center py-3 px-4 font-medium">Black Label</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Biweekly Price', `$${getPrice('core', 228)}`, `$${getPrice('plus', 321)}`, `$${getPrice('blackLabel', 598)}`],
                  ['Days Per Week', '3', '5', '7'],
                  ['Zone A Included', '&#10003;', '&#10003;', '&#10003;'],
                  ['Dedicated Driver', '&#10003;', '&#10003;', '&#10003;'],
                  ['48-Hour Advance Booking', '&#10003;', '&#10003;', '&#10003;'],
                  ['Service Window', '6AM–3AM', '6AM–3AM', '6AM–3AM'],
                  ['Schedule Flexibility', '—', '&#10003;', '&#10003;'],
                  ['Same-Day Changes', '—', '—', '&#10003;'],
                  ['Premium Vehicle', '—', '—', '&#10003;'],
                  ['Guest Rider', '—', '—', '&#10003;'],
                  ['Priority Support', '—', '&#10003;', '&#10003;'],
                ].map(([feature, core, plus, bl]) => (
                  <tr key={feature} className="border-b border-[var(--color-rule)]">
                    <td className="py-3 pr-4 text-[var(--color-text-mid)]">{feature}</td>
                    <td className="py-3 px-4 text-center" dangerouslySetInnerHTML={{ __html: core }} />
                    <td className="py-3 px-4 text-center font-medium" dangerouslySetInnerHTML={{ __html: plus }} />
                    <td className="py-3 px-4 text-center" dangerouslySetInnerHTML={{ __html: bl }} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-[5%] bg-[var(--color-teal-dark)] text-center">
        <h2 className="text-3xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Ready to stop guessing?
        </h2>
        <p className="text-white/60 max-w-[450px] mx-auto mb-8">
          Apply in under 5 minutes. We will confirm your zone, match your driver,
          and get you on the road.
        </p>
        <Link
          href="/apply"
          className="btn-primary"
          onClick={() => trackCTAClick('membership_bottom_cta', 'membership')}
        >
          Start Your Application <span>&rarr;</span>
        </Link>
      </section>
    </>
  );
}
