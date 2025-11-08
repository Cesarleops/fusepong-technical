import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { projectsTable, userStoriesTable } from "../../db/schema/public.js";
import { Project } from "./types.js";
import { NewUserStory, UserStory } from "../user-stories/types.js";

export class ProjectRepository {
  static async findById(
    id: string,
  ): Promise<Project & { userStories: UserStory[] }> {
    try {
      const rows = await db
        .select()
        .from(projectsTable)
        .where(eq(projectsTable.id, id))
        .leftJoin(
          userStoriesTable,
          eq(userStoriesTable.projectId, projectsTable.id),
        );

      const project = rows[0].projects;

      const userStoriesData = rows
        .map((row) => row.user_stories)
        .filter((story): story is UserStory => story !== null);

      const result: Project & { userStories: UserStory[] } = {
        ...project,
        userStories: userStoriesData,
      };

      return result;
    } catch (e) {
      throw e;
    }
  }

  static async createProjectUserStory(data: NewUserStory) {
    try {
      const result = await db
        .insert(userStoriesTable)
        .values(data)
        .returning({ id: userStoriesTable.id });
      return result[0];
    } catch (e) {
      throw e;
    }
  }
}
