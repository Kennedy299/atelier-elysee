import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Compass, Feather, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { STUDIO_TEAM, STUDIO_VALUES } from '../data/initialData';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 md:pt-36 bg-ivory">
      <SEOHead
        title="About the Studio"
        description="Learn about Atelier Élysée: our Paris heritage, design philosophy, founding principals, and architectural values."
      />

      {/* Hero Header */}
      <section className="px-6 md:px-12 pb-20 border-b border-beige-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
            The Studio Story
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-charcoal font-light leading-tight max-w-4xl">
            A devotion to spatial stillness, honest materiality, and quiet luxury.
          </h1>
          <p className="text-base sm:text-lg text-taupe font-light max-w-2xl leading-relaxed">
            Founded with the conviction that architecture should elevate human life through calm and permanence, 
            Atelier Élysée conceives spaces that honor provenance while embracing modern life.
          </p>
        </div>
      </section>

      {/* Narrative & Visual Storytelling */}
      <section className="py-24 px-6 md:px-12 bg-ivory">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
                Provenance & Vision
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
                Rooted in Paris, Dialoguing with the World
              </h2>
              <p className="text-sm md:text-base text-taupe font-light leading-relaxed">
                Established on Place Vendôme in Paris, Atelier Élysée emerged from a shared frustration with disposable 
                design cycles and repetitive decorative formulas. We observed that while trends come and go with blinding speed, 
                interiors crafted from authentic natural materials and rigorous geometric proportions retain an unshakeable poise.
              </p>
              <p className="text-sm md:text-base text-taupe font-light leading-relaxed">
                Today, our studio operates between Paris and New York, delivering turnkey residential sanctuaries, 
                cultural foundations, and flagship commercial spaces. Each project represents an intimate partnership 
                between our design team, master European artisans, and our visionary patrons.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] bg-beige-200 overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
                  alt="Architectural detailing at Atelier Élysée"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-ivory/90 backdrop-blur-sm px-4 py-2 text-[11px] text-charcoal">
                  Paris Atelier — Material Research & Prototype Room
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="p-10 bg-beige-100/60 border border-beige-300 space-y-4">
              <div className="w-10 h-10 rounded-full bg-earth text-white flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal font-medium">Our Mission</h3>
              <p className="text-sm text-taupe font-light leading-relaxed">
                To liberate interior environments from superficial decoration by sculpting luminous, tactile spaces 
                that foster tranquility, inspire reflection, and welcome the noble patina of time.
              </p>
            </div>

            <div className="p-10 bg-beige-100/60 border border-beige-300 space-y-4">
              <div className="w-10 h-10 rounded-full bg-earth text-white flex items-center justify-center">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal font-medium">Our Vision</h3>
              <p className="text-sm text-taupe font-light leading-relaxed">
                To be the foremost international interior architecture atelier championing rare European artisanal craft, 
                environmental circularity, and timeless architectural restraint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Design Values */}
      <section className="py-24 px-6 md:px-12 bg-beige-100/70 border-y border-beige-300">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
              Guiding Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
              Our Core Design Values
            </h2>
            <p className="text-sm text-taupe font-light">
              Every floor plan, custom joinery detail, and stone selection is governed by four uncompromising tenets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STUDIO_VALUES.map((val, idx) => (
              <div key={idx} className="p-8 bg-ivory border border-beige-300 space-y-4 shadow-sm">
                <span className="font-serif text-3xl text-earth/60 font-light block">0{idx + 1}</span>
                <h3 className="font-serif text-2xl text-charcoal font-medium">{val.title}</h3>
                <p className="text-xs text-taupe font-light leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Profiles */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-ivory">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-beige-300 pb-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
                Leadership & Vision
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
                The Creative Directorship
              </h2>
            </div>
            <p className="text-xs text-taupe max-w-sm mt-4 md:mt-0 font-light">
              A multidisciplinary collective of architects, interior designers, master joiners, and stone conservators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STUDIO_TEAM.map((member) => (
              <div key={member.id} className="group space-y-5">
                <div className="relative aspect-[3/4] overflow-hidden bg-beige-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-charcoal group-hover:text-earth transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs uppercase tracking-luxury text-earth font-medium">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-taupe/80 tracking-wide font-light">
                    {member.credentials}
                  </p>
                  <p className="text-xs text-taupe font-light pt-2 leading-relaxed">
                    {member.bio}
                  </p>
                  {member.quote && (
                    <p className="text-xs italic text-charcoal/70 border-l border-earth pl-3 pt-1">
                      “{member.quote}”
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accolades & Press Mentions */}
      <section className="py-20 px-6 md:px-12 bg-beige-50 border-t border-beige-300">
        <div className="max-w-7xl mx-auto text-center space-y-10">
          <span className="text-xs uppercase tracking-widest-luxury text-taupe font-semibold block">
            Featured In & Recognized By
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-charcoal/60 font-serif text-xl sm:text-2xl tracking-widest uppercase">
            <span className="hover:text-charcoal transition-colors">Architectural Digest</span>
            <span className="hover:text-charcoal transition-colors">Elle Décoration</span>
            <span className="hover:text-charcoal transition-colors">The World of Interiors</span>
            <span className="hover:text-charcoal transition-colors">Wallpaper* Magazine</span>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-24 px-6 md:px-12 bg-charcoal text-ivory text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-serif text-4xl sm:text-5xl font-light">
            Commission a Private Consultation
          </h2>
          <p className="text-sm md:text-base text-ivory/70 font-light">
            Discuss your property, prospective acquisition, or creative commercial space with our founding principals.
          </p>
          <div>
            <Link
              to="/consultation"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-earth text-white text-xs uppercase tracking-luxury font-medium hover:bg-earth-dark transition-colors"
            >
              <span>Schedule Atelier Appointment</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
