import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  updated_at: timestamp({ withTimezone: true }).$onUpdateFn(() => new Date()),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  deleted_at: timestamp({ withTimezone: true }),
};
