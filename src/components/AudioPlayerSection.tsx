import React, { useEffect, useState } from 'react';
import { weddingAudio } from '../utils/audioTheme';
import { Play, Pause } from 'lucide-react';

export const AudioPlayerSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe(setIsPlaying);
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-6 z-10">
      <button
        type="button"
        onClick={() => weddingAudio.toggle()}
        aria-label={isPlaying ? 'Mettre en pause' : 'Lancer la musique'}
        className="w-16 h-16 rounded-full bg-[#F9F6F0] text-[#5E1224] flex items-center justify-center shadow-lg border-2 border-[#E8DCC6] transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <Pause className="w-7 h-7 fill-[#5E1224] text-[#5E1224]" />
        ) : (
          <Play className="w-7 h-7 fill-[#5E1224] text-[#5E1224] translate-x-0.5" />
        )}
      </button>

      <p className="mt-3 text-xs sm:text-sm tracking-wide text-[#E8DCC6] font-medium font-sans">
        {isPlaying ? 'Appuyez pour mettre en pause' : 'Appuyez sur play'}
      </p>
    </div>
  );
};