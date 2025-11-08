import { ticketComments, ticketsTable } from "../../db/schema/public.ts";

export type NewTicket = typeof ticketsTable.$inferInsert;

export type NewTicketComment = typeof ticketComments.$inferInsert;

export type Ticket = typeof ticketsTable.$inferSelect;
