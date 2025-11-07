import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { projectsTable, userStoriesTable } from "../../db/schema/public.js";
import { Project } from "./types.js";
import { NewUserStory } from "../user-stories/types.js";

export class ProjectRepository {
  static async findById(id: string): Promise<Project> {
    try {
      const result = await db
        .select()
        .from(projectsTable)
        .where(eq(projectsTable.id, id));

      return result[0];
    } catch (e) {
      throw e;
    }
  }

  static async createProjectUserStory(data: NewUserStory) {
    try {
      await db.insert(userStoriesTable).values(data);
    } catch (e) {
      throw e;
    }
  }
}
