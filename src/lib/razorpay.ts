import { supabase } from './supabase';

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export interface RazorpayPaymentOptions {
  key?: string;
  amount: number; // in INR (will be converted to paise internally)
  currency?: string;
  name?: string;
  description: string;
  image?: string;
  order_id?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface PaymentRecord {
  id: string;
  paymentId: string;
  amount: number;
  currency: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  purpose: string;
  projectReference?: string;
  status: 'success' | 'pending' | 'failed';
  paidAt: string;
  syncedWithSupabase?: boolean;
}

export const DEFAULT_RAZORPAY_KEY = 'rzp_test_Tjv5mD1KKEIRgE';

// Get configured Razorpay Key ID
export function getRazorpayKeyId(): string {
  // Check localStorage first (configured via UI settings)
  try {
    const saved = localStorage.getItem('rr_razorpay_key_id');
    if (saved && saved.trim()) return saved.trim();
  } catch {
    // ignore
  }

  // Check environment variable
  if (import.meta.env.VITE_RAZORPAY_KEY_ID) {
    return import.meta.env.VITE_RAZORPAY_KEY_ID;
  }

  // Active key provided by client
  return DEFAULT_RAZORPAY_KEY;
}

export function saveRazorpayKeyId(keyId: string): void {
  try {
    localStorage.setItem('rr_razorpay_key_id', keyId.trim());
  } catch {
    // ignore
  }
}

/**
 * Dynamically loads the official Razorpay Checkout SDK script
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Initializes and opens Razorpay Standard Checkout
 */
export async function launchRazorpayCheckout(
  options: RazorpayPaymentOptions,
  onScriptFailed?: () => void
): Promise<void> {
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded || !window.Razorpay) {
    if (onScriptFailed) {
      onScriptFailed();
    } else {
      alert('Unable to load Razorpay payment gateway. Please check your internet connection.');
    }
    return;
  }

  const activeKey = options.key || getRazorpayKeyId();

  const checkoutOptions = {
    key: activeKey,
    amount: Math.round(options.amount * 100), // convert rupees to paise
    currency: options.currency || 'INR',
    name: options.name || 'R.R Group Of Construction',
    description: options.description || 'Project Consultation & Advance Token',
    image: 'https://cdn-icons-png.flaticon.com/512/3067/3067260.png',
    handler: options.handler,
    prefill: options.prefill || {},
    notes: {
      company: 'R.R Group Of Construction',
      proprietor: 'Raju Kumar',
      ...(options.notes || {}),
    },
    theme: {
      color: '#EAB308', // Amber/Construction Gold
      ...(options.theme || {}),
    },
    modal: {
      ondismiss: options.modal?.ondismiss,
    },
  };

  const rzp = new window.Razorpay(checkoutOptions);
  rzp.on('payment.failed', function (response: any) {
    console.error('Razorpay Payment Failed:', response.error);
    alert(`Payment Failed: ${response.error?.description || 'Transaction could not be processed'}`);
  });
  rzp.open();
}

/**
 * Records payment in Supabase (payments table or bookings table)
 */
export async function recordPaymentInSupabase(record: {
  payment_id: string;
  amount: number;
  currency: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  purpose: string;
  project_reference?: string;
  status: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Attempt inserting into payments table
    const { error } = await supabase.from('payments').insert([
      {
        ...record,
        created_at: new Date().toISOString(),
      },
    ]);

    if (!error) {
      return { success: true };
    }

    // If payments table doesn't exist, log to bookings table
    const { error: bookingErr } = await supabase.from('bookings').insert([
      {
        name: record.client_name,
        email: record.client_email,
        phone: record.client_phone,
        project_type: `Payment: ${record.purpose}`,
        budget: `₹${record.amount}`,
        location: record.project_reference || 'Online Payment',
        message: `Paid ₹${record.amount} via Razorpay (Payment ID: ${record.payment_id})`,
        status: 'paid',
        created_at: new Date().toISOString(),
      },
    ]);

    if (!bookingErr) {
      return { success: true };
    }

    return { success: false, error: error.message };
  } catch (err: any) {
    return { success: false, error: err?.message || String(err) };
  }
}

export const SUPABASE_PAYMENTS_TABLE_SQL = `-- Run this in your Supabase SQL Editor to track payments:
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  payment_id text not null,
  amount numeric not null,
  currency text default 'INR',
  client_name text not null,
  client_phone text not null,
  client_email text not null,
  purpose text not null,
  project_reference text,
  status text default 'success',
  created_at timestamptz default now()
);

alter table public.payments enable row level security;

create policy "Allow inserting payments" on public.payments for insert with check (true);
create policy "Allow viewing payments" on public.payments for select using (true);
`;
