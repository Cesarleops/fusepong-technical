import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { ticketsTable, userStoriesTable } from "../../db/schema/public.js";
import { UserStory } from "./types.js";
import { NewTicket, Ticket } from "../tickets/types.js";

export class UserStoryRepository {
  static async findById(
    id: string,
  ): Promise<UserStory & { tickets: Ticket[] }> {
    try {
      const result = await db.query.userStoriesTable.findMany({
        where: eq(userStoriesTable.id, id),
        orderBy: (t, { asc }) => asc(t.name),
        with: {
          tickets: {
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

      return result[0];
    } catch (e) {
      throw e;
    }
  }

  static async createUserStoryTicket(data: NewTicket) {
    try {
      await db.insert(ticketsTable).values(data);
    } catch (e) {
      throw e;
    }
  }
}
