import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Policies | Kova Mobility',
  description: 'Privacy policy, terms of service, and membership policies for Kova Mobility transportation services in Panama City Beach, FL.',
  alternates: { canonical: 'https://www.kovamobility.com/policies' },
};

export default function PoliciesPage() {
  return (
    <>
      <section className="pt-32 pb-10 px-[5%]">
        <div className="max-w-[800px] mx-auto">
          <div className="section-label"><span>Legal</span></div>
          <h1 className="text-[clamp(2rem,4vw,3rem)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Policies &amp; Terms
          </h1>
        </div>
      </section>

      <section className="pb-24 px-[5%]">
        <div className="max-w-[800px] mx-auto space-y-12">
          {/* Privacy Policy */}
          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Privacy Policy
            </h2>
            <div className="text-[var(--color-text-mid)] text-sm leading-relaxed space-y-4">
              <p>
                Kova Mobility (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to
                protecting your personal information. This Privacy Policy explains how we collect, use,
                and share information when you use our website and services.
              </p>
              <p>
                <strong>Information We Collect:</strong> We collect personal information you provide directly,
                including your name, email address, phone number, physical address, and geographic coordinates
                (for zone determination). We also collect usage data through Google Analytics and Microsoft
                Clarity, including page views, session duration, and interaction patterns.
              </p>
              <p>
                <strong>How We Use Your Information:</strong> We use your information to provide and improve
                our transportation services, determine your service zone and pricing eligibility, communicate
                with you about your membership or application, and analyze site usage to improve user experience.
              </p>
              <p>
                <strong>Data Sharing:</strong> We do not sell your personal information. We may share data with
                service providers (Supabase for data storage, Google for analytics and address services,
                Microsoft for session analytics) who assist us in operating our platform.
              </p>
              <p>
                <strong>Cookies:</strong> We use cookies and similar technologies for analytics and site
                functionality. You can manage cookie preferences through our cookie banner or your browser settings.
              </p>
              <p>
                <strong>Contact:</strong> For privacy-related inquiries, email us at{' '}
                <a href="mailto:info@kovamobility.com" className="text-[var(--color-teal)] underline">
                  info@kovamobility.com
                </a>.
              </p>
            </div>
          </div>

          {/* Terms of Service */}
          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Terms of Service
            </h2>
            <div className="text-[var(--color-text-mid)] text-sm leading-relaxed space-y-4">
              <p>
                By accessing or using kovamobility.com and our transportation services, you agree to be
                bound by these Terms of Service. Kova Mobility provides pre-scheduled, fixed-price
                transportation membership services in the Panama City Beach, Florida area.
              </p>
              <p>
                <strong>Membership:</strong> Membership plans are billed biweekly. Pricing is determined by
                your service zone and selected tier (Core, Plus, or Black Label). Schedule changes require
                48-hour advance notice unless otherwise specified by your tier.
              </p>
              <p>
                <strong>Service Area:</strong> Service availability is determined by geographic zone classification.
                Zone boundaries are defined by Kova Mobility and may be updated. Zone-based pricing is
                calculated at the time of application and may be adjusted with notice.
              </p>
              <p>
                <strong>Drivers:</strong> Kova Mobility drivers are independent 1099 contractors. Driver
                availability, route assignments, and scheduling are managed by Kova Mobility operations.
              </p>
              <p>
                <strong>Cancellation:</strong> Members may cancel their membership with written notice. Party
                Pass reservations may be subject to cancellation policies communicated at the time of booking.
              </p>
              <p>
                <strong>Limitation of Liability:</strong> Kova Mobility provides transportation coordination
                services and is not liable for circumstances beyond reasonable control, including but not limited
                to weather, traffic conditions, or driver emergencies.
              </p>
            </div>
          </div>

          {/* Membership Policies */}
          <div>
            <h2 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Membership Policies
            </h2>
            <div className="text-[var(--color-text-mid)] text-sm leading-relaxed space-y-4">
              <p>
                <strong>Billing:</strong> All memberships are billed biweekly on a recurring basis. Payment
                is due at the start of each billing cycle.
              </p>
              <p>
                <strong>Schedule Changes:</strong> Core and Plus members must provide 48-hour advance notice
                for schedule modifications. Black Label members may make same-day changes subject to driver
                availability.
              </p>
              <p>
                <strong>No-Shows:</strong> If a member is not present at the scheduled pickup location within
                5 minutes of the scheduled time, the ride may be marked as fulfilled and no credit will be issued.
              </p>
              <p>
                <strong>Service Window:</strong> All tiers operate within the 6 AM to 3 AM service window.
                Rides outside this window are not available.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}