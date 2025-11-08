import { userStoriesTable } from "../../db/schema/public.ts";

export type NewUserStory = typeof userStoriesTable.$inferInsert;

export type UserStory = typeof userStoriesTable.$inferSelect;
