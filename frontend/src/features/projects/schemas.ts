import z from "zod";

export const CreateProjectSchema = z.object({
  companyId: z.uuid(),
  name: z.string().max(255),
  description: z.string().optional(),
});
