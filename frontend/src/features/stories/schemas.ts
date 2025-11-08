import z from "zod";

export const CreateUserStorySchema = z.object({
  name: z.string(),
  projectId: z.uuid(),
  description: z.string().optional(),
});

export const UpdateStorySchema = CreateUserStorySchema.partial().extend({
  id: z.uuid(),
});
