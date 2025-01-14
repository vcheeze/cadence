export type SchedulePattern = {
  type: 'daily' | 'weekly' | 'custom';
  daysOfWeek?: number[];  // 0 = Sunday, 6 = Saturday
  specificDates?: string[];
  excludeDates?: string[];
};
