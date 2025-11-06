import { Router } from "express";
import {
  cancelTicket,
  createTicket,
  getTicketById,
  getTickets,
  updateTicket,
} from "../modules/tickets/controller.js";

const ticketsRouter = Router();

ticketsRouter.get("/", getTickets);

ticketsRouter.get("/:id", getTicketById);

ticketsRouter.post("/", createTicket);

ticketsRouter.patch("/", updateTicket);

ticketsRouter.delete("/", cancelTicket);

export default ticketsRouter;
