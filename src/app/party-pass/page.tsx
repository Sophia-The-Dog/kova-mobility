'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddressAutocomplete from '@/components/AddressAutocomplete';
import { trackCTAClick } from '@/lib/analytics';
import type { ZoneResult } from '@/lib/zones';

export default function PartyPassPage() {
  const [zoneResult, setZoneResult] = useState<ZoneResult | null>(null);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('/images/hero-party.webp')" }}
        />
        <div className="relative z-[2] px-[7%] pb-24 pt-32 max-w-[760px]">
          <div className="section-label text-[var(--color-copper)]">
            <span>Party Pass</span>
          </div>
          <h1 className="text-[clamp(2.4rem,5.5vw,4.5rem)] text-white leading-[1.06] mb-4">
            Plan the night.<br /><em className="italic">Not the ride home.</em>
          </h1>
          <p className="text-[clamp(0.95rem,1.5vw,1.1rem)] text-white/85 leading-relaxed max-w-[500px] mb-2">
            Group mobility for Panama City Beach nightlife. Pre-scheduled pickups.
            No surge. No waiting. Everyone gets home.
          </p>
          <p className="text-[0.85rem] text-white/60 tracking-wide mb-8">
            Book your group. Lock in pickup. Enjoy the night.
          </p>

          <div className="max-w-[520px] mb-8">
            <AddressAutocomplete
              onAddressSelect={() => {}}
              onZoneResult={(result) => setZoneResult(result)}
              intentType="party-pass"
              placeholder="Check pickup eligibility for your area..."
              dark
            />
          </div>

          <div className="flex gap-3 flex-wrap items-center">
            <Link
              href="/apply?intent=party-pass"
              className="btn-primary"
              onClick={() => trackCTAClick('party_hero_reserve', 'party-pass')}
            >
              Reserve Your Spot <span>&rarr;</span>
            </Link>
            <Link href="/membership" className="btn-ghost">
              Or Become a Member
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT IS PARTY PASS */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label"><span>What Is Party Pass</span></div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-[var(--color-text-primary)] mb-6">
              Your group. Your schedule. Your ride home. Guaranteed.
            </h2>
            <p className="text-[var(--color-text-mid)] leading-relaxed mb-5">
              Party Pass is Kova Mobility&apos;s group transportation service for
              nightlife, events, and group outings in Panama City Beach. You book
              in advance, tell us where and when, and we handle the rest.
            </p>
            <p className="text-[var(--color-text-mid)] leading-relaxed mb-5">
              No splitting Uber costs at 2 AM. No surge pricing when the bars
              close. No waiting 45 minutes for a driver who might cancel. Your
              pickup is locked in before the night starts.
            </p>
            <p className="text-[var(--color-text-mid)] leading-relaxed">
              This is for bachelor and bachelorette parties, work teams hitting the
              strip, friend groups who want to enjoy PCB nightlife without worrying
              about who is driving home.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/pcb-night.webp"
              alt="Panama City Beach nightlife"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-[5%] bg-[var(--color-teal-dark)]">
        <div className="max-w-[900px] mx-auto text-center mb-14">
          <div className="section-label justify-center"><span>How Party Pass Works</span></div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] text-white">
            Three steps to a better night.
          </h2>
        </div>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              step: '01',
              title: 'Book Your Group',
              desc: 'Tell us the group size, pickup location, and when you want to be picked up. We confirm availability and lock in your ride.',
            },
            {
              step: '02',
              title: 'Enjoy the Night',
              desc: 'Go out. Have fun. Your driver is already scheduled. No apps to check. No availability to worry about. It is handled.',
            },
            {
              step: '03',
              title: 'Everyone Gets Home',
              desc: 'Your driver shows up exactly when scheduled. Everyone in the group gets home safely. No surge. No drama. No exceptions.',
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-[var(--color-copper)] text-4xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {item.step}
              </div>
              <h3 className="text-xl text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                {item.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[900px] mx-auto text-center mb-14">
          <div className="section-label justify-center"><span>Perfect For</span></div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] text-[var(--color-text-primary)]">
            Built for groups who want to enjoy PCB.
          </h2>
        </div>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Bachelor & Bachelorette Parties', desc: 'Pre-planned group transportation for the full celebration.' },
            { title: 'Night Out With Friends', desc: 'Hit the strip without worrying about who drives home.' },
            { title: 'Work Team Outings', desc: 'Corporate events, team dinners, and holiday parties covered.' },
            { title: 'Spring Break Groups', desc: 'Safe, scheduled rides for the biggest party season in PCB.' },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-lg border border-[var(--color-rule)] shadow-sm"
            >
              <h4 className="text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {item.title}
              </h4>
              <p className="text-sm text-[var(--color-text-mid)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-[5%] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/pcb-dusk.webp"
            alt="Panama City Beach at dusk"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[var(--color-teal-dark)]/85" />
        </div>
        <div className="relative z-[2] max-w-[700px] mx-auto text-center">
          <h2 className="text-[clamp(2rem,4vw,3rem)] text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your night. Your call.<br />Our driver.
          </h2>
          <p className="text-white/70 mb-8 max-w-[500px] mx-auto">
            Book your Party Pass now and take the guesswork out of getting home.
            Pre-scheduled. Pre-priced. Pre-handled.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/apply?intent=party-pass"
              className="btn-primary"
              onClick={() => trackCTAClick('party_bottom_reserve', 'party-pass')}
            >
              Reserve Your Spot <span>&rarr;</span>
            </Link>
            <Link href="/membership" className="btn-ghost">
              View Membership Plans
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
