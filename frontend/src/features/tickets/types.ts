import type z from "zod";

import type {
  CreateTicketCommentSchema,
  CreateTicketSchema,
  UpdateTicketSchema,
} from "./schemas";

import type { Timestamps } from "@/types";

export type CreateTicket = z.infer<typeof CreateTicketSchema>;

export type CreateTicketComment = z.infer<typeof CreateTicketCommentSchema>;

export type Ticket = CreateTicket &
  Timestamps & {
    id: string;
    status: "cancelled" | "completed" | "in_progress" | "active";
    comments: TicketComment[];
  };

export type TicketComment = CreateTicketComment &
  Timestamps & {
    id: string;
    author: {
      name: string;
    };
  };

export type UpdateTicket = z.infer<typeof UpdateTicketSchema> & {
  status: "cancelled" | "completed" | "in_progress" | "active";
};
