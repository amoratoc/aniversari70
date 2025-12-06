import type { CalendarData, DayData } from '../types/calendar';
import { computeDateForDay } from '../utils/dateUtils';

interface CalendarGridProps {
  calendarData: CalendarData;
  onSelectDay: (dayData: DayData) => void;
  currentDate: string;
}

export default function CalendarGrid({ calendarData, onSelectDay, currentDate }: CalendarGridProps) {
  const getDateForDay = (dayNumber: number): string => {
    return computeDateForDay(calendarData.startDate, dayNumber);
  };

  const isUnlocked = (dayNumber: number): boolean => {
    const today = new Date(currentDate);
    const dayDate = new Date(getDateForDay(dayNumber));
    today.setHours(0, 0, 0, 0);
    dayDate.setHours(0, 0, 0, 0);
    return dayDate <= today;
  };

  const isToday = (dayNumber: number): boolean => {
    const today = new Date(currentDate);
    const dayDate = new Date(getDateForDay(dayNumber));
    today.setHours(0, 0, 0, 0);
    dayDate.setHours(0, 0, 0, 0);
    return dayDate.getTime() === today.getTime();
  };

  const formatDate = (dayNumber: number): string => {
    const date = new Date(getDateForDay(dayNumber));
    const day = date.getDate();
    const month = date.toLocaleDateString('ca-ES', { month: 'short' });
    return `${day} ${month}`;
  };

  const getGridColumns = (): string => {
    // Responsive grid: 3 cols on mobile, 4 on tablet, 5 on desktop
    return 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-5';
  };

  // Assign pastel colors in a rotating pattern for variety
  const getPastelColor = (dayNumber: number): string => {
    const colors = [
      'bg-pastel-peach',
      'bg-pastel-sky',
      'bg-pastel-mint',
      'bg-pastel-lavender',
      'bg-pastel-yellow',
      'bg-pastel-turquoise',
      'bg-pastel-blush',
      'bg-pastel-lime',
    ];
    return colors[(dayNumber - 1) % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-50 to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pastel-peach via-pastel-sky to-pastel-mint shadow-sm sticky top-0 z-10 border-b-4 border-white">
        <div className="max-w-6xl mx-auto px-0 py-4">
          <div className="flex items-center p-0 ">
            <button
              onClick={() => window.location.reload()}
              className="text-white hover:text-white/80 transition-all px-4 py-4 hover:bg-white/20 rounded-full flex items-center gap-2 group"
              aria-label="Tornar a l'inici"
            >
              <svg className="w-8 h-8 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {/* <span className="text-sm font-medium hidden sm:inline">Tornar</span> */}
            </button>
            <div className="text-left flex-1">
              <h1 className="text-[1.9em] font-bold text-white drop-shadow-lg">
                70 Dies Celebrant 70
              </h1>
              {/* <p className="text-sm text-white/90 mt-1 drop-shadow">Un regal especial cada dia</p> */}
            </div>
          </div>
        </div>
      </div>

      {/* Message banner */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-8 text-center shadow-lg border-4 border-gray-200">
          <h2 className="text-3xl font-bold text-gray drop-shadow-lg mb-2">
            Per molts anys, mamà! ✨
          </h2>
          <p className="text-gray/95 text-lg drop-shadow">
            Una nova sorpresa t'espera cada dia.
          </p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className={`grid ${getGridColumns()} gap-3 sm:gap-4`}>
          {calendarData.days.map((dayData) => {
            const unlocked = isUnlocked(dayData.day);
            const today = isToday(dayData.day);
            const pastelColor = getPastelColor(dayData.day);

            return (
              <button
                key={dayData.day}
                onClick={() => unlocked && onSelectDay(dayData)}
                disabled={!unlocked}
                className={`
                  relative aspect-square rounded-2xl p-3 transition-all duration-300 transform
                  ${unlocked
                    ? today
                      ? `${pastelColor} hover:scale-105 shadow-2xl cursor-pointer active:scale-95 border-4 border-white ring-4 ring-pastel-slate/30 scale-105`
                      : `${pastelColor} hover:scale-105 hover:shadow-xl shadow-md cursor-pointer active:scale-95 border-2 border-white`
                    : 'bg-stone-200/50 cursor-not-allowed border-2 border-stone-300/50'
                  }
                `}
              >
                {/* Day content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                  {unlocked ? (
                    <>
                      {/* Day number - bigger, no icon */}
                      <span className="text-5xl sm:text-6xl font-bold text-white drop-shadow-lg">
                        {dayData.day}
                      </span>
                      {/* Date */}
                      <span className="text-base sm:text-sm text-white/90 mt-1 font-extrabold drop-shadow">
                        {formatDate(dayData.day)}
                      </span>
                      {/* Today indicator */}
                      {today && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2">
                          <span className="text-xl font-bold text-white bg-pastel-slate/80 px-2 py-0.5 rounded-full drop-shadow">
                            AVUI
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Lock icon */}
                      <div className="w-10 h-10 mb-1 flex items-center justify-center">
                        <svg className="w-6 h-6 text-stone-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      {/* Day number */}
                      <span className="text-3xl sm:text-4xl font-bold text-stone-400">
                        {dayData.day}
                      </span>
                      {/* Date */}
                      <span className="text-sm sm:text-xs text-stone-400 mt-0.5 font-medium">
                        {formatDate(dayData.day)}
                      </span>
                    </>
                  )}
                </div>

                {/* Subtle shimmer effect for unlocked days */}
                {unlocked && !today && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
