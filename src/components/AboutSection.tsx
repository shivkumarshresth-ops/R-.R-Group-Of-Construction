import { Shield, Target, Users, HardHat, CheckCircle2, Award, Briefcase } from 'lucide-react';
import { CompanyInfo } from '../types';
import { safetyCommitments, whyChooseUsPillars } from '../data/companyData';

interface AboutSectionProps {
  companyInfo: CompanyInfo;
  onOpenCustomizer: () => void;
  onRequestQuote: () => void;
}

export function AboutSection({ companyInfo, onOpenCustomizer, onRequestQuote }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#0f1218] border-t border-stone-800 text-left relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">
            Company Background & Principles
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            About R.R Group Of Construction
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-300 font-normal leading-relaxed">
            Founded on the pillars of reliable craftsmanship and structural dependability, R.R Group Of Construction partners with residential property owners, commercial enterprises, and developers to bring architectural visions to life.
          </p>
        </div>

        {/* 2-Column Story & Leadership */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Mission & Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl bg-[#141822] border border-stone-800 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Target className="w-4 h-4" />
                <span>Our Mission & Operating Philosophy</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Building Tomorrow With Enduring Integrity
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed font-normal">
                At R.R Group Of Construction, we believe every structure is more than mortar, steel, and concrete—it is an investment in human safety, commercial productivity, and family well-being. Our approach combines rigorous on-site supervision, disciplined material selection, and clear, respectful communication from groundbreaking through final occupancy.
              </p>
              <p className="text-sm text-stone-300 leading-relaxed font-normal">
                We operate with a collaborative mindset, ensuring that property owners and architects retain complete visibility into milestone schedules, material specifications, and quality checkpoints at every turn.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyChooseUsPillars.map((pillar, i) => (
                <div key={i} className="p-5 rounded-xl bg-stone-900/60 border border-stone-800">
                  <h4 className="text-sm font-bold text-amber-400 mb-1.5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{pillar.title}</span>
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Spotlight Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#141822] border border-amber-500/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-lg bg-stone-900 group">
                    {companyInfo.proprietorPhotoUrl ? (
                      <img
                        src={companyInfo.proprietorPhotoUrl}
                        alt={`${companyInfo.proprietorName}, ${companyInfo.proprietorRole} of R.R Group Of Construction`}
                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center text-amber-400 text-3xl font-display font-bold">
                        {companyInfo.proprietorName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-1 bg-amber-400 rounded-full text-stone-950 shadow">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {companyInfo.proprietorName}
                  </h3>
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mt-0.5">
                    {companyInfo.proprietorRole} & Founder
                  </p>
                  <p className="text-xs text-stone-400 mt-1">R.R Group Of Construction</p>
                  <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-900/80 border border-stone-800 text-[11px] text-stone-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Direct Site Supervision & Executive Lead</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-stone-300 leading-relaxed border-t border-stone-800/80 pt-4">
                <p>
                  Leading on-site operations and project management with hands-on dedication to structural quality, subcontractor coordination, and timely client delivery.
                </p>
                <div className="p-3 rounded-lg bg-stone-900/80 border border-stone-800 text-[11px] text-stone-400">
                  <span className="font-semibold text-stone-300">Experience & Credentials: </span>
                  Serving clients across {companyInfo.address} and the {companyInfo.serviceArea} with dedicated building and renovation teams.
                </div>
              </div>

              {/* Direct Call / Contact */}
              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="text-stone-400 block">Direct Line:</span>
                  <a href={`tel:${companyInfo.primaryPhone.replace(/\s+/g, '')}`} className="font-bold text-amber-400 hover:underline tabular-nums">
                    {companyInfo.primaryPhone}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={onRequestQuote}
                  className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                >
                  Direct Inquiry
                </button>
              </div>
            </div>

            {/* Customizer trigger helper for site owner */}
            <div className="p-4 rounded-xl bg-stone-900/40 border border-dashed border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>Site Owner? Customize names & placeholders:</span>
              <button
                type="button"
                onClick={onOpenCustomizer}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline"
              >
                Edit Company Info
              </button>
            </div>
          </div>
        </div>

        {/* Safety & Quality Policy Section (General responsible standards without unverified claims) */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-[#11151e] border border-stone-800">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              <HardHat className="w-4 h-4" />
              <span>Safety & Quality Management</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Zero-Compromise Site Safety & Structural Standards
            </h3>
            <p className="mt-2 text-sm text-stone-300 leading-relaxed font-normal">
              Construction sites demand rigorous safety precautions and uncompromising material verification. Our operational protocols prioritize the well-being of our workers, site visitors, and adjacent properties while maintaining the structural durability of your building.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyCommitments.map((sec, i) => (
              <div key={i} className="p-5 rounded-xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                    0{i + 1}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">
                    {sec.title}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {sec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
