/**
 * KOVA MOBILITY — ZONE ENGINE
 * Geospatial point-in-polygon zone classification for Panama City Beach, FL
 *
 * Zone A: Core PCB (Thomas Drive to Pier Park corridor)
 * Zone B: Extended PCB (West PCB, Laguna Beach, lower Bay County)
 * Zone C: Outer service area (Lynn Haven, Springfield, Callaway, Parker)
 * Zone D: Out of service / special request
 */

export type ZoneId = 'A' | 'B' | 'C' | 'D';

export interface ZoneResult {
  zone: ZoneId;
  label: string;
  description: string;
  eligible: boolean;
  pricingTier: 'standard' | 'extended' | 'premium' | 'special';
  message: string;
}

type Polygon = [number, number][]; // [lng, lat] pairs

// Zone polygons defined as [longitude, latitude] coordinate pairs
// These cover the real geography of Panama City Beach and Bay County

const ZONE_A_POLYGON: Polygon = [
  // Core PCB: Thomas Drive area east to Pier Park corridor west
  [-85.7350, 30.2100],
  [-85.7350, 30.1750],
  [-85.7900, 30.1650],
  [-85.8500, 30.1700],
  [-85.8800, 30.1800],
  [-85.9200, 30.1900],
  [-85.9500, 30.2050],
  [-85.9500, 30.2350],
  [-85.9200, 30.2400],
  [-85.8800, 30.2350],
  [-85.8500, 30.2300],
  [-85.7900, 30.2200],
  [-85.7350, 30.2100],
];

const ZONE_B_POLYGON: Polygon = [
  // Extended PCB + Laguna Beach + lower Bay County
  [-85.6800, 30.2500],
  [-85.6800, 30.1500],
  [-85.7500, 30.1300],
  [-85.8500, 30.1400],
  [-85.9800, 30.1600],
  [-86.0200, 30.1800],
  [-86.0500, 30.2200],
  [-86.0500, 30.2800],
  [-86.0200, 30.2900],
  [-85.9500, 30.2800],
  [-85.8500, 30.2700],
  [-85.7500, 30.2600],
  [-85.6800, 30.2500],
];

const ZONE_C_POLYGON: Polygon = [
  // Lynn Haven, Springfield, Callaway, Parker, greater Bay County
  [-85.5500, 30.3500],
  [-85.5500, 30.1000],
  [-85.7000, 30.0800],
  [-85.9000, 30.1000],
  [-86.1500, 30.1200],
  [-86.2000, 30.2000],
  [-86.2000, 30.3800],
  [-86.0000, 30.4200],
  [-85.8000, 30.4000],
  [-85.6000, 30.3700],
  [-85.5500, 30.3500],
];

const ZONE_METADATA: Record<ZoneId, Omit<ZoneResult, 'zone'>> = {
  A: {
    label: 'Zone A — Core PCB',
    description: 'Premium service area with full availability',
    eligible: true,
    pricingTier: 'standard',
    message: 'Full service available. Zone A included in all membership tiers.',
  },
  B: {
    label: 'Zone B — Extended PCB',
    description: 'Extended service area with standard availability',
    eligible: true,
    pricingTier: 'extended',
    message: 'Service available. Extended zone pricing may apply.',
  },
  C: {
    label: 'Zone C — Outer Bay County',
    description: 'Outer service area with limited availability',
    eligible: true,
    pricingTier: 'premium',
    message: 'Limited availability. Premium zone — contact us for scheduling.',
  },
  D: {
    label: 'Zone D — Outside Service Area',
    description: 'Outside standard service boundaries',
    eligible: false,
    pricingTier: 'special',
    message: 'This address is outside our current service area. Contact us for special arrangements.',
  },
};

/**
 * Ray-casting algorithm for point-in-polygon detection
 */
function pointInPolygon(lng: number, lat: number, polygon: Polygon): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    const intersect =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Determine zone from coordinates.
 * Checks zones in order of specificity: A → B → C → D (fallback)
 */
export function getZoneFromCoordinates(lat: number, lng: number): ZoneResult {
  if (pointInPolygon(lng, lat, ZONE_A_POLYGON)) {
    return { zone: 'A', ...ZONE_METADATA.A };
  }
  if (pointInPolygon(lng, lat, ZONE_B_POLYGON)) {
    return { zone: 'B', ...ZONE_METADATA.B };
  }
  if (pointInPolygon(lng, lat, ZONE_C_POLYGON)) {
    return { zone: 'C', ...ZONE_METADATA.C };
  }
  return { zone: 'D', ...ZONE_METADATA.D };
}

/**
 * Get pricing information based on zone
 */
export function getZonePricing(zone: ZoneId) {
  const pricing = {
    A: {
      core: { biweekly: 228, label: 'Core', days: 3 },
      plus: { biweekly: 321, label: 'Plus', days: 5 },
      blackLabel: { biweekly: 598, label: 'Black Label', days: 7 },
    },
    B: {
      core: { biweekly: 258, label: 'Core', days: 3 },
      plus: { biweekly: 361, label: 'Plus', days: 5 },
      blackLabel: { biweekly: 648, label: 'Black Label', days: 7 },
    },
    C: {
      core: { biweekly: 298, label: 'Core', days: 3 },
      plus: { biweekly: 411, label: 'Plus', days: 5 },
      blackLabel: { biweekly: 718, label: 'Black Label', days: 7 },
    },
    D: {
      core: null,
      plus: null,
      blackLabel: null,
    },
  };
  return pricing[zone];
}
