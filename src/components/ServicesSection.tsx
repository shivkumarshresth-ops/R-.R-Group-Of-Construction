import { useState } from 'react';
import {
  Home,
  Building2,
  Armchair,
  Hammer,
  HardHat,
  Zap,
  Layers,
  ClipboardCheck,
  ArrowRight,
  Check,
  ChevronRight
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export function ServicesSection({ services, onSelectServiceForQuote }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Icon mapping helper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-6 h-6" />;
      case 'Building2':
        return <Building2 className="w-6 h-6" />;
      case 'Armchair':
        return <Armchair className="w-6 h-6" />;
      case 'Hammer':
        return <Hammer className="w-6 h-6" />;
      case 'HardHat':
        return <HardHat className="w-6 h-6" />;
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'Layers':
        return <Layers className="w-6 h-6" />;
      case 'ClipboardCheck':
      default:
        return <ClipboardCheck className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#0f1218] border-t border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">
            Comprehensive Capabilities
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our Construction & Building Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-300 font-normal leading-relaxed">
            From foundational excavation to intricate false ceilings and turnkey handovers, R.R Group Of Construction handles every stage of building execution with dedicated craftsmanship and rigorous site supervision.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const isFeatured = index === 0 || index === 1;

            return (
              <div
                key={service.id}
                className={`flex flex-col justify-between p-6 rounded-2xl bg-[#141822] border border-stone-800 hover:border-amber-500/50 transition-all duration-200 group text-left ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#161b27] via-[#141822] to-[#11141c]' : ''
                }`}
              >
                <div>
                  {/* Top Bar inside card: Icon and Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-stone-950 transition-colors duration-200">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-mono tabular-nums text-stone-400 font-medium">
                      0{index + 1}.
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-2.5 text-sm text-stone-300 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Highlight Bullets for featured cards */}
                  {isFeatured && (
                    <ul className="mt-4 space-y-2 border-t border-stone-800/80 pt-4">
                      {service.highlights.slice(0, 2).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-stone-400">
                          <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bottom Action Links */}
                <div className="mt-6 pt-4 border-t border-stone-800/60 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 py-1"
                  >
                    <span>View Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-4 decoration-amber-400/40 hover:decoration-amber-400"
                  >
                    Get Estimate
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note regarding service customization as required by brief */}
        <div className="mt-8 text-center text-xs text-stone-400">
          Need a customized scope or specialized engineering specification? All services are adaptable to custom architectural drawings.
        </div>

      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          <div className="bg-[#141822] border border-stone-700 max-w-xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                  {getIcon(selectedService.iconName)}
                </div>
                <div>
                  <h3 id="service-modal-title" className="font-display text-lg font-bold text-white">
                    {selectedService.title}
                  </h3>
                  <p className="text-xs text-stone-400">Service Specifications & Scope</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="text-stone-400 hover:text-white p-2 rounded-lg hover:bg-stone-800 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="py-5 space-y-4">
              <p className="text-sm text-stone-300 leading-relaxed">
                {selectedService.detailedDescription}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Key Scope Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-stone-900/60 border border-stone-800/80 text-xs text-stone-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                  Typical Project Formats
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.typicalProjects.map((proj, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded bg-stone-800/80 text-stone-300 border border-stone-700/60"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white rounded-lg border border-stone-700"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const serviceName = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForQuote(serviceName);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition-colors"
              >
                <span>Request Consultation for This Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
