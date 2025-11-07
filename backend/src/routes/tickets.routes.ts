import { Router } from "express";
import {
  cancelTicket,
  createTicket,
  getTicketById,
  getTickets,
  updateTicket,
} from "../modules/tickets/controller.js";

//TODO: Think about deleting this routes since tickets are only accessed
// from  projects at the moment (and the user can see its own tickets)
const ticketsRouter = Router();

ticketsRouter.get("/", getTickets);

ticketsRouter.get("/:id", getTicketById);

ticketsRouter.post("/", createTicket);

ticketsRouter.patch("/", updateTicket);

ticketsRouter.delete("/", cancelTicket);

export default ticketsRouter;
