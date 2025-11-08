import type { Timestamps } from "@/types";
import type { CreateCompanySchema } from "./schemas";
import type z from "zod";

export type Company = z.infer<typeof CreateCompanySchema> &
  Timestamps & {
    id: string;
  };
