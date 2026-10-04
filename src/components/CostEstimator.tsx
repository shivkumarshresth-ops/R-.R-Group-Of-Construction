import { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, Info, Building, Sparkles } from 'lucide-react';
import { EstimateParams } from '../types';

interface CostEstimatorProps {
  onApplyEstimateToQuote: (summary: string, budgetRange: string, category: string) => void;
}

export function CostEstimator({ onApplyEstimateToQuote }: CostEstimatorProps) {
  const [params, setParams] = useState<EstimateParams>({
    category: 'residential',
    areaSqFt: 1500,
    qualityGrade: 'premium',
    floors: 2,
  });

  // Base construction cost rates per sq.ft (approximate benchmarks in INR for India / NCR construction market)
  const rateMatrix: Record<string, Record<string, { min: number; max: number; monthsPer1k: number }>> = {
    residential: {
      standard: { min: 1600, max: 1900, monthsPer1k: 5 },
      premium: { min: 2000, max: 2500, monthsPer1k: 6 },
      luxury: { min: 2600, max: 3500, monthsPer1k: 8 },
    },
    commercial: {
      standard: { min: 1800, max: 2200, monthsPer1k: 6 },
      premium: { min: 2300, max: 2900, monthsPer1k: 7 },
      luxury: { min: 3000, max: 4200, monthsPer1k: 9 },
    },
    renovation: {
      standard: { min: 700, max: 1000, monthsPer1k: 2 },
      premium: { min: 1100, max: 1600, monthsPer1k: 3 },
      luxury: { min: 1700, max: 2400, monthsPer1k: 4 },
    },
    interior: {
      standard: { min: 900, max: 1300, monthsPer1k: 2 },
      premium: { min: 1400, max: 2100, monthsPer1k: 3 },
      luxury: { min: 2200, max: 3200, monthsPer1k: 4 },
    },
  };

  const currentRates = rateMatrix[params.category][params.qualityGrade];
  const minCost = Math.round(params.areaSqFt * currentRates.min);
  const maxCost = Math.round(params.areaSqFt * currentRates.max);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const estimatedTimelineMonths = Math.max(
    2,
    Math.round((params.areaSqFt / 1000) * currentRates.monthsPer1k * (params.floors > 1 ? 1 + (params.floors - 1) * 0.25 : 1))
  );

  const handleApply = () => {
    const summary = `${params.areaSqFt} sq ft ${params.category.toUpperCase()} (${params.qualityGrade} grade, ${params.floors} floor${params.floors > 1 ? 's' : ''})`;
    const budgetRange = `${formatCurrency(minCost)} - ${formatCurrency(maxCost)}`;
    onApplyEstimateToQuote(summary, budgetRange, params.category);
  };

  return (
    <section id="estimator" className="py-20 md:py-28 bg-[#0f1218] border-t border-stone-800 text-left relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">
            Instant Budget Planning
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Construction Cost Estimator
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-300 font-normal leading-relaxed">
            Estimate your project expenditure based on your planned area, property type, and finishing preferences.
          </p>
        </div>

        {/* 2-Column Estimator Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#141822] border border-stone-800 space-y-6">
            
            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                1. Project Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'residential', label: 'Residential' },
                  { id: 'commercial', label: 'Commercial' },
                  { id: 'renovation', label: 'Renovation' },
                  { id: 'interior', label: 'Interior / Ceilings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setParams({ ...params, category: item.id as any })}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                      params.category === item.id
                        ? 'bg-amber-400 text-stone-950 border-amber-400 shadow-sm'
                        : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Built-up Area Slider & Number input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  2. Built-up Area (Square Feet)
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="200"
                    max="50000"
                    step="50"
                    value={params.areaSqFt}
                    onChange={(e) => setParams({ ...params, areaSqFt: Math.max(200, Number(e.target.value) || 200) })}
                    className="w-24 px-2 py-1 text-xs text-right font-mono font-bold bg-stone-900 border border-stone-700 rounded text-amber-400 focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-xs text-stone-400">sq ft</span>
                </div>
              </div>
              <input
                type="range"
                min="300"
                max="10000"
                step="100"
                value={params.areaSqFt}
                onChange={(e) => setParams({ ...params, areaSqFt: Number(e.target.value) })}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1 tabular-nums">
                <span>300 sq ft</span>
                <span>5,000 sq ft</span>
                <span>10,000 sq ft</span>
              </div>
            </div>

            {/* Quality Grade */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                3. Material & Finishing Grade
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'standard',
                    label: 'Standard Grade',
                    desc: 'Standard ISI rebar, M20 concrete, standard ceramic tiles & emulsion paint',
                  },
                  {
                    id: 'premium',
                    label: 'Premium Grade',
                    desc: 'Branded TMT bars, vitrified tiles, false ceiling with warm coves, branded sanitary',
                  },
                  {
                    id: 'luxury',
                    label: 'Luxury Grade',
                    desc: 'Imported marble, architectural elevation, designer false ceilings, premium fittings',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setParams({ ...params, qualityGrade: item.id as any })}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      params.qualityGrade === item.id
                        ? 'bg-amber-400/10 border-amber-400 text-stone-100'
                        : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${params.qualityGrade === item.id ? 'text-amber-400' : 'text-stone-200'}`}>
                          {item.label}
                        </span>
                        {params.qualityGrade === item.id && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <p className="text-[11px] leading-relaxed text-stone-400">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Floors (if residential or commercial) */}
            {(params.category === 'residential' || params.category === 'commercial') && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                  4. Number of Floors (Structure Height)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setParams({ ...params, floors: num })}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                        params.floors === num
                          ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold'
                          : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {num} {num === 1 ? 'Floor' : 'Floors'}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Output Display Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#161c28] via-[#131722] to-[#10131b] border border-amber-500/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                  Estimated Project Investment
                </span>
                <h3 className="font-display text-lg font-bold text-white mt-0.5">
                  Preliminary Budget Range
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
            </div>

            {/* Price figures */}
            <div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight tabular-nums">
                {formatCurrency(minCost)} – {formatCurrency(maxCost)}
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
                <span>Approx. ₹{currentRates.min} – ₹{currentRates.max} / sq.ft</span>
                <span aria-hidden="true">·</span>
                <span>{params.areaSqFt} sq ft total</span>
              </div>
            </div>

            {/* Timeline & Scope breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-stone-800/80 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-stone-800/40 text-stone-300">
                <span className="text-stone-400">Estimated Timeline</span>
                <span className="font-semibold text-white">~{estimatedTimelineMonths} Months</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-800/40 text-stone-300">
                <span className="text-stone-400">Civil & Structural Works</span>
                <span className="text-stone-200">~50% - 55%</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-800/40 text-stone-300">
                <span className="text-stone-400">Plumbing & Electrical (MEP)</span>
                <span className="text-stone-200">~15% - 20%</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-800/40 text-stone-300">
                <span className="text-stone-400">Flooring, False Ceiling & Finishing</span>
                <span className="text-stone-200">~25% - 30%</span>
              </div>
            </div>

            {/* Disclaimer notice */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-stone-900/60 border border-stone-800 text-[11px] text-stone-400 leading-relaxed">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Estimates are indicative based on prevailing raw material (cement, TMT steel, sand) and labor market rates. Final estimates depend on site soil condition and architectural blueprints.
              </span>
            </div>

            {/* Action button */}
            <button
              type="button"
              onClick={handleApply}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md transition-all duration-200"
            >
              <span>Use This In Quotation Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
