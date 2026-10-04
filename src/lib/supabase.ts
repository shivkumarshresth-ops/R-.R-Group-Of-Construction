import { createClient } from '@supabase/supabase-js';

// Supabase credentials provided by project configuration
export const SUPABASE_PROJECT_ID = 'vrukdyngwcptvzmmfpfk';

// Safely resolve and validate the Supabase URL
export function getValidSupabaseUrl(): string {
  const defaultUrl = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
  try {
    const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
    if (!envUrl || envUrl === 'undefined' || envUrl === 'null' || envUrl === 'YOUR_SUPABASE_URL') {
      return defaultUrl;
    }
    // If url lacks protocol (e.g. "vrukdyngwcptvzmmfpfk.supabase.co" or project ID)
    if (!/^https?:\/\//i.test(envUrl)) {
      if (envUrl.includes('.')) {
        return `https://${envUrl.replace(/^\/+/, '')}`;
      }
      return `https://${envUrl}.supabase.co`;
    }
    // Validate with URL parser
    new URL(envUrl);
    return envUrl;
  } catch {
    return defaultUrl;
  }
}

// Safely resolve the Supabase anon/publishable key
export function getValidSupabaseKey(): string {
  const defaultKey = 'sb_publishable_ghzSjOteAD9BjBFZDLP7pg_jJWMV80O';
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
  if (
    !envKey ||
    envKey === 'undefined' ||
    envKey === 'null' ||
    envKey === 'YOUR_SUPABASE_PUBLISHABLE_KEY'
  ) {
    return defaultKey;
  }
  return envKey;
}

export const SUPABASE_URL = getValidSupabaseUrl();
export const SUPABASE_ANON_KEY = getValidSupabaseKey();

// Initialize the Supabase client safely with fallback mock if unexpected error occurs
function initializeSupabaseClient() {
  try {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } catch (err) {
    console.warn('Supabase initialization fallback triggered:', err);
    return createClient(`https://${SUPABASE_PROJECT_ID}.supabase.co`, 'sb_publishable_ghzSjOteAD9BjBFZDLP7pg_jJWMV80O');
  }
}

export const supabase = initializeSupabaseClient();


export interface BookingAppointmentPayload {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  budget?: string;
  location: string;
  message: string;
  preferred_date?: string;
  preferred_time?: string;
  appointment_type?: string;
  source?: string;
  status?: string;
}

export interface SaveBookingResult {
  success: boolean;
  data?: any;
  error?: string;
  syncedWithSupabase: boolean;
  tableUsed?: string;
}

/**
 * Saves appointment details into Supabase.
 * Tries `bookings` table first, and falls back to `appointments` or `inquiries`.
 */
export async function saveBookingToSupabase(
  payload: BookingAppointmentPayload
): Promise<SaveBookingResult> {
  const candidateTables = ['bookings', 'appointments', 'inquiries'];
  let lastErrorMsg = '';

  const cleanPayload = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    project_type: payload.project_type,
    budget: payload.budget || 'Not specified',
    location: payload.location,
    message: payload.message,
    preferred_date: payload.preferred_date || null,
    preferred_time: payload.preferred_time || null,
    appointment_type: payload.appointment_type || 'Site Visit Consultation',
    status: payload.status || 'pending',
    created_at: new Date().toISOString(),
  };

  for (const tableName of candidateTables) {
    try {
      const { data, error } = await supabase.from(tableName).insert([cleanPayload]).select();

      if (!error) {
        return {
          success: true,
          data: data?.[0] || cleanPayload,
          syncedWithSupabase: true,
          tableUsed: tableName,
        };
      }

      lastErrorMsg = error.message || error.details || JSON.stringify(error);
      // If table doesn't exist, try next candidate
      if (
        lastErrorMsg.includes('does not exist') ||
        lastErrorMsg.includes('relation') ||
        lastErrorMsg.includes('404')
      ) {
        continue;
      } else {
        // There was a table but perhaps a constraint or RLS
        break;
      }
    } catch (err: any) {
      lastErrorMsg = err?.message || String(err);
    }
  }

  return {
    success: false,
    error: lastErrorMsg,
    syncedWithSupabase: false,
  };
}

/**
 * SQL snippet helper that users can execute in Supabase SQL editor if table is not created yet
 */
export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql)

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  project_type text not null,
  budget text,
  location text not null,
  message text not null,
  preferred_date text,
  preferred_time text,
  appointment_type text default 'Site Visit Consultation',
  status text default 'pending',
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.bookings enable row level security;

-- Allow anonymous visitors to insert booking appointments
create policy "Allow public bookings submission" 
on public.bookings for insert 
with check (true);

-- Allow viewing submitted bookings
create policy "Allow reading bookings" 
on public.bookings for select 
using (true);
`;
