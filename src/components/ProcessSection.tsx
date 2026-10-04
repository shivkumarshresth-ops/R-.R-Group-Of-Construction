import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { constructionProcessSteps } from '../data/companyData';

interface ProcessSectionProps {
  onRequestQuote: () => void;
}

export function ProcessSection({ onRequestQuote }: ProcessSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-[#0c0e12] border-t border-stone-800 text-left relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">
            Structured Workflow
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our Construction Process
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-300 font-normal leading-relaxed">
            Every successful build relies on clear milestones, dependable material staging, and open communication. Here is how we guide your project from initial concept to official handover.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {constructionProcessSteps.map((step, index) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-[#131722] border border-stone-800 flex flex-col justify-between relative group hover:border-amber-500/40 transition-colors"
            >
              <div>
                {/* Step Number with Amber Line */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-extrabold text-amber-400/90 tabular-nums">
                    {step.step}
                  </span>
                  <div className="h-0.5 w-12 bg-amber-400/30 group-hover:w-16 group-hover:bg-amber-400 transition-all duration-300" />
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-stone-300 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center gap-2 text-xs text-stone-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Client Sign-Off Milestone</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner after process */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-[#181d2a] via-[#141822] to-[#12151d] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-bold text-white">
              Ready to begin Step 01 with a site consultation?
            </h3>
            <p className="text-sm text-stone-300 mt-1">
              Share your plot size, location, and requirements for a free preliminary evaluation.
            </p>
          </div>
          <button
            type="button"
            onClick={onRequestQuote}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition-colors"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
