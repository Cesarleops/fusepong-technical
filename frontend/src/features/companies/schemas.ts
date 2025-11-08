import z from "zod";

export const CreateCompanySchema = z.object({
  name: z.string().max(255),
  nit: z.string().max(9),
  email: z.string().nonempty(),
  address: z.string(),
  phone: z.string().max(30),
});
