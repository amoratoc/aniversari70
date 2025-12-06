import type { DayData } from '../types/calendar';
import { computeDateForDay } from '../utils/dateUtils';

interface DayDetailProps {
  dayData: DayData;
  startDate: string;
  onClose: () => void;
}

export default function DayDetail({ dayData, startDate, onClose }: DayDetailProps) {
  const getDateForDay = (): string => {
    return computeDateForDay(startDate, dayData.day);
  };

  const formatDate = (): string => {
    const date = new Date(getDateForDay());
    return date.toLocaleDateString('ca-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get pastel color for this day
  const getPastelColor = (): string => {
    const colors = [
      'from-pastel-peach to-pastel-orange',
      'from-pastel-sky to-pastel-periwinkle',
      'from-pastel-mint to-pastel-turquoise',
      'from-pastel-lavender to-pastel-pink',
      'from-pastel-yellow to-pastel-lime',
      'from-pastel-turquoise to-pastel-sky',
      'from-pastel-blush to-pastel-pink',
      'from-pastel-lime to-pastel-mint',
    ];
    return colors[(dayData.day - 1) % colors.length];
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all animate-slideUp border-4 border-white">
        {/* Header with gradient */}
        <div className={`sticky top-0 bg-gradient-to-r ${getPastelColor()} rounded-t-3xl px-6 py-6 z-10 border-b-4 border-white shadow-lg`}>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-white hover:text-white/80 transition-all p-2 hover:bg-white/20 rounded-full flex items-center gap-2 group"
            >
              <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-medium"></span>
            </button>
            <div className="flex-1 text-center">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                Dia {dayData.day}
              </h2>
            </div>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Date badge */}
          <div className="flex justify-center">
            <div className={`inline-block bg-gradient-to-r ${getPastelColor()} text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg border-2 border-white`}>
              {formatDate()}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-stone-600 to-stone-800 bg-clip-text text-transparent">
            {dayData.title}
          </h3>

          {/* Image if available */}
          {dayData.image && (
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-stone-100 to-stone-200 p-4 border-4 border-white">
              <img
                src={dayData.image}
                alt={`Dia ${dayData.day}`}
                className="w-full h-auto rounded-xl object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Clue section */}
          <div className={`bg-gradient-to-br ${getPastelColor()} rounded-2xl p-6 sm:p-8 shadow-xl border-4 border-white`}>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                🎁
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl text-white drop-shadow mb-3">
                  La teva pista d'avui:
                </h4>
                <p className="text-white/95 leading-relaxed text-lg drop-shadow">
                  {dayData.clue}
                </p>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="text-center space-y-4 py-2">
            <div className="flex items-center justify-center gap-3">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-pastel-pink to-transparent rounded-full"></div>
              <div className="text-3xl">✨</div>
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-pastel-lavender to-transparent rounded-full"></div>
            </div>
            <p className="text-stone-600 italic font-['Caveat'] text-3xl">
              Gaudeix de la sorpresa!
            </p>
          </div>

          {/* Back button */}
          {/* <button
            onClick={onClose}
            className={`w-full bg-gradient-to-r ${getPastelColor()} hover:opacity-90 text-white font-bold text-lg py-5 px-8 rounded-full shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl active:scale-95 border-4 border-white`}
          >
            ← Tornar al Calendari
          </button> */}
        </div>
      </div>
    </div>
  );
};
