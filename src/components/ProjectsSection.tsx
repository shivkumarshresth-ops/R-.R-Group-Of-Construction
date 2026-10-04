import { useState } from 'react';
import { ArrowUpRight, MapPin, Calendar, Layers } from 'lucide-react';
import { ProjectItem, ProjectCategory } from '../types';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onOpenProjectModal: (project: ProjectItem) => void;
  onRequestQuote: () => void;
}

export function ProjectsSection({
  projects,
  onOpenProjectModal,
  onRequestQuote,
}: ProjectsSectionProps) {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filterTabs: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'interior', label: 'Interior & Ceilings' },
    { id: 'civil', label: 'Civil & Structural' },
  ];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#0c0e12] border-t border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">
              Portfolio & Execution Gallery
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Featured Construction Projects
            </h2>
            <p className="mt-3 text-base text-stone-300 font-normal leading-relaxed">
              Explore our project craftsmanship across residential villas, commercial complexes, structural civil works, and modern modular interiors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onRequestQuote}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition-colors"
            >
              <span>Discuss Your Site</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Filter Tabs (Functional segmented buttons - zero-pill discipline) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#141822] border border-stone-800 rounded-xl overflow-x-auto max-w-full mb-10 w-fit scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {filteredProjects.map((project) => {
            const hasError = failedImages[project.id];

            return (
              <div
                key={project.id}
                className="group rounded-2xl bg-[#131720] border border-stone-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image Frame */}
                <div
                  className="aspect-[16/10] relative overflow-hidden bg-stone-950 cursor-pointer"
                  onClick={() => onOpenProjectModal(project)}
                >
                  {!hasError ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(project.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-stone-900 text-stone-400">
                      <Layers className="w-12 h-12 text-amber-400 mb-2" />
                      <p className="text-sm font-semibold text-stone-200">{project.title}</p>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#131720] via-transparent to-transparent opacity-70" />

                  {/* Sample Tag watermark (subtle, clearly marked per brief) */}
                  {project.isSample && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur text-[10px] uppercase tracking-wider font-semibold text-amber-300 border border-amber-400/20">
                      Sample Showcase
                    </div>
                  )}
                </div>

                {/* Card Content Area */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Clean unboxed metadata with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium mb-2.5">
                      <span>{project.categoryLabel}</span>
                      <span aria-hidden="true" className="text-stone-600">·</span>
                      <span className="text-stone-400">{project.completionTimeline}</span>
                    </div>

                    <h3
                      onClick={() => onOpenProjectModal(project)}
                      className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    <p className="mt-2 text-sm text-stone-300 font-normal leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Info & Action */}
                  <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-stone-400 truncate">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenProjectModal(project)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors shrink-0"
                    >
                      <span>View Project Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice regarding project portfolio customization as requested by user brief */}
        <div className="mt-12 p-4 rounded-xl bg-stone-900/60 border border-stone-800 text-xs text-stone-400 text-center max-w-2xl mx-auto">
          <p>
            <strong>Note on Project Showcase:</strong> The projects displayed above are representative sample project cards illustrating our execution capabilities across residential, commercial, civil, and interior works. Real project photography and client case studies will be updated with your active portfolio.
          </p>
        </div>

      </div>
    </section>
  );
}
