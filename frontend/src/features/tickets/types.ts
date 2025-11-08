import type z from "zod";
import type { CreateTicketSchema, UpdateTicketSchema } from "./schemas";

export type CreateTicket = z.infer<typeof CreateTicketSchema>;

export type Ticket = CreateTicket & {
  id: string;
  status: "cancelled" | "completed" | "in_progress" | "active";
};

export type UpdateTicket = z.infer<typeof UpdateTicketSchema>;
