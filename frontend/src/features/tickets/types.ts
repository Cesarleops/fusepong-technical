import type z from "zod";
import type { CreateTicketSchema, UpdateTicketSchema } from "./schemas";
import type { Timestamps } from "@/types";

export type CreateTicket = z.infer<typeof CreateTicketSchema>;

export type Ticket = CreateTicket &
  Timestamps & {
    id: string;
    status: "cancelled" | "completed" | "in_progress" | "active";
  };

export type UpdateTicket = z.infer<typeof UpdateTicketSchema>;
