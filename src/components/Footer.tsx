import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-teal-dark)] text-white/60 relative z-10">
      <div className="max-w-[1280px] mx-auto px-[5%] py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div
              className="text-white text-2xl font-bold tracking-[0.1em] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              KOVA
            </div>
            <p className="text-sm leading-relaxed">
              Pre-scheduled, fixed-price transportation in Panama City Beach.
              Your dedicated driver — built around your life, not an algorithm.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[var(--color-copper)] text-xs font-medium tracking-[0.2em] uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/membership" className="hover:text-white transition-colors">
                  Membership Plans
                </Link>
              </li>
              <li>
                <Link href="/party-pass" className="hover:text-white transition-colors">
                  Party Pass
                </Link>
              </li>
              <li>
                <Link href="/driver" className="hover:text-white transition-colors">
                  Drive With Us
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-white transition-colors">
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[var(--color-copper)] text-xs font-medium tracking-[0.2em] uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/friends-of-pcb" className="hover:text-white transition-colors">
                  Friends of PCB
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white transition-colors">
                  Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[var(--color-copper)] text-xs font-medium tracking-[0.2em] uppercase mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:8503480759" className="hover:text-white transition-colors">
                  (850) 348-0759
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@kovamobility.com"
                  className="hover:text-white transition-colors"
                >
                  info@kovamobility.com
                </a>
              </li>
              <li className="pt-2">Panama City Beach, FL</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; 2025&ndash;2026 Kova Mobility. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/policies" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/policies" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
