import { Router } from "express";
import {
  createTicketComment,
  getTicketById,
  updateTicket,
} from "../modules/tickets/controller.js";

const ticketsRouter = Router();

ticketsRouter.get("/:id", getTicketById);

ticketsRouter.post("/comments", createTicketComment);

ticketsRouter.patch("/:id", updateTicket);

export default ticketsRouter;
