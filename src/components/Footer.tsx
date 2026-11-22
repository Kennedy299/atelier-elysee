import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const res = await api.subscribeNewsletter(email, 'footer_newsletter');
      setStatus('success');
      setMessage(res.message || 'Thank you for subscribing to our private journal.');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Subscription unsuccessful. Please try again.');
    }
  };

  return (
    <footer className="bg-charcoal text-ivory/80 pt-24 pb-12 border-t border-charcoal-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Section: Brand Statement & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-ivory/10">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-serif text-3xl md:text-4xl text-ivory tracking-widest uppercase block">
              Atelier Élysée
            </span>
            <p className="text-sm md:text-base text-ivory/70 max-w-lg font-light leading-relaxed">
              An international interior architecture and design atelier rooted in Parisian restraint. 
              We craft enduring sanctuaries for discerning private clients, cultural institutions, and luxury brands worldwide.
            </p>
            <div className="flex items-center space-x-6 text-xs uppercase tracking-luxury text-taupe pt-2">
              <span>Paris</span>
              <span className="w-1.5 h-1.5 rounded-full bg-earth" />
              <span>New York</span>
              <span className="w-1.5 h-1.5 rounded-full bg-earth" />
              <span>Geneva</span>
              <span className="w-1.5 h-1.5 rounded-full bg-earth" />
              <span>London</span>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-12 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest-luxury text-earth block font-semibold">
                Private Journal Dispatch
              </span>
              <h3 className="font-serif text-2xl text-ivory font-light">
                Subscribe to our curated reflections on materiality and space.
              </h3>
              <p className="text-xs text-ivory/60 font-light leading-relaxed">
                Receive our quarterly architectural monograph, invitations to private salon viewings, and tactile material studies.
              </p>

              <form onSubmit={handleSubscribe} className="pt-2">
                <div className="flex items-center border-b border-ivory/30 focus-within:border-earth transition-colors pb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-transparent text-sm text-ivory placeholder-ivory/40 focus:outline-none w-full py-1 font-light"
                    disabled={status === 'loading'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="text-ivory hover:text-earth transition-colors p-2 text-xs uppercase tracking-luxury flex items-center space-x-1 font-medium disabled:opacity-50"
                  >
                    <span>{status === 'loading' ? 'Subscribing...' : 'Join'}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>

                {status === 'success' && (
                  <p className="text-xs text-earth flex items-center mt-2 space-x-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>{message}</span>
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-xs text-red-400 flex items-center mt-2 space-x-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{message}</span>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Middle Section: Navigation, Studios & Socials */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-ivory/10 text-xs">
          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="uppercase tracking-widest-luxury text-ivory font-semibold text-[11px]">
              Studio Directory
            </h4>
            <ul className="space-y-2.5 text-ivory/70 font-light">
              <li><Link to="/" className="hover:text-earth transition-colors">Home Experience</Link></li>
              <li><Link to="/about" className="hover:text-earth transition-colors">About the Studio</Link></li>
              <li><Link to="/services" className="hover:text-earth transition-colors">Architectural Services</Link></li>
              <li><Link to="/projects" className="hover:text-earth transition-colors">Selected Works</Link></li>
              <li><Link to="/journal" className="hover:text-earth transition-colors">Editorial Journal</Link></li>
              <li><Link to="/consultation" className="hover:text-earth transition-colors">Book Consultation</Link></li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-4">
            <h4 className="uppercase tracking-widest-luxury text-ivory font-semibold text-[11px]">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-ivory/70 font-light">
              <li><Link to="/services#residential" className="hover:text-earth transition-colors">Private Residences</Link></li>
              <li><Link to="/services#commercial" className="hover:text-earth transition-colors">Flagship & Ateliers</Link></li>
              <li><Link to="/services#spatial" className="hover:text-earth transition-colors">Spatial Optimization</Link></li>
              <li><Link to="/services#furniture" className="hover:text-earth transition-colors">Bespoke Joinery</Link></li>
              <li><Link to="/services#renovation" className="hover:text-earth transition-colors">Heritage Restoration</Link></li>
              <li><Link to="/services#advisory" className="hover:text-earth transition-colors">Principal Advisory</Link></li>
            </ul>
          </div>

          {/* Studios */}
          <div className="space-y-4">
            <h4 className="uppercase tracking-widest-luxury text-ivory font-semibold text-[11px]">
              Atelier Addresses
            </h4>
            <div className="space-y-3 text-ivory/70 font-light">
              <div>
                <p className="text-ivory font-medium">Paris Atelier</p>
                <p>18 Place Vendôme</p>
                <p>75001 Paris, France</p>
                <p className="text-taupe pt-1">+33 1 42 68 50 00</p>
              </div>
              <div>
                <p className="text-ivory font-medium">New York Studio</p>
                <p>142 Franklin Street</p>
                <p>Tribeca, NY 10013, USA</p>
                <p className="text-taupe pt-1">+1 212 941 7800</p>
              </div>
            </div>
          </div>

          {/* Inquiries & Directorship */}
          <div className="space-y-4">
            <h4 className="uppercase tracking-widest-luxury text-ivory font-semibold text-[11px]">
              Commissions
            </h4>
            <div className="space-y-3 text-ivory/70 font-light">
              <p>
                Direct client commissions and press relations:
              </p>
              <a 
                href="mailto:contact@atelier-elysee.com" 
                className="text-earth hover:underline block font-medium"
              >
                contact@atelier-elysee.com
              </a>
              <p className="text-taupe pt-1">
                Mon – Fri: 09:00 – 18:30 CET<br />
                Saturday by private appointment
              </p>
              <div className="pt-2 flex items-center space-x-4 text-ivory/80">
                <a href="#instagram" className="hover:text-earth transition-colors">Instagram</a>
                <a href="#pinterest" className="hover:text-earth transition-colors">Pinterest</a>
                <a href="#linkedin" className="hover:text-earth transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin link */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-ivory/40 font-light space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} ATELIER ÉLYSÉE. All rights reserved. Registered Interior Architecture Studio.</p>
          
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-ivory/70 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-ivory/70 transition-colors">Terms of Commission</Link>
            <Link 
              to="/admin/login" 
              className="text-taupe hover:text-earth transition-colors flex items-center space-x-1"
            >
              <span>Atelier Access</span>
              <span className="text-[10px]">🔒</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
