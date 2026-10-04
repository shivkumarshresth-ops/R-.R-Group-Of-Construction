import { useState } from 'react';
import { X, MapPin, Calendar, CheckCircle, ArrowRight, Layers } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onConsult: (projectTitle: string) => void;
}

export function ProjectModal({ project, onClose, onConsult }: ProjectModalProps) {
  const [imageError, setImageError] = useState(false);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="bg-[#121620] border border-stone-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl text-left relative flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-[#121620]/95 backdrop-blur px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <span>{project.categoryLabel}</span>
              {project.isSample && (
                <>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span className="text-stone-400 font-normal">Sample Project Showcase</span>
                </>
              )}
            </div>
            <h2 id="project-modal-title" className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Close Project Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Main Photo */}
          <div className="rounded-xl overflow-hidden border border-stone-800 bg-stone-950 aspect-[16/9] relative">
            {!imageError ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-stone-900 text-stone-400">
                <Layers className="w-10 h-10 text-amber-400 mb-2" />
                <p className="text-sm font-semibold text-stone-200">{project.title}</p>
                <p className="text-xs text-stone-500 mt-1">Image showcase placeholder</p>
              </div>
            )}
          </div>

          {/* Key Project Metadata Row (Clean unboxed text metadata with separators) */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3 px-4 rounded-xl bg-stone-900/60 border border-stone-800/80 text-xs text-stone-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Location: {project.location}</span>
            </div>
            <span aria-hidden="true" className="text-stone-700 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Duration: {project.completionTimeline}</span>
            </div>
          </div>

          {/* Project Scope & Description */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Scope of Engineering & Execution
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed font-normal">
              {project.description}
            </p>
            <div className="text-xs text-stone-400 italic">
              Project Specification: {project.scope}
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Structural & Finishing Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-900/40 border border-stone-800/60 text-xs text-stone-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample disclaimer banner */}
          {project.isSample && (
            <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300/90 leading-relaxed">
              <strong>Notice:</strong> This project card represents an illustrative portfolio sample for R.R Group Of Construction. Contact us with your specific architectural drawings or plot dimensions to receive tailored project estimates.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#121620]/95 backdrop-blur px-6 py-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-400">
            Have a similar construction or renovation project?
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-stone-300 hover:text-white rounded-lg border border-stone-700 hover:bg-stone-800 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                const title = project.title;
                onClose();
                onConsult(title);
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition-colors"
            >
              <span>Get Similar Project Estimate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
