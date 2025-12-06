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
    // Mantenim 'ca-ES' si és el format català desitjat
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
      {/* Ajust per fer-ho més compacte: 
        max-w-xl (en lloc de 2xl) i menys padding vertical a la capçalera.
      */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto transform transition-all animate-slideUp border-4 border-white">
        
        {/* Header with gradient */}
        {/* Menys py: py-4 en lloc de py-6 */}
        <div className={`sticky top-0 bg-gradient-to-r ${getPastelColor()} rounded-t-3xl px-6 py-4 z-10 border-b-4 border-white shadow-lg`}>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              /* Llegibilitat: El botó era blanc sobre pastel. 
                El fem amb un fons fosc al sobrevolar, i l'icona blanca.
              */
              className="text-white hover:text-white/90 transition-all p-2 hover:bg-black/10 rounded-full flex items-center gap-2 group"
            >
              <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-medium"></span>
            </button>
            <div className="flex-1 text-center">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg"> {/* Mida lleugerament reduïda: 3xl en lloc de 4xl */}
                Dia {dayData.day}
              </h2>
            </div>
            <div className="w-16"></div> {/* Spacer for centering. Reduït a w-16 */}
          </div>
        </div>

        {/* Content */}
        {/* Menys padding: p-5/sm:p-6 en lloc de p-6/sm:p-8 */}
        <div className="p-5 sm:p-6 space-y-5"> {/* Espaiat reduït a space-y-5/6 */}
          
          {/* Date badge */}
          <div className="flex justify-center">
            {/* Manté el text blanc perquè és un títol curt */}
            <div className={`inline-block bg-gradient-to-r ${getPastelColor()} text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-white`}>
              {formatDate()}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-stone-600 to-stone-800 bg-clip-text text-transparent">
            {dayData.title}
          </h3>

          {/* Image if available */}
          {dayData.image && (
            <div className="relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-stone-100 to-stone-200 p-3 border-3 border-white"> {/* Reducció de mida de p-4 a p-3 i border-4 a border-3, rounded-2xl a rounded-xl */}
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

          {/* Clue section - Focus en la llegibilitat aquí! */}
          {/* Menys padding: p-5/sm:p-6 en lloc de p-6/sm:p-8 */}
          <div className={`bg-gradient-to-br ${getPastelColor()} rounded-xl p-5 sm:p-6 shadow-xl border-4 border-white`}> {/* Rounded-2xl a rounded-xl */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg"> {/* Reducció de mida de 14 a 12 i 3xl a 2xl */}
                🎁
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-white drop-shadow mb-2"> {/* Mida reduïda a text-lg i mb-3 a mb-2 */}
                  La teva pista d'avui:
                </h4>
                {/* MAJOR CANVI DE LLEGIBILITAT: Text negre sobre fons pastel clar. 
                  Això millora dràsticament el contrast. 
                */}
                <p className="text-stone-800 leading-relaxed text-base"> {/* Abans era text-white/95 i text-lg */}
                  {dayData.clue}
                </p>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="text-center space-y-3 py-1"> {/* Espaiat reduït */}
            <div className="flex items-center justify-center gap-2"> {/* Espaiat reduït a gap-2 */}
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-pastel-pink to-transparent rounded-full"></div> {/* Mida reduïda a w-16 */}
              <div className="text-2xl">✨</div> {/* Mida reduïda a 2xl */}
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-pastel-lavender to-transparent rounded-full"></div> {/* Mida reduïda a w-16 */}
            </div>
            <p className="text-stone-600 italic font-['Caveat'] text-2xl"> {/* Mida reduïda a 2xl */}
              Gaudeix de la sorpresa!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};