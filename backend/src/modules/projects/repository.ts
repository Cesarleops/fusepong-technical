import { DrizzleQueryError, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { projectsTable } from "../../db/schema/public.js";
import { NewProject, Project } from "./types.js";

export class ProjectRepository {
  static async findAll(): Promise<Project[]> {
    try {
      const result = await db.select().from(projectsTable);
      return result;
    } catch (e) {
      throw e;
    }
  }

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

  static async create(data: NewProject) {
    try {
      await db.insert(projectsTable).values(data);
    } catch (e) {
      throw e;
    }
  }
}
