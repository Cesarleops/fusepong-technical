import { Request, Response } from "express";
import { ProjectService } from "./service.js";

export async function getProjectById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const project = await ProjectService.getProjectById(id);
    return res.status(200).json(project);
  } catch (e) {
    return res.status(404).json({
      message: "El proyecto no existe",
    });
  }
}

export async function createProjectUserStory(req: Request, res: Response) {
  const data = req.body;
  try {
    const result = await ProjectService.createProjectUserStory(data);
    return res.status(201).json(result.id);
  } catch (e) {
    return res.status(400).json({
      message: "No se pudo crear la historia de usuario",
    });
  }
}
