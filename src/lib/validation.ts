import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone number required'),
  address: z.string().min(5, 'Address is required'),
  lat: z.number(),
  lng: z.number(),
  placeId: z.string(),
  zone: z.enum(['A', 'B', 'C', 'D']),
  intentType: z.enum(['member', 'party-pass', 'driver', 'inquiry']),
});

export const driverApplicationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone number required'),
  address: z.string().min(5, 'Address is required'),
  lat: z.number(),
  lng: z.number(),
  placeId: z.string(),
  zone: z.enum(['A', 'B', 'C', 'D']),
  vehicleYear: z.string().min(4),
  vehicleMake: z.string().min(2),
  vehicleModel: z.string().min(2),
  hasInsurance: z.boolean(),
  hasCleanRecord: z.boolean(),
  availability: z.string(),
  message: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  intentType: z.enum(['member', 'party-pass', 'driver', 'inquiry']),
});

export type LeadFormData = z.infer<typeof leadSchema>;
export type DriverApplicationData = z.infer<typeof driverApplicationSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
