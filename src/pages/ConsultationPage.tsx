import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  Building,
  Laptop,
  Compass,
  MessageCircle,
  Mail,
  Phone
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { api } from '../services/api';
import { ConsultationType, ConsultationBooking } from '../types';

export const ConsultationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service');

  const consultationTypes: {
    type: ConsultationType;
    duration: string;
    fee: string;
    desc: string;
    icon: any;
  }[] = [
    {
      type: 'In-Studio Architectural Discovery',
      duration: '90 Minutes',
      fee: 'Karen Studio / Complimentary for Qualified Commissions',
      desc: 'In-person meeting at our Karen Atelier (Nairobi). We review architectural floor plans, topographic surveys, and tactile Kenyan stone samples.',
      icon: Compass
    },
    {
      type: 'Virtual Design Advisory',
      duration: '60 Minutes',
      fee: 'Worldwide & Regional Video Session',
      desc: 'High-level architectural counsel for diaspora patrons and international investors prior to land acquisition or contractor tendering in Kenya.',
      icon: Laptop
    },
    {
      type: 'On-Site Private Residence Audit',
      duration: 'Half-Day Engagement',
      fee: 'Kenya-wide On-Site Evaluation',
      desc: 'Our founding principals travel to your parcel (Karen, Muthaiga, Naivasha, Lamu, Watamu, Vipingo) to audit natural breezes, daylight, and soil topography.',
      icon: Building
    },
    {
      type: 'Commercial Spatial Strategy',
      duration: '120 Minutes',
      fee: 'Corporate & Diplomatic Advisory',
      desc: 'Strategic volumetric workshop focused on executive privacy, customer circulation, and brand prestige for Nairobi headquarters.',
      icon: Sparkles
    }
  ];

  const budgetTiers = [
    'KES 5,000,000 – KES 15,000,000',
    'KES 15,000,000 – KES 30,000,000',
    'KES 30,000,000 – KES 60,000,000',
    'KES 60,000,000 – KES 120,000,000',
    'KES 120,000,000+'
  ];

  const [selectedType, setSelectedType] = useState<ConsultationType>(consultationTypes[0].type);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectScope, setProjectScope] = useState(
    preselectedService ? `Inquiring specifically regarding ${preselectedService}.` : ''
  );
  const [estimatedBudget, setEstimatedBudget] = useState(budgetTiers[1]);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'confirmed' | 'error'>('idle');
  const [confirmationData, setConfirmationData] = useState<ConsultationBooking | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const timeSlots = ['10:00', '11:30', '14:00', '15:30', '17:00'];

  const directWhatsAppUrl = `https://wa.me/254110413132?text=${encodeURIComponent(
    'Hello Atelier Élysée Kenya, I would like to book an architectural consultation for my project.'
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferredDate || !fullName.trim() || !email.trim() || !phone.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required scheduling details.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await api.bookConsultation({
        consultationType: selectedType,
        preferredDate,
        preferredTime,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        projectLocation: projectLocation || 'Nairobi, Kenya',
        projectScope: projectScope.trim(),
        estimatedBudget
      });
      setConfirmationData(res.booking);
      setStatus('confirmed');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Consultation booking could not be scheduled. Please reach out directly.');
    }
  };

  return (
    <div className="pt-28 md:pt-36 bg-ivory">
      <SEOHead
        title="Book a Consultation in Kenya"
        description="Schedule a private interior architecture consultation in Kenya with Atelier Élysée: Karen Studio, Virtual Advisory, or On-Site Private Residence Audit. Direct WhatsApp: 0110413132."
      />

      {/* Header */}
      <section className="px-6 md:px-12 pb-16 border-b border-beige-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center space-x-3 text-xs uppercase tracking-widest-luxury text-earth font-semibold">
            <span>Nairobi & Coast Atelier</span>
            <span>•</span>
            <span>Kenya Appointments</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-charcoal font-light leading-tight max-w-4xl">
            Book an Architectural Consultation.
          </h1>
          <p className="text-base sm:text-lg text-taupe font-light max-w-2xl leading-relaxed">
            Reserve dedicated time with our principals to explore spatial solutions, review floor plans in Karen, Muthaiga, 
            Naivasha, or the coast, or formulate an initial project feasibility brief.
          </p>

          {/* Quick WhatsApp Action Banner */}
          <div className="pt-4">
            <div className="inline-flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-emerald-950 text-white border border-emerald-800 shadow-md max-w-3xl w-full">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white font-medium">Instant Consultation via WhatsApp</h3>
                  <p className="text-xs text-emerald-200/90 font-light">
                    Direct line to studio principal: <strong className="text-white font-semibold">0110413132</strong> (+254 110 413 132)
                  </p>
                </div>
              </div>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs uppercase tracking-luxury font-bold transition-colors flex items-center space-x-2 shadow-sm flex-shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form or Confirmation View */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {status === 'confirmed' && confirmationData ? (
            <div className="p-10 md:p-14 bg-beige-100 border border-beige-300 shadow-xl space-y-8 animate-fade-in">
              <div className="flex items-center space-x-3 text-earth">
                <CheckCircle2 className="w-8 h-8" />
                <span className="text-xs uppercase tracking-widest-luxury font-semibold">
                  Appointment Confirmed
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
                  Your Consultation Dossier is Reserved
                </h2>
                <p className="text-sm text-taupe font-light leading-relaxed">
                  Thank you, <strong className="text-charcoal font-medium">{confirmationData.fullName}</strong>. 
                  We have registered your session on our directorship schedule in Kenya. An executive alert has been 
                  dispatched to our directorship at <strong className="text-charcoal font-medium">eddykens309@gmail.com</strong>.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-6 bg-ivory border border-beige-300 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-beige-200 pb-3">
                  <span className="text-taupe uppercase tracking-wider">Atelier Reference</span>
                  <span className="font-mono font-bold text-earth text-sm">{confirmationData.referenceCode}</span>
                </div>
                <div className="flex items-center justify-between border-b border-beige-200 pb-3">
                  <span className="text-taupe uppercase tracking-wider">Consultation Type</span>
                  <span className="font-serif text-sm text-charcoal">{confirmationData.consultationType}</span>
                </div>
                <div className="flex items-center justify-between border-b border-beige-200 pb-3">
                  <span className="text-taupe uppercase tracking-wider">Preferred Date & Time</span>
                  <span className="text-charcoal font-medium">{confirmationData.preferredDate} at {confirmationData.preferredTime}</span>
                </div>
                <div className="flex items-center justify-between border-b border-beige-200 pb-3">
                  <span className="text-taupe uppercase tracking-wider">Location Target</span>
                  <span className="text-charcoal">{confirmationData.projectLocation}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-taupe uppercase tracking-wider">Directorship Notification</span>
                  <span className="text-earth font-medium flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Dispatched to eddykens309@gmail.com</span>
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Confirmation Button */}
              <div className="p-5 bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-luxury text-emerald-900 font-bold flex items-center space-x-1.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />
                    <span>Connect Immediately via WhatsApp (0110413132)</span>
                  </p>
                  <p className="text-xs text-emerald-800/80 font-light">
                    Send your booking reference <strong className="font-mono font-bold">{confirmationData.referenceCode}</strong> directly to our WhatsApp line for immediate scheduling.
                  </p>
                </div>

                <a
                  href={`https://wa.me/254110413132?text=${encodeURIComponent(
                    `Hello Atelier Élysée Kenya, I have booked consultation ${confirmationData.referenceCode} for ${confirmationData.fullName} regarding ${confirmationData.projectLocation}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-luxury font-bold transition-colors flex items-center space-x-2 flex-shrink-0 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Open WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <Link
                  to="/"
                  className="px-8 py-3.5 bg-charcoal text-ivory text-xs uppercase tracking-luxury font-medium hover:bg-earth transition-colors"
                >
                  Return to Home
                </Link>
                <Link
                  to="/projects"
                  className="px-8 py-3.5 border border-charcoal/40 text-charcoal text-xs uppercase tracking-luxury font-medium hover:bg-beige-200 transition-colors"
                >
                  Explore Kenya Projects
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Select Consultation Type */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
                    Step 01
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal">
                    Select Consultation Format
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {consultationTypes.map((item) => {
                    const isSelected = selectedType === item.type;
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.type}
                        onClick={() => setSelectedType(item.type)}
                        className={`p-6 border transition-all cursor-pointer space-y-4 ${
                          isSelected
                            ? 'bg-beige-100 border-charcoal shadow-sm'
                            : 'bg-ivory border-beige-300 hover:border-earth'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-charcoal' : 'text-taupe'}`} />
                          <span className="text-[10px] uppercase tracking-widest text-earth font-semibold">
                            {item.duration}
                          </span>
                        </div>
                        <h3 className="font-serif text-xl text-charcoal font-medium">
                          {item.type}
                        </h3>
                        <p className="text-xs text-taupe font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Preferred Schedule */}
              <div className="space-y-6 pt-6 border-t border-beige-300">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
                    Step 02
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal">
                    Preferred Date & Time Slot
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                      Target Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal focus:outline-none focus:border-earth transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal focus:outline-none focus:border-earth transition-colors"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot} (East Africa Time / EAT)</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Patron Contact & Project Details */}
              <div className="space-y-6 pt-6 border-t border-beige-300">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
                    Step 03
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal">
                    Patron Details & Kenya Location
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dr. James Kariuki"
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal placeholder-taupe/50 focus:outline-none focus:border-earth transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. j.kariuki@gmail.com"
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal placeholder-taupe/50 focus:outline-none focus:border-earth transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                      Phone Number (WhatsApp Preferred) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0712345678 or +254..."
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal placeholder-taupe/50 focus:outline-none focus:border-earth transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                      Project Location in Kenya
                    </label>
                    <input
                      type="text"
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      placeholder="e.g. Karen, Muthaiga, Naivasha, Lamu, Watamu"
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal placeholder-taupe/50 focus:outline-none focus:border-earth transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                    Estimated Architectural Budget (KES)
                  </label>
                  <select
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal focus:outline-none focus:border-earth transition-colors"
                  >
                    {budgetTiers.map((tier) => (
                      <option key={tier} value={tier}>{tier}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-luxury text-charcoal font-medium block">
                    Brief Spatial Outline
                  </label>
                  <textarea
                    rows={4}
                    value={projectScope}
                    onChange={(e) => setProjectScope(e.target.value)}
                    placeholder="Tell us about the property topography, architectural vision, or desired timeline..."
                    className="w-full px-4 py-3 bg-beige-50 border border-beige-300 text-sm text-charcoal placeholder-taupe/50 focus:outline-none focus:border-earth transition-colors font-light"
                  />
                </div>
              </div>

              {/* Submit CTA & WhatsApp Quick Access */}
              <div className="space-y-4 pt-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-charcoal text-ivory text-xs uppercase tracking-luxury font-medium hover:bg-earth transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg"
                >
                  <span>{status === 'submitting' ? 'Confirming Appointment...' : 'Submit Consultation Request'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <div className="text-center">
                  <span className="text-xs text-taupe block mb-2 font-light">Prefer direct messaging?</span>
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury font-bold text-emerald-800 hover:text-emerald-950 underline"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />
                    <span>Click to message 0110413132 directly on WhatsApp</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
