import { Request, Response } from "express";
import { UserService } from "./service.js";

export async function getUserCompanies(req: Request, res: Response) {
  try {
    const companies = await UserService.getCompanies(req.user.id);
    return res.status(200).json(companies);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "No pudimos obtener tus compañias" });
  }
}

export async function getUserProjects(req: Request, res: Response) {
  try {
    const projects = await UserService.getProjects(req.user.id);
    return res.status(200).json(projects);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "No pudimos obtener tus proyectos" });
  }
}

export async function getUserTickets(req: Request, res: Response) {
  try {
    const tickets = await UserService.getTickets(req.user.id);
    return res.status(200).json(tickets);
  } catch (e) {
    return res.status(500).json({ message: "No pudimos obtener tus tickets" });
  }
}

export async function joinCompany(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await UserService.joinCompany(req.user.id, id);
    return res.status(201).json({
      message: "Te uniste exitosamente",
    });
  } catch (e) {
    let message = "Algo salió mal al unirte a la compañia";
    if (e instanceof Error) {
      message = e.message;
    }
    return res.status(400).json({
      message,
    });
  }
}

export async function joinProject(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await UserService.joinProject(req.user.id, id);
    return res.status(201).json({
      message: "Te uniste exitosamente",
    });
  } catch (e) {
    let message = "Algo salió mal al unirte al rpoyecto";
    if (e instanceof Error) {
      message = e.message;
    }
    return res.status(400).json({
      message,
    });
  }
}
