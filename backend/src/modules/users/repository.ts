import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  userCompaniesTable,
  userProjectsTable,
  ticketAssignees,
  projectsTable,
  companiesTable,
} from "../../db/schema/public.js";
import { AppDatabaseError } from "../../lib/errors.js";

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
      const result = await db.query.ticketAssignees.findMany({
        columns: {},
        where: eq(ticketAssignees.userId, userId),
        with: {
          ticket: {
            with: {
              comments: {
                with: {
                  author: true,
                },
              },
            },
          },
        },
      });

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
      if (e?.cause && "code" in e.cause && e.cause.code === "23505") {
        throw new AppDatabaseError("Ya eres miembro de la compañia");
      }
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
      if (e?.cause && "code" in e.cause && e.cause.code === "23505") {
        throw new AppDatabaseError("Ya eres miembro del proyecto");
      }
      throw e;
    }
  }
}
