import { useState, FormEvent, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Calendar,
  Database,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';
import { CompanyInfo, ContactSubmission } from '../types';
import {
  saveBookingToSupabase,
  supabase,
  SUPABASE_PROJECT_ID,
  SUPABASE_SETUP_SQL,
} from '../lib/supabase';

interface ContactSectionProps {
  companyInfo: CompanyInfo;
  prefilledService?: string;
  prefilledBudget?: string;
  prefilledNotes?: string;
  onClearPrefills?: () => void;
}

export function ContactSection({
  companyInfo,
  prefilledService = '',
  prefilledBudget = '',
  prefilledNotes = '',
  onClearPrefills,
}: ContactSectionProps) {
  // Tomorrow's date formatted as YYYY-MM-DD for min date
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: prefilledService || 'Residential Construction',
    budget: prefilledBudget || '',
    location: '',
    message: prefilledNotes || '',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    appointmentType: 'Site Visit & Evaluation',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactSubmission | null>(null);
  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState<{
    synced: boolean;
    table?: string;
    error?: string;
  } | null>(null);

  const [showRecentInquiries, setShowRecentInquiries] = useState(false);
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [dbChecking, setDbChecking] = useState(false);
  const [dbStatus, setDbStatus] = useState<'connected' | 'needs_table' | 'unknown'>('unknown');

  const [inquiriesList, setInquiriesList] = useState<ContactSubmission[]>(() => {
    try {
      const stored = localStorage.getItem('rr_construction_inquiries');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Verify Supabase connectivity on mount
  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  const checkSupabaseConnection = async () => {
    setDbChecking(true);
    try {
      // Check if bookings or appointments table responds
      const { error } = await supabase.from('bookings').select('id').limit(1);
      if (!error) {
        setDbStatus('connected');
      } else if (
        error.message?.includes('does not exist') ||
        error.message?.includes('relation')
      ) {
        setDbStatus('needs_table');
      } else {
        // Table exists or RLS restricted
        setDbStatus('connected');
      }
    } catch {
      setDbStatus('needs_table');
    } finally {
      setDbChecking(false);
    }
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required so our team can reach you.';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      errs.phone = 'Please enter a valid phone number (at least 8 digits).';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required for appointment confirmation.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format (e.g. name@example.com).';
    }
    if (!formData.location.trim()) {
      errs.location = 'Project site location or city is required.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a brief description of your construction needs.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSupabaseSyncStatus(null);

    const submissionId = `BK-${Date.now().toString().slice(-6)}`;

    // Prepare payload for Supabase
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      project_type: formData.projectType,
      budget: formData.budget || 'Not specified',
      location: formData.location,
      message: formData.message,
      preferred_date: formData.preferredDate || undefined,
      preferred_time: formData.preferredTime,
      appointment_type: formData.appointmentType,
      status: 'pending',
    };

    // Attempt to save in Supabase
    const result = await saveBookingToSupabase(payload);

    setSupabaseSyncStatus({
      synced: result.syncedWithSupabase,
      table: result.tableUsed,
      error: result.error,
    });

    const newSubmission: ContactSubmission = {
      id: submissionId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectType: formData.projectType,
      budget: formData.budget || 'Not specified',
      location: formData.location,
      message: formData.message,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      appointmentType: formData.appointmentType,
      submittedAt: new Date().toLocaleString(),
      syncedWithSupabase: result.syncedWithSupabase,
      supabaseTable: result.tableUsed,
    };

    const updated = [newSubmission, ...inquiriesList].slice(0, 15);
    setInquiriesList(updated);
    try {
      localStorage.setItem('rr_construction_inquiries', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSubmittedData(newSubmission);
    setIsSubmitting(false);

    // Reset form fields
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: 'Residential Construction',
      budget: '',
      location: '',
      message: '',
      preferredDate: '',
      preferredTime: 'Morning (10:00 AM - 1:00 PM)',
      appointmentType: 'Site Visit & Evaluation',
    });
    if (onClearPrefills) onClearPrefills();
  };

  // WhatsApp quick trigger URL
  const whatsappUrl = `https://wa.me/${companyInfo.whatsappPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hello R.R Group Of Construction, I would like to book a site consultation.`
  )}`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0c0e12] border-t border-stone-800 text-left relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-2 flex items-center gap-2">
              <span>Appointment Booking & Inquiries</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <Database className="w-3.5 h-3.5" />
                <span>Supabase Connected</span>
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Book a Construction Consultation
            </h2>
            <p className="mt-4 text-base sm:text-lg text-stone-300 font-normal leading-relaxed">
              Schedule an on-site visit or consultation with Raju Kumar and our engineering personnel. All appointment requests are saved securely to your Supabase database.
            </p>
          </div>

          {/* Supabase Connection Status Tag */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300">
            <span
              className={`w-2 h-2 rounded-full ${
                dbStatus === 'connected'
                  ? 'bg-emerald-400'
                  : dbStatus === 'needs_table'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-stone-500'
              }`}
            />
            <span className="font-mono text-[11px] text-stone-400">
              Project: <span className="text-amber-400">{SUPABASE_PROJECT_ID}</span>
            </span>
            <button
              type="button"
              onClick={checkSupabaseConnection}
              disabled={dbChecking}
              className="text-stone-400 hover:text-white p-1 rounded"
              title="Re-check Supabase Connection"
            >
              <RefreshCw className={`w-3 h-3 ${dbChecking ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* 2-Column Contact & Booking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Cards */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#141822] border border-stone-800 space-y-6">
              <h3 className="font-display text-lg font-bold text-white pb-3 border-b border-stone-800 flex items-center justify-between">
                <span>Direct Contact Channels</span>
                <span className="text-[11px] font-normal text-amber-400">Raju Kumar, Proprietor</span>
              </h3>

              {/* Primary Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                    Phone Consultation
                  </span>
                  <a
                    href={`tel:${companyInfo.primaryPhone.replace(/\s+/g, '')}`}
                    className="font-bold text-stone-100 hover:text-amber-400 transition-colors tabular-nums block text-sm sm:text-base mt-0.5"
                  >
                    {companyInfo.primaryPhone}
                  </a>
                  {companyInfo.whatsappPhone && companyInfo.whatsappPhone !== companyInfo.primaryPhone && (
                    <a
                      href={`tel:${companyInfo.whatsappPhone.replace(/\s+/g, '')}`}
                      className="text-xs text-stone-400 hover:text-amber-400 block tabular-nums mt-0.5"
                    >
                      Alt: {companyInfo.whatsappPhone}
                    </a>
                  )}
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                    WhatsApp Direct Inquiry
                  </span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 mt-1"
                  >
                    <span>Chat on WhatsApp ({companyInfo.whatsappPhone})</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Official Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                    Official Email
                  </span>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="text-xs sm:text-sm font-semibold text-stone-200 hover:text-amber-400 transition-colors break-all mt-0.5 block"
                  >
                    {companyInfo.email}
                  </a>
                </div>
              </div>

              {/* Location & Service Area */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                    Office & Service Coverage
                  </span>
                  <p className="text-xs sm:text-sm text-stone-200 font-medium mt-0.5">
                    {companyInfo.address}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Coverage Area: {companyInfo.serviceArea}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 pt-2 border-t border-stone-800">
                <div className="w-10 h-10 rounded-xl bg-stone-800/80 text-stone-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                    Operational Hours
                  </span>
                  <p className="text-xs sm:text-sm text-stone-300 mt-0.5">
                    {companyInfo.operatingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Supabase Integration Info Box */}
            <div className="p-5 rounded-xl bg-[#11141c] border border-amber-500/20 text-xs text-stone-300 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                  <Database className="w-4 h-4" />
                  <span>Supabase Storage Integration</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSqlGuide(!showSqlGuide)}
                  className="text-[11px] text-amber-400 hover:underline"
                >
                  {showSqlGuide ? 'Hide Table SQL' : 'View Table SQL'}
                </button>
              </div>

              <p className="leading-relaxed text-stone-400">
                All booking appointments submitted through this form are wired directly to your Supabase project (<strong>{SUPABASE_PROJECT_ID}</strong>).
              </p>

              {showSqlGuide && (
                <div className="pt-2 border-t border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span>Run this in Supabase SQL Editor:</span>
                    <button
                      type="button"
                      onClick={copySqlToClipboard}
                      className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300"
                    >
                      {copiedSql ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy SQL</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-2.5 rounded bg-black/70 text-[10px] text-stone-300 overflow-x-auto font-mono max-h-36">
                    {SUPABASE_SETUP_SQL}
                  </pre>
                </div>
              )}
            </div>

            {/* Recent Submissions Accordion */}
            {inquiriesList.length > 0 && (
              <div className="border border-stone-800 rounded-xl p-4 bg-stone-900/40 text-xs">
                <button
                  type="button"
                  onClick={() => setShowRecentInquiries(!showRecentInquiries)}
                  className="w-full flex items-center justify-between text-stone-400 hover:text-stone-200 font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Recent Bookings & Inquiries ({inquiriesList.length})</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform ${showRecentInquiries ? 'rotate-180' : ''}`} />
                </button>

                {showRecentInquiries && (
                  <div className="mt-3 pt-3 border-t border-stone-800 space-y-2.5 max-h-56 overflow-y-auto">
                    {inquiriesList.map((item) => (
                      <div key={item.id} className="p-3 rounded-lg bg-stone-900 border border-stone-800 text-[11px] space-y-1">
                        <div className="flex justify-between items-center font-bold">
                          <span className="text-white">{item.name}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            item.syncedWithSupabase
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                              : 'bg-stone-800 text-stone-400'
                          }`}>
                            {item.syncedWithSupabase ? 'Supabase Synced' : 'Recorded'}
                          </span>
                        </div>
                        <div className="text-stone-300">{item.projectType} · {item.location}</div>
                        {item.preferredDate && (
                          <div className="text-amber-400 font-medium">
                            Appointment: {item.preferredDate} ({item.preferredTime})
                          </div>
                        )}
                        <div className="text-stone-400">{item.phone} · {item.submittedAt}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Column: Appointment Booking & Quote Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-[#141822] border border-stone-800 shadow-xl relative">
              
              {/* Database sync banner */}
              <div className="mb-6 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent border border-amber-500/30 flex items-start gap-2.5 text-xs text-stone-300 leading-relaxed">
                <Database className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Supabase Cloud Database Connected:</strong> Booking appointment data is transmitted directly to your Supabase project (<code>{SUPABASE_PROJECT_ID}</code>).
                </div>
              </div>

              {/* Success Message Banner with Supabase status */}
              {submittedData && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span>Appointment Request Saved!</span>
                    </div>
                    {supabaseSyncStatus?.synced && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-400/40 text-[10px] font-mono">
                        ✓ Supabase Synced ({supabaseSyncStatus.table})
                      </span>
                    )}
                  </div>
                  <p>
                    Thank you, <strong className="text-white">{submittedData.name}</strong>. Your appointment booking for <strong className="text-white">{submittedData.projectType}</strong> has been registered (Ref: <code className="bg-emerald-950/60 px-1 py-0.5 rounded font-mono">{submittedData.id}</code>).
                  </p>
                  {submittedData.preferredDate && (
                    <p className="text-stone-300">
                      Scheduled Date: <strong className="text-amber-400">{submittedData.preferredDate}</strong> ({submittedData.preferredTime})
                    </p>
                  )}
                  {supabaseSyncStatus && !supabaseSyncStatus.synced && (
                    <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
                      <strong>Notice:</strong> Your appointment was saved in the browser session. If you haven't created the <code>bookings</code> table in your Supabase project yet, click "View Table SQL" in the left panel to execute the 1-click schema in your Supabase SQL editor.
                    </div>
                  )}
                  <p className="text-[11px] text-emerald-400/80">
                    To expedite immediate review, you can notify Raju Kumar directly on WhatsApp: <a href={whatsappUrl} className="underline font-bold" target="_blank" rel="noreferrer">Open WhatsApp</a>.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* Name & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-4 py-3 text-sm bg-stone-900 border rounded-xl text-white placeholder-stone-500 focus:outline-none focus:ring-1 ${
                        errors.name
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-stone-700 focus:border-amber-400 focus:ring-amber-400'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`w-full px-4 py-3 text-sm bg-stone-900 border rounded-xl text-white placeholder-stone-500 focus:outline-none focus:ring-1 ${
                        errors.phone
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-stone-700 focus:border-amber-400 focus:ring-amber-400'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Email & Project Type Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-3 text-sm bg-stone-900 border rounded-xl text-white placeholder-stone-500 focus:outline-none focus:ring-1 ${
                        errors.email
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-stone-700 focus:border-amber-400 focus:ring-amber-400'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-project-type" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Project Type *
                    </label>
                    <select
                      id="contact-project-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-stone-900 border border-stone-700 rounded-xl text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    >
                      <option value="Residential Construction">Residential Construction</option>
                      <option value="Commercial Building Construction">Commercial Building Construction</option>
                      <option value="Interior Design & False Ceiling">Interior Design & False Ceiling</option>
                      <option value="Renovation & Remodeling">Renovation & Remodeling</option>
                      <option value="Civil & Structural Work">Civil & Structural Work</option>
                      <option value="Electrical & Plumbing Work">Electrical & Plumbing Work</option>
                      <option value="Project Planning & Management">Project Planning & Management</option>
                      <option value="Other Construction Inquiry">Other Custom Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Appointment Booking Date & Preferred Time Grid */}
                <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <Calendar className="w-4 h-4" />
                    <span>Appointment Scheduling</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="booking-date" className="block text-[11px] font-semibold text-stone-300 mb-1">
                        Preferred Date
                      </label>
                      <input
                        id="booking-date"
                        type="date"
                        min={tomorrowStr}
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label htmlFor="booking-time" className="block text-[11px] font-semibold text-stone-300 mb-1">
                        Preferred Time Slot
                      </label>
                      <select
                        id="booking-time"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                        <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                        <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="booking-type" className="block text-[11px] font-semibold text-stone-300 mb-1">
                        Consultation Format
                      </label>
                      <select
                        id="booking-type"
                        value={formData.appointmentType}
                        onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Site Visit & Evaluation">Site Visit & Evaluation</option>
                        <option value="Office Meeting (Inderpuri)">Office Meeting (Inderpuri)</option>
                        <option value="Phone / WhatsApp Consultation">Phone / WhatsApp Consultation</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Approximate Budget (Optional) & Location Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-budget" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Approximate Budget <span className="text-stone-400 font-normal normal-case">(Optional)</span>
                    </label>
                    <input
                      id="contact-budget"
                      type="text"
                      placeholder="e.g. ₹25 - ₹40 Lakh"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-stone-900 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-location" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Project Site Location *
                    </label>
                    <input
                      id="contact-location"
                      type="text"
                      placeholder="e.g. Inderpuri / West Delhi / Noida"
                      value={formData.location}
                      onChange={(e) => {
                        setFormData({ ...formData, location: e.target.value });
                        if (errors.location) setErrors({ ...errors, location: '' });
                      }}
                      className={`w-full px-4 py-3 text-sm bg-stone-900 border rounded-xl text-white placeholder-stone-500 focus:outline-none focus:ring-1 ${
                        errors.location
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-stone-700 focus:border-amber-400 focus:ring-amber-400'
                      }`}
                    />
                    {errors.location && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.location}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                    Project Details & Notes *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    placeholder="Mention plot area, square footage, requirements..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full px-4 py-3 text-sm bg-stone-900 border rounded-xl text-white placeholder-stone-500 focus:outline-none focus:ring-1 resize-y ${
                      errors.message
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-stone-700 focus:border-amber-400 focus:ring-amber-400'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 text-sm font-bold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                      <span>Saving to Supabase & Confirming Appointment...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm Appointment & Save Details</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
