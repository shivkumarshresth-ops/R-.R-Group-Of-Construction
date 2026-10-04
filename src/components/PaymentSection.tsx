import { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Receipt,
  ArrowRight,
  Sparkles,
  Key,
  Database,
  ExternalLink,
  ChevronDown,
  QrCode,
  Smartphone,
  Layers,
} from 'lucide-react';
import { CompanyInfo } from '../types';
import { PaymentRecord, getRazorpayKeyId, DEFAULT_RAZORPAY_KEY } from '../lib/razorpay';
import { SUPABASE_PROJECT_ID } from '../lib/supabase';

interface PaymentSectionProps {
  companyInfo: CompanyInfo;
  onOpenPaymentModal: (purpose?: string, amount?: number) => void;
}

export function PaymentSection({ companyInfo, onOpenPaymentModal }: PaymentSectionProps) {
  const [pastPayments, setPastPayments] = useState<PaymentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('rr_construction_payments');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const activeKey = getRazorpayKeyId();
  const isTestKey = activeKey.startsWith('rzp_test');

  const paymentTiers = [
    {
      title: 'Site Visit & Soil Inspection',
      amount: 500,
      description: 'Nominal confirmation token for initial on-site physical inspection, plot measurement, and feasibility consultation by Raju Kumar and team.',
      highlights: [
        'Dedicated on-site engineer visit',
        'Plot boundary & level assessment',
        'Preliminary structural consultation',
        '100% adjustable against final project BOQ'
      ],
      badge: 'Popular for New Clients',
    },
    {
      title: 'Architectural Design & BOQ Token',
      amount: 2500,
      description: 'Advance deposit to draft comprehensive 2D floor plans, 3D elevation renders, and the detailed Bill of Quantities (BOQ) with material pricing.',
      highlights: [
        'Customized 2D architectural blueprint',
        'Detailed itemized BOQ material breakdown',
        'Structural column layout schematics',
        'Adjustable in turnkey construction contract'
      ],
      badge: 'Recommended for Construction',
    },
    {
      title: 'Milestone / Custom Invoice',
      amount: 0,
      isCustom: true,
      description: 'Pay ongoing construction milestones, material procurement advances, or custom invoices directly with instant digital receipts.',
      highlights: [
        'Enter custom invoice or contract amount',
        'Support for UPI, NetBanking & Corporate Cards',
        'Instant Razorpay payment reference ID',
        'Automated database receipt generation'
      ],
      badge: 'Contract Clients',
    },
  ];

  return (
    <section id="payment" className="py-20 md:py-28 bg-[#090b0f] border-t border-stone-800 text-left relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>Razorpay Payment Gateway</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active & Ready</span>
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Online Payments & Booking Tokens
            </h2>
            <p className="mt-4 text-base sm:text-lg text-stone-300 font-normal leading-relaxed">
              Book initial site visits, secure architectural planning deposits, or pay construction milestones securely via Razorpay. We accept all major UPI apps (GPay, PhonePe, Paytm), debit/credit cards, and netbanking.
            </p>
          </div>

          {/* Quick Payment Trigger */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenPaymentModal('Gateway Test Transaction', 1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 border border-stone-700 hover:border-amber-400/50 text-xs font-bold uppercase tracking-wider transition-colors"
              title="Run a ₹1 test payment to check gateway connection"
            >
              <span>Quick ₹1 Test</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenPaymentModal('General Project Consultation', 500)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold uppercase tracking-wider shadow-lg transition-colors whitespace-nowrap"
            >
              <span>Make Instant Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Razorpay Gateway Status & Configuration Hub Banner */}
        <div className="mb-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#141824] via-[#10131c] to-[#141824] border border-amber-500/30 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-white text-base">
                    Razorpay Gateway Status
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-semibold">
                    CONNECTED
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  Configured Key ID: <span className="font-mono text-amber-400 font-semibold select-all">{activeKey}</span> ({isTestKey ? 'Test / Sandbox Mode' : 'Live Production Mode'})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSetupGuide(!showSetupGuide)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 hover:border-amber-400 text-xs text-stone-300 hover:text-white transition-colors"
              >
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>{showSetupGuide ? 'Hide Setup Details' : 'Gateway Details & Docs'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSetupGuide ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {showSetupGuide && (
            <div className="pt-4 border-t border-stone-800 space-y-3 text-xs text-stone-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-black/40 border border-stone-800 space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    1. Razorpay Account Link
                  </span>
                  <p className="text-stone-400 text-[11px]">
                    This app is configured to your Razorpay merchant key: <code className="text-white font-mono bg-stone-900 px-1 py-0.5 rounded">{activeKey}</code>.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-stone-800 space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    2. Payment Capture
                  </span>
                  <p className="text-stone-400 text-[11px]">
                    Supports Auto-Capture on UPI, QR Codes, Cards, and NetBanking. Digital receipts are generated instantly for clients.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-stone-800 space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    3. Supabase Cloud Sync
                  </span>
                  <p className="text-stone-400 text-[11px]">
                    All transaction IDs and customer details are automatically stored into your Supabase project (<strong>{SUPABASE_PROJECT_ID}</strong>).
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-stone-400">
                <span>Want to switch between Test and Live keys? You can update your key anytime in the payment checkout modal.</span>
                <a
                  href="https://dashboard.razorpay.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 hover:underline font-semibold"
                >
                  <span>Open Razorpay Merchant Dashboard</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 3 Payment Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {paymentTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-2xl bg-[#121620] border transition-all flex flex-col justify-between relative group ${
                idx === 0
                  ? 'border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.08)]'
                  : 'border-stone-800 hover:border-amber-500/40'
              }`}
            >
              <div>
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-amber-400">
                    {tier.badge}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>

                {/* Amount */}
                <div className="mb-3">
                  {tier.isCustom ? (
                    <div className="font-display font-black text-3xl text-amber-400 tracking-tight">
                      Custom Amount
                    </div>
                  ) : (
                    <div className="font-display font-black text-3xl text-amber-400 tracking-tight tabular-nums">
                      ₹{tier.amount.toLocaleString('en-IN')}
                    </div>
                  )}
                  <h3 className="font-display text-lg font-bold text-white mt-1">
                    {tier.title}
                  </h3>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Deliverables checklist */}
                <div className="space-y-2 border-t border-stone-800/80 pt-4 mb-6">
                  {tier.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-stone-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="button"
                onClick={() =>
                  onOpenPaymentModal(
                    tier.title,
                    tier.isCustom ? 1000 : tier.amount
                  )
                }
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-xl bg-stone-900 hover:bg-amber-400 hover:text-stone-950 text-white border border-stone-700 hover:border-amber-400 transition-all duration-200"
              >
                <span>{tier.isCustom ? 'Pay Custom Amount' : `Pay ₹${tier.amount} via Razorpay`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Payment Methods Supported Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-[#11141c] border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Supported Payment Methods via Razorpay
              </h4>
              <p className="text-xs text-stone-400">
                Google Pay, PhonePe, Paytm, BHIM UPI, QR Code, Visa, Mastercard, RuPay, NetBanking (50+ Banks)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-400 font-medium">
            <span className="flex items-center gap-1.5 text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Instant Digital Receipt</span>
            </span>
            <span>·</span>
            <span>PCI-DSS Level 1 Compliant</span>
          </div>
        </div>

        {/* Past Transactions / Receipts History (if any) */}
        {pastPayments.length > 0 && (
          <div className="mt-8 p-6 rounded-2xl bg-[#0f1218] border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Receipt className="w-4 h-4" />
                <span>Your Recent Payments & Receipts ({pastPayments.length})</span>
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {pastPayments.slice(0, 3).map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-white">{p.purpose}</span>
                    <span className="text-amber-400 font-mono">₹{p.amount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="text-[11px] text-stone-400 flex justify-between">
                    <span className="font-mono text-stone-500">{p.paymentId}</span>
                    <span>{p.paidAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
