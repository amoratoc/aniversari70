import type { CalendarData } from '../types/calendar';
import PhotoCollage from './PhotoCollage';

interface WelcomeScreenProps {
  onStart: () => void;
  calendarData: CalendarData;
}

export default function WelcomeScreen({ onStart, calendarData }: WelcomeScreenProps) {
  // Calculate current day number based on start date
  const calculateCurrentDay = (): number => {
    const today = new Date();
    const startDate = new Date(calendarData.startDate);
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Return day number (1-based), capped at total days
    return Math.min(Math.max(diffDays + 1, 1), calendarData.days.length);
  };

  const currentDay = calculateCurrentDay();

  return (
    <div className="min-h-screen bg-linear-to-br from-pastel-peach via-pastel-sky to-pastel-mint flex items-start justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-visible border-4 border-white">
          {/* Decorative header */}
          {/* <div className="h-3 bg-linear-to-r from-pastel-yellow via-pastel-turquoise to-pastel-lavender"></div> */}

          {/* Content */}
          <div className="p-4 sm:p-8 text-center">
            {/* Photo collage */}
            <div className="mb-6 relative flex justify-center">
              <PhotoCollage maxPhotos={currentDay} />
            </div>

            {/* Title */}
            <div className="mb-3 space-y-1">

              <h2 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-pastel-turquoise via-pastel-sky to-pastel-periwinkle bg-clip-text text-transparent">
                70 dies celebrant 
              </h2>
              <h1 className="text-5xl pb-1 sm:text-6xl font-bold bg-linear-to-r from-pastel-lavender via-pastel-pink to-pastel-blush bg-clip-text text-transparent drop-shadow-sm">
                70 anys
              </h1>
            </div>

            {/* Subtitle */}
            {/* <p className="text-xl sm:text-2xl text-stone-600 mb-8 font-semibold">
              {calendarData.subtitle}
            </p> */}

            {/* Decorative divider */}
            {/* <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-pastel-pink to-transparent rounded-full"></div>
              <div className="text-pastel-lavender text-2xl">❤️</div>
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-pastel-lavender to-transparent rounded-full"></div>
            </div> */}

            {/* Start button */}
            <button
              onClick={onStart}
              className="w-full bg-linear-to-r from-pastel-lavender via-pastel-pink to-pastel-blush hover:from-pastel-pink hover:via-pastel-blush hover:to-pastel-lavender text-white font-bold text-xl py-5 px-8 rounded-full shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl active:scale-95 border-4 border-white"
            >
              {calendarData.buttonText || "✨ Què toca avui? ✨"}
            </button>

            {/* Small hint */}
            {/* <p className="text-sm text-stone-400 mt-6 italic">
              Un nou regal cada dia durant 70 dies
            </p> */}
          </div>

          {/* Decorative footer */}
          {/* <div className="h-3 bg-linear-to-r from-pastel-mint via-pastel-turquoise to-pastel-sky"></div> */}

          {/* Floating elements animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-22 left-6 text-3xl opacity-20 animate-bounce">💕</div>
            <div className="absolute top-35 right-6 text-2xl opacity-20 animate-bounce delay-200">🌸</div>
            <div className="absolute bottom-25 left-10 text-3xl opacity-20 animate-bounce delay-300">⭐</div>
            <div className="absolute bottom-26 right-6 text-2xl opacity-20 animate-bounce delay-100">🎈</div>
          </div>
        </div>


      </div>
    </div>
  );
};
