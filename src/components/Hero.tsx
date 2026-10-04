import { useState } from 'react';
import { ArrowRight, HardHat, ShieldCheck, CheckCircle2, Sparkles, Building, PhoneCall } from 'lucide-react';
import { CompanyInfo } from '../types';

interface HeroProps {
  companyInfo: CompanyInfo;
  onRequestQuote: () => void;
  onViewProjects: () => void;
}

export function Hero({ companyInfo, onRequestQuote, onViewProjects }: HeroProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#0c0e12]">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2430_1px,transparent_1px),linear-gradient(to_bottom,#1f2430_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Editorial Tagline Kicker (Zero-pill compliant: unboxed text with separator) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              <span>{companyInfo.tagline}</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-stone-400">{companyInfo.secondaryTagline}</span>
            </div>

            {/* Main Headline (balanced type, no orphan words) */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-2xl">
              Precision Construction & Structural Engineering
            </h1>

            {/* Supporting Prose */}
            <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-xl">
              R.R Group Of Construction provides turnkey residential, commercial, civil, and interior finishing solutions with uncompromising workmanship, structural safety, and transparent planning.
            </p>

            {/* Primary Calls to Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onViewProjects}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-200 bg-stone-900/80 hover:bg-stone-800 hover:text-white rounded-lg border border-stone-700/80 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
              >
                <Building className="w-4 h-4 text-amber-400" />
                <span>View Our Projects</span>
              </button>
            </div>

            {/* Verified Location & Direct Phone Bar with Proprietor Photo */}
            <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
              <div className="flex items-center gap-3">
                {companyInfo.proprietorPhotoUrl && (
                  <div className="relative shrink-0">
                    <img
                      src={companyInfo.proprietorPhotoUrl}
                      alt={companyInfo.proprietorName}
                      className="w-10 h-10 rounded-full border-2 border-amber-400/80 object-cover object-top shadow"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-stone-900" />
                  </div>
                )}
                <div>
                  <div className="text-stone-200 font-bold text-xs">{companyInfo.proprietorName}</div>
                  <div className="text-[10px] text-amber-400 font-medium">{companyInfo.proprietorRole} & On-Site Lead</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-stone-300">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <a href={`tel:${companyInfo.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-amber-400 tabular-nums font-medium text-xs">
                    {companyInfo.primaryPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 shadow-2xl group">
              {/* Image Frame with fallback */}
              <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden bg-stone-950">
                {!imageError ? (
                  <img
                    src="/src/assets/images/hero_construction_modern_building_1791130021817.jpg"
                    alt="R.R Group Of Construction modern architectural project"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 text-stone-400 text-center">
                    <HardHat className="w-12 h-12 text-amber-400 mb-3" />
                    <p className="font-display font-semibold text-stone-200">R.R Group Of Construction</p>
                    <p className="text-xs text-stone-400 mt-1">Quality Construction for a Better Tomorrow</p>
                  </div>
                )}

                {/* Subtle scrim gradient for visual depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent opacity-80" />
              </div>

              {/* Foreground Floating Card: Quick Stats / Pillars */}
              <div className="p-5 bg-[#12151d] border-t border-stone-800 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded bg-amber-400/10 text-amber-400 shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-200">Quality Assured</p>
                      <p className="text-[11px] text-stone-400 leading-tight mt-0.5">Strict material testing & rebar inspection</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded bg-amber-400/10 text-amber-400 shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-200">Modern Design</p>
                      <p className="text-[11px] text-stone-400 leading-tight mt-0.5">Contemporary architecture & false ceiling</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Gold Accent Lines */}
            <div className="absolute -bottom-2 -right-2 w-24 h-24 border-r-2 border-b-2 border-amber-500/30 rounded-br-2xl pointer-events-none" />
          </div>

        </div>

        {/* 4 Brand Pillars Strip (from business card: Quality Workmanship, Reliable Service, Customer Satisfaction, Modern Design) */}
        <div className="mt-16 pt-8 border-t border-stone-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-stone-100">Quality Workmanship</h2>
                <p className="text-xs text-stone-400 mt-0.5">Certified materials & structural integrity</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-stone-100">Reliable Service</h2>
                <p className="text-xs text-stone-400 mt-0.5">Milestone schedule & transparent billing</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <HardHat className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-stone-100">Customer Satisfaction</h2>
                <p className="text-xs text-stone-400 mt-0.5">Collaborative planning & clear updates</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-stone-100">Modern Design</h2>
                <p className="text-xs text-stone-400 mt-0.5">Contemporary finishes & false ceilings</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
