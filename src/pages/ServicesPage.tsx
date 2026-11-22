import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  Check, 
  Users, 
  Layers, 
  ArrowUpRight 
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { INITIAL_SERVICES } from '../data/initialData';

export const ServicesPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  return (
    <div className="pt-28 md:pt-36 bg-ivory">
      <SEOHead
        title="Services & Disciplines"
        description="Explore Atelier Élysée's architectural and interior design disciplines: Residential, Commercial, Space Planning, Bespoke Joinery, and Historic Restoration."
      />

      {/* Header */}
      <section className="px-6 md:px-12 pb-20 border-b border-beige-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
            Atelier Capabilities
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-charcoal font-light leading-tight max-w-4xl">
            Tailored Architectural & Interior Solutions.
          </h1>
          <p className="text-base sm:text-lg text-taupe font-light max-w-2xl leading-relaxed">
            From early volumetric analysis and landmark approvals to custom joinery manufacturing 
            and white-glove turnkey installation, we provide bespoke services for projects of distinction.
          </p>
        </div>
      </section>

      {/* Comprehensive Services List with Alternating Editorial Layouts */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-32">
          {INITIAL_SERVICES.map((serv, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={serv.id}
                id={serv.slug}
                className="scroll-mt-36 pt-8 border-t border-beige-300 first:border-t-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  {/* Visual Image Column */}
                  <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="sticky top-28 space-y-4">
                      <div className="aspect-[4/3] bg-beige-200 overflow-hidden shadow-2xl relative group">
                        <img
                          src={serv.image}
                          alt={serv.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-ivory/90 backdrop-blur-sm text-[10px] tracking-widest uppercase font-medium text-charcoal">
                          Discipline 0{index + 1}
                        </div>
                      </div>

                      <div className="p-6 bg-beige-100/70 border border-beige-300 space-y-3">
                        <h4 className="text-xs uppercase tracking-luxury text-charcoal font-semibold flex items-center space-x-2">
                          <Layers className="w-3.5 h-3.5 text-earth" />
                          <span>Key Deliverables</span>
                        </h4>
                        <ul className="text-xs text-taupe space-y-1.5 font-light">
                          {serv.deliverables.map((del, dIdx) => (
                            <li key={dIdx} className="flex items-center space-x-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-earth" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Editorial Details Column */}
                  <div className={`lg:col-span-6 space-y-8 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="space-y-4">
                      <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
                        {serv.subtitle}
                      </span>
                      <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light leading-tight">
                        {serv.title}
                      </h2>
                      <p className="text-base text-charcoal font-normal leading-relaxed">
                        {serv.shortDescription}
                      </p>
                      <p className="text-sm text-taupe font-light leading-relaxed">
                        {serv.fullDescription}
                      </p>
                    </div>

                    {/* What the service includes */}
                    <div className="space-y-4 pt-4 border-t border-beige-300">
                      <h3 className="text-xs uppercase tracking-luxury text-charcoal font-semibold">
                        What the Service Includes:
                      </h3>
                      <ul className="space-y-2.5 text-xs text-taupe font-light">
                        {serv.includes.map((inc, iIdx) => (
                          <li key={iIdx} className="flex items-start space-x-2.5">
                            <Check className="w-4 h-4 text-earth mt-0.5 flex-shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Suitable For */}
                    <div className="space-y-4 pt-4 border-t border-beige-300">
                      <h3 className="text-xs uppercase tracking-luxury text-charcoal font-semibold flex items-center space-x-2">
                        <Users className="w-4 h-4 text-earth" />
                        <span>Ideally Suited For:</span>
                      </h3>
                      <ul className="space-y-2 text-xs text-taupe font-light">
                        {serv.suitableFor.map((suit, sIdx) => (
                          <li key={sIdx} className="flex items-start space-x-2">
                            <span className="text-earth font-bold">—</span>
                            <span>{suit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Consultation Call to Action */}
                    <div className="pt-6">
                      <Link
                        to={`/consultation?service=${encodeURIComponent(serv.title)}`}
                        className="inline-flex items-center space-x-3 px-8 py-3.5 bg-charcoal text-ivory text-xs uppercase tracking-luxury font-medium hover:bg-earth transition-colors group"
                      >
                        <span>Inquire About {serv.title}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Consultation Banner */}
      <section className="py-24 px-6 md:px-12 bg-beige-100/80 border-t border-beige-300 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
            Custom Commissions
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
            Require a hybrid architectural scope?
          </h2>
          <p className="text-sm md:text-base text-taupe font-light">
            Many commissions intertwine architectural historic permissions with bespoke furniture design. 
            We structure our team around your unique spatial brief.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-charcoal text-ivory text-xs uppercase tracking-luxury font-medium hover:bg-earth transition-colors"
            >
              <span>Speak with an Atelier Director</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
