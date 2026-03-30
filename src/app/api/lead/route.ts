import { NextRequest, NextResponse } from 'next/server';
import { leadSchema, driverApplicationSchema } from '@/lib/validation';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createServerClient();

    // Check if this is a driver application
    if (body.vehicleYear) {
      const parsed = driverApplicationSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: 'Validation failed', details: parsed.error.flatten() },
          { status: 400 }
        );
      }

      const data = parsed.data;

      // Insert lead first
      const { data: lead, error: leadError } = await supabase
        .from('leads')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          lat: data.lat,
          lng: data.lng,
          place_id: data.placeId,
          zone: data.zone,
          intent_type: 'driver',
        })
        .select('id')
        .single();

      if (leadError) {
        // Also try the existing Supabase edge function as fallback
        await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/kova-forms/driver`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }
        ).catch(() => {});

        return NextResponse.json(
          { error: 'Failed to save application' },
          { status: 500 }
        );
      }

      // Insert driver application
      await supabase.from('driver_applications').insert({
        lead_id: lead.id,
        vehicle_year: data.vehicleYear,
        vehicle_make: data.vehicleMake,
        vehicle_model: data.vehicleModel,
        has_insurance: data.hasInsurance,
        has_clean_record: data.hasCleanRecord,
        availability: data.availability,
        message: data.message,
      });

      return NextResponse.json({ success: true, leadId: lead.id });
    }

    // Standard lead submission
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        lat: data.lat,
        lng: data.lng,
        place_id: data.placeId,
        zone: data.zone,
        intent_type: data.intentType,
      })
      .select('id')
      .single();

    if (error) {
      // Fallback to existing edge function
      const endpoint =
        data.intentType === 'party-pass' ? 'partypass' : 'membership';
      await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/kova-forms/${endpoint}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      ).catch(() => {});

      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}