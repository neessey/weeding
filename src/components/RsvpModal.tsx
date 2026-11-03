import React, { useState } from 'react';
import { GuestRsvp } from '../types';
import { X, Heart, User, Phone, Users, Check, MessageSquare } from 'lucide-react';

interface RsvpModalProps {
  side: 'mr' | 'mme' | null;
  onClose: () => void;
  onSuccess: (guest: GuestRsvp) => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ side, onClose, onSuccess }) => {
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [attending, setAttending] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!side) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setIsSubmitting(true);

    // Generate custom unique pass code (e.g. NF-MR-7429)
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const passCode = `NF-${side.toUpperCase()}-${randomCode}`;

    const newRsvp: GuestRsvp = {
      id: Date.now().toString(),
      side,
      fullName: fullName.trim(),
      phone: phone.trim(),
      guestsCount: attending ? Number(guestsCount) : 0,
      attending,
      notes: notes.trim(),
      code: passCode,
      createdAt: new Date().toISOString(),
    };

    // Store in localStorage
    try {
      localStorage.setItem('Daniel_Sephora_guest_rsvp', JSON.stringify(newRsvp));
    } catch {
      // ignore storage failure
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(newRsvp);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#5E1224] border-2 border-[#E8DCC6]/60 rounded-2xl overflow-hidden shadow-2xl text-[#F9F6F0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#3a0814] border-b border-[#E8DCC6]/20 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D3542A] font-semibold">
              Confirmation de Présence
            </span>
            <h3 className="text-lg font-editorial font-bold text-[#E8DCC6] tracking-wide mt-0.5">
              {side === 'mr' ? 'Invités de M. Daniel' : 'Invités de Mme Sephora'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-full bg-black/30 hover:bg-[#D3542A] text-[#F9F6F0] flex items-center justify-center transition-colors border border-[#E8DCC6]/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-[#E8DCC6]/90">
            Merci de renseigner vos informations pour recevoir votre invitation virtuelle officielle pour l'accès à la réception.
          </p>

          {/* Attending toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-[#24050d] rounded-xl border border-[#E8DCC6]/20">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                attending
                  ? 'bg-[#E8DCC6] text-[#5E1224] shadow font-bold'
                  : 'text-[#E8DCC6] hover:text-white'
              }`}
            >
              ✓ Je serai présent(e)
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                !attending
                  ? 'bg-[#D3542A] text-white shadow font-bold'
                  : 'text-[#E8DCC6] hover:text-white'
              }`}
            >
              ✕ Empêché(e)
            </button>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-[#E8DCC6] mb-1">
              Nom et Prénom <span className="text-[#D3542A]">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-[#E8DCC6]/50" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex : M. & Mme Kouassi Jean"
                className="w-full pl-9 pr-3 py-2 bg-[#24050d] border border-[#E8DCC6]/30 rounded-xl text-sm text-[#F9F6F0] placeholder-[#E8DCC6]/30 focus:outline-none focus:border-[#D3542A]"
              />
            </div>
          </div>

          

          {/* Guest Count (if attending) */}
          {attending && (
            <div>
              <label className="block text-xs font-medium text-[#E8DCC6] mb-1">
                Nombre de personnes conviées
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-2.5 w-4 h-4 text-[#E8DCC6]/50" />
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 bg-[#24050d] border border-[#E8DCC6]/30 rounded-xl text-sm text-[#F9F6F0] focus:outline-none focus:border-[#D3542A]"
                >
                  <option value={1} className="bg-[#24050d] text-[#F9F6F0]">1 personne</option>
                  <option value={2} className="bg-[#24050d] text-[#F9F6F0]">2 personnes (Couple)</option>
                  <option value={3} className="bg-[#24050d] text-[#F9F6F0]">3 personnes</option>
                  <option value={4} className="bg-[#24050d] text-[#F9F6F0]">4 personnes (Famille)</option>
                </select>
              </div>
            </div>
          )}

          {/* Sweet note / wishes */}
          <div>
            <label className="block text-xs font-medium text-[#E8DCC6] mb-1">
              Mot doux ou vœux pour Daniel & Sephora (Optionnel)
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-2.5 w-4 h-4 text-[#E8DCC6]/50" />
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Un vœu de bonheur pour les mariés..."
                className="w-full pl-9 pr-3 py-2 bg-[#24050d] border border-[#E8DCC6]/30 rounded-xl text-sm text-[#F9F6F0] placeholder-[#E8DCC6]/30 focus:outline-none focus:border-[#D3542A] resize-none"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !fullName.trim()}
              className="w-full metallic-btn py-3 px-4 rounded-xl text-[#5E1224] font-bold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Génération du Pass en cours...</span>
              ) : (
                <>
                  <Check className="w-4 h-4 text-[#D3542A]" />
                  <span>Confirmer & Obtenir mon Invitation Virtuelle</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
