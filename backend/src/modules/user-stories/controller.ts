import { Request, Response } from "express";
import { UserStoryService } from "./service.js";

export async function createUserStory(req: Request, res: Response) {
  const data = req.body;
  try {
    await UserStoryService.create(data);
    return res.status(201).send();
  } catch (e) {
    return res.status(400).json({
      message: "No se puedo crear la historia de usuario",
    });
  }
}
