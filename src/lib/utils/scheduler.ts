// import type {
// 	ReadingEntry,
// 	ReadingEntryTemplate,
// 	ReadingPlanTemplate
// } from '$lib/server/db/schema';
// import { DateTime } from 'luxon';
// import { nanoid } from 'nanoid';

// export function scheduleReadingEntries(
// 	planTemplate: ReadingPlanTemplate & { entries: ReadingEntryTemplate[] },
// 	planId: string,
// 	startDate: string
// ): ReadingEntry[] {
// 	switch (planTemplate.frequency) {
// 		case 'daily':
// 			return planTemplate.entries.map((entry) => ({
// 				id: nanoid(),
// 				planId,
// 				entryTemplateId: entry.id,
// 				sequenceNumber: entry.sequenceNumber,
// 				// TODO add calculation logic for scheduledDate based on schedulePattern
// 				scheduledDate:
// 					DateTime.fromISO(startDate)
// 						.plus({ days: entry.sequenceNumber - 1 })
// 						.toISODate() ?? ''
// 			}));
// 		case 'weekly':
// 			return scheduleWeekly(planTemplate);
// 		case 'monthly':
// 			return scheduleMonthly(planTemplate);
// 		default:
// 			throw new Error('Invalid frequency');
// 	}
// }
