import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Compass, 
  Home as HomeIcon, 
  Building2, 
  Maximize2, 
  Sparkles, 
  RotateCcw,
  Quote,
  CheckCircle2
} from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { SEOHead } from '../components/SEOHead';
import { api } from '../services/api';
import { Project, Testimonial } from '../types';
import { DESIGN_PROCESS_STEPS } from '../data/initialData';

export const HomePage: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeProcessTab, setActiveProcessTab] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const allProjects = await api.getProjects();
      setFeaturedProjects(allProjects.filter(p => p.featured).slice(0, 4));
      const allTestimonials = await api.getTestimonials();
      setTestimonials(allTestimonials.slice(0, 3));
    };
    loadData();
  }, []);

  const serviceHighlights = [
    {
      title: 'Residential Interior Design',
      desc: 'Bespoke private sanctuaries, penthouses, and historic estates tailored to your distinct lifestyle rituals.',
      icon: HomeIcon,
      slug: 'residential-interior-design'
    },
    {
      title: 'Commercial Interior Design',
      desc: 'Flagship boutiques, creative executive studios, and gallery spaces engineered to captivate and elevate brand prestige.',
      icon: Building2,
      slug: 'commercial-interior-design'
    },
    {
      title: 'Space Planning & Architecture',
      desc: 'Rigorous volumetric optimization, circulation vector mapping, and daylight simulation for harmonious spatial flow.',
      icon: Maximize2,
      slug: 'space-planning'
    },
    {
      title: 'Furniture & Curated Styling',
      desc: 'Rare mid-century design pieces, custom upholstery, hand-knotted textiles, and curated sculptural lighting.',
      icon: Sparkles,
      slug: 'furniture-and-styling'
    },
    {
      title: 'Interior Renovation',
      desc: 'Meticulous rehabilitation of heritage Haussmannian properties, townhouses, and architectural gems.',
      icon: RotateCcw,
      slug: 'interior-renovation'
    },
    {
      title: 'Design Consultation',
      desc: 'Intensive strategic workshops and direct creative counsel with founding principals on material and spatial strategies.',
      icon: Compass,
      slug: 'design-consultation'
    }
  ];

  return (
    <div className="relative">
      <SEOHead 
        title="Spaces That Tell Your Story"
        description="Atelier Élysée is a luxury interior architecture and design studio creating bespoke residential and commercial sanctuaries."
      />

      {/* ============================================================== */}
      {/* 1. HERO SECTION                                                */}
      {/* ============================================================== */}
      <section className="relative min-h-[92vh] flex items-end pb-20 md:pb-28 pt-36 px-6 md:px-12 overflow-hidden bg-ivory">
        {/* Full bleed background image with subtle warm tone overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=85"
            alt="Contemporary luxury living room by Atelier Élysée"
            className="w-full h-full object-cover object-center transform scale-105 animate-subtle-zoom"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/20" />
        </div>

        {/* Hero Editorial Composition */}
        <div className="relative z-10 max-w-7xl mx-auto w-full text-ivory">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-3 text-xs tracking-widest-luxury uppercase font-medium text-earth-light bg-charcoal/40 backdrop-blur-md px-4 py-1.5 border border-ivory/15">
              <span>Haute Interior Architecture</span>
              <span className="w-1.5 h-1.5 rounded-full bg-earth" />
              <span>Paris & New York</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] text-white">
              Spaces That Tell Your Story.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-ivory/85 font-light leading-relaxed max-w-2xl">
              Thoughtfully designed interiors that balance beauty, functionality and timeless character.
            </p>

            {/* Calls to Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/projects"
                className="px-8 py-4 bg-ivory text-charcoal text-xs uppercase tracking-luxury font-medium hover:bg-earth hover:text-white transition-all duration-300 text-center flex items-center justify-center space-x-2 group shadow-xl"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                to="/about"
                className="px-8 py-4 bg-transparent border border-ivory/60 text-ivory text-xs uppercase tracking-luxury font-medium hover:bg-ivory/10 hover:border-ivory transition-all duration-300 text-center flex items-center justify-center space-x-2"
              >
                <span>Discover Our Studio</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden lg:flex absolute bottom-10 right-12 z-10 items-center space-x-3 text-xs uppercase tracking-widest text-ivory/60 font-light">
          <span>Scroll to explore</span>
          <span className="w-10 h-[1px] bg-ivory/40" />
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. INTRODUCTION SECTION                                        */}
      {/* ============================================================== */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading & Narrative */}
            <div className="lg:col-span-5 space-y-8">
              <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
                Atelier Philosophy
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-light leading-tight">
                Designing Spaces. Creating Experiences.
              </h2>

              <p className="text-sm md:text-base text-taupe font-light leading-relaxed">
                At Atelier Élysée, we believe an interior is never merely an arrangement of objects; 
                it is a living atmosphere sculpted by natural light, physical weight, and spatial proportion.
              </p>

              <p className="text-sm md:text-base text-taupe font-light leading-relaxed">
                Founded in Paris, our atelier collaborates with visionary patrons across Europe, the Americas, 
                and Asia. We eschew temporary decoration in favor of authentic materials—honed travertine, 
                hand-chiseled granite, French oak, and lime-wash plaster—that patina with noble dignity.
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-3 text-xs uppercase tracking-luxury font-semibold text-charcoal hover:text-earth transition-colors group"
                >
                  <span className="border-b border-charcoal/40 group-hover:border-earth pb-1">
                    Discover Our Studio Legacy
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: Architectural Interior Image */}
            <div className="lg:col-span-7">
              <div className="relative group overflow-hidden bg-beige-200 aspect-[16/11] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
                  alt="Minimalist architectural living space with sunken seating"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-ivory/90 backdrop-blur-md flex items-center justify-between text-xs text-charcoal border border-beige-300">
                  <span className="font-serif text-sm tracking-wide">Montecito Residence — Light Study</span>
                  <span className="text-taupe uppercase tracking-wider text-[10px]">Photo Archive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. FEATURED PROJECTS SECTION (ASYMMETRICAL EDITORIAL GRID)     */}
      {/* ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-beige-50 border-t border-beige-300/60">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-beige-300 pb-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
                Portfolio Showcase
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
                Selected Works
              </h2>
            </div>
            <Link
              to="/projects"
              className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-xs uppercase tracking-luxury font-medium text-charcoal hover:text-earth transition-colors group"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Asymmetrical Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {featuredProjects.map((project, index) => {
              // Asymmetric spanning logic:
              // Index 0: 7 cols wide
              // Index 1: 5 cols wide with offset
              // Index 2: 5 cols wide
              // Index 3: 7 cols wide
              const colSpan = index % 3 === 0 ? 'md:col-span-7' : index % 3 === 1 ? 'md:col-span-5 md:pt-16' : 'md:col-span-12 lg:col-span-6';
              const aspectRatio = index % 2 === 0 ? 'aspect-[16/11]' : 'aspect-[4/5]';

              return (
                <div key={project.id} className={colSpan}>
                  <ProjectCard 
                    project={project} 
                    aspectRatio={aspectRatio}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom link to complete catalog */}
          <div className="pt-8 text-center border-t border-beige-300/80">
            <Link
              to="/projects"
              className="inline-block px-10 py-4 border border-charcoal text-xs uppercase tracking-luxury font-medium text-charcoal hover:bg-charcoal hover:text-ivory transition-all duration-300"
            >
              Explore Complete Portfolio Index
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SERVICES OVERVIEW                                           */}
      {/* ============================================================== */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-ivory">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
              Our Disciplines
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light leading-tight">
              Holistic Interior Architecture & Design
            </h2>
            <p className="text-sm md:text-base text-taupe font-light">
              We guide projects from initial architectural sketches and historical permissions to bespoke furniture fabrication and turnkey styling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceHighlights.map((serv) => {
              const Icon = serv.icon;
              return (
                <Link
                  key={serv.slug}
                  to={`/services#${serv.slug}`}
                  className="group block p-8 md:p-10 bg-beige-100/50 hover:bg-beige-100 border border-beige-300/80 transition-all duration-300 space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full bg-ivory text-charcoal group-hover:text-earth flex items-center justify-center transition-colors shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-taupe group-hover:text-charcoal transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl text-charcoal group-hover:text-earth transition-colors">
                      {serv.title}
                    </h3>
                    <p className="text-xs md:text-sm text-taupe font-light leading-relaxed">
                      {serv.desc}
                    </p>
                  </div>

                  <span className="inline-block text-[11px] uppercase tracking-luxury text-charcoal font-medium border-b border-charcoal/30 group-hover:border-earth pt-2">
                    Explore Discipline
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. DESIGN PHILOSOPHY: LESS, BUT BETTER                         */}
      {/* ============================================================== */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-charcoal text-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Supporting Photograph */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-[4/5] bg-charcoal-300 overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85"
                  alt="Natural travertine and linen materiality"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-xs text-ivory/70 font-light">
                  <p className="font-serif text-base text-ivory">Material Sourcing: Raw Roman Silver Travertine</p>
                  <p>Unfilled, brushed satin surface — Paris Studio Archive</p>
                </div>
              </div>
            </div>

            {/* Explanatory Narrative */}
            <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
              <span className="text-xs uppercase tracking-widest-luxury text-earth block font-semibold">
                Core Manifesto
              </span>

              <h2 className="font-serif text-4xl sm:text-6xl text-white font-light leading-tight">
                Less, But Better.
              </h2>

              <blockquote className="font-serif italic text-xl md:text-2xl text-ivory/90 leading-relaxed border-l-2 border-earth pl-6">
                “Simplicity is not the absence of clutter; that's a consequence of simplicity. Simplicity somehow essentially describes the purpose and place of an object and space.”
              </blockquote>

              <p className="text-sm md:text-base text-ivory/70 font-light leading-relaxed">
                Our design doctrine rejects excessive ornamentation and disposable decor. Instead, we invest in 
                the volumetric qualities that define genuine spatial luxury: generous ceilings, intuitive circulation, 
                and acoustic stillness.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-ivory/10 text-xs">
                <div>
                  <h4 className="text-ivory font-semibold uppercase tracking-wider mb-2">Tactile Permanence</h4>
                  <p className="text-ivory/60 font-light">Materials chosen to age gracefully across generations without losing their intrinsic spirit.</p>
                </div>
                <div>
                  <h4 className="text-ivory font-semibold uppercase tracking-wider mb-2">Circadian Lighting</h4>
                  <p className="text-ivory/60 font-light">Subtle architectural lighting engineered to transition harmoniously from dawn to twilight.</p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury font-medium px-8 py-3.5 bg-earth text-white hover:bg-earth-dark transition-colors"
                >
                  <span>Read the Studio Manifesto</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. PROCESS SECTION (4 STAGES)                                  */}
      {/* ============================================================== */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-ivory">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
              Architectural Methodology
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
              The Four-Stage Design Journey
            </h2>
            <p className="text-sm text-taupe font-light">
              Every commission proceeds through an exacting, transparent architectural cadence to ensure precision from concept to handover.
            </p>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DESIGN_PROCESS_STEPS.map((stage, idx) => (
              <div
                key={stage.step}
                className={`p-8 border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                  activeProcessTab === idx 
                    ? 'bg-beige-100 border-charcoal shadow-md' 
                    : 'bg-ivory border-beige-300 hover:border-earth'
                }`}
                onClick={() => setActiveProcessTab(idx)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-light text-earth">{stage.step}</span>
                    <span className="text-[10px] uppercase tracking-widest text-taupe font-medium px-2 py-0.5 bg-ivory border border-beige-300">
                      {stage.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-charcoal font-medium">
                    {stage.phase}
                  </h3>

                  <p className="text-xs text-taupe font-light leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <ul className="space-y-2 pt-4 border-t border-beige-300/80 text-[11px] text-charcoal/80">
                  {stage.details.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-earth mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. TESTIMONIALS                                                */}
      {/* ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-beige-100/60 border-t border-beige-300">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
                Client Commendations
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
                Voices of Our Patrons
              </h2>
            </div>
            <p className="text-xs text-taupe max-w-sm mt-4 md:mt-0 font-light italic">
              Demonstration testimonials reflecting real client engagements across residential and commercial commissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="p-8 md:p-10 bg-ivory border border-beige-300 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <Quote className="w-8 h-8 text-earth/50" />
                  <p className="font-serif text-lg md:text-xl text-charcoal leading-relaxed italic">
                    “{test.quote}”
                  </p>
                </div>

                <div className="pt-6 border-t border-beige-200 flex items-center space-x-4">
                  {test.avatarUrl && (
                    <img
                      src={test.avatarUrl}
                      alt={test.clientName}
                      className="w-12 h-12 rounded-full object-cover border border-beige-300"
                    />
                  )}
                  <div>
                    <h4 className="font-serif text-base font-semibold text-charcoal">
                      {test.clientName}
                    </h4>
                    <p className="text-[11px] text-taupe uppercase tracking-wider">
                      {test.clientRole} — {test.location}
                    </p>
                    <p className="text-[10px] text-earth font-medium pt-0.5">
                      {test.projectTitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. FINAL CALL TO ACTION                                        */}
      {/* ============================================================== */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-ivory text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
            Begin Your Architectural Commission
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl text-charcoal font-light leading-tight">
            Let's Create Something Beautiful.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-taupe font-light max-w-2xl mx-auto leading-relaxed">
            Whether you are conceptualizing a ground-up coastal villa, restoring a historic European apartment, 
            or commissioning an executive creative atelier, our directorship welcomes your inquiry.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/consultation"
              className="px-10 py-4 bg-charcoal text-ivory text-xs uppercase tracking-luxury font-medium hover:bg-earth transition-all duration-300 shadow-xl"
            >
              Start Your Project
            </Link>
            
            <Link
              to="/contact"
              className="px-10 py-4 border border-charcoal/40 text-charcoal text-xs uppercase tracking-luxury font-medium hover:bg-beige-100 transition-colors"
            >
              Contact Atelier Directorship
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
