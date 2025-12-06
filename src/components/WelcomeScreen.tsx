import type { CalendarData } from '../types/calendar';

interface WelcomeScreenProps {
  onStart: () => void;
  calendarData: CalendarData;
}

export default function WelcomeScreen({ onStart, calendarData }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-peach via-pastel-sky to-pastel-mint flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
          {/* Decorative header */}
          <div className="h-3 bg-gradient-to-r from-pastel-yellow via-pastel-turquoise to-pastel-lavender"></div>

          {/* Content */}
          <div className="p-8 sm:p-12 text-center">
            {/* Main illustration area */}
            <div className="mb-8 relative">
              <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto bg-gradient-to-br from-pastel-peach via-pastel-blush to-pastel-lavender rounded-full flex items-center justify-center overflow-hidden shadow-xl border-4 border-white relative">
                {/* Decorative circles */}
                <div className="absolute top-4 right-8 w-12 h-12 bg-pastel-yellow rounded-full opacity-40"></div>
                <div className="absolute bottom-8 left-6 w-16 h-16 bg-pastel-mint rounded-full opacity-40"></div>

                {/* Center emoji */}
                <div className="text-8xl sm:text-9xl drop-shadow-lg relative z-10">🎂</div>
              </div>

              {/* Floating decorations */}
              <div className="absolute -top-2 -right-2 text-5xl animate-bounce">✨</div>
              <div className="absolute -bottom-2 -left-2 text-4xl animate-bounce delay-200">🎁</div>
            </div>

            {/* Title */}
            <div className="mb-6 space-y-2">
              <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-pastel-lavender via-pastel-pink to-pastel-blush bg-clip-text text-transparent drop-shadow-sm">
                70 Dies
              </h1>
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pastel-turquoise via-pastel-sky to-pastel-periwinkle bg-clip-text text-transparent">
                Complint 70
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-stone-600 mb-8 font-semibold">
              {calendarData.subtitle}
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-pastel-pink to-transparent rounded-full"></div>
              <div className="text-pastel-lavender text-2xl">❤️</div>
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-pastel-lavender to-transparent rounded-full"></div>
            </div>

            {/* Start button */}
            <button
              onClick={onStart}
              className="w-full bg-gradient-to-r from-pastel-lavender via-pastel-pink to-pastel-blush hover:from-pastel-pink hover:via-pastel-blush hover:to-pastel-lavender text-white font-bold text-xl py-5 px-8 rounded-full shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl active:scale-95 border-4 border-white"
            >
              ✨ Què toca avui? ✨
            </button>

            {/* Small hint */}
            <p className="text-sm text-stone-400 mt-6 italic">
              Un nou regal cada dia durant 70 dies
            </p>
          </div>

          {/* Decorative footer */}
          <div className="h-3 bg-gradient-to-r from-pastel-mint via-pastel-turquoise to-pastel-sky"></div>
        </div>

        {/* Floating elements animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 text-3xl opacity-20 animate-bounce">💕</div>
          <div className="absolute top-40 right-16 text-2xl opacity-20 animate-bounce delay-200">🌸</div>
          <div className="absolute bottom-32 left-20 text-3xl opacity-20 animate-bounce delay-300">⭐</div>
          <div className="absolute bottom-48 right-12 text-2xl opacity-20 animate-bounce delay-100">🎈</div>
        </div>
      </div>
    </div>
  );
};
