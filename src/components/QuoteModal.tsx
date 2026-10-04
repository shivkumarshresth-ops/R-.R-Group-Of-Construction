import { useState, FormEvent } from 'react';
import { X, Send, CheckCircle, Phone, AlertCircle, MessageSquare, Database, Calendar } from 'lucide-react';
import { CompanyInfo, ContactSubmission } from '../types';
import { saveBookingToSupabase, SUPABASE_PROJECT_ID } from '../lib/supabase';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyInfo: CompanyInfo;
  defaultService?: string;
  defaultBudget?: string;
  defaultNotes?: string;
}

export function QuoteModal({
  isOpen,
  onClose,
  companyInfo,
  defaultService = 'Residential Construction',
  defaultBudget = '',
  defaultNotes = '',
}: QuoteModalProps) {
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: defaultService,
    budget: defaultBudget,
    location: '',
    message: defaultNotes,
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<ContactSubmission | null>(null);
  const [supabaseSynced, setSupabaseSynced] = useState<boolean>(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      errs.phone = 'Please provide a valid contact number.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email is required.';
    }
    if (!formData.location.trim()) errs.location = 'Project site location is required.';
    if (!formData.message.trim()) errs.message = 'Please provide project details.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const submissionId = `BK-${Date.now().toString().slice(-6)}`;

    // Transmit to Supabase
    const result = await saveBookingToSupabase({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      project_type: formData.projectType,
      budget: formData.budget || 'Not specified',
      location: formData.location,
      message: formData.message,
      preferred_date: formData.preferredDate || undefined,
      preferred_time: formData.preferredTime,
      appointment_type: 'Estimate & Site Consultation',
      status: 'pending',
    });

    setSupabaseSynced(result.syncedWithSupabase);

    const submission: ContactSubmission = {
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
      submittedAt: new Date().toLocaleString(),
      syncedWithSupabase: result.syncedWithSupabase,
      supabaseTable: result.tableUsed,
    };

    try {
      const stored = localStorage.getItem('rr_construction_inquiries');
      const list = stored ? JSON.parse(stored) : [];
      localStorage.setItem('rr_construction_inquiries', JSON.stringify([submission, ...list].slice(0, 15)));
    } catch {
      // ignore
    }

    setSubmitted(submission);
    setIsSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-heading"
    >
      <div className="bg-[#121620] border border-stone-700 max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 shadow-2xl text-left relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Direct Construction Inquiry
            </span>
            <h3 id="quote-modal-heading" className="font-display text-xl font-bold text-white mt-0.5">
              Request Project Estimate
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-display font-bold text-white">
              Appointment & Inquiry Registered!
            </h4>
            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400">
              <Database className="w-3.5 h-3.5" />
              <span>
                {supabaseSynced
                  ? 'Successfully saved & synced with your Supabase database!'
                  : 'Recorded & registered for consultation follow-up!'}
              </span>
            </div>
            <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{submitted.name}</strong>. Your estimate request for <strong className="text-white">{submitted.projectType}</strong> has been logged (Ref: <span className="font-mono text-amber-400">{submitted.id}</span>).
            </p>
            {submitted.preferredDate && (
              <p className="text-xs text-amber-400/90 font-medium">
                Scheduled Slot: {submitted.preferredDate} ({submitted.preferredTime})
              </p>
            )}
            <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-400 max-w-sm mx-auto">
              Our team will review your parameters and follow up at <strong className="text-stone-200">{submitted.phone}</strong>.
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <a
                href={`https://wa.me/${companyInfo.whatsappPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                  `Hi Raju Kumar, I just submitted an inquiry on the website (Ref: ${submitted.id}) for ${submitted.projectType}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Notify via WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-5 space-y-4">
            <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-[11px] text-stone-400">
              Prefer speaking immediately? Call <a href={`tel:${companyInfo.primaryPhone.replace(/\s+/g, '')}`} className="text-amber-400 font-bold hover:underline">{companyInfo.primaryPhone}</a>.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full px-3 py-2 text-xs bg-stone-900 border rounded-lg text-white placeholder-stone-500 focus:outline-none ${
                    errors.name ? 'border-rose-500' : 'border-stone-700 focus:border-amber-400'
                  }`}
                />
                {errors.name && <p className="text-[10px] text-rose-400 mt-0.5">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 8802082025"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full px-3 py-2 text-xs bg-stone-900 border rounded-lg text-white placeholder-stone-500 focus:outline-none ${
                    errors.phone ? 'border-rose-500' : 'border-stone-700 focus:border-amber-400'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-rose-400 mt-0.5">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full px-3 py-2 text-xs bg-stone-900 border rounded-lg text-white placeholder-stone-500 focus:outline-none ${
                    errors.email ? 'border-rose-500' : 'border-stone-700 focus:border-amber-400'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-rose-400 mt-0.5">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Service Required
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Residential Construction">Residential Construction</option>
                  <option value="Commercial Building Construction">Commercial Building Construction</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Renovation & Remodeling">Renovation & Remodeling</option>
                  <option value="Civil & Structural Work">Civil & Structural Work</option>
                  <option value="Electrical & Plumbing Work">Electrical & Plumbing Work</option>
                  <option value="Modular & False Ceiling Work">Modular & False Ceiling Work</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Project Location *
                </label>
                <input
                  type="text"
                  placeholder="City / Area / Sector"
                  value={formData.location}
                  onChange={(e) => {
                    setFormData({ ...formData, location: e.target.value });
                    if (errors.location) setErrors({ ...errors, location: '' });
                  }}
                  className={`w-full px-3 py-2 text-xs bg-stone-900 border rounded-lg text-white placeholder-stone-500 focus:outline-none ${
                    errors.location ? 'border-rose-500' : 'border-stone-700 focus:border-amber-400'
                  }`}
                />
                {errors.location && <p className="text-[10px] text-rose-400 mt-0.5">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Approximate Budget (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹20-30 Lakh"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Preferred Appointment Date
                </label>
                <input
                  type="date"
                  min={tomorrowStr}
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                  <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                  <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                Project Scope & Details *
              </label>
              <textarea
                rows={3}
                placeholder="Mention plot area, square footage, requirements..."
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                className={`w-full px-3 py-2 text-xs bg-stone-900 border rounded-lg text-white placeholder-stone-500 focus:outline-none resize-none ${
                  errors.message ? 'border-rose-500' : 'border-stone-700 focus:border-amber-400'
                }`}
              />
              {errors.message && <p className="text-[10px] text-rose-400 mt-0.5">{errors.message}</p>}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white rounded-lg border border-stone-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
