import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  userCompaniesTable,
  userProjectsTable,
  ticketAssignees,
} from "../../db/schema/public.js";

//TODO: ADD JOINS
export class UserRepository {
  static async findProjects(userId: string) {
    try {
      const projects = await db
        .select()
        .from(userProjectsTable)
        .where(eq(userProjectsTable.userId, userId));
      return projects;
    } catch (e) {
      throw e;
    }
  }

  static async findCompanies(userId: string) {
    try {
      const companies = await db
        .select()
        .from(userCompaniesTable)
        .where(eq(userCompaniesTable.userId, userId));
      return companies;
    } catch (e) {
      throw e;
    }
  }

  static async findTickets(userId: string) {
    try {
      const tickets = await db
        .select()
        .from(ticketAssignees)
        .where(eq(ticketAssignees.userId, userId));
      return tickets;
    } catch (e) {
      throw e;
    }
  }

  static async joinCompany(userId: string, companyId: string) {
    try {
      await db.insert(userCompaniesTable).values({
        userId,
        companyId,
      });
    } catch (e) {
      throw e;
    }
  }

  static async joinProject(userId: string, projectId: string) {
    try {
      await db.insert(userProjectsTable).values({
        projectId,
        userId,
      });
    } catch (e) {
      throw e;
    }
  }
}
