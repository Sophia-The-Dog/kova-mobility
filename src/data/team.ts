export interface TeamMember {
  id: string;
  sectionLabel: string;
  name: string;
  shortBio: string;
  fullBio: string;
  pullQuote?: string;
  email: string;
  phone: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'jordan-calloway',
    sectionLabel: 'PRESS & STRATEGIC COMMUNICATIONS',
    name: 'Jordan Calloway',
    shortBio:
      'Jordan is the voice Kova Mobility trusts to speak. Every press pitch, public statement, and media relationship goes through her office because credibility is the only currency this brand trades in.',
    fullBio: `Jordan Calloway serves as Press Secretary and Director of Strategic Communications at Kova Mobility, where she oversees all public-facing communications, media relations, and brand narrative for Bay County's first dedicated-driver transportation membership.

Jordan came to Kova Mobility because the mission is real. A suspended license should not cost someone their job. A shift worker should not wonder whether their ride will show up. These are not abstract problems, they affect real people in this community every single day. Jordan's job is to make sure the right people hear that story, and to protect the integrity of how it is told.

Her approach to communications is simple, precision over volume, credibility over noise. Every word that leaves this company publicly is chosen deliberately. Every media relationship is built on honesty. Every story pitched is grounded in something true.

For press inquiries, media requests, and all external communications, Jordan is your first call.`,
    pullQuote:
      'The best press secretaries believe in what they are representing. Because the alternative shows in the work.',
    email: 'Jcalloway@kovamobility.com',
    phone: '8503480759',
    image: '/images/jordan-calloway.webp',
  },
  {
    id: 'alexandra-bennett',
    sectionLabel: 'STRATEGIC PARTNERSHIPS & COMMUNICATIONS',
    name: 'Alexandra Bennett',
    shortBio:
      'Alexandra builds the relationships that grow Kova Mobility. From hotel and venue partnerships to community outreach across the Florida Panhandle, she is the person who opens doors and makes sure the right people know what is behind them.',
    fullBio: `Alexandra Bennett serves as Director of Strategic Partnerships & Communications at Kova Mobility, where she is responsible for building the external relationships that connect the company to Bay County's hospitality industry, business community, and nonprofit organizations.

Her work spans venue and hotel partnerships, Airbnb and short-term rental outreach, Chamber engagement, and the community conversations that position Kova Mobility as more than a transportation service, as a genuine partner to the people and businesses that make Panama City Beach run.

Alexandra approaches every partnership the same way, find the shared value first, then build from there. She believes the strongest partnerships are the ones where both sides are genuinely better off, and she does not pursue anything less.

For partnership inquiries, business development conversations, and community collaboration, Alexandra is your first call.`,
    pullQuote:
      "The right partnership doesn't feel like a pitch. It feels like the obvious next step.",
    email: 'abennett@kovamobility.com',
    phone: '8503480759',
    image: '/images/alexandra-bennett.webp',
  },
  {
    id: 'timothy-clarke',
    sectionLabel: 'OPERATIONS & DRIVER RELATIONS',
    name: 'Timothy Clarke',
    shortBio:
      "Timothy is the face of Kova Mobility on the road. He oversees driver partnerships, route quality, and the service standards that keep members moving reliably, every single day. When something isn't right with a pickup, Timothy is the one who fixes it — personally.",
    fullBio: `Timothy is the face of Kova Mobility on the road. He oversees driver partnerships, route quality, and the service standards that keep members moving reliably, every single day. When something isn't right with a pickup, Timothy is the one who fixes it — personally.

He brings a hands-on approach to driver onboarding and quality control, ensuring every Kova Mobility driver reflects the professionalism and consistency members depend on.`,
    pullQuote:
      'Pre-scheduled. Fixed price. A driver who knows your route, respects your time, and shows up. Not sometimes. Every time.',
    email: 'tclarke@kovamobility.com',
    phone: '8503480759',
    image: '/images/timothy-clarke.webp',
  },
];
