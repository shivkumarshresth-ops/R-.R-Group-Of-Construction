import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquareQuote, CreditCard } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CompanyInfo } from '../types';

interface HeaderProps {
  companyInfo: CompanyInfo;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenQuoteModal: () => void;
  onOpenPaymentModal?: () => void;
}

export function Header({
  companyInfo,
  activeSection,
  onNavigate,
  onOpenQuoteModal,
  onOpenPaymentModal,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About Us' },
    { id: 'estimator', label: 'Cost Estimator' },
    { id: 'payment', label: 'Pay Online' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f1217]/95 backdrop-blur-md border-b border-stone-800 shadow-xl'
          : 'bg-[#0c0e12]/85 backdrop-blur-sm border-b border-stone-800/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Wordmark (Single cohesive Brand Zone) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
            aria-label="R.R Group Of Construction Home"
          >
            <BrandLogo />
          </button>

          {/* Zone 2: Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center space-x-7"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-medium transition-colors tracking-wide relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 rounded ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Quick Call */}
            <a
              href={`tel:${companyInfo.primaryPhone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-xs font-semibold text-stone-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg border border-stone-800 hover:border-amber-500/40 bg-stone-900/60"
              title="Call Contractor Directly"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="tabular-nums tracking-wide">{companyInfo.primaryPhone}</span>
            </a>

            {/* Pay Online Button */}
            {onOpenPaymentModal && (
              <button
                type="button"
                onClick={onOpenPaymentModal}
                className="flex items-center gap-1.5 text-xs font-semibold text-stone-200 hover:text-amber-400 py-2 px-3 rounded-lg border border-stone-800 hover:border-amber-500/40 bg-stone-900/60 transition-colors"
                title="Pay Consultation Token or Invoice via Razorpay"
              >
                <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                <span>Pay Online</span>
              </button>
            )}

            {/* Request Quote CTA */}
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-200 transform active:scale-95 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>Request a Quote</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {onOpenPaymentModal && (
              <button
                type="button"
                onClick={onOpenPaymentModal}
                className="px-2.5 py-1.5 text-xs font-semibold text-amber-400 bg-stone-900 border border-stone-800 rounded-md"
              >
                Pay
              </button>
            )}
            <button
              onClick={onOpenQuoteModal}
              className="px-3 py-1.5 text-xs font-semibold text-stone-950 bg-amber-400 rounded-md"
            >
              Quote
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-400 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#11141b] border-b border-stone-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-amber-500/10 text-amber-400 font-semibold border-l-2 border-amber-400'
                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-stone-800/80 space-y-2">
            <a
              href={`tel:${companyInfo.primaryPhone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-stone-200 bg-stone-900 border border-stone-700"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call: {companyInfo.primaryPhone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 rounded-lg hover:bg-amber-300"
            >
              Request an Estimate
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
