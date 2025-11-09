import {
  pgEnum,
  pgTable,
  uuid,
  varchar,
  text,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
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

export const userCompaniesTable = pgTable(
  "user_companies",
  {
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
  },
  (table) => ({
    userCompanyUnique: unique().on(table.companyId, table.userId),
  }),
);

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

export const userProjectsTable = pgTable(
  "user_projects",
  {
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
  },
  (table) => ({
    userProjectUnique: unique().on(table.projectId, table.userId),
  }),
);

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

export const userStoriesRelations = relations(userStoriesTable, ({ many }) => ({
  tickets: many(ticketsTable),
}));
export const ticketAssigneesRelations = relations(
  ticketAssignees,
  ({ one }) => ({
    ticket: one(ticketsTable, {
      fields: [ticketAssignees.ticketId],
      references: [ticketsTable.id],
    }),
    user: one(users, {
      fields: [ticketAssignees.userId],
      references: [users.id],
    }),
  }),
);

export const ticketsRelations = relations(ticketsTable, ({ many, one }) => ({
  comments: many(ticketComments),
  assignees: many(ticketAssignees),
  userStory: one(userStoriesTable, {
    fields: [ticketsTable.userStoryId],
    references: [userStoriesTable.id],
  }),
  author: one(users, {
    fields: [ticketsTable.authorId],
    references: [users.id],
  }),
}));

export const ticketCommentsRelations = relations(ticketComments, ({ one }) => ({
  ticket: one(ticketsTable, {
    fields: [ticketComments.ticketId],
    references: [ticketsTable.id],
  }),
  author: one(users, {
    fields: [ticketComments.authorId],
    references: [users.id],
  }),
}));
