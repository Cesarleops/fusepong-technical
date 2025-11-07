import { userStoriesTable } from "../../db/schema/public.js";

export type NewUserStory = userStoriesTable.$inferInsert;

export type UserStory = userStoriesTable.$inferSelect;
