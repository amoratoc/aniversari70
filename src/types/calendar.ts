export interface DayData {
  day: number;
  title: string;
  type: 'clue' | 'audio' | 'video' | 'virtual';
  clue?: string;  // Optional, only for type: 'clue'
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
