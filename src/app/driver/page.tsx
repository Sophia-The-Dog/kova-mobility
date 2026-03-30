'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddressAutocomplete from '@/components/AddressAutocomplete';
import { trackCTAClick } from '@/lib/analytics';
import type { ZoneResult } from '@/lib/zones';

export default function DriverPage() {
  const [zoneResult, setZoneResult] = useState<ZoneResult | null>(null);

  return (
    <>
      {/* HERO */}
      <section className="hero min-h-[70vh]">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('/images/hero-driver.webp')" }}
        />
        <div className="relative z-[2] px-[7%] pb-20 pt-32 max-w-[760px]">
          <div className="section-label text-[var(--color-copper)]">
            <span>Drive With Kova</span>
          </div>
          <h1 className="text-[clamp(2.4rem,5.5vw,4.2rem)] text-white leading-[1.06] mb-4">
            Drive with purpose.<br /><em className="italic">Earn with consistency.</em>
          </h1>
          <p className="text-[clamp(0.95rem,1.5vw,1.1rem)] text-white/85 leading-relaxed max-w-[500px] mb-6">
            Kova Mobility drivers are 1099 independent contractors with pre-scheduled
            routes, consistent members, and predictable earnings. No algorithm
            chasing. No empty miles.
          </p>
          <div className="max-w-[520px] mb-8">
            <AddressAutocomplete
              onAddressSelect={() => {}}
              onZoneResult={(result) => setZoneResult(result)}
              intentType="driver"
              placeholder="Enter your address to see service zones..."
              dark
            />
          </div>
          <Link
            href="/apply?intent=driver"
            className="btn-primary"
            onClick={() => trackCTAClick('driver_hero_apply', 'driver')}
          >
            Apply to Drive <span>&rarr;</span>
          </Link>
        </div>
      </section>

      {/* WHY DRIVE */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label"><span>Why Kova</span></div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-[var(--color-text-primary)] mb-6">
              This is not gig work.<br />This is a real route.
            </h2>
            <p className="text-[var(--color-text-mid)] leading-relaxed mb-5">
              Kova Mobility drivers do not sit in parking lots waiting for pings.
              You get assigned members. You get a route. You know your schedule
              before the week starts.
            </p>
            <p className="text-[var(--color-text-mid)] leading-relaxed mb-5">
              Members rely on you. That means consistent demand, not
              algorithm-dependent availability. You earn by showing up and
              providing the service — not by gaming a platform.
            </p>
            <p className="text-[var(--color-text-mid)] leading-relaxed">
              1099 contractor. Your vehicle. Your schedule within the Kova
              service window. Professional standards. Real accountability on both
              sides.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/panel-driver.webp"
              alt="Kova Mobility driver"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 px-[5%] bg-[var(--color-teal-dark)]">
        <div className="max-w-[900px] mx-auto text-center mb-14">
          <div className="section-label justify-center"><span>Driver Benefits</span></div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] text-white">
            What you get as a Kova driver.
          </h2>
        </div>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Pre-Scheduled Routes', desc: 'Know your pickups before the week starts. No guessing. No empty miles hunting for fares.' },
            { title: 'Consistent Members', desc: 'You drive the same people on the same routes. Build relationships. Build reliability.' },
            { title: 'Predictable Earnings', desc: 'Members pay biweekly. You earn consistently. No surge dependency. No slow-day anxiety.' },
            { title: '6 AM – 3 AM Window', desc: 'Flexible service hours that fit your lifestyle. Morning shifts. Night routes. You choose.' },
            { title: 'Zone Awareness', desc: 'You know your service area. Zone A, B, C — clear boundaries, clear expectations.' },
            { title: 'Professional Standards', desc: 'Kova drivers represent something. Clean vehicle. On time. Professional. That is the bar.' },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <h4 className="text-lg text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {item.title}
              </h4>
              <p className="text-sm text-white/60 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ZONE MAP INFO */}
      {zoneResult && (
        <section className="py-16 px-[5%] bg-white">
          <div className="max-w-[700px] mx-auto text-center">
            <div className="section-label justify-center"><span>Your Zone</span></div>
            <h3 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {zoneResult.label}
            </h3>
            <p className="text-[var(--color-text-mid)] mb-6">
              {zoneResult.description}. {zoneResult.eligible
                ? 'This area has active member demand — drivers in this zone receive regular route assignments.'
                : 'This area is outside our current service boundaries, but we are expanding.'}
            </p>
          </div>
        </section>
      )}

      {/* REQUIREMENTS */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <div className="section-label justify-center"><span>Requirements</span></div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-[var(--color-text-primary)]">
              What we need from you.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              'Valid Florida driver\'s license',
              'Clean driving record',
              'Vehicle 2015 or newer',
              'Current auto insurance',
              'Smartphone with GPS',
              'Professional appearance',
              'Reliable & punctual',
              'Pass background check',
            ].map((req) => (
              <div
                key={req}
                className="flex items-center gap-3 p-4 bg-white rounded border border-[var(--color-rule)]"
              >
                <span className="text-[var(--color-teal)] font-medium">&#10003;</span>
                <span className="text-sm text-[var(--color-text-mid)]">{req}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-[5%] bg-[var(--color-teal-dark)] text-center">
        <h2 className="text-3xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Ready to drive with purpose?
        </h2>
        <p className="text-white/60 max-w-[450px] mx-auto mb-8">
          Apply in under 5 minutes. We review applications within 48 hours.
        </p>
        <Link
          href="/apply?intent=driver"
          className="btn-primary"
          onClick={() => trackCTAClick('driver_bottom_apply', 'driver')}
        >
          Apply to Drive <span>&rarr;</span>
        </Link>
      </section>
    </>
  );
}
