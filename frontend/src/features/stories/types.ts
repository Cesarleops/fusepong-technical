import type z from "zod";
import type { CreateUserStorySchema, UpdateStorySchema } from "./schemas";
import type { Timestamps } from "@/types";

export type CreateUserStory = z.infer<typeof CreateUserStorySchema>;

export type UserStory = CreateUserStory &
  Timestamps & {
    id: string;
  };

export type UpdateUserStory = z.Infer<typeof UpdateStorySchema>;
