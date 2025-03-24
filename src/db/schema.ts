import { createMany, relations } from 'drizzle-orm';
import { integer, pgTable, varchar, text, pgEnum, uuid, json } from 'drizzle-orm/pg-core';

export const difficultyEnum = pgEnum('difficulty_enum', ['easy', 'medium', 'hard']);

export const usersTable = pgTable('users', {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
	age: integer().notNull(),
	email: varchar({ length: 255 }).notNull().unique()
});

export const problemsTable = pgTable('problems', {
	id: uuid().primaryKey().defaultRandom(),
	title: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	difficulty: difficultyEnum().notNull(),
	authorId: uuid('author_id'),
	testCases: json('test_cases').notNull()
});

export const userRelations = relations(usersTable, ({ many }) => ({
	problems: many(problemsTable)
}));

export const problemsRelations = relations(problemsTable, ({ one }) => ({
	author: one(usersTable, {
		fields: [problemsTable.authorId],
		references: [usersTable.id]
	})
}));

export const topics = pgTable('topics', {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull().unique(),
	description: text()
});

export const problemToTopics = pgTable('problem_topics', {
	problemId: uuid('problem_id')
		.primaryKey()
		.references(() => problemsTable.id),
	topicId: uuid('topic_id')
		.primaryKey()
		.references(() => topics.id)
});
