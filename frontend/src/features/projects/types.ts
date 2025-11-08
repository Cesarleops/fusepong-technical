import type z from "zod";
import type { CreateProjectSchema } from "./schemas";
import type { Timestamps } from "@/types";

export type Project = z.infer<typeof CreateProjectSchema> &
  Timestamps & {
    id: string;
  };
