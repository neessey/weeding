import React, { useRef } from 'react';
import { GuestRsvp } from '../types';
import { X, CheckCircle2, Share2, Download, QrCode } from 'lucide-react';

interface VirtualPassModalProps {
  pass: GuestRsvp | null;
  onClose: () => void;
}

export const VirtualPassModal: React.FC<VirtualPassModalProps> = ({ pass, onClose }) => {
  const passRef = useRef<HTMLDivElement>(null);

  if (!pass) return null;

  const handlePrintOrSave = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Bonjour David & Sephora ! Je confirme avec grand plaisir ma présence à votre mariage le 19 Juillet 2025. Mon pass virtuel : ${pass.code} - ${pass.fullName} (${pass.guestsCount} personne${pass.guestsCount > 1 ? 's' : ''}).`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-[#5E1224] border-2 border-[#E8DCC6] rounded-2xl overflow-hidden shadow-2xl text-[#F9F6F0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="px-5 py-3.5 bg-[#3a0814] border-b border-[#E8DCC6]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#E8DCC6]" />
            <span className="text-xs uppercase tracking-widest text-[#E8DCC6] font-semibold">
              Invitation Virtuelle Officielle
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#D3542A] text-[#F9F6F0] flex items-center justify-center transition-colors border border-[#E8DCC6]/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Pass Card Content */}
        <div className="p-6">
          <div 
            ref={passRef}
            className="relative p-6 rounded-xl border border-[#E8DCC6]/60 bg-gradient-to-b from-[#3a0814] via-[#24050d] to-[#3a0814] shadow-inner text-center overflow-hidden"
          >
            {/* Background luxury watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none font-calligraphy text-9xl text-[#E8DCC6]">
              nf
            </div>

            {/* Corner Ornaments */}
            <div className="absolute top-2 left-2 text-[#E8DCC6]/40 text-xs">✦</div>
            <div className="absolute top-2 right-2 text-[#E8DCC6]/40 text-xs">✦</div>
            <div className="absolute bottom-2 left-2 text-[#E8DCC6]/40 text-xs">✦</div>
            <div className="absolute bottom-2 right-2 text-[#E8DCC6]/40 text-xs">✦</div>

            {/* Header */}
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#D3542A] font-semibold">
              Pass d'Accès à la Réception
            </p>
            <h3 className="text-2xl font-calligraphy text-[#E8DCC6] mt-1">
              David & Sephora
            </h3>
            <p className="text-xs font-serif text-[#F9F6F0]/90 italic mt-0.5">
              Samedi 28 Novembre 2026 · Espace Jeckad
            </p>

            {/* Divider */}
            <div className="w-24 h-px bg-[#E8DCC6]/40 mx-auto my-3" />

            {/* Guest Name & Side */}
            <div className="my-3">
              <span className="text-[11px] uppercase tracking-wider text-[#E8DCC6]/70">
                {pass.side === 'mr' ? "Invité(e) d'Honneur de David" : "Invité(e) d'Honneur de Sephora"}
              </span>
              <h4 className="text-xl font-editorial font-bold text-[#F9F6F0] mt-1 tracking-wide">
                {pass.fullName}
              </h4>
              <p className="text-xs text-[#E8DCC6] mt-0.5 font-medium">
                Accès réservé pour : <strong>{pass.guestsCount} personne{pass.guestsCount > 1 ? 's' : ''}</strong>
              </p>
            </div>

            {/* QR Code and verification code */}
            <div className="flex flex-col items-center justify-center my-4 p-3 bg-[#F9F6F0] rounded-lg max-w-[150px] mx-auto shadow-md">
              {/* Synthetic stylized QR Code representation */}
              <div className="w-24 h-24 bg-white p-1 flex items-center justify-center relative">
                <QrCode className="w-full h-full text-[#5E1224]" />
              </div>
              <span className="text-[9px] font-mono tracking-widest text-[#5E1224] font-bold mt-1">
                PASS: {pass.code}
              </span>
            </div>

            <p className="text-[10px] text-[#E8DCC6]/80 italic mt-2">
              "L'accès à la réception se fera sur présentation de cette invitation virtuelle à l'entrée."
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-5 space-y-2.5">
            <button
              onClick={handleShareWhatsApp}
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebd5a] text-white font-medium text-xs flex items-center justify-center gap-2 shadow transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Envoyer confirmation sur WhatsApp</span>
            </button>

            <button
              onClick={handlePrintOrSave}
              className="w-full metallic-btn py-2.5 px-4 rounded-xl text-[#5E1224] font-semibold text-xs flex items-center justify-center gap-2 shadow"
            >
              <Download className="w-4 h-4 text-[#D3542A]" />
              <span>Imprimer ou Enregistrer le Pass</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
