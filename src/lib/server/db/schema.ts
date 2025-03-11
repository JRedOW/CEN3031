import { integer, jsonb, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
    id: serial('id').primaryKey(),
    email: varchar().notNull().unique(),
    password_hash: varchar().notNull()
});

export const study_set = pgTable('study_set', {
    id: serial('id').primaryKey(),
    owner_id: integer()
        .notNull()
        .references(() => user.id),
    data: jsonb().notNull()
});

export const set_results = pgTable('set_results', {
    id: serial('id').primaryKey(),
    study_set_id: integer()
        .notNull()
        .references(() => study_set.id),
    user_id: integer()
        .notNull()
        .references(() => user.id),
    results: jsonb().notNull()
});

export const study_session = pgTable('study_session', {
    id: serial('id').primaryKey(),
    study_set_id: integer()
        .notNull()
        .references(() => study_set.id),
    user_id: integer()
        .notNull()
        .references(() => user.id),
    history: jsonb().notNull(),
    buddy_id: integer().notNull()
});
