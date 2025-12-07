/**
 * Computes the date for a given day number based on the start date
 * @param startDate - The start date in YYYY-MM-DD format
 * @param dayNumber - The day number (1-based)
 * @returns The computed date in YYYY-MM-DD format
 */
export function computeDateForDay(startDate: string, dayNumber: number): string {
  const start = new Date(startDate);
  const computed = new Date(start);
  computed.setDate(start.getDate() + (dayNumber - 1));
  return computed.toISOString().split('T')[0];
}

/**
 * Calculates which day number we are currently on based on the start date
 * @param startDate - The start date in YYYY-MM-DD format
 * @param totalDays - Total number of days in the calendar
 * @returns The current day number (1-based, capped at totalDays)
 */
export function getCurrentDay(startDate: string, totalDays: number): number {
  const today = new Date();
  const start = new Date(startDate);
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Return day number (1-based), capped at total days
  return Math.min(Math.max(diffDays + 1, 1), totalDays);
}

/**
 * Checks if a given day is unlocked (date has arrived or passed)
 * @param startDate - The start date in YYYY-MM-DD format
 * @param dayNumber - The day number to check
 * @param currentDate - Current date (optional, defaults to today)
 * @returns true if the day is unlocked
 */
export function isDayUnlocked(startDate: string, dayNumber: number, currentDate?: string): boolean {
  const today = currentDate ? new Date(currentDate) : new Date();
  const dayDate = new Date(computeDateForDay(startDate, dayNumber));
  today.setHours(0, 0, 0, 0);
  dayDate.setHours(0, 0, 0, 0);
  return dayDate <= today;
}

/**
 * Checks if a given day is today
 * @param startDate - The start date in YYYY-MM-DD format
 * @param dayNumber - The day number to check
 * @param currentDate - Current date (optional, defaults to today)
 * @returns true if the day is today
 */
export function isDayToday(startDate: string, dayNumber: number, currentDate?: string): boolean {
  const today = currentDate ? new Date(currentDate) : new Date();
  const dayDate = new Date(computeDateForDay(startDate, dayNumber));
  today.setHours(0, 0, 0, 0);
  dayDate.setHours(0, 0, 0, 0);
  return dayDate.getTime() === today.getTime();
}

/**
 * Checks if a given day has already passed (is before today)
 * @param startDate - The start date in YYYY-MM-DD format
 * @param dayNumber - The day number to check
 * @returns true if the day has passed
 */
export function hasDayPassed(startDate: string, dayNumber: number): boolean {
  const today = new Date();
  const dayDate = new Date(computeDateForDay(startDate, dayNumber));
  today.setHours(0, 0, 0, 0);
  dayDate.setHours(0, 0, 0, 0);
  return dayDate < today;
}
