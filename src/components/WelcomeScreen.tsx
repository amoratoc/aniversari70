import type { CalendarData } from '../types/calendar';

interface WelcomeScreenProps {
  onStart: () => void;
  calendarData: CalendarData;
}

export default function WelcomeScreen({ onStart, calendarData }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02]">
          {/* Decorative header */}
          <div className="h-2 bg-linear-to-r from-rose-400 via-pink-400 to-orange-400"></div>

          {/* Content */}
          <div className="p-8 text-center">
            {/* Main illustration area */}
            <div className="mb-6 relative">
              <div className="w-64 h-64 mx-auto bg-linear-to-br from-amber-100 to-rose-100 rounded-3xl flex items-center justify-center overflow-hidden">
                {/* Simple family illustration placeholder */}
                <div className="text-8xl">🎂</div>
              </div>
              {/* Decorative hearts */}
              <div className="absolute top-4 right-8 text-4xl animate-pulse">❤️</div>
              <div className="absolute bottom-8 left-8 text-3xl animate-pulse delay-100">💝</div>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold mb-2 bg-linear-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              70 Dies
            </h1>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Complint 70
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 font-medium">
              {calendarData.subtitle}
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-12 bg-linear-to-r from-transparent to-rose-300"></div>
              <div className="text-rose-400">✦</div>
              <div className="h-px w-12 bg-linear-to-l from-transparent to-rose-300"></div>
            </div>

            {/* Start button */}
            <button
              onClick={onStart}
              className="w-full bg-linear-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 text-white font-semibold text-lg py-4 px-8 rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Començar l'aventura
            </button>
          </div>

          {/* Decorative footer */}
          <div className="h-2 bg-linear-to-r from-orange-400 via-pink-400 to-rose-400"></div>
        </div>

        {/* Floating hearts animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 text-2xl opacity-20 animate-bounce">💕</div>
          <div className="absolute top-40 right-16 text-xl opacity-20 animate-bounce delay-200">🌸</div>
          <div className="absolute bottom-32 left-20 text-2xl opacity-20 animate-bounce delay-300">✨</div>
        </div>
      </div>
    </div>
  );
};

