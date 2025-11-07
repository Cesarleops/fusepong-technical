import { companiesTable } from "../../db/schema/public.ts";

export type NewCompany = typeof companiesTable.$inferInsert;

export type Company = typeof companiesTable.$inferSelect;
