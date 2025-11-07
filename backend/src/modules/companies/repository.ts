import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { companiesTable, projectsTable } from "../../db/schema/public.js";
import { NewProject, Project } from "../projects/types.js";
import { Company, NewCompany } from "./types.js";

export class CompanyRepository {
  static async findAll(): Promise<Company[]> {
    try {
      const result = await db.select().from(companiesTable);
      return result;
    } catch (e) {
      throw e;
    }
  }

  static async findCompanyProjects(companyId: string): Promise<Project[]> {
    try {
      const result = await db
        .select()
        .from(projectsTable)
        .where(eq(projectsTable.companyId, companyId));

      return result;
    } catch (e) {
      throw e;
    }
  }

  static async create(data: NewCompany) {
    try {
      await db.insert(companiesTable).values(data);
    } catch (e) {
      throw e;
    }
  }

  static async createCompanyProject(data: NewProject) {
    try {
      await db.insert(projectsTable).values(data);
    } catch (e) {
      throw e;
    }
  }
}
