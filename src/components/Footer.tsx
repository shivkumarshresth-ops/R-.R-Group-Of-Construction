import { ArrowUp, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CompanyInfo } from '../types';

interface FooterProps {
  companyInfo: CompanyInfo;
  onNavigate: (sectionId: string) => void;
  onOpenCustomizer: () => void;
}

export function Footer({ companyInfo, onNavigate, onOpenCustomizer }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090b0e] border-t border-stone-800 text-stone-400 text-left pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Brand & Vision (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo size="md" showTagline={true} />
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm mt-3">
              R.R Group Of Construction is committed to structural excellence, transparent project management, and premium craftsmanship across residential, commercial, and infrastructure developments.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Quality Construction for a Better Tomorrow</span>
            </div>
          </div>

          {/* Quick Navigation (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {['home', 'services', 'projects', 'about', 'estimator', 'payment', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item)}
                    className="hover:text-amber-400 transition-colors capitalize text-stone-400 focus:outline-none focus-visible:underline"
                  >
                    {item === 'estimator' ? 'Cost Estimator' : item === 'about' ? 'About Us' : item === 'payment' ? 'Pay Online (Razorpay)' : item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Location Details (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Registered Office & Contacts
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{companyInfo.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${companyInfo.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-white tabular-nums">
                  {companyInfo.primaryPhone}
                </a>
              </div>
              {companyInfo.whatsappPhone && (
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 w-4 text-center">WA</span>
                  <a href={`https://wa.me/${companyInfo.whatsappPhone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-white tabular-nums text-emerald-400">
                    {companyInfo.whatsappPhone}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white break-all">
                  {companyInfo.email}
                </a>
              </div>
              <div className="text-[11px] text-stone-500 pt-1">
                Proprietor: {companyInfo.proprietorName}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Back to Top, and Customizer Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} R.R Group Of Construction. All rights reserved.</span>
            <span>·</span>
            <button
              type="button"
              onClick={onOpenCustomizer}
              className="text-amber-500/80 hover:text-amber-400 transition-colors"
            >
              Update Company Placeholders
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-stone-700 transition-colors text-xs"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
