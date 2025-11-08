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
      const rows = await db
        .select()
        .from(userStoriesTable)
        .where(eq(userStoriesTable.id, id))
        .leftJoin(
          ticketsTable,
          eq(ticketsTable.userStoryId, userStoriesTable.id),
        );

      const userStory = rows[0].user_stories;

      const tickets = rows
        .map((row) => row.tickets)
        .filter((ticket): ticket is Ticket => ticket !== null);

      const result = {
        ...userStory,
        tickets: tickets,
      };

      return result;
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
