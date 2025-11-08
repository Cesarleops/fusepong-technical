import { Request, Response } from "express";
import { UserStoryService } from "./service.js";

export async function getUserStoryById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const userStory = await UserStoryService.getUserStoryById(id);
    return res.status(200).json(userStory);
  } catch (e) {
    return res.status(404).json({
      message: "La historia de usuario no existe",
    });
  }
}

export async function createUserStoryTicket(req: Request, res: Response) {
  const data = req.body;
  try {
    await UserStoryService.createUserStoryTicket(data);
    return res.send(200).send();
  } catch (e) {
    return res.status(400).json({
      message: "No se pudo crear el ticket",
    });
  }
}
