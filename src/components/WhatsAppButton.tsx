import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = "https://wa.me/254110413132?text=Hello%20Atelier%20Élysée%20Kenya,%20I%20would%20like%20to%20inquire%20about%20an%20architectural%20consultation.";

  return (
    <aside aria-label="WhatsApp Consultation" className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center space-x-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 group border border-emerald-400/40"
        title="Chat on WhatsApp with Atelier Élysée: 0110413132"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs uppercase tracking-luxury font-bold pr-1 hidden sm:inline-block">
          WhatsApp: 0110413132
        </span>
      </a>
    </aside>
  );
};
