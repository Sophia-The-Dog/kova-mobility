'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { trackAddressSubmission, trackZoneResult } from '@/lib/analytics';
import type { ZoneResult } from '@/lib/zones';

interface AddressData {
  address: string;
  lat: number;
  lng: number;
  placeId: string;
}

interface AddressAutocompleteProps {
  onAddressSelect: (data: AddressData) => void;
  onZoneResult?: (result: ZoneResult & { pricing: unknown }) => void;
  intentType?: string;
  placeholder?: string;
  className?: string;
  dark?: boolean;
}

declare global {
  interface Window {
    google: typeof google;
    initGooglePlaces: () => void;
  }
}

export default function AddressAutocomplete({
  onAddressSelect,
  onZoneResult,
  intentType = 'inquiry',
  placeholder = 'Enter your address in Panama City Beach...',
  className = '',
  dark = false,
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [zoneResult, setZoneResult] = useState<(ZoneResult & { pricing: unknown }) | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceSelect = useCallback(async () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    if (!place.geometry?.location) {
      setError('Please select a valid address from the dropdown.');
      return;
    }

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const address = place.formatted_address || '';
    const placeId = place.place_id || '';

    onAddressSelect({ address, lat, lng, placeId });
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/zone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lng }),
      });

      if (!res.ok) throw new Error('Zone lookup failed');

      const data = await res.json();
      setZoneResult(data);
      onZoneResult?.(data);

      trackAddressSubmission(data.zone, intentType);
      trackZoneResult(data.zone, data.eligible);
    } catch {
      setError('Could not determine your zone. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [onAddressSelect, onZoneResult, intentType]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey) return;

    const initAutocomplete = () => {
      if (!inputRef.current || !window.google) return;

      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ['address'],
          componentRestrictions: { country: 'us' },
          fields: ['formatted_address', 'geometry', 'place_id'],
        }
      );

      // Bias toward PCB
      const pcbBounds = new window.google.maps.LatLngBounds(
        { lat: 30.1, lng: -86.1 },
        { lat: 30.35, lng: -85.6 }
      );
      autocompleteRef.current.setBounds(pcbBounds);

      autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
    };

    if (window.google?.maps?.places) {
      initAutocomplete();
      return;
    }

    // Load Google Places script
    window.initGooglePlaces = initAutocomplete;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGooglePlaces`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [handlePlaceSelect]);

  const zoneColorMap: Record<string, string> = {
    A: 'zone-a',
    B: 'zone-b',
    C: 'zone-c',
    D: 'zone-d',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className={`w-full px-5 py-4 text-base rounded-md border transition-all outline-none ${
            dark
              ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[var(--color-copper)] focus:bg-white/15'
              : 'bg-white border-[var(--color-rule)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-light)] focus:border-[var(--color-teal)] focus:shadow-[0_0_0_3px_rgba(45,90,90,0.1)]'
          }`}
          aria-label="Enter your address"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-[var(--color-copper)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}

      {zoneResult && !loading && (
        <div
          className={`mt-4 p-4 rounded-md transition-all animate-[fadeIn_0.3s_ease-out] ${
            dark ? 'bg-white/10' : 'bg-white shadow-sm border border-[var(--color-rule)]'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className={`zone-badge ${zoneColorMap[zoneResult.zone]}`}>
              {zoneResult.label}
            </span>
            {zoneResult.eligible ? (
              <span className="text-xs text-green-600 font-medium tracking-wide uppercase">
                Service Available
              </span>
            ) : (
              <span className="text-xs text-red-500 font-medium tracking-wide uppercase">
                Outside Service Area
              </span>
            )}
          </div>
          <p className={`text-sm ${dark ? 'text-white/70' : 'text-[var(--color-text-mid)]'}`}>
            {zoneResult.message}
          </p>
        </div>
      )}
    </div>
  );
}
