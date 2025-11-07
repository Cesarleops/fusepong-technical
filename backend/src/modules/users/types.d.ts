import { ticketAssignees, userProjectsTable } from "../../db/schema/public.ts";

export type NewUserProject = typeof userProjectsTable.$inferInsert;

export type UserProject = typeof userProjectsTable.$inferSelect;

export type UserTicket = typeof ticketAssignees.$inferSelect;
