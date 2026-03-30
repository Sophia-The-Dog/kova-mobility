'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { TeamMember } from '@/data/team';

export default function TeamCard({ member }: { member: TeamMember }) {
  const [expanded, setExpanded] = useState(false);

  const formatPhone = (phone: string) => {
    const clean = phone.replace(/\D/g, '');
    return `(${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(6)}`;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[var(--color-rule)] transition-transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      {/* Photo */}
      <div className="relative aspect-[4/5] bg-[var(--color-teal-dark)] overflow-hidden">
        <Image
          src={member.image}
          alt={`${member.name}, ${member.sectionLabel} at Kova Mobility`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Section label */}
        <div className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[var(--color-copper)] mb-3">
          {member.sectionLabel}
        </div>

        {/* Name */}
        <h3
          className="text-2xl mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {member.name}
        </h3>

        {/* Divider */}
        <div className="w-10 h-px bg-[var(--color-copper)] mb-4" />

        {/* Short bio */}
        <p className="text-[var(--color-text-mid)] text-sm leading-relaxed mb-4">
          {member.shortBio}
        </p>

        {/* Expandable full bio */}
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[var(--color-teal)] text-xs font-medium tracking-[0.1em] uppercase hover:text-[var(--color-teal-mid)] transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            {expanded ? 'Read Less \u2212' : 'Read More +'}
          </button>

          {expanded && (
            <div className="mt-4 pt-4 border-t border-[var(--color-rule)] animate-[fadeIn_0.3s_ease-out]">
              {member.fullBio.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[var(--color-text-mid)] text-sm leading-relaxed mb-3 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}

              {/* Pull quote */}
              {member.pullQuote && (
                <blockquote className="mt-5 pl-4 border-l-2 border-[var(--color-copper)] italic text-[var(--color-text-mid)] text-sm">
                  &ldquo;{member.pullQuote}&rdquo;
                </blockquote>
              )}
            </div>
          )}
        </div>

        {/* Contact */}
        <div className="mt-5 pt-4 border-t border-[var(--color-rule)] flex flex-wrap gap-4">
          <a
            href={`mailto:${member.email}`}
            className="text-xs text-[var(--color-teal)] hover:text-[var(--color-teal-mid)] tracking-[0.04em] transition-colors"
          >
            {member.email}
          </a>
          <a
            href={`tel:${member.phone}`}
            className="text-xs text-[var(--color-teal)] hover:text-[var(--color-teal-mid)] tracking-[0.04em] transition-colors"
          >
            {formatPhone(member.phone)}
          </a>
        </div>
      </div>
    </div>
  );
}
