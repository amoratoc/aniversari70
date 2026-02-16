import { useState } from 'react';
import type { DayData } from '../types/calendar';
import { computeDateForDay, hasDayPassed } from '../utils/dateUtils';
import { getAssetPath } from '../utils/assetPath';

interface DayDetailProps {
  dayData: DayData;
  startDate: string;
  onClose: () => void;
}

export default function DayDetail({ dayData, startDate, onClose }: DayDetailProps) {
  // If day has passed, show content directly without mystery box
  const dayAlreadyPassed = hasDayPassed(startDate, dayData.day);

  const [isRevealed, setIsRevealed] = useState(dayAlreadyPassed);
  const [isRevealing, setIsRevealing] = useState(false);

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

  const handleReveal = () => {
    setIsRevealing(true);
    // Wait for exit animation to complete before showing content
    setTimeout(() => {
      setIsRevealed(true);
    }, 1500); // 1.5 seconds for exit animation
  };

  const getRevealEffect = () => {
    // Choose one of 5 different reveal effects based on day number
    const effectNumber = (dayData.day - 1) % 5;

    const effects = [
      // Effect 1: Classic bouncing gift (3s) - Exit Implode (1.5s) + Reveal (3s)
      {
        emoji: '🎁',
        pattern: (
          <>
            <div className="absolute top-2 left-2 text-6xl animate-bounce-slow delay-100">🎁</div>
            <div className="absolute bottom-2 right-2 text-6xl animate-bounce-slow delay-300">🎁</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl animate-bounce-slow">🎁</div>
          </>
        ),
        text: 'Clica aquí per descobrir la sorpresa! ✨',
        animation: 'animate-bounce-slow',
        exitAnimation: 'animate-exitImplode',
        revealAnimation: 'animate-shakeImplode'
      },
      // Effect 2: Sparkles and stars (4s) - Exit Explode (1.5s) + Reveal (3.5s)
      {
        emoji: '✨',
        pattern: (
          <>
            <div className="absolute top-4 left-4 text-5xl animate-sparkle">⭐</div>
            <div className="absolute top-4 right-4 text-5xl animate-sparkle delay-200">✨</div>
            <div className="absolute bottom-4 left-4 text-5xl animate-sparkle delay-300">💫</div>
            <div className="absolute bottom-4 right-4 text-5xl animate-sparkle delay-500">⭐</div>
          </>
        ),
        text: 'Toca per revelar la màgia! ✨',
        animation: 'animate-sparkle',
        exitAnimation: 'animate-exitExplode',
        revealAnimation: 'animate-shakeExplode'
      },
      // Effect 3: Hearts (3s heartbeat) - Exit Fade (1.5s) + Reveal (4s)
      {
        emoji: '💝',
        pattern: (
          <>
            <div className="absolute top-3 left-6 text-4xl animate-heartbeat">💕</div>
            <div className="absolute top-10 right-8 text-5xl animate-heartbeat delay-200">❤️</div>
            <div className="absolute bottom-8 left-10 text-5xl animate-heartbeat delay-300">💖</div>
            <div className="absolute bottom-3 right-6 text-4xl animate-heartbeat delay-100">💕</div>
            <div className="absolute top-1/2 left-1/4 text-3xl animate-heartbeat delay-500">💗</div>
            <div className="absolute top-1/3 right-1/4 text-3xl animate-heartbeat delay-700">💗</div>
          </>
        ),
        text: 'Obre el teu regal amb amor! 💝',
        animation: 'animate-heartbeat',
        exitAnimation: 'animate-exitFade',
        revealAnimation: 'animate-fadeScaleReveal'
      },
      // Effect 4: Party celebration (5s swing) - Exit Spin (1.5s) + Reveal (4.5s)
      {
        emoji: '🎉',
        pattern: (
          <>
            <div className="absolute top-2 left-8 text-5xl animate-swing">🎊</div>
            <div className="absolute top-8 right-6 text-5xl animate-swing delay-200">🎉</div>
            <div className="absolute bottom-6 left-6 text-5xl animate-swing delay-300">🎈</div>
            <div className="absolute bottom-2 right-10 text-5xl animate-swing delay-100">🎊</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl animate-swing delay-500">🎉</div>
          </>
        ),
        text: 'Celebrem junts! Clica aquí! 🎉',
        animation: 'animate-swing',
        exitAnimation: 'animate-exitSpin',
        revealAnimation: 'animate-spinZoomReveal'
      },
      // Effect 5: Mystery box (4s shake) - Exit Glitch (1.5s) + Reveal (5s)
      {
        emoji: '❓',
        pattern: (
          <>
            <div className="absolute top-4 left-8 text-6xl opacity-30 animate-shake">❓</div>
            <div className="absolute top-12 right-10 text-6xl opacity-30 animate-shake delay-200">❓</div>
            <div className="absolute bottom-10 left-12 text-6xl opacity-30 animate-shake delay-300">❓</div>
            <div className="absolute bottom-4 right-8 text-6xl opacity-30 animate-shake delay-500">❓</div>
          </>
        ),
        text: 'Què t\'espera avui? Descobreix-ho! 🤔',
        animation: 'animate-shake',
        exitAnimation: 'animate-exitGlitch',
        revealAnimation: 'animate-glitchReveal'
      }
    ];

    return effects[effectNumber];
  };

  const renderContent = () => {
    const effect = getRevealEffect();

    if (!isRevealed) {
      return (
        <div className="overflow-hidden">
          <div
            onClick={handleReveal}
            className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${isRevealing ? effect.exitAnimation : ''}`}
          >
            <div className={`bg-linear-to-br ${getPastelColor()} rounded-xl py-8 sm:p-10 shadow-xl border-4 border-white relative overflow-hidden`}>
            {/* Mystery pattern - different for each effect */}
            <div className="absolute inset-0 opacity-10">
              {effect.pattern}
            </div>

            {/* Click to reveal text */}
            <div className="relative z-10 text-center space-y-4">
              <div className={`text-6xl ${effect.animation}`}>{effect.emoji}</div>
              <h4 className="font-bold text-2xl text-white drop-shadow-lg">
                {effect.text}
              </h4>
            </div>
          </div>
          </div>
        </div>
      );
    }

    // Show content based on type
    // Wrap in overflow-hidden to prevent scrollbars during reveal animations
    return (
      <div className="overflow-hidden">
        {(() => {
          switch (dayData.type) {
            case 'clue':
              return (
                <div className={`bg-linear-to-br ${getPastelColor()} rounded-xl p-5 sm:p-6 shadow-xl border-4 border-white ${!dayAlreadyPassed ? effect.revealAnimation : ''}`}>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
                      🎁
                    </div>
                    <div className="flex-1">
                      {dayAlreadyPassed && dayData.outcome ? (
                        // Show outcome if day has passed
                        <>
                          <h4 className="font-bold text-lg text-white drop-shadow mb-2">
                            El teu regal era:
                          </h4>
                          <p className="text-stone-800 leading-relaxed text-base font-semibold">
                            {dayData.outcome}
                          </p>
                        </>
                      ) : (
                        // Show clue if it's today or outcome doesn't exist
                        <>
                          <h4 className="font-bold text-lg text-white drop-shadow mb-2">
                            La teva pista d'avui:
                          </h4>
                          <p className="text-stone-800 leading-relaxed text-base">
                            {dayData.clue}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );

            case 'audio':
              return (
                <div className={`bg-linear-to-br ${getPastelColor()} rounded-xl p-6 sm:p-8 shadow-xl border-4 border-white ${!dayAlreadyPassed ? effect.revealAnimation : ''}`}>
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-5xl shadow-lg">
                      🎵
                    </div>
                    <div className="w-full">
                      <h4 className="font-bold text-xl text-white drop-shadow mb-4 text-center">
                        Escolta el missatge d'avui:
                      </h4>
                      <audio
                        key={dayData.path}
                        controls
                        preload="metadata"
                        className="w-full rounded-lg shadow-lg"
                        style={{ maxWidth: '100%' }}
                      >
                        <source src={getAssetPath(dayData.path || '')} type="audio/mp4" />
                        El teu navegador no suporta la reproducció d'àudio.
                      </audio>
                    </div>
                  </div>
                </div>
              );

            case 'video':
              return (
                <div className={`bg-linear-to-br ${getPastelColor()} rounded-xl p-6 sm:p-8 shadow-xl border-4 border-white ${!dayAlreadyPassed ? effect.revealAnimation : ''}`}>
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-5xl shadow-lg">
                      🎬
                    </div>
                    <div className="w-full">
                      <h4 className="font-bold text-xl text-white drop-shadow mb-4 text-center">
                        Mira el vídeo d'avui:
                      </h4>
                      <video
                        key={dayData.path}
                        controls
                        preload="metadata"
                        playsInline
                        className="w-full rounded-lg shadow-lg"
                        style={{ maxWidth: '100%', maxHeight: '60vh' }}
                      >
                        <source src={getAssetPath(dayData.path || '')} type="video/mp4" />
                        El teu navegador no suporta la reproducció de vídeo.
                      </video>
                    </div>
                  </div>
                </div>
              );

            case 'photo':
              return (
                <div className={`bg-linear-to-br ${getPastelColor()} rounded-xl p-6 sm:p-8 shadow-xl border-4 border-white ${!dayAlreadyPassed ? effect.revealAnimation : ''}`}>
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-5xl shadow-lg">
                      📸
                    </div>
                    <div className="w-full">
                      <h4 className="font-bold text-xl text-white drop-shadow mb-4 text-center">
                        Mira la foto d'avui:
                      </h4>
                      {dayData.path ? (
                        <img
                          src={getAssetPath(dayData.path)}
                          alt={`Foto del dia ${dayData.day}`}
                          className="w-full h-auto rounded-lg shadow-lg"
                          style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }}
                        />
                      ) : (
                        <p className="text-stone-800 text-center">
                          No s&apos;ha trobat cap foto per aquest dia.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );

            case 'virtual':
              return (
                <div className={`bg-linear-to-br ${getPastelColor()} rounded-xl p-6 sm:p-8 shadow-xl border-4 border-white ${!dayAlreadyPassed ? effect.revealAnimation : ''}`}>
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-5xl shadow-lg">
                      🌟
                    </div>
                    <div className="w-full text-center">
                      {/* <h4 className="font-bold text-xl text-white drop-shadow mb-4">
                        Experiència virtual
                      </h4> */}
                      <p className="text-stone-800 text-lg">
                        {dayData.clue}
                      </p>
                    </div>
                  </div>
                </div>
              );

            default:
              return null;
          }
        })()}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto transform transition-all animate-slideUp border-4 border-white">

        {/* Header with gradient */}
        <div className={`sticky top-0 bg-linear-to-r ${getPastelColor()} rounded-t-3xl px-6 py-4 z-10 border-b-4 border-white shadow-lg`}>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-white hover:text-white/90 transition-all p-2 hover:bg-black/10 rounded-full flex items-center gap-2 group"
            >
              <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-medium"></span>
            </button>
            <div className="flex-1 text-center">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                Dia {dayData.day}
              </h2>
            </div>
            <div className="w-16"></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-hidden">

          {/* Date badge */}
          <div className="flex justify-center">
            <div className={`inline-block bg-linear-to-r ${getPastelColor()} text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-white`}>
              {formatDate()}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-center bg-linear-to-r from-stone-600 to-stone-800 bg-clip-text text-transparent">
            {dayData.title}
          </h3>

          {/* Image if available */}
          {dayData.image && (
            <div className="relative rounded-xl overflow-hidden shadow-xl bg-linear-to-br from-stone-100 to-stone-200 p-3 border-3 border-white">
              <img
                src={dayData.image}
                alt={`Dia ${dayData.day}`}
                className="w-full h-auto rounded-lg object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Content section with reveal effect */}
          {renderContent()}

          {/* Decorative elements */}
          <div className="text-center space-y-3 py-1">
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-16 bg-linear-to-r from-transparent via-pastel-pink to-transparent rounded-full"></div>
              <div className="text-2xl">✨</div>
              <div className="h-1 w-16 bg-linear-to-r from-transparent via-pastel-lavender to-transparent rounded-full"></div>
            </div>
            <p className="text-stone-600 italic font-['Caveat'] text-2xl">
              {dayAlreadyPassed ? "Esperem que t'hagi agradat de la sorpresa!" : 'Descobreix què t\'espera avui!'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
