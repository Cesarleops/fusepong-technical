import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { userStoriesTable } from "../../db/schema/public.js";
import { NewUserStory, UserStory } from "./types.js";

export class UserStoryRepository {
  static async findById(id: string): Promise<UserStory> {
    try {
      const result = await db
        .select()
        .from(userStoriesTable)
        .where(eq(userStoriesTable.id, id));
      return result[0];
    } catch (e) {
      throw e;
    }
  }

  static async createUserStoryTicket(data: NewUserStory) {
    try {
      await db.insert(userStoriesTable).values(data);
    } catch (e) {
      throw e;
    }
  }
}
