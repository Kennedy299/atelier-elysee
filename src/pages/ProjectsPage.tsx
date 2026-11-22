import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { ProjectCard } from '../components/ProjectCard';
import { api } from '../services/api';
import { Project, ProjectCategory } from '../types';

export const ProjectsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Renovation'];

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const data = await api.getProjects(currentCategory);
      setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, [currentCategory]);

  const handleCategoryChange = (cat: string) => {
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="pt-28 md:pt-36 bg-ivory">
      <SEOHead
        title="Portfolio of Selected Works"
        description="Explore the architectural portfolio of Atelier Élysée: private residential sanctuaries, historic renovations, commercial headquarters, and hospitality retreats."
      />

      {/* Header */}
      <section className="px-6 md:px-12 pb-16 border-b border-beige-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
            Curated Portfolio
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-charcoal font-light leading-tight">
            Selected Architectural Works.
          </h1>
          <p className="text-base sm:text-lg text-taupe font-light max-w-2xl leading-relaxed">
            An archival retrospective of residential, commercial, and landmark commissions completed across Paris, 
            New York, California, and the Mediterranean.
          </p>

          {/* Category Filter Tabs */}
          <div className="pt-8 flex flex-wrap items-center gap-2 md:gap-3">
            {categories.map((cat) => {
              const active = currentCategory === cat || (cat === 'All' && !searchParams.get('category'));
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-xs uppercase tracking-luxury px-5 py-2.5 transition-all duration-300 font-semibold ${
                    active
                      ? 'bg-[#121110] text-ivory shadow-sm'
                      : 'bg-beige-100 text-[#121110] border border-beige-300 hover:bg-beige-200 hover:text-earth'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="py-24 text-center text-taupe font-serif text-xl italic animate-pulse">
              Curating project portfolio...
            </div>
          ) : projects.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <p className="font-serif text-2xl text-charcoal">No projects found in this category.</p>
              <button
                onClick={() => handleCategoryChange('All')}
                className="text-xs uppercase tracking-luxury text-earth underline"
              >
                View All Projects
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {projects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  aspectRatio={idx % 3 === 1 ? 'aspect-[3/4]' : 'aspect-[4/5]'}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
