import { TicketRepository } from "./repository.js";
import { NewTicket } from "./types.js";

export class TicketService {
  static async getTicketById(ticketId: string) {
    try {
      const ticket = await TicketRepository.findById(ticketId);
      return ticket;
    } catch (e) {
      throw e;
    }
  }

  static async updateTicket(ticketId: string, data: NewTicket) {
    try {
      await TicketRepository.updateTicket(ticketId, data);
    } catch (e) {
      throw e;
    }
  }
}
