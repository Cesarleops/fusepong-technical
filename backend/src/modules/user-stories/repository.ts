import { db } from "../../db/index.js";
import { userStoriesTable } from "../../db/schema/public.js";
import { NewUserStory } from "./types.js";

export class UserStoryRepository {
  static async create(data: NewUserStory) {
    try {
      await db.insert(userStoriesTable).values(data);
    } catch (e) {
      throw e;
    }
  }
}
