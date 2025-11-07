import { Router } from "express";
import { getTicketById, updateTicket } from "../modules/tickets/controller.js";

const ticketsRouter = Router();

ticketsRouter.get("/:id", getTicketById);

ticketsRouter.patch("/:id", updateTicket);

export default ticketsRouter;
