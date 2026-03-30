'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { trackCTAClick } from '@/lib/analytics';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] px-[5%] h-[68px] flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(13,31,31,0.97)] backdrop-blur-[20px] shadow-[0_1px_0_rgba(201,168,108,0.15)]'
            : 'bg-transparent'
        }`}
        style={!scrolled ? {
          backgroundImage: 'linear-gradient(to bottom, rgba(13,31,31,0.95), transparent)',
        } : undefined}
      >
        <Link
          href="/"
          className="font-[var(--font-display)] text-[1.4rem] font-bold tracking-[0.1em] text-white hover:opacity-80 transition-opacity"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          KOVA
        </Link>

        {/* Desktop nav */}
        <ul className="nav-links-desktop flex items-center gap-[0.1rem] list-none">
          <li>
            <Link
              href="/membership"
              className="text-white/80 text-[0.72rem] font-normal tracking-[0.1em] uppercase px-3 py-2 hover:text-white transition-colors"
            >
              Membership
            </Link>
          </li>
          <li>
            <Link
              href="/party-pass"
              className="text-white/80 text-[0.72rem] font-normal tracking-[0.1em] uppercase px-3 py-2 hover:text-white transition-colors"
            >
              Party Pass
            </Link>
          </li>
          <li>
            <Link
              href="/driver"
              className="text-white/80 text-[0.72rem] font-normal tracking-[0.1em] uppercase px-3 py-2 hover:text-white transition-colors"
            >
              Drive
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-white/80 text-[0.72rem] font-normal tracking-[0.1em] uppercase px-3 py-2 hover:text-white transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/friends-of-pcb"
              className="text-white/80 text-[0.72rem] font-normal tracking-[0.1em] uppercase px-3 py-2 hover:text-white transition-colors"
            >
              Partners
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-white/80 text-[0.72rem] font-normal tracking-[0.1em] uppercase px-3 py-2 hover:text-white transition-colors"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/apply"
              className="bg-[var(--color-copper)] text-[var(--color-teal-dark)] font-medium text-[0.72rem] tracking-[0.08em] uppercase px-5 py-2 rounded-[3px] hover:bg-[var(--color-copper-light)] transition-colors ml-2"
              onClick={() => trackCTAClick('nav_apply', 'navigation')}
            >
              Apply Now
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-[22px] h-[1.5px] bg-white transition-transform duration-300 ${
              mobileOpen ? 'translate-y-[6.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-[22px] h-[1.5px] bg-white transition-opacity duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-[22px] h-[1.5px] bg-white transition-transform duration-300 ${
              mobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="mobile-nav-panel fixed inset-0 z-[999] bg-[var(--color-teal-dark)] pt-20 px-8 flex flex-col gap-1">
          {[
            { href: '/', label: 'Home' },
            { href: '/membership', label: 'Membership' },
            { href: '/party-pass', label: 'Party Pass' },
            { href: '/driver', label: 'Drive With Us' },
            { href: '/about', label: 'About' },
            { href: '/friends-of-pcb', label: 'Partners' },
            { href: '/blog', label: 'Blog' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-white/80 text-lg py-3 border-b border-white/10 hover:text-[var(--color-copper-light)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/apply"
            onClick={() => {
              setMobileOpen(false);
              trackCTAClick('nav_apply_mobile', 'navigation');
            }}
            className="btn-primary mt-6 text-center justify-center"
          >
            Apply Now
          </Link>
        </div>
      )}
    </>
  );
}
