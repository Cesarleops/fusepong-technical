import type z from "zod";
import type { CreateTicketSchema } from "./schemas";

export type Ticket = z.infer<typeof CreateTicketSchema> & {
  id: string;
  status: "cancelled" | "completed" | "in_progress" | "active";
};
