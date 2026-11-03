import React, { useEffect, useState } from 'react';
import { Calendar, Download } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC = () => {
// Wedding Date: November 28, 2026 at 13:00 (Abidjan time, GMT+0)
const targetDate = new Date('2026-11-28T13:00:00Z').getTime();
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isPast: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const padZero = (n: number) => n.toString().padStart(2, '0');

 const handleAddToGoogleCalendar = () => {
  const title = encodeURIComponent('Mariage David & Sephora');

  const details = encodeURIComponent(
    'Célébration du mariage de David & Sephora.\n- 13h00 : Cérémonie Civile à la Mairie de Cocody\n- 14h30 : Bénédiction Nuptiale à la Cathédrale Saint-Paul du Plateau\n- 19h00 : Dîner de Réception à l’Espace Jeckad (Angré 7e Tranche)'
  );

  const location = encodeURIComponent(
    'Abidjan, Côte d’Ivoire'
  );

  const dates = '20261128T130000Z/20261129T020000Z';

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;

  window.open(url, '_blank');
};

 const handleDownloadIcs = () => {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//David and Sephora//Wedding Invitation//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:mariage-David-Sephora-2026@wedding.invitation',
    'DTSTAMP:20261103T000000Z',
    'DTSTART:20261128T130000Z',
    'DTEND:20261129T020000Z',
    'SUMMARY:Mariage de David & Sephora',
    'DESCRIPTION:Célébration du mariage de David & Sephora à Abidjan.\\n- 13h00 : Mairie de Cocody\\n- 14h30 : Cathédrale Saint-Paul\\n- 19h00 : Espace Jeckad',
    'LOCATION:Abidjan, Côte d’Ivoire',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], {
    type: 'text/calendar;charset=utf-8',
  });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'mariage-David-Sephora-2026.ics');

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(link.href);
};

  return (
    <div className="relative w-full py-12 px-4 bokeh-light-bg text-[#5E1224] overflow-hidden my-2 shadow-inner border-y border-[#E8DCC6]/60">
     
<div className="relative max-w-2xl mx-auto text-center z-10">
          {/* Countdown digits matching the screenshot format: 0 : 00 : 00 : 00 */}
<div className="flex items-center justify-center gap-2 sm:gap-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial font-bold tracking-tight text-[#5E1224]">          <span className="tabular-nums min-w-[1.2ch] text-center font-normal">
            {timeLeft.days}
          </span>
          <span className="text-[#D3542A] font-light opacity-80">:</span>
          <span className="tabular-nums min-w-[2ch] text-center font-normal">
            {padZero(timeLeft.hours)}
          </span>
          <span className="text-[#D3542A] font-light opacity-80">:</span>
          <span className="tabular-nums min-w-[2ch] text-center font-normal">
            {padZero(timeLeft.minutes)}
          </span>
          <span className="text-[#D3542A] font-light opacity-80">:</span>
          <span className="tabular-nums min-w-[2ch] text-center font-normal text-[#8A3B4E]">
            {padZero(timeLeft.seconds)}
          </span>
        </div>

        {/* Labels matching screenshot: JOURS HEURES MINUTES SECONDES */}
        <div className="grid grid-cols-4 gap-1 text-[10px] sm:text-xs tracking-wider uppercase font-semibold text-[#5E1224]/80 mt-3 px-2">
          <span>JOURS</span>
          <span>HEURES</span>
          <span>MINUTES</span>
          <span>SECONDES</span>
        </div>

        
      </div>
    </div>
  );
};
