import React from 'react';

interface DiamondDividerProps {
  className?: string;
}

export const DiamondDivider: React.FC<DiamondDividerProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full flex items-center justify-center my-6 overflow-hidden ${className}`}>
      {/* Background Diamond chain image cropped from original */}
      <div className="relative max-w-md w-full px-4 flex items-center justify-center">
        <img
          src="/assets/aistudio/diamond_divider.png"
          alt="Séparateur Diamant"
          className="w-full max-h-12 object-contain"
          onError={(e) => {
            // Elegant CSS fallback if image not found
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Twinkling star sparkle accents on the center diamonds */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-48 h-10 flex items-center justify-center">
            {/* Sparkle 1 */}
            <div className="absolute left-[38%] top-[20%] text-[#E8DCC6] text-sm animate-sparkle-1">
              ✦
            </div>
            {/* Sparkle 2 (center big diamond) */}
            <div className="absolute left-[50%] -top-[10%] text-[#ffffff] text-lg animate-sparkle-2">
              ✧
            </div>
            {/* Sparkle 3 */}
            <div className="absolute left-[62%] top-[30%] text-[#E8DCC6] text-xs animate-sparkle-3">
              ✦
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
