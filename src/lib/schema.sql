-- ============================================================
-- KOVA MOBILITY — SUPABASE SCHEMA
-- Run this against your Supabase project SQL editor
-- ============================================================

-- Enable PostGIS for geospatial queries (optional, for future polygon-in-DB)
-- CREATE EXTENSION IF NOT EXISTS postgis;

-- LEADS TABLE: All form submissions
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  place_id TEXT,
  zone CHAR(1) NOT NULL CHECK (zone IN ('A', 'B', 'C', 'D')),
  intent_type TEXT NOT NULL CHECK (intent_type IN ('member', 'party-pass', 'driver', 'inquiry')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  source TEXT DEFAULT 'website',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEX for zone analytics
CREATE INDEX IF NOT EXISTS idx_leads_zone ON leads(zone);
CREATE INDEX IF NOT EXISTS idx_leads_intent ON leads(intent_type);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- DRIVER APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS driver_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  vehicle_year TEXT NOT NULL,
  vehicle_make TEXT NOT NULL,
  vehicle_model TEXT NOT NULL,
  has_insurance BOOLEAN DEFAULT false,
  has_clean_record BOOLEAN DEFAULT false,
  availability TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PARTNERS TABLE: Friends of PCB
CREATE TABLE IF NOT EXISTS partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  location TEXT,
  website TEXT,
  is_placeholder BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ZONE BOUNDARIES TABLE (for future DB-driven polygons)
CREATE TABLE IF NOT EXISTS zone_boundaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  zone CHAR(1) NOT NULL UNIQUE CHECK (zone IN ('A', 'B', 'C', 'D')),
  label TEXT NOT NULL,
  description TEXT,
  polygon JSONB NOT NULL, -- Array of [lng, lat] coordinate pairs
  pricing_tier TEXT NOT NULL,
  eligible BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE zone_boundaries ENABLE ROW LEVEL SECURITY;

-- Public read access for partners (directory page)
CREATE POLICY "Public can read active partners"
  ON partners FOR SELECT
  USING (active = true);

-- Public read access for zone boundaries
CREATE POLICY "Public can read zone boundaries"
  ON zone_boundaries FOR SELECT
  USING (true);

-- Service role can insert leads (via API route)
CREATE POLICY "Service role can insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can insert driver apps"
  ON driver_applications FOR INSERT
  WITH CHECK (true);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
