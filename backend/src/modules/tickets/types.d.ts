import { ticketsTable } from "../../db/schema/public.ts";

export type NewTicket = typeof ticketsTable.$inferInsert;
export type Ticket = typeof ticketsTable.$inferSelect;
