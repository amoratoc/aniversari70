export interface DayData {
  day: number;
  title: string;
  clue: string;
  image: string | null;
}

export interface CalendarData {
  title: string;
  subtitle: string;
  buttonText?: string;
  startDate: string;
  days: DayData[];
}
