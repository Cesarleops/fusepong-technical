import { Request, Response } from "express";
import { TicketService } from "./service.js";

export async function getTicketById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const ticket = await TicketService.getTicketById(id);
    return res.status(200).json(ticket);
  } catch (e) {
    return res.status(404).json({
      message: "No se pudo encontrar el ticket.",
    });
  }
}

export async function createTicketComment(req: Request, res: Response) {
  const data = req.body;
  try {
    await TicketService.createTicketComment(data);
    return res.status(201).json({
      message: "Se añadió el comentario",
    });
  } catch (e) {
    return res.status(400).json({
      message: "No se pudo añadir el comentario",
    });
  }
}

export async function updateTicket(req: Request, res: Response) {
  const data = req.body;
  const { id } = req.params;
  try {
    await TicketService.updateTicket(id, data);
    return res.status(200).json({
      message: "Se actualizó el ticket",
    });
  } catch (e) {
    return res.status(400).json({
      message: "No se pudo actualizar el ticket",
    });
  }
}
