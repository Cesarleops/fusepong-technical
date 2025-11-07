import { Request, Response } from "express";
import { ProjectService } from "./service.js";

export async function getProjects(_req: Request, res: Response) {
  try {
    const projects = await ProjectService.getAllProjects();
    if (projects.length === 0) {
      return res.status(204).json(projects);
    }
    return res.status(200).json(projects);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "No pudimos obtener los proyectos" });
  }
}

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

export async function createProject(req: Request, res: Response) {
  const data = req.body;
  try {
    await ProjectService.create(data);
    return res.status(201).send();
  } catch (e) {
    return res.status(400).json({
      message: "Los datos del proyecto son incorrectos",
    });
  }
}
