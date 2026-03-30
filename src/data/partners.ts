export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  description: string;
  location: string;
  website?: string;
  isPlaceholder?: boolean;
}

export type PartnerCategory =
  | 'hotels-resorts'
  | 'venues-nightlife'
  | 'restaurants'
  | 'short-term-rentals'
  | 'community-chamber';

export const categoryLabels: Record<PartnerCategory, string> = {
  'hotels-resorts': 'Hotels & Resorts',
  'venues-nightlife': 'Venues & Nightlife',
  'restaurants': 'Restaurants',
  'short-term-rentals': 'Short-Term Rentals & Airbnb',
  'community-chamber': 'Community & Chamber',
};

export const categoryDescriptions: Record<PartnerCategory, string> = {
  'hotels-resorts':
    'Premier hotels and resorts offering Kova Mobility transportation to their guests.',
  'venues-nightlife':
    'Nightlife destinations and event venues with dedicated Kova Mobility pickup service.',
  'restaurants':
    'Dining partners throughout Panama City Beach connected to our transportation network.',
  'short-term-rentals':
    'Vacation rental hosts and Airbnb properties with integrated Kova Mobility access.',
  'community-chamber':
    'Community organizations and Chamber members supporting transportation equity in Bay County.',
};

export const partners: Partner[] = [
  // Real partner
  {
    id: 'salty-goat',
    name: 'Salty Goat Saloon',
    category: 'venues-nightlife',
    description:
      'One of PCB\'s favorite spots for live music, cold drinks, and a great time. Kova Mobility provides dedicated pickup and drop-off service for Salty Goat patrons.',
    location: 'Panama City Beach, FL',
    website: 'https://www.saltygoatsaloon.com',
  },
  // Placeholder entries for each category
  {
    id: 'partner-hotel-1',
    name: 'Your Hotel Here',
    category: 'hotels-resorts',
    description:
      'Partner with Kova Mobility to offer your guests reliable, pre-scheduled transportation throughout Panama City Beach.',
    location: 'Panama City Beach, FL',
    isPlaceholder: true,
  },
  {
    id: 'partner-venue-1',
    name: 'Your Venue Here',
    category: 'venues-nightlife',
    description:
      'Give your customers a safe, reliable ride home. Kova Mobility partners with venues across PCB for dedicated pickup service.',
    location: 'Panama City Beach, FL',
    isPlaceholder: true,
  },
  {
    id: 'partner-restaurant-1',
    name: 'Your Restaurant Here',
    category: 'restaurants',
    description:
      'Connect your diners to Kova Mobility\'s transportation network. Pre-scheduled pickups for your customers.',
    location: 'Panama City Beach, FL',
    isPlaceholder: true,
  },
  {
    id: 'partner-rental-1',
    name: 'Your Rental Property Here',
    category: 'short-term-rentals',
    description:
      'Offer your vacation rental guests access to Kova Mobility\'s pre-scheduled transportation service.',
    location: 'Panama City Beach, FL',
    isPlaceholder: true,
  },
  {
    id: 'partner-community-1',
    name: 'Your Organization Here',
    category: 'community-chamber',
    description:
      'Join the Kova Mobility partner network and help expand reliable transportation access across Bay County.',
    location: 'Bay County, FL',
    isPlaceholder: true,
  },
];
