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
