import { pgEnum, pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { users } from "./auth.js";
import { timestamps } from "./columns.helpers.js";

//Tables are saved in the public schema by default so there is no need
// to create a schema here.

export const companiesTable = pgTable("companies", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  nit: varchar({ length: 9 }).notNull().unique(),
  email: text().notNull().unique(),
  address: text().notNull(),
  phone: varchar({ length: 30 }).notNull().unique(),
  ...timestamps,
});

export const userCompaniesTable = pgTable("user_companies", {
  id: uuid().primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .references(() => companiesTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  userId: text("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  ...timestamps,
});

export const projectsTable = pgTable("projects", {
  id: uuid().primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .references(() => companiesTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  ...timestamps,
});

export const userProjectsTable = pgTable("user_projects", {
  id: uuid().primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .references(() => projectsTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  userId: text("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  ...timestamps,
});

export const userStoriesTable = pgTable("user_stories", {
  id: uuid().primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .references(() => projectsTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  ...timestamps,
});

export const ticketStatusEnum = pgEnum("ticket_status", [
  "active",
  "in_progress",
  "completed",
  "cancelled",
]);

export const ticketsTable = pgTable("tickets", {
  id: uuid().primaryKey().defaultRandom(),
  userStoryId: uuid("user_story_id")
    .references(() => userStoriesTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  authorId: text("author_id").references(() => users.id, {
    onDelete: "set null",
  }),
  name: varchar({ length: 255 }).notNull(),
  status: ticketStatusEnum().notNull().default("active"),
  description: text(),
  ...timestamps,
});

export const ticketAssignees = pgTable("ticket_assignees", {
  id: uuid().primaryKey().defaultRandom(),
  ticketId: uuid("ticket_id")
    .references(() => ticketsTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  userId: text("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  ...timestamps,
});

export const ticketComments = pgTable("ticket_comments", {
  id: uuid().primaryKey().defaultRandom(),
  ticketId: uuid("ticket_id")
    .references(() => ticketsTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  authorId: text("author_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  comment: varchar({ length: 255 }).notNull(),
  ...timestamps,
});
