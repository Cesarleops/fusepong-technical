import { projectsTable } from "../../db/schema/public.ts";

export type NewProject = typeof projectsTable.$inferInsert;

export type Project = typeof projectsTable.$inferSelect;
