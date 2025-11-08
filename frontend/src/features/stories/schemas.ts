import z from "zod";

export const CreateUserStorySchema = z.object({
  name: z.string().nonempty(),
  projectId: z.uuid().nonempty(),
  description: z.string().optional(),
});

export const UpdateStorySchema = CreateUserStorySchema.partial().extend({
  id: z.uuid(),
});
