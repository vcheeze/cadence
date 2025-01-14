import { DateTime } from 'luxon';
import type { SchedulePattern } from '$lib/types/schedule';

export class PlanScheduler {
  private startDateTime: DateTime;

  constructor(
    private startDate: Date,
    private schedulePattern: SchedulePattern,
    private entries: Array<{ readings: Array<{ book: string, chapter: number }> }>
  ) {
    this.startDateTime = DateTime.fromJSDate(startDate);
  }

  private isDateExcluded(date: DateTime): boolean {
    const { excludeDates = [] } = this.schedulePattern;
    return excludeDates.some(excludeDate => 
      DateTime.fromISO(excludeDate).hasSame(date, 'day')
    );
  }

  private isValidWeekday(date: DateTime): boolean {
    const { type, daysOfWeek = [] } = this.schedulePattern;
    if (type !== 'weekly') return true;
    return daysOfWeek.includes(date.weekday % 7); // Convert Luxon's 1-7 to 0-6
  }

  private getNextValidDate(date: DateTime): DateTime {
    let nextDate = date.plus({ days: 1 });
    while (
      this.isDateExcluded(nextDate) || 
      !this.isValidWeekday(nextDate)
    ) {
      nextDate = nextDate.plus({ days: 1 });
    }
    return nextDate;
  }

  generateSchedule(endDate?: Date): Array<{ date: Date, readings: any[] }> {
    const schedule = [];
    let currentDate = this.startDateTime;
    let entryIndex = 0;
    const endDateTime = endDate ? DateTime.fromJSDate(endDate) : null;

    while (
      entryIndex < this.entries.length && 
      (!endDateTime || currentDate < endDateTime)
    ) {
      if (!this.isDateExcluded(currentDate) && this.isValidWeekday(currentDate)) {
        schedule.push({
          date: currentDate.toJSDate(),
          readings: this.entries[entryIndex].readings
        });
        entryIndex++;
      }
      currentDate = this.getNextValidDate(currentDate);
    }

    return schedule;
  }
}