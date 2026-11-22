import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Journal', path: '/journal' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-ivory/95 backdrop-blur-md border-b border-beige-300/80 shadow-sm ${
          isScrolled ? 'py-3.5' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand Wordmark */}
          <Link to="/" className="group flex flex-col">
            <span className="font-serif text-2xl md:text-3xl tracking-widest text-[#121110] font-semibold uppercase transition-colors group-hover:text-earth">
              Atelier Élysée
            </span>
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#4A4742] font-semibold transition-colors group-hover:text-[#121110]">
              Architecture & Interiors — Kenya
            </span>
          </Link>

          {/* Desktop Navigation Links - Darker black with high-contrast visibility */}
          <nav className="hidden lg:flex items-center space-x-10 text-xs uppercase tracking-luxury font-semibold text-[#121110]">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 transition-colors duration-200 hover:text-earth ${
                    active ? 'text-earth font-bold' : 'text-[#121110] hover:text-earth'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-earth animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/consultation"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury font-semibold px-5 py-2.5 border-2 border-[#121110] text-[#121110] hover:bg-[#121110] hover:text-ivory transition-all duration-300 group shadow-sm"
            >
              <span>Book a Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#121110] hover:text-earth transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-ivory/98 backdrop-blur-xl transition-all duration-500 lg:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col space-y-6">
          <p className="text-[11px] tracking-widest-luxury uppercase text-taupe border-b border-beige pb-3">
            Navigation Directory
          </p>
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`font-serif text-3xl transition-colors duration-300 ${
                  active ? 'text-earth italic font-normal' : 'text-[#121110] font-medium hover:text-earth'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="pt-8 border-t border-beige space-y-6">
          <Link
            to="/consultation"
            className="w-full text-center block text-xs uppercase tracking-luxury font-medium py-4 bg-charcoal text-ivory hover:bg-earth transition-colors"
          >
            Book a Consultation
          </Link>

          <div className="grid grid-cols-2 gap-4 text-xs text-taupe pt-2">
            <div>
              <p className="font-semibold text-charcoal mb-1">Nairobi Atelier</p>
              <p>Karen Road, Karen</p>
              <p>+254 110 413 132</p>
            </div>
            <div>
              <p className="font-semibold text-charcoal mb-1">Coast Studio</p>
              <p>Shela, Lamu Island</p>
              <p>WhatsApp: 0110413132</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
