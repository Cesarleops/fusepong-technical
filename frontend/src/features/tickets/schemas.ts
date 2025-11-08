import z from "zod";

export const CreateTicketSchema = z.object({
  name: z.string().nonempty(),
  userStoryId: z.uuid(),
  authorId: z.string().nonempty(),
  description: z.string().optional(),
});

export const UpdateTicketSchema = CreateTicketSchema.partial().extend({
  id: z.uuid(),
});
