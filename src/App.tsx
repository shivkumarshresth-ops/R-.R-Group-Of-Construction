import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { ProcessSection } from './components/ProcessSection';
import { CostEstimator } from './components/CostEstimator';
import { PaymentSection } from './components/PaymentSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { QuoteModal } from './components/QuoteModal';
import { PaymentModal } from './components/PaymentModal';
import { CompanyCustomizerModal } from './components/CompanyCustomizerModal';

import { initialCompanyInfo, servicesData, sampleProjects } from './data/companyData';
import { CompanyInfo, ProjectItem } from './types';
import { MessageSquare, Settings2, Phone, CreditCard } from 'lucide-react';

export default function App() {
  // Company Info with localStorage persistence
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem('rr_company_info');
      return saved ? JSON.parse(saved) : initialCompanyInfo;
    } catch {
      return initialCompanyInfo;
    }
  });

  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [customizerModalOpen, setCustomizerModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentPurpose, setPaymentPurpose] = useState('Site Visit & Architectural Consultation Fee');
  const [paymentAmount, setPaymentAmount] = useState(500);

  // Quote form pre-fill parameters
  const [quotePrefill, setQuotePrefill] = useState({
    service: '',
    budget: '',
    notes: '',
  });

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'projects', 'about', 'estimator', 'payment', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenPayment = (purpose: string = 'Site Visit & Architectural Consultation Fee', amount: number = 500) => {
    setPaymentPurpose(purpose);
    setPaymentAmount(amount);
    setPaymentModalOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setQuotePrefill({
      service: serviceTitle,
      budget: '',
      notes: `Inquiry regarding ${serviceTitle} scope and scheduling.`,
    });
    setQuoteModalOpen(true);
  };

  const handleSelectProjectForConsult = (projectTitle: string) => {
    setQuotePrefill({
      service: 'Residential Construction',
      budget: '',
      notes: `Interested in a project similar to: "${projectTitle}". Please advise on feasibility and design process.`,
    });
    setQuoteModalOpen(true);
  };

  const handleApplyEstimateToQuote = (summary: string, budgetRange: string, category: string) => {
    const categoryTitleMap: Record<string, string> = {
      residential: 'Residential Construction',
      commercial: 'Commercial Building Construction',
      renovation: 'Renovation & Remodeling',
      interior: 'Interior Design & False Ceiling',
    };

    setQuotePrefill({
      service: categoryTitleMap[category] || 'Residential Construction',
      budget: budgetRange,
      notes: `Cost Estimator Calculation: ${summary}. Indicative budget: ${budgetRange}.`,
    });

    // Scroll to contact form and update fields
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveCompanyInfo = (updated: CompanyInfo) => {
    setCompanyInfo(updated);
    try {
      localStorage.setItem('rr_company_info', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const whatsappLink = `https://wa.me/${companyInfo.whatsappPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hello R.R Group Of Construction, I would like to discuss a construction project.`
  )}`;

  return (
    <div className="min-h-screen bg-[#0c0e12] text-stone-100 flex flex-col selection:bg-amber-400 selection:text-stone-950 font-sans">
      
      {/* Top Bar Navigation */}
      <Header
        companyInfo={companyInfo}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => {
          setQuotePrefill({ service: 'Residential Construction', budget: '', notes: '' });
          setQuoteModalOpen(true);
        }}
        onOpenPaymentModal={() => handleOpenPayment()}
      />

      {/* Main Content Sections */}
      <main id="home" className="flex-1">
        {/* Hero Section */}
        <Hero
          companyInfo={companyInfo}
          onRequestQuote={() => {
            setQuotePrefill({ service: 'Residential Construction', budget: '', notes: '' });
            setQuoteModalOpen(true);
          }}
          onViewProjects={() => handleNavigate('projects')}
        />

        {/* Services Section */}
        <ServicesSection
          services={servicesData}
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />

        {/* Projects Section */}
        <ProjectsSection
          projects={sampleProjects}
          onOpenProjectModal={(proj) => setSelectedProject(proj)}
          onRequestQuote={() => {
            setQuotePrefill({ service: 'Residential Construction', budget: '', notes: '' });
            setQuoteModalOpen(true);
          }}
        />

        {/* About Section */}
        <AboutSection
          companyInfo={companyInfo}
          onOpenCustomizer={() => setCustomizerModalOpen(true)}
          onRequestQuote={() => {
            setQuotePrefill({ service: 'Residential Construction', budget: '', notes: '' });
            setQuoteModalOpen(true);
          }}
        />

        {/* Process Section */}
        <ProcessSection
          onRequestQuote={() => {
            setQuotePrefill({ service: 'Residential Construction', budget: '', notes: '' });
            setQuoteModalOpen(true);
          }}
        />

        {/* Cost Estimator Section */}
        <CostEstimator
          onApplyEstimateToQuote={handleApplyEstimateToQuote}
        />

        {/* Razorpay Online Payments & Tokens Section */}
        <PaymentSection
          companyInfo={companyInfo}
          onOpenPaymentModal={handleOpenPayment}
        />

        {/* Contact & Appointment Section */}
        <ContactSection
          companyInfo={companyInfo}
          prefilledService={quotePrefill.service}
          prefilledBudget={quotePrefill.budget}
          prefilledNotes={quotePrefill.notes}
          onClearPrefills={() => setQuotePrefill({ service: '', budget: '', notes: '' })}
        />
      </main>

      {/* Footer */}
      <Footer
        companyInfo={companyInfo}
        onNavigate={handleNavigate}
        onOpenCustomizer={() => setCustomizerModalOpen(true)}
      />

      {/* Reusable Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onConsult={handleSelectProjectForConsult}
      />

      {/* Direct Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        companyInfo={companyInfo}
        defaultService={quotePrefill.service || 'Residential Construction'}
        defaultBudget={quotePrefill.budget}
        defaultNotes={quotePrefill.notes}
      />

      {/* Razorpay Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        companyInfo={companyInfo}
        defaultPurpose={paymentPurpose}
        defaultAmount={paymentAmount}
      />

      {/* Company Placeholders & Details Customizer Modal */}
      <CompanyCustomizerModal
        isOpen={customizerModalOpen}
        onClose={() => setCustomizerModalOpen(false)}
        companyInfo={companyInfo}
        onSave={handleSaveCompanyInfo}
      />

      {/* Floating Action Button (WhatsApp Quick Connect) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-2xl hover:scale-105 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label="Chat with Raju Kumar on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">Chat on WhatsApp</span>
        </a>
      </div>

      {/* Floating Info Customizer Trigger (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          type="button"
          onClick={() => setCustomizerModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-400 hover:text-amber-400 text-xs border border-stone-800 shadow-lg transition-colors backdrop-blur focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
          title="Edit Company Details & Placeholders"
        >
          <Settings2 className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Edit Details / Placeholders</span>
        </button>
      </div>

    </div>
  );
}
