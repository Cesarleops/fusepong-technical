import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const companiesTable = pgTable("companies", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  nit: varchar({ length: 9 }).notNull().unique(),
  email: varchar().notNull().unique(),
  address: varchar().notNull(),
  phone: varchar({ length: 30 }).notNull().unique(),
});
