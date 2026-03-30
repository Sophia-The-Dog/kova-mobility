/**
 * KOVA MOBILITY — Analytics & Tracking Layer
 * GA4 + Microsoft Clarity event tracking
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    clarity: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params || {});
  }
}

export function trackAddressSubmission(zone: string, intentType: string) {
  trackEvent('address_submitted', {
    zone,
    intent_type: intentType,
    event_category: 'engagement',
  });
}

export function trackZoneResult(zone: string, eligible: boolean) {
  trackEvent('zone_determined', {
    zone,
    eligible: eligible.toString(),
    event_category: 'zone_engine',
  });
}

export function trackCTAClick(ctaName: string, page: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    page,
    event_category: 'conversion',
  });
}

export function trackFormStart(formType: string) {
  trackEvent('form_start', {
    form_type: formType,
    event_category: 'funnel',
  });
}

export function trackFormComplete(formType: string, zone?: string) {
  trackEvent('form_complete', {
    form_type: formType,
    zone: zone || 'unknown',
    event_category: 'conversion',
  });
}

export function trackFunnelStep(step: string, formType: string) {
  trackEvent('funnel_step', {
    step,
    form_type: formType,
    event_category: 'funnel',
  });
}
