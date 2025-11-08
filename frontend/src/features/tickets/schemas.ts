import z from "zod";

export const CreateTicketSchema = z.object({
  name: z.string().nonempty(),
  userStoryId: z.uuid(),
  authorId: z.string().nonempty(),
  description: z.string().optional(),
});

export const CreateTicketCommentSchema = z.object({
  ticketId: z.uuid(),
  authorId: z.string().nonempty(),
  comment: z.string().nonempty().max(255),
});

export const UpdateTicketSchema = CreateTicketSchema.partial();
