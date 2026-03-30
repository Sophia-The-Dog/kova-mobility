'use client';

import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AddressAutocomplete from '@/components/AddressAutocomplete';
import { trackFormStart, trackFormComplete, trackFunnelStep } from '@/lib/analytics';
import type { ZoneResult } from '@/lib/zones';

interface AddressData {
  address: string;
  lat: number;
  lng: number;
  placeId: string;
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const intentParam = searchParams.get('intent') || searchParams.get('tier') || '';

  const getInitialIntent = (): string => {
    if (intentParam.includes('driver')) return 'driver';
    if (intentParam.includes('party')) return 'party-pass';
    return 'member';
  };

  const [step, setStep] = useState(1);
  const [intent, setIntent] = useState(getInitialIntent());
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [zoneResult, setZoneResult] = useState<ZoneResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    // Driver-specific
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    hasInsurance: false,
    hasCleanRecord: false,
    availability: '',
    message: '',
  });

  const handleAddressSelect = useCallback((data: AddressData) => {
    setAddressData(data);
    trackFunnelStep('address_entered', intent);
  }, [intent]);

  const handleZoneResult = useCallback((result: ZoneResult) => {
    setZoneResult(result);
    trackFunnelStep('zone_determined', intent);
    if (result.eligible) {
      setStep(2);
      trackFormStart(intent);
    }
  }, [intent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressData || !zoneResult) return;

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: addressData.address,
        lat: addressData.lat,
        lng: addressData.lng,
        placeId: addressData.placeId,
        zone: zoneResult.zone,
        intentType: intent,
        ...(intent === 'driver'
          ? {
              vehicleYear: formData.vehicleYear,
              vehicleMake: formData.vehicleMake,
              vehicleModel: formData.vehicleModel,
              hasInsurance: formData.hasInsurance,
              hasCleanRecord: formData.hasCleanRecord,
              availability: formData.availability,
              message: formData.message,
            }
          : {}),
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Submission failed');

      setSubmitted(true);
      trackFormComplete(intent, zoneResult.zone);
    } catch {
      setError('Something went wrong. Please try again or call us at (850) 348-0759.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center px-[5%] pt-20">
        <div className="max-w-[500px] text-center">
          <div className="text-[var(--color-copper)] text-5xl mb-6">&#10003;</div>
          <h1 className="text-3xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Application Received
          </h1>
          <p className="text-[var(--color-text-mid)] mb-8">
            Thank you. We will review your application and reach out within 48 hours.
            If you need immediate assistance, call us at{' '}
            <a href="tel:8503480759" className="text-[var(--color-teal)] underline">
              (850) 348-0759
            </a>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="hero min-h-[45vh]">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('/images/hero-apply.webp')" }}
        />
        <div className="relative z-[2] px-[7%] pb-16 pt-32 max-w-[760px]">
          <div className="section-label text-[var(--color-copper)]">
            <span>Apply Now</span>
          </div>
          <h1 className="text-[clamp(2.4rem,5.5vw,4.2rem)] text-white leading-[1.06] mb-4">
            {intent === 'driver' ? 'Apply to Drive' : intent === 'party-pass' ? 'Reserve Party Pass' : 'Start Your Membership'}
          </h1>
          <p className="text-white/85 leading-relaxed max-w-[500px]">
            {intent === 'driver'
              ? 'Join our network of vetted 1099 drivers with pre-scheduled routes and consistent earnings.'
              : 'Tell us where you are and we will confirm your zone, match your driver, and get you on the road.'}
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[640px] mx-auto">
          {/* Intent selector */}
          <div className="mb-8">
            <label className="text-xs font-medium tracking-[0.1em] uppercase text-[var(--color-text-light)] block mb-3">
              I want to:
            </label>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: 'member', label: 'Become a Member' },
                { value: 'party-pass', label: 'Get Party Pass' },
                { value: 'driver', label: 'Drive With Kova' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setIntent(opt.value);
                    setStep(addressData && zoneResult?.eligible ? 2 : 1);
                  }}
                  className={`px-4 py-2 rounded text-xs font-medium tracking-[0.08em] uppercase border transition-all cursor-pointer ${
                    intent === opt.value
                      ? 'bg-[var(--color-teal)] text-white border-[var(--color-teal)]'
                      : 'bg-transparent text-[var(--color-text-mid)] border-[var(--color-rule)] hover:border-[var(--color-teal)]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 1: Address */}
          <div className={`mb-10 ${step > 1 ? 'opacity-60' : ''}`}>
            <h2 className="text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Step 1: Check Your Address
            </h2>
            <AddressAutocomplete
              onAddressSelect={handleAddressSelect}
              onZoneResult={handleZoneResult}
              intentType={intent}
              placeholder="Start typing your address..."
            />
          </div>

          {/* Step 2: Contact Info */}
          {step >= 2 && (
            <form onSubmit={handleSubmit} className="animate-[fadeIn_0.3s_ease-out]">
              <h2 className="text-xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Step 2: Your Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-text-light)] block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-[var(--color-rule)] rounded bg-white text-[var(--color-text-primary)] focus:border-[var(--color-teal)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(45,90,90,0.1)] transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-text-light)] block mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-[var(--color-rule)] rounded bg-white text-[var(--color-text-primary)] focus:border-[var(--color-teal)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(45,90,90,0.1)] transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-text-light)] block mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-[var(--color-rule)] rounded bg-white text-[var(--color-text-primary)] focus:border-[var(--color-teal)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(45,90,90,0.1)] transition-all"
                      placeholder="(850) 555-0123"
                    />
                  </div>
                </div>

                {/* Driver-specific fields */}
                {intent === 'driver' && (
                  <>
                    <div className="pt-4 border-t border-[var(--color-rule)]">
                      <h3 className="text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Vehicle Information
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-text-light)] block mb-1">Year *</label>
                        <input
                          type="text"
                          required
                          value={formData.vehicleYear}
                          onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                          className="w-full px-4 py-3 border border-[var(--color-rule)] rounded bg-white focus:border-[var(--color-teal)] focus:outline-none transition-all"
                          placeholder="2020"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-text-light)] block mb-1">Make *</label>
                        <input
                          type="text"
                          required
                          value={formData.vehicleMake}
                          onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                          className="w-full px-4 py-3 border border-[var(--color-rule)] rounded bg-white focus:border-[var(--color-teal)] focus:outline-none transition-all"
                          placeholder="Toyota"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-text-light)] block mb-1">Model *</label>
                        <input
                          type="text"
                          required
                          value={formData.vehicleModel}
                          onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                          className="w-full px-4 py-3 border border-[var(--color-rule)] rounded bg-white focus:border-[var(--color-teal)] focus:outline-none transition-all"
                          placeholder="Camry"
                        />
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 text-sm text-[var(--color-text-mid)] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hasInsurance}
                          onChange={(e) => setFormData({ ...formData, hasInsurance: e.target.checked })}
                          className="accent-[var(--color-teal)]"
                        />
                        Current auto insurance
                      </label>
                      <label className="flex items-center gap-2 text-sm text-[var(--color-text-mid)] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hasCleanRecord}
                          onChange={(e) => setFormData({ ...formData, hasCleanRecord: e.target.checked })}
                          className="accent-[var(--color-teal)]"
                        />
                        Clean driving record
                      </label>
                    </div>
                    <div>
                      <label className="text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-text-light)] block mb-1">
                        Availability
                      </label>
                      <input
                        type="text"
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        className="w-full px-4 py-3 border border-[var(--color-rule)] rounded bg-white focus:border-[var(--color-teal)] focus:outline-none transition-all"
                        placeholder="e.g., Weekdays 6 AM – 2 PM"
                      />
                    </div>
                  </>
                )}

                {/* Message (optional) */}
                <div>
                  <label className="text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-text-light)] block mb-1">
                    Anything else? (optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-[var(--color-rule)] rounded bg-white text-[var(--color-text-primary)] focus:border-[var(--color-teal)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(45,90,90,0.1)] transition-all resize-y"
                    placeholder="Tell us about your schedule, situation, or any questions..."
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>

                <p className="text-xs text-[var(--color-text-light)] text-center">
                  We review applications within 48 hours. Questions? Call{' '}
                  <a href="tel:8503480759" className="text-[var(--color-teal)]">(850) 348-0759</a>.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20" />}>
      <ApplyForm />
    </Suspense>
  );
}