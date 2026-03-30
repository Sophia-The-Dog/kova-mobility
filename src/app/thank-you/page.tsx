import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You | Kova Mobility',
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-[5%] pt-20">
      <div className="max-w-[500px] text-center">
        <div className="text-[var(--color-copper)] text-6xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          &#10003;
        </div>
        <h1 className="text-3xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Thank You
        </h1>
        <p className="text-[var(--color-text-mid)] mb-8 leading-relaxed">
          Your submission has been received. Our team will review it and reach out
          within 48 hours. If you need immediate assistance, call us at{' '}
          <a href="tel:8503480759" className="text-[var(--color-teal)] underline">
            (850) 348-0759
          </a>.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}