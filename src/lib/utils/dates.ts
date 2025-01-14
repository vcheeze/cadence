import { DateTime } from 'luxon';

export function normalizeToUTC(date: Date | string, timezone: string = 'UTC'): Date {
  const luxonDate = typeof date === 'string'
    ? DateTime.fromISO(date, { zone: timezone })
    : DateTime.fromJSDate(date, { zone: timezone });

  return luxonDate
    .startOf('day')
    .setZone('UTC')
    .toJSDate();
}

export function localizeDate(date: Date | string, timezone: string): Date {
  const luxonDate = typeof date === 'string'
    ? DateTime.fromISO(date)
    : DateTime.fromJSDate(date);

  return luxonDate
    .setZone(timezone)
    .toJSDate();
}
