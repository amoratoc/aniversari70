export interface DayData {
  day: number;
  title: string;
  type: 'clue' | 'audio' | 'video' | 'virtual';
  clue?: string;  // Optional, only for type: 'clue'
  outcome?: string;  // Optional, the actual gift for type: 'clue' (shown after day has passed)
  path?: string;  // Optional, for audio/video/virtual
  image: string | null;
}

export interface CalendarData {
  title: string;
  subtitle: string;
  buttonText?: string;
  startDate: string;
  days: DayData[];
}
