import { NextRequest, NextResponse } from 'next/server';
import { getZoneFromCoordinates, getZonePricing } from '@/lib/zones';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lat, lng } = body;

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return NextResponse.json(
        { error: 'lat and lng are required as numbers' },
        { status: 400 }
      );
    }

    const zoneResult = getZoneFromCoordinates(lat, lng);
    const pricing = getZonePricing(zoneResult.zone);

    return NextResponse.json({
      ...zoneResult,
      pricing,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to determine zone' },
      { status: 500 }
    );
  }
}