import z from "zod";

export const CreateTicketSchema = z.object({
  name: z.string(),
  userStoryId: z.uuid(),
  authorId: z.uuid(),
  description: z.string().optional(),
});

export const UpdateTicketSchema = CreateTicketSchema.partial().extend({
  id: z.uuid(),
});
