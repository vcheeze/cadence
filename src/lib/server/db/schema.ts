import { relations } from 'drizzle-orm';
import {
	pgEnum,
	pgTable,
	boolean,
	date,
	integer,
	jsonb,
	primaryKey,
	text,
	timestamp
} from 'drizzle-orm/pg-core';

export const frequencyEnum = pgEnum('frequency_type', ['daily', 'weekly', 'monthly', 'custom', 'undefined']);
// export const readingStatusEnum = pgEnum('reading_status', [
// 	'not_started',
// 	'in_progress',
// 	'completed',
// 	'skipped'
// ]);

// schema
export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	username: text('username').unique(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const userPreference = pgTable('user_preference', {
	userId: text('user_id')
		.references(() => user.id)
		.primaryKey(),
	timezone: text('timezone').default('UTC').notNull(),
	emailNotifications: boolean('email_notifications').default(true),
	reminderTime: timestamp('reminder_time'),
	preferredBibleVersion: text('preferred_bible_version'),
	streakCount: integer('streak_count').default(0),
	lastReadDate: date('last_read_date'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

// New tag table
export const tag = pgTable('tag', {
	id: text('id').primaryKey(),
	name: text('name').notNull().unique(),
	description: text('description'),
	createdAt: timestamp('created_at').defaultNow()
});

// Junction table for many-to-many relationship between templates and tags
export const templateTag = pgTable(
	'template_tag',
	{
		templateId: text('template_id')
			.notNull()
			.references(() => readingPlanTemplate.id, { onDelete: 'cascade' }),
		tagId: text('tag_id')
			.notNull()
			.references(() => tag.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at').defaultNow()
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.templateId, table.tagId] })
		};
	}
);

export const readingPlanTemplate = pgTable('reading_plan_template', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	frequency: frequencyEnum('frequency').notNull(),
	schedulePattern: jsonb('schedule_pattern'), // for custom patterns, see SchedulePattern type below
	duration: integer('duration').notNull(), // in days
	totalReadings: integer('total_readings').notNull(),
	metadata: jsonb('metadata'), // additional flexible data
	isOfficial: boolean('is_official').default(false), // distinguish official vs user-created plans
	createdBy: text('created_by').references(() => user.id),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const readingEntryTemplate = pgTable('reading_entry_template', {
  id: text('id').primaryKey(),
  templateId: text('template_id')
    .notNull()
    .references(() => readingPlanTemplate.id, { onDelete: 'cascade' }),
  sequenceNumber: integer('sequence_number').notNull(), // sequence number within the reading plan e.g. 1, 2, 3, ...
  readingText: text('reading_text').notNull(), // e.g. "Genesis 1-2, John 1:1-18"
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const readingPlan = pgTable('reading_plan', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	templateId: text('template_id').references(() => readingPlanTemplate.id),
	name: text('name').notNull(),
	schedulePattern: jsonb('schedule_pattern'), // for custom patterns, when plans differ from template, see CustomPattern type below
	startDate: date('start_date').notNull(),
	endDate: date('end_date'),
	lastCompletedDate: date('last_completed_date'),
  currentStreak: integer('current_streak').default(0),
  longestStreak: integer('longest_streak').default(0),
  lastStreakUpdate: timestamp('last_streak_update'),
	isPublic: boolean('is_public').default(false),
	// status: readingStatusEnum('status').default('not_started'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const readingEntry = pgTable('reading_entry', {
	id: text('id').primaryKey(),
	planId: text('plan_id')
		.notNull()
		.references(() => readingPlan.id, { onDelete: 'cascade' }),
  entryTemplateId: text('reading_entry_template_id')
    .notNull()
    .references(() => readingEntryTemplate.id),
	sequenceNumber: integer('sequence_number').notNull(),
	scheduledDate: date('scheduled_date').notNull(),
	// notes: text('notes'),
	// status: readingStatusEnum('status').default('not_started'),
  completed: boolean('completed').default(false),
	completedAt: timestamp('completed_at'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

// relations
export const readingPlanTemplateRelations = relations(readingPlanTemplate, ({ many, one }) => ({
	entries: many(readingEntryTemplate),
	tags: many(templateTag),
	readingPlans: many(readingPlan),
	creator: one(user, {
		fields: [readingPlanTemplate.createdBy],
		references: [user.id],
	}),
}));

export const readingEntryTemplateRelations = relations(readingEntryTemplate, ({ one, many }) => ({
	template: one(readingPlanTemplate, {
		fields: [readingEntryTemplate.templateId],
		references: [readingPlanTemplate.id],
	}),
	readingEntries: many(readingEntry),
}));

export const readingPlanRelations = relations(readingPlan, ({ one, many }) => ({
	user: one(user, {
		fields: [readingPlan.userId],
		references: [user.id],
	}),
	template: one(readingPlanTemplate, {
		fields: [readingPlan.templateId],
		references: [readingPlanTemplate.id],
	}),
	entries: many(readingEntry),
}));

export const readingEntryRelations = relations(readingEntry, ({ one }) => ({
	plan: one(readingPlan, {
		fields: [readingEntry.planId],
		references: [readingPlan.id],
	}),
	entryTemplate: one(readingEntryTemplate, {
		fields: [readingEntry.entryTemplateId],
		references: [readingEntryTemplate.id],
	}),
}));

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type UserPreference = typeof userPreference.$inferSelect;
export type ReadingPlanTemplate = typeof readingPlanTemplate.$inferSelect;
export type ReadingEntryTemplate = typeof readingEntryTemplate.$inferSelect;
export type ReadingPlan = typeof readingPlan.$inferSelect;
export type ReadingEntry = typeof readingEntry.$inferSelect;

// types for josnb fields
export type SchedulePattern = {
	daysPerPeriod?: number, // e.g. 5 days per week for weekly type, or 25 days per month for monthly type
	allowedDays?: (0 | 1 | 2 | 3 | 4 | 5 | 6)[] // 0 - Sunday, 1 - Monday, etc
	excludedDates?: string[], // holidays etc
  advancedOptions?: {
    type: 'weekdays' | 'everyN' | 'specific',
    specificDays?: number[],
    spacing?: number,
  }
};

export type CustomPattern = {
	totalReadings: number;
	completed: number;
};
