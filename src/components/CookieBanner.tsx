'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('kova_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('kova_cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('kova_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[var(--color-teal-dark)] border-t border-white/10 px-[5%] py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-white/70 text-sm">
        We use cookies to improve your experience and analyze site traffic.
      </p>
      <div className="flex gap-3">
        <button
          onClick={decline}
          className="text-white/50 text-xs tracking-[0.1em] uppercase hover:text-white transition-colors bg-transparent border-none cursor-pointer"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="bg-[var(--color-copper)] text-[var(--color-teal-dark)] text-xs font-medium tracking-[0.1em] uppercase px-5 py-2 rounded-[3px] hover:bg-[var(--color-copper-light)] transition-colors border-none cursor-pointer"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
