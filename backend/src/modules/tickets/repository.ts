import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { ticketComments, ticketsTable } from "../../db/schema/public.js";
import { NewTicket, NewTicketComment, Ticket } from "./types.js";

export class TicketRepository {
  static async findById(ticketId: string): Promise<Ticket> {
    try {
      const ticket = await db
        .select()
        .from(ticketsTable)
        .where(eq(ticketsTable.id, ticketId));
      return ticket[0];
    } catch (e) {
      throw e;
    }
  }

  static async updateTicket(ticketId: string, data: NewTicket) {
    try {
      await db
        .update(ticketsTable)
        .set(data)
        .where(eq(ticketsTable.id, ticketId));
    } catch (e) {
      throw e;
    }
  }

  static async createTicketComment(data: NewTicketComment) {
    try {
      await db.insert(ticketComments).values(data);
    } catch (e) {
      throw e;
    }
  }
}
