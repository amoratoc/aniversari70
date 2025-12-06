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
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm rounded-t-3xl border-b border-rose-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Día {dayData.day}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Date badge */}
          <div className="inline-block bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
            {formatDate()}
          </div>

          {/* Title */}
          <h3 className="text-3xl font-bold text-gray-800">
            {dayData.title}
          </h3>

          {/* Image if available */}
          {dayData.image && (
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white p-4">
              <img
                src={dayData.image}
                alt={`Día ${dayData.day}`}
                className="w-full h-auto rounded-xl object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Clue section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-rose-200">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xl shadow-md">
                🎁
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-800 mb-2">
                  Tu pista de hoy:
                </h4>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {dayData.clue}
                </p>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300"></div>
              <div className="text-rose-400 text-xl">❤️</div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300"></div>
            </div>
            <p className="text-gray-600 italic font-['Caveat'] text-2xl">
              ¡Disfruta tu sorpresa!
            </p>
          </div>

          {/* Back button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-lg py-4 px-8 rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-xl active:scale-95"
          >
            Volver al Calendario
          </button>
        </div>
      </div>
    </div>
  );
};

