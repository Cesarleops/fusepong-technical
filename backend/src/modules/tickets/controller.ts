import { Request, Response } from "express";
import { TicketService } from "./service.js";

export async function getTicketById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const ticket = await TicketService.getTicketById(id);
    return res.status(200).json(ticket);
  } catch (e) {
    return res.status(404).send();
  }
}

export async function updateTicket(req: Request, res: Response) {
  const data = req.body;
  const { id } = req.params;
  try {
    await TicketService.updateTicket(id, data);
  } catch (e) {
    return res.status(400).json({
      message: "No se pudo actualizar el ticket",
    });
  }
}
