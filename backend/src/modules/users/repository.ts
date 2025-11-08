import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  userCompaniesTable,
  userProjectsTable,
  ticketAssignees,
  projectsTable,
  companiesTable,
  ticketsTable,
} from "../../db/schema/public.js";

export class UserRepository {
  static async findProjects(userId: string) {
    try {
      const result = await db
        .select()
        .from(userProjectsTable)
        .where(eq(userProjectsTable.userId, userId))
        .innerJoin(
          projectsTable,
          eq(userProjectsTable.projectId, projectsTable.id),
        );
      return result;
    } catch (e) {
      throw e;
    }
  }

  static async findCompanies(userId: string) {
    try {
      const result = await db
        .select()
        .from(userCompaniesTable)
        .where(eq(userCompaniesTable.userId, userId))
        .innerJoin(
          companiesTable,
          eq(userCompaniesTable.companyId, companiesTable.id),
        );
      return result;
    } catch (e) {
      throw e;
    }
  }

  static async findTickets(userId: string) {
    try {
      const result = await db
        .select()
        .from(ticketAssignees)
        .where(eq(ticketAssignees.userId, userId))
        .innerJoin(ticketsTable, eq(ticketAssignees.ticketId, ticketsTable.id));
      return result;
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
