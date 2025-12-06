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

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Calendari de 70 dies
              </h1>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Message banner */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-linear-to-r from-pink-100 to-rose-100 rounded-2xl p-6 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-rose-700 mb-2">
            Feliç dia, mamá!
          </h2>
          <p className="text-gray-700">
            Una nova sorpresa t'espera cada dia.
          </p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className={`grid ${getGridColumns()} gap-4`}>
          {calendarData.days.map((dayData) => {
            const unlocked = isUnlocked(dayData.day);

            return (
              <button
                key={dayData.day}
                onClick={() => unlocked && onSelectDay(dayData)}
                disabled={!unlocked}
                className={`
                  relative aspect-square rounded-2xl p-4 transition-all transform
                  ${unlocked
                    ? 'bg-linear-to-br from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer active:scale-95'
                    : 'bg-linear-to-br from-gray-200 to-gray-300 cursor-not-allowed'
                  }
                `}
              >
                {/* Day number */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {unlocked ? (
                    <>
                      <div className="w-12 h-12 mb-2 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16 8a3 3 0 01-3 3h-2a3 3 0 00-3 3v2a3 3 0 01-3 3H4a1 1 0 01-1-1v-1a1 1 0 011-1h1a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 001-1V8a3 3 0 013-3h2a3 3 0 013 3z"/>
                        </svg>
                      </div>
                      <span className="text-3xl font-bold text-white">
                        {dayData.day}
                      </span>
                      <span className="text-xs text-white/80 mt-1 font-medium">
                        {formatDate(dayData.day)}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 mb-2 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-3xl font-bold text-gray-500">
                        {dayData.day}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 font-medium">
                        {formatDate(dayData.day)}
                      </span>
                    </>
                  )}
                </div>

                {/* Sparkle effect for unlocked days */}
                {unlocked && (
                  <div className="absolute top-2 right-2 text-yellow-300 text-sm">
                    ✨
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

