import { eq, notInArray } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  companiesTable,
  projectsTable,
  userCompaniesTable,
} from "../../db/schema/public.js";
import { NewProject, Project } from "../projects/types.js";
import { Company, NewCompany } from "./types.js";

export class CompanyRepository {
  static async findAll(userId: string): Promise<Company[]> {
    try {
      const query = await db
        .select()
        .from(userCompaniesTable)
        .where(eq(userCompaniesTable.userId, userId));

      const userCompanyIds = query.map((uc) => uc.companyId);

      const result = await db
        .select()
        .from(companiesTable)
        .where(notInArray(companiesTable.id, userCompanyIds));
      return result;
    } catch (e) {
      throw e;
    }
  }

  static async findCompanyById(
    companyId: string,
  ): Promise<Company & { projects: Project[] }> {
    try {
      const rows = await db
        .select()
        .from(companiesTable)
        .where(eq(companiesTable.id, companyId))
        .leftJoin(
          projectsTable,
          eq(projectsTable.companyId, companiesTable.id),
        );

      const company = rows[0].companies;

      const projects = rows
        .map((row) => row.projects)
        .filter((project): project is Project => project !== null);

      const result = {
        ...company,
        projects,
      };
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
