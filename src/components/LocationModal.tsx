import React, { useState } from 'react';
import { VenueInfo } from '../types';
import { MapPin, Navigation, Copy, Check, X, Clock, ExternalLink } from 'lucide-react';

interface LocationModalProps {
  venue: VenueInfo | null;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ venue, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!venue) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${venue.subtitle}, ${venue.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#5E1224] border border-[#E8DCC6]/40 rounded-2xl overflow-hidden shadow-2xl text-[#F9F6F0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with bordeaux and gold accents */}
        <div className="relative px-6 py-5 bg-[#3a0814] border-b border-[#E8DCC6]/20 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D3542A] font-medium">
              Itinéraire & Localisation
            </span>
            <h3 className="text-xl font-editorial font-bold text-[#E8DCC6] tracking-wide mt-0.5">
              {venue.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="w-9 h-9 rounded-full bg-black/30 hover:bg-[#D3542A] text-[#F9F6F0] flex items-center justify-center transition-colors border border-[#E8DCC6]/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Main Venue Name */}
          <div className="bg-[#24050d] p-4 rounded-xl border border-[#E8DCC6]/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D3542A]/20 border border-[#D3542A]/50 flex items-center justify-center shrink-0 mt-0.5 text-[#E8DCC6]">
                <MapPin className="w-5 h-5 text-[#D3542A]" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-[#F9F6F0] font-editorial">
                  {venue.subtitle}
                </h4>
                <p className="text-sm text-[#E8DCC6] mt-0.5">
                  {venue.address}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#E8DCC6]/80 mt-2">
                  <Clock className="w-3.5 h-3.5 text-[#D3542A]" />
                  <span>Heure de convocation : <strong>{venue.time}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive map visual preview / iframe */}
          <div className="relative h-44 w-full rounded-xl overflow-hidden border border-[#E8DCC6]/30 bg-neutral-900">
            <iframe
              title={`Carte ${venue.subtitle}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(venue.mapsQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            />
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] text-[#E8DCC6] border border-[#E8DCC6]/30">
              {venue.location}
            </div>
          </div>

          <p className="text-xs text-[#E8DCC6]/90 text-center italic">
            {venue.details}
          </p>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={venue.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="metallic-btn px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-[#5E1224] font-semibold text-sm shadow-md"
            >
              <Navigation className="w-4 h-4 text-[#D3542A]" />
              <span>Ouvrir Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 ml-auto" />
            </a>

            <button
              onClick={handleCopy}
              className="px-4 py-3 rounded-xl flex items-center justify-center gap-2 bg-[#3a0814] hover:bg-[#24050d] text-[#E8DCC6] border border-[#E8DCC6]/30 font-medium text-sm transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Adresse copiée !</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#E8DCC6]" />
                  <span>Copier l'adresse</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
