/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { VenueInfo, GuestRsvp } from './types';
import { AudioPlayerSection } from './components/AudioPlayerSection';
import { LocationModal } from './components/LocationModal';
import { CountdownSection } from './components/CountdownSection';
import { RsvpModal } from './components/RsvpModal';
import { VirtualPassModal } from './components/VirtualPassModal';
import { weddingAudio } from './utils/audioTheme';
import { QrCode, Volume2, VolumeX, Clock } from 'lucide-react';

export default function App() {
  const [selectedVenue, setSelectedVenue] = useState<VenueInfo | null>(null);
  const [rsvpSide, setRsvpSide] = useState<'mr' | 'mme' | null>(null);
  const [activePass, setActivePass] = useState<GuestRsvp | null>(null);
  const [showPassModal, setShowPassModal] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Load existing saved pass on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('Daniel_Sephora_guest_rsvp');
      if (saved) {
        const parsed = JSON.parse(saved);
        setActivePass(parsed);
      }
    } catch {
      // Ignore localStorage error
    }

    const unsub = weddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsub();
  }, []);

  const venues: Record<string, VenueInfo> = {
    civile: {
      id: 'civile',
      title: 'Cérémonie Civile',
      subtitle: 'MAIRIE DE COCODY',
      time: '10 H 00',
      location: "Abidjan - Côte d'Ivoire",
      address: "Boulevard de France, Cocody, Abidjan, Côte d'Ivoire",
      mapsQuery: 'Mairie de Cocody, Abidjan',
      directionsUrl: 'https://www.google.com/maps/dir/5.4001664,-3.9780352/Mairie+de+Cocody,+Abidjan/@5.3614119,-3.977328,13z/data=!4m10!4m9!1m1!4e1!1m5!1m1!1s0xfc1ebfa2dd25319:0x92a8fbab2dcf732b!2m2!1d-4.0033643!2d5.3329666!3e0?hl=fr&entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D',
      details: "Arrivée recommandée des invités à partir de 09h30 pour la célébration solennelle du mariage civil.",
    },
    nuptiale: {
      id: 'nuptiale',
      title: 'Cérémonie Religieuse',
      subtitle: 'EGLISE ÉVANGÉLIQUE DE RÉVEIL INTERNATIONALE À BONOUMIN',
      time: '13 H 00',
      location: 'Abidjan - Bonoumin',
      address: "Église Évangélique de Réveil Internationale, Bonoumin, Abidjan, Côte d'Ivoire",
      mapsQuery: 'Église Évangélique de Réveil Internationale, Bonoumin, Abidjan',
      directionsUrl: 'https://www.google.com/maps/place/%C3%89glise+%C3%89vang%C3%A9lique+de+R%C3%A9veil+Internationale+-+2+Plateaux/@5.3709432,-4.0048748,17z/data=!3m1!4b1!4m25!1m18!1m14!4m13!1m4!2m2!1d-3.9780352!2d5.4001664!4e1!1m6!1m2!1s0xfc1ebfa2dd25319:0x92a8fbab2dcf732b!2sMairie+de+Cocody,+Abidjan!2m2!1d-4.0033643!2d5.3329666!3e0!2m2!3m1!5e2!3m5!1s0xfc1eb00641e0ac5:0x5bfc3bd9005ebb74!8m2!3d5.3709432!4d-4.0000039!16s%2Fg%2F11ldlwscsv?hl=fr&entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D',
      details: "Arrivée recommandée des invités à partir de 13h00 pour la célébration du mariage religieux.",
    },
  };

  const handleRsvpSuccess = (rsvp: GuestRsvp) => {
    setActivePass(rsvp);
    setRsvpSide(null);
    setShowPassModal(true);
  };

  return (
    <div className="min-h-screen bg-[#24050d] text-[#F9F6F0] relative overflow-x-hidden">
      {/* Ambient background glows with burgundy & orange warmth */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#5E1224]/30 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[400px] bg-[#D3542A]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-[#5E1224]/25 rounded-full blur-[130px]" />
      </div>

      {/* Floating Action Bar : alignée sur la colonne centrale (musique + pass virtuel) */}
      <header className="fixed top-3 sm:top-5 inset-x-0 z-40 pointer-events-none">
        <div className="w-full max-w-[480px] mx-auto px-3 sm:px-8 flex items-center justify-end gap-2">
          {activePass && (
            <button
              onClick={() => setShowPassModal(true)}
              className="pointer-events-auto metallic-btn px-3 py-1.5 rounded-full text-xs font-semibold text-[#5E1224] flex items-center gap-1.5 shadow-lg border border-[#E8DCC6]"
              title="Consulter mon invitation virtuelle"
            >
              <QrCode className="w-3.5 h-3.5 text-[#D3542A]" />
              <span>Pass</span>
            </button>
          )}

          <button
            onClick={() => weddingAudio.toggle()}
            className={`pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border border-[#E8DCC6]/40 ${
              isPlaying
                ? 'bg-[#D3542A] text-white animate-pulse'
                : 'bg-[#5E1224]/90 text-[#E8DCC6] hover:bg-[#5E1224]'
            }`}
            title={isPlaying ? 'Couper la musique' : 'Lancer la musique'}
          >
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-75" />}
          </button>
        </div>
      </header>

      {/* Colonne unique centrée (mobile et desktop) */}
      <main className="relative z-10 w-full max-w-[480px] mx-auto px-0 sm:px-4 py-0 sm:py-6 lg:py-10">
        {/* The Luxury Mobile Invitation Frame */}
        <div className="w-full bg-[#5E1224] rounded-none sm:rounded-[36px] overflow-hidden shadow-2xl border-0 sm:border sm:border-[#E8DCC6]/40 text-[#F9F6F0] relative">

          {/* ================= SECTION 1: HERO PHOTO & MONOGRAM ================= */}
          <section className="relative w-full overflow-hidden">
            {/* Hero Couple Photo */}
            <div className="relative w-full aspect-[453/550] max-h-[580px] overflow-hidden">
              <img
                src="/assets/hero.jpg"
                alt="Daniel et Sephora"
                className="w-full h-full object-cover object-top filter contrast-[1.03]"
              />
              {/* Gentle gradient fade from photo into bordeaux canvas */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#5E1224] via-[#5E1224]/80 to-transparent" />
            </div>

            {/* Monogram "ds" in script calligraphy */}
            <div className="relative text-center -mt-8 mb-2 z-10">
              <span className="font-calligraphy text-5xl sm:text-6xl text-[#E8DCC6] tracking-wider select-none inline-block drop-shadow-md">
                DS
              </span>
            </div>

            {/* Sparkling Diamond Divider */}
            <img
              src="/assets/diamand.png"
              alt="Daniel et Sephora"
              className="w-full h-full object-cover object-top filter contrast-[1.03]"
            />
          </section>

          {/* ================= SECTION 2: AUDIO PLAY & ANNOUNCEMENT ================= */}
          <section className="relative px-6 py-4 bg-[#5E1224] text-center">
            {/* Audio Play Button */}
            <AudioPlayerSection />

            {/* Scripture Verse */}
            <div className="my-8 px-4 max-w-sm mx-auto">
              <p className="text-xs sm:text-sm font-serif font-semibold text-[#E8DCC6] tracking-wide">
                Cantique des cantiques 8:7
              </p>
              <blockquote className="text-xs sm:text-sm font-serif text-[#F9F6F0]/95 italic leading-relaxed mt-1">
                « Les grandes eaux ne sauraient éteindre l'amour, et les fleuves ne le submergeraient pas. »
              </blockquote>
            </div>

            {/* Names in Calligraphy Script */}
            <div className="my-8 space-y-1">
              <div className="font-calligraphy text-5xl sm:text-6xl md:text-7xl text-[#F9F6F0] drop-shadow-md tracking-wide">
                Daniel
              </div>
              <div className="font-calligraphy text-3xl sm:text-4xl text-[#E8DCC6] my-1">
                &
              </div>
              <div className="font-calligraphy text-5xl sm:text-6xl md:text-7xl text-[#F9F6F0] drop-shadow-md tracking-wide">
                Sephora
              </div>
            </div>

            {/* Family Invitation Text */}
            <div className="mt-8 mb-6 space-y-2">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-sans font-medium text-[#E8DCC6]">
                AVEC LEURS FAMILLES
              </p>
              <p className="text-xs sm:text-sm font-serif text-[#F9F6F0]/90 leading-relaxed max-w-xs mx-auto">
                ont l'immense joie de vous convier à la célébration de leur mariage.
              </p>
            </div>
          </section>

          {/* ================= SECTION 3: DATE BLOCK ================= */}
          <section className="relative bg-[#3a0814] border-y border-[#E8DCC6]/40 py-6 px-4">
            <div className="grid grid-cols-3 items-center text-center max-w-md mx-auto divide-x divide-[#E8DCC6]/40">
              {/* Left Column: SAMEDI */}
              <div className="px-2">
                <span className="text-sm sm:text-base font-sans font-bold tracking-widest text-[#F9F6F0]">
                  SAMEDI
                </span>
              </div>

              {/* Center Column: 28 Novembre */}
              <div className="px-2 flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-editorial font-bold text-[#E8DCC6] leading-none">
                  28
                </span>
                <span className="font-calligraphy text-2xl sm:text-3xl text-[#E8DCC6] mt-0.5 leading-tight">
                  Novembre
                </span>
              </div>

              {/* Right Column: 2026 */}
              <div className="px-2">
                <span className="text-lg sm:text-xl font-editorial font-bold tracking-wider text-[#F9F6F0]">
                  2026
                </span>
              </div>
            </div>
          </section>

          {/* ================= SECTION 4: CÉRÉMONIE CIVILE (LIGHT THEME) ================= */}
          <section className="relative px-6 py-12 bokeh-light-bg text-[#5E1224] text-center shadow-inner">
            {/* Title with soft shadow underline */}
            <div className="inline-block relative mb-6">
              <h2 className="text-lg sm:text-xl font-sans tracking-[0.25em] uppercase font-light text-[#5E1224]">
                CÉRÉMONIE CIVILE
              </h2>
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#5E1224]/30 to-transparent mt-1" />
            </div>

            {/* Venue & Location */}
            <div className="space-y-1 mb-6">
              <h3 className="text-xl sm:text-2xl font-editorial font-bold text-[#5E1224] tracking-wide">
                MAIRIE DE COCODY
              </h3>
              <p className="text-sm font-serif text-[#5E1224]/85">
                Abidjan - Côte d'Ivoire
              </p>
            </div>

            {/* Time Badge with Clock Icon */}
            <div className="inline-flex items-center justify-center gap-2.5 my-3 px-4 py-2 bg-white/70 rounded-full border border-[#E8DCC6] shadow-sm">
              <Clock className="w-4 h-4 text-[#D3542A]" />
              <span className="text-base sm:text-lg font-editorial font-bold text-[#5E1224]">
                10 H 00
              </span>
            </div>

            {/* Metallic Localisation Button */}
            <div className="relative inline-flex items-center justify-center my-6 group">
              <button
                onClick={() => window.open(venues.civile.directionsUrl, '_blank', 'noopener,noreferrer')}
                className="metallic-btn px-8 py-3 rounded-full text-sm font-sans font-bold tracking-wider text-[#5E1224] uppercase shadow-lg cursor-pointer"
              >
                LOCALISATION
              </button>
            </div>

            {/* Subtext instruction */}
            <p className="text-[11px] sm:text-xs text-[#5E1224]/80 max-w-xs mx-auto leading-relaxed mt-2 font-sans">
              Cliquez sur le bouton (puis sur itinéraire sur la page qui s'affiche pour suivre l'indication du lieu sur Google maps).
            </p>
          </section>

          {/* ================= SECTION 5: CÉRÉMONIE RELIGIEUSE ================= */}
          <section className="relative px-6 py-12 bg-[#5E1224] text-center overflow-hidden">
            {/* Decorative vine leaf watermark on the left */}
            <div className="absolute left-2 top-8 opacity-20 pointer-events-none text-6xl text-[#E8DCC6]">
              🌿
            </div>

            {/* Title */}
            <div className="inline-block relative mb-6">
              <h2 className="text-lg sm:text-xl font-sans tracking-[0.25em] uppercase font-light text-[#F9F6F0]">
                CÉRÉMONIE RELIGIEUSE
              </h2>
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#E8DCC6]/40 to-transparent mt-1" />
            </div>

            {/* Venue & Location */}
            <div className="space-y-1 mb-6">
              <h3 className="text-xl sm:text-2xl font-editorial font-bold text-[#E8DCC6] tracking-wide">
                Église Évangélique de Réveil Internationale à Bonoumin
              </h3>
              <p className="text-sm font-serif text-[#F9F6F0]/90">
                Abidjan - Bonoumin 
              </p>
            </div>
{/* Heure + Localisation */}
<div className="flex flex-col items-center gap-5 my-6">
  {/* Time Badge */}
  <div className="inline-flex items-center justify-center gap-2.5 px-5 py-2 bg-[#3a0814] rounded-full border border-[#E8DCC6]/40 shadow-sm">
    <Clock className="w-4 h-4 text-[#D3542A]" />
    <span className="text-base sm:text-lg font-editorial font-bold text-[#E8DCC6]">
      13 H 00
    </span>
  </div>

  {/* Localisation Button */}
  <button
    onClick={() => setSelectedVenue(venues.nuptiale)}
    className="metallic-btn w-full max-w-[220px] px-8 py-3 rounded-full text-sm font-sans font-bold tracking-wider text-[#5E1224] uppercase shadow-lg cursor-pointer"
  >
    LOCALISATION
  </button>
</div>

            {/* Subtext instruction */}
            <p className="text-[11px] sm:text-xs text-[#E8DCC6]/80 max-w-xs mx-auto leading-relaxed mt-2 font-sans">
              Cliquez sur le bouton (puis sur itinéraire sur la page qui s'affiche pour suivre l'indication du lieu sur Google maps).
            </p>

            {/* Smiling Couple Photo */}
            <div className="relative w-full max-w-xs mx-auto mt-10 rounded-2xl overflow-hidden shadow-xl border border-[#E8DCC6]/30">
              <img
                src="/assets/couple.jpeg"
                alt="Daniel et Sephora complices"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5E1224] via-transparent to-transparent opacity-60" />
            </div>
          </section>

          {/* Diamond Divider */}
          <img
            src="/assets/diamand.png"
            alt="Daniel et Sephora"
            className="w-full h-full object-cover object-top filter contrast-[1.03]"
          />

          {/* ================= SECTION 7: LIVE COUNTDOWN (LIGHT BOKEH THEME) ================= */}
          <CountdownSection />

          {/* ================= SECTION 8: DRESS CODE ================= */}
          <section className="relative overflow-hidden px-6 py-14 bg-[#5E1224] text-center">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-[#D3542A]/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-[#E8DCC6]/10 blur-3xl" />

            {/* Content */}
            <div className="relative z-10">
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-sans tracking-[0.3em] uppercase font-light text-[#F9F6F0]">
                DRESS CODE
              </h2>

              <p className="text-sm sm:text-base font-serif italic text-[#E8DCC6] mt-3">
                Une touche d'élégance pour célébrer notre amour
              </p>

              {/* Decorative separator */}
              <div className="flex items-center justify-center gap-3 my-7">
                <div className="w-12 h-px bg-[#D3542A]" />
                <div className="w-2 h-2 rotate-45 border border-[#E8DCC6]" />
                <div className="w-12 h-px bg-[#D3542A]" />
              </div>

              {/* Illustration */}
              <div className="relative max-w-xs mx-auto my-8 flex items-center justify-center">
                <img
                  src="/assets/dress_code_transparent.png"
                  alt="Illustration du dress code des mariés"
                  className="w-64 h-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Dress code description */}
              <div className="max-w-sm mx-auto border border-[#E8DCC6]/30 bg-[#F9F6F0]/5 px-5 py-5">
                <p className="font-serif text-sm text-[#F9F6F0] italic mb-4">
                  Nous vous invitons à vous inspirer de cette palette pour composer votre tenue et contribuer à l’harmonie de cette journée
                </p>
                <div className="flex justify-center items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#5E1224] border border-[#E8DCC6]/50 shadow-md" />
                  <div className="w-8 h-8 rounded-full bg-[#D3542A] shadow-md" />
                  <div className="w-8 h-8 rounded-full bg-[#E8DCC6] shadow-md" />
                  <div className="w-8 h-8 rounded-full bg-[#F9F6F0] shadow-md" />
                </div>
              </div>
            </div>
          </section>

          {/* ================= SECTION 9: RSVP & INVITATION CONFIRMATION ================= */}
          <section className="relative px-6 py-12 bg-[#3a0814] text-center border-t border-[#E8DCC6]/30">
            {/* Elegant separator */}
            <div className="w-24 h-1 bg-[#E8DCC6]/40 mx-auto rounded-full mb-8" />

            {/* Instruction Text */}
            <p className="text-xs sm:text-sm font-serif text-[#F9F6F0] leading-relaxed max-w-xs mx-auto mb-8">
              Pour finaliser les derniers détails, veuillez s'il vous plaît, confirmer votre présence en cliquant sur l'un des boutons ci-dessous.
            </p>

            {/* The Two Prominent Confirmation Buttons */}
            <div className="space-y-6 max-w-xs mx-auto">
              {/* Button 1: INVITÉS DE MR */}
              <div className="relative flex items-center justify-center group">
                <button
                  onClick={() => { window.location.href = 'https://tally.so/r/VpGx5J'; }}
                  className="w-full metallic-btn py-3.5 px-6 rounded-full text-sm font-sans font-bold tracking-wider text-[#5E1224] uppercase shadow-xl hover:border-[#D3542A]"
                >
                  INVITÉS DE MR
                </button>
              </div>

              {/* Button 2: INVITÉS DE MME */}
              <div className="relative flex items-center justify-center group">
                <button
                  onClick={() => { window.location.href = 'https://tally.so/r/VpGx5J'; }}
                  className="w-full metallic-btn py-3.5 px-6 rounded-full text-sm font-sans font-bold tracking-wider text-[#5E1224] uppercase shadow-xl hover:border-[#D3542A]"
                >
                  INVITÉS DE MME
                </button>
              </div>
            </div>

            {/* Calligraphy Sign-off */}
            <div className="mt-14 mb-4 text-center">
              <span className="font-calligraphy text-5xl sm:text-6xl text-[#E8DCC6] drop-shadow-md select-none inline-block">
                A bientôt !
              </span>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-6 px-4 bg-[#24050d] text-center border-t border-[#E8DCC6]/20">
            <p className="text-[11px] text-[#E8DCC6]/60 font-sans">
              Mariage Daniel & Sephora · 28 Novembre 2026 · Abidjan, Côte d'Ivoire
            </p>
            <p className="text-[10px] text-[#E8DCC6]/40 mt-1">
              Faire-part & Invitation Numérique Officielle
            </p>
          </footer>

        </div>
      </main>

      {/* Modals */}
      <LocationModal
        venue={selectedVenue}
        onClose={() => setSelectedVenue(null)}
      />

      <RsvpModal
        side={rsvpSide}
        onClose={() => setRsvpSide(null)}
        onSuccess={handleRsvpSuccess}
      />

      <VirtualPassModal
        pass={activePass}
        onClose={() => setShowPassModal(false)}
      />
    </div>
  );
}