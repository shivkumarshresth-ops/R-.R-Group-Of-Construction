import { useState, FormEvent } from 'react';
import { X, Save, RotateCcw, Building2, Check, RefreshCw } from 'lucide-react';
import { CompanyInfo } from '../types';

interface CompanyCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyInfo: CompanyInfo;
  onSave: (updated: CompanyInfo) => void;
}

export function CompanyCustomizerModal({
  isOpen,
  onClose,
  companyInfo,
  onSave,
}: CompanyCustomizerModalProps) {
  const [formData, setFormData] = useState<CompanyInfo>(companyInfo);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const setCardDefaults = () => {
    setFormData({
      companyName: 'R.R GROUP OF CONSTRUCTION',
      tagline: 'Building Dreams, Creating Excellence',
      secondaryTagline: 'Your Vision, Our Construction',
      proprietorName: 'Raju Kumar',
      proprietorRole: 'Proprietor',
      primaryPhone: '+91 8802082025',
      whatsappPhone: '+91 8285267362',
      email: 'rrgroupconstruction@gmail.com',
      address: 'Inderpuri, New Delhi, India',
      serviceArea: 'Delhi NCR & Surrounding Regions',
      yearsOfExperience: '10+ Years',
      operatingHours: 'Monday - Saturday: 9:00 AM - 7:00 PM',
      gstNumberPlaceholder: '[GST / Registration No.]',
      proprietorPhotoUrl: '/src/assets/images/proprietor_raju_kumar_1791131134267.jpg',
    });
  };

  const setBracketsPlaceholders = () => {
    setFormData({
      companyName: 'R.R GROUP OF CONSTRUCTION',
      tagline: 'Building Dreams, Creating Excellence',
      secondaryTagline: 'Your Vision, Our Construction',
      proprietorName: 'Raju Kumar',
      proprietorRole: 'Proprietor',
      primaryPhone: '[Phone Number]',
      whatsappPhone: '[WhatsApp Number]',
      email: '[Email Address]',
      address: '[Company Address]',
      serviceArea: '[Service Area]',
      yearsOfExperience: '[Years of Experience]',
      operatingHours: '[Operating Hours]',
      gstNumberPlaceholder: '[GST / Registration No.]',
      proprietorPhotoUrl: '/src/assets/images/proprietor_raju_kumar_1791131134267.jpg',
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData({ ...formData, proprietorPhotoUrl: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-title"
    >
      <div className="bg-[#121620] border border-stone-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 shadow-2xl text-left relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 id="customizer-title" className="font-display text-lg font-bold text-white">
                Company Details & Placeholders Editor
              </h3>
              <p className="text-xs text-stone-400">
                Easily update addresses, contact numbers, or revert to bracket placeholders
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
            aria-label="Close editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <button
            type="button"
            onClick={setCardDefaults}
            className="text-xs px-3 py-1.5 rounded-lg bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white flex items-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3 text-amber-400" />
            <span>Load Visiting Card Details</span>
          </button>
          <button
            type="button"
            onClick={setBracketsPlaceholders}
            className="text-xs px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white flex items-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3 text-stone-400" />
            <span>Switch to [Bracket Placeholders]</span>
          </button>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSave} className="py-5 space-y-4">
          {/* Proprietor Photo Section */}
          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                Proprietor Photo (Raju Kumar)
              </label>
              <span className="text-[11px] text-stone-400">Shows in About Us & Leadership</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-400/60 bg-stone-950 shrink-0">
                {formData.proprietorPhotoUrl ? (
                  <img
                    src={formData.proprietorPhotoUrl}
                    alt="Proprietor Preview"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-stone-500">
                    No Photo
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-colors">
                    <span>Upload Your Photo (IMG_3468)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, proprietorPhotoUrl: '/src/assets/images/proprietor_raju_kumar_1791131134267.jpg' })}
                    className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition-colors"
                  >
                    Reset Studio Portrait
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Or enter photo URL"
                  value={formData.proprietorPhotoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, proprietorPhotoUrl: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                Proprietor Name & Title
              </label>
              <input
                type="text"
                value={formData.proprietorName}
                onChange={(e) => setFormData({ ...formData, proprietorName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                Primary Phone Number
              </label>
              <input
                type="text"
                value={formData.primaryPhone}
                onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={formData.whatsappPhone}
                onChange={(e) => setFormData({ ...formData, whatsappPhone: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                Official Email Address
              </label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                Operating Hours
              </label>
              <input
                type="text"
                value={formData.operatingHours}
                onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
              Company Physical Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                Service Area / Coverage
              </label>
              <input
                type="text"
                value={formData.serviceArea}
                onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                Years of Experience / Credentials
              </label>
              <input
                type="text"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white rounded-lg border border-stone-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Apply Updates</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
