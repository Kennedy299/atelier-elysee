import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { api } from '../services/api';
import { STUDIO_FAQS } from '../data/initialData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceRequired: 'Residential Interior Design',
    estimatedBudget: '€300,000 – €500,000',
    projectLocation: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const budgetTiers = [
    '€150,000 – €300,000',
    '€300,000 – €500,000',
    '€500,000 – €1,000,000',
    '€1,000,000 – €2,500,000',
    '€2,500,000+'
  ];

  const serviceOptions = [
    'Residential Interior Design',
    'Commercial Interior Design',
    'Space Planning & Architecture',
    'Furniture & Curated Styling',
    'Historic & Contemporary Renovation',
    'Advisory & Design Consultation'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all mandatory fields.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await api.submitEnquiry(formData);
      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        serviceRequired: 'Residential Interior Design',
        estimatedBudget: '€300,000 – €500,000',
        projectLocation: '',
        message: ''
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Unable to deliver message. Please contact us directly via email.');
    }
  };

  return (
    <div className="pt-28 md:pt-36 bg-ivory">
      <SEOHead
        title="Contact Directorship"
        description="Initiate a dialogue with Atelier Élysée: Paris & New York studios, project inquiries, and client representation."
      />

      {/* Header */}
      <section className="px-6 md:px-12 pb-16 border-b border-beige-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
            Initiate a Dialogue
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-charcoal font-light leading-tight max-w-4xl">
            Let’s Shape Something Timeless.
          </h1>
          <p className="text-base sm:text-lg text-taupe font-light max-w-2xl leading-relaxed">
            Our atelier accepts a deliberate, limited number of private residential and commercial commissions 
            each calendar year to preserve unwavering attention to detail.
          </p>
        </div>
      </section>

      {/* Contact Form & Studio Details */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
                Commission Inquiry
              </span>
              <h2 className="font-serif text-3xl text-charcoal font-light">
                Directorship Inquiry Form
              </h2>
            </div>

            {status === 'success' ? (
              <div className="p-10 bg-beige-100 border border-earth/40 space-y-4 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-earth" />
                <h3 className="font-serif text-2xl text-charcoal font-medium">
                  Enquiry Successfully Received
                </h3>
                <p className="text-sm text-taupe font-light leading-relaxed">
                  Thank you for entrusting your architectural aspirations to Atelier Élysée. 
                  Our founding directorship reviews all submissions and will respond with our preliminary dossier within 24 to 48 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-xs uppercase tracking-luxury text-charcoal font-semibold underline"
                >
                  Submit Another Project Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Lady Victoria Hastings"
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal placeholder-taupe/50 focus:outline-none focus:border-earth transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. v.hastings@mayfair.co.uk"
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal placeholder-taupe/50 focus:outline-none focus:border-earth transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                      Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +44 20 7946 0912"
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal placeholder-taupe/50 focus:outline-none focus:border-earth transition-colors"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                      Project Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.projectLocation}
                      onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                      placeholder="e.g. Paris 8e, London, Montecito"
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal placeholder-taupe/50 focus:outline-none focus:border-earth transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service Required */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                      Service Required *
                    </label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal focus:outline-none focus:border-earth transition-colors"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Estimated Budget */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                      Estimated Project Budget
                    </label>
                    <select
                      value={formData.estimatedBudget}
                      onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal focus:outline-none focus:border-earth transition-colors"
                    >
                      {budgetTiers.map((tier) => (
                        <option key={tier} value={tier}>{tier}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                    Project Vision & Scope Details *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your property, target completion timeline, architectural aspirations, or specific challenges..."
                    className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal placeholder-taupe/50 focus:outline-none focus:border-earth transition-colors font-light"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-charcoal text-ivory text-xs uppercase tracking-luxury font-medium hover:bg-earth transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 shadow-md"
                >
                  <span>{status === 'submitting' ? 'Submitting Dossier...' : 'Submit Commission Enquiry'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Studio Addresses & Directorship Contacts */}
          <div className="lg:col-span-5 space-y-12">
            <div className="p-8 bg-beige-100/70 border border-beige-300 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block mb-2">
                  Paris Headquarters
                </span>
                <h3 className="font-serif text-2xl text-charcoal">Atelier Place Vendôme</h3>
                <div className="mt-4 space-y-2 text-xs text-taupe font-light">
                  <p className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-earth" />
                    <span>18 Place Vendôme, 75001 Paris, France</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-earth" />
                    <span>+33 1 42 68 50 00</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-earth" />
                    <span>paris@atelier-elysee.com</span>
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-beige-300">
                <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block mb-2">
                  New York Studio
                </span>
                <h3 className="font-serif text-2xl text-charcoal">Tribeca Architectural Loft</h3>
                <div className="mt-4 space-y-2 text-xs text-taupe font-light">
                  <p className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-earth" />
                    <span>142 Franklin Street, Tribeca, New York, NY 10013</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-earth" />
                    <span>+1 212 941 7800</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-earth" />
                    <span>newyork@atelier-elysee.com</span>
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-beige-300 space-y-2">
                <h4 className="text-xs uppercase tracking-luxury text-charcoal font-semibold flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-earth" />
                  <span>Hours of Consultation</span>
                </h4>
                <p className="text-xs text-taupe font-light">
                  Monday to Friday: 09:00 — 18:30 CET / EST<br />
                  Weekends: By private directorship appointment
                </p>
              </div>
            </div>

            {/* Press & Career notice */}
            <div className="p-8 border border-beige-300 space-y-3">
              <h4 className="text-xs uppercase tracking-luxury text-charcoal font-semibold">
                Press & Editorial Inquiries
              </h4>
              <p className="text-xs text-taupe font-light">
                For high-resolution photography assets, monograph features, or architectural commentary:
              </p>
              <a href="mailto:press@atelier-elysee.com" className="text-xs text-earth underline font-medium block">
                press@atelier-elysee.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="py-20 px-6 md:px-12 bg-beige-50 border-t border-beige-300">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
              Inquiry Clarifications
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {STUDIO_FAQS.map((faq, fIdx) => {
              const isOpen = activeFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="bg-ivory border border-beige-300 p-6 transition-all cursor-pointer"
                  onClick={() => setActiveFaq(isOpen ? null : fIdx)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg text-charcoal font-medium">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 text-taupe transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  {isOpen && (
                    <p className="text-xs sm:text-sm text-taupe font-light pt-4 leading-relaxed border-t border-beige-200 mt-4 animate-fade-in">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
