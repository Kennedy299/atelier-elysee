import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Maximize, 
  Quote, 
  Check, 
  MapPin, 
  Calendar, 
  Layers, 
  Compass 
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { Lightbox } from '../components/Lightbox';
import { api } from '../services/api';
import { Project } from '../types';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      if (!slug) return;
      const data = await api.getProjectBySlug(slug);
      if (data) {
        setProject(data);
      }
      const all = await api.getProjects();
      setAllProjects(all);
      setLoading(false);
    };
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center font-serif text-2xl italic text-taupe">
        Opening architectural dossier...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center space-y-6 px-6">
        <h1 className="font-serif text-4xl text-charcoal">Project Not Found</h1>
        <p className="text-sm text-taupe">The requested project dossier could not be retrieved from the archives.</p>
        <Link
          to="/projects"
          className="px-6 py-3 bg-charcoal text-ivory text-xs uppercase tracking-luxury hover:bg-earth transition-colors"
        >
          Return to Portfolio
        </Link>
      </div>
    );
  }

  // Next Project Logic
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const nextProject = allProjects.length > 0 ? allProjects[(currentIndex + 1) % allProjects.length] : null;

  const openLightboxAt = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-28 md:pt-36 bg-ivory">
      <SEOHead
        title={project.title}
        description={project.subtitle || project.concept.substring(0, 160)}
        ogImage={project.coverImage}
      />

      {/* Back Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-8 flex items-center justify-between text-xs uppercase tracking-luxury text-taupe">
        <Link
          to="/projects"
          className="inline-flex items-center space-x-2 text-charcoal hover:text-earth transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Selected Works</span>
        </Link>
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-charcoal">{project.category}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>
      </div>

      {/* Hero Header & Title */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
            {project.location}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-charcoal font-light leading-tight">
            {project.title}
          </h1>
          <p className="text-lg md:text-2xl text-taupe font-serif italic max-w-3xl leading-relaxed">
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* Full-width Hero Cover Image */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div 
            onClick={() => openLightboxAt(0)}
            className="aspect-[16/9] md:aspect-[21/10] overflow-hidden bg-beige-200 shadow-2xl relative group cursor-pointer"
          >
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 bg-ivory/90 text-charcoal text-xs uppercase tracking-luxury flex items-center space-x-2 backdrop-blur-sm shadow-md">
                <Maximize className="w-4 h-4" />
                <span>View Fullscreen</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Metadata & Specifications Ribbon */}
      <section className="py-12 px-6 md:px-12 bg-beige-100/70 border-y border-beige-300">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
          <div>
            <span className="text-taupe uppercase tracking-luxury block mb-1">Location</span>
            <span className="font-serif text-lg text-charcoal font-medium">{project.location}</span>
          </div>
          <div>
            <span className="text-taupe uppercase tracking-luxury block mb-1">Completion</span>
            <span className="font-serif text-lg text-charcoal font-medium">{project.year}</span>
          </div>
          <div>
            <span className="text-taupe uppercase tracking-luxury block mb-1">Spatial Area</span>
            <span className="font-serif text-lg text-charcoal font-medium">{project.area}</span>
          </div>
          <div>
            <span className="text-taupe uppercase tracking-luxury block mb-1">Typology</span>
            <span className="font-serif text-lg text-charcoal font-medium">{project.category}</span>
          </div>
        </div>
      </section>

      {/* Narrative & Concept Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Design Concept */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
                Architectural Narrative
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
                The Spatial Concept
              </h2>
              <p className="text-base text-charcoal/80 font-light leading-relaxed">
                {project.concept}
              </p>
            </div>

            {project.clientBrief && (
              <div className="space-y-3 pt-6 border-t border-beige-300">
                <h3 className="text-xs uppercase tracking-luxury text-charcoal font-semibold">
                  Client Brief
                </h3>
                <p className="text-sm text-taupe font-light leading-relaxed">
                  {project.clientBrief}
                </p>
              </div>
            )}

            {project.challengeSolution && (
              <div className="space-y-3 pt-6 border-t border-beige-300">
                <h3 className="text-xs uppercase tracking-luxury text-charcoal font-semibold">
                  Architectural Solution & Execution
                </h3>
                <p className="text-sm text-taupe font-light leading-relaxed">
                  {project.challengeSolution}
                </p>
              </div>
            )}
          </div>

          {/* Right: Material Palette & Specifications */}
          <div className="lg:col-span-5 space-y-8 lg:pl-8">
            <div className="p-8 bg-beige-100/50 border border-beige-300 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
                  Material Palette
                </span>
                <h3 className="font-serif text-2xl text-charcoal">
                  Honest Sourcing
                </h3>
              </div>

              <div className="space-y-3">
                {project.materials.map((mat, i) => (
                  <div key={i} className="flex items-center space-x-3 text-xs text-charcoal/90">
                    <span className="w-2 h-2 rounded-full bg-earth flex-shrink-0" />
                    <span className="font-light">{mat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-beige-200">
                <Link
                  to="/consultation"
                  className="block w-full text-center py-3 bg-charcoal text-ivory text-xs uppercase tracking-luxury font-medium hover:bg-earth transition-colors"
                >
                  Commission Similar Project
                </Link>
              </div>
            </div>

            {/* Testimonial Quote if available */}
            {project.testimonialQuote && (
              <div className="p-8 bg-ivory border-l-2 border-earth shadow-sm space-y-4">
                <Quote className="w-6 h-6 text-earth" />
                <p className="font-serif text-lg italic text-charcoal leading-relaxed">
                  “{project.testimonialQuote}”
                </p>
                {project.testimonialAuthor && (
                  <p className="text-xs uppercase tracking-luxury text-taupe font-semibold">
                    — {project.testimonialAuthor}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Before and After Interactive Transformation Slider (Where Applicable) */}
      {project.beforeImage && project.afterImage && (
        <section className="py-20 px-6 md:px-12 bg-beige-50 border-y border-beige-300">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
                Spatial Metamorphosis
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
                Before & After Comparison
              </h2>
              <p className="text-sm text-taupe font-light">
                Drag the divider handle horizontally to reveal the architectural transformation from historical state to completed atelier sanctuary.
              </p>
            </div>

            <div className="max-w-5xl mx-auto shadow-2xl">
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                beforeLabel="Original Archive State"
                afterLabel="Atelier Élysée Handover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Full Photographic Gallery */}
      <section className="py-24 px-6 md:px-12 bg-ivory">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex items-end justify-between border-b border-beige-300 pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
                Photographic Study
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
                Project Gallery
              </h2>
            </div>
            <span className="text-xs text-taupe uppercase tracking-widest">
              {project.galleryImages.length} Photographs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {project.galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => openLightboxAt(idx)}
                className={`relative overflow-hidden bg-beige-200 cursor-pointer group shadow-sm ${
                  idx % 4 === 0 ? 'md:col-span-2 aspect-[16/10]' : 'aspect-[4/5]'
                }`}
              >
                <img
                  src={img}
                  alt={`${project.title} detail ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="w-10 h-10 rounded-full bg-ivory/90 text-charcoal flex items-center justify-center shadow-md">
                    <Maximize className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project Footer Bar */}
      {nextProject && (
        <section className="py-20 px-6 md:px-12 bg-charcoal text-ivory border-t border-charcoal-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold">
                Next Architectural Work
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-white">
                {nextProject.title}
              </h3>
              <p className="text-xs uppercase tracking-widest text-ivory/60">
                {nextProject.location} — {nextProject.category}
              </p>
            </div>

            <Link
              to={`/projects/${nextProject.slug}`}
              className="px-8 py-4 bg-earth text-white text-xs uppercase tracking-luxury font-medium hover:bg-earth-dark transition-colors flex items-center space-x-2"
            >
              <span>View Next Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Lightbox Component */}
      <Lightbox
        images={project.galleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
};
