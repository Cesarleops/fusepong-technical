import { Request, Response } from "express";
import { UserService } from "./service.js";

//TODO: READ USER ID FROM THE Request
export async function getUserCompanies(req: Request, res: Response) {
  try {
    const companies = await UserService.getCompanies("");
    return res.status(200).json(companies);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "No pudimos obtener tus compañias" });
  }
}

export async function getUserProjects(req: Request, res: Response) {
  try {
    const projects = await UserService.getProjects("");
    return res.status(200).json(projects);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "No pudimos obtener tus proyectos" });
  }
}

export async function getUserTickets(req: Request, res: Response) {
  try {
    const tickets = await UserService.getTickets("");
    return res.status(200).json(tickets);
  } catch (e) {
    return res.status(500).json({ message: "No pudimos obtener tus tickets" });
  }
}

export async function joinCompany(req: Request, res: Response) {
  const { companyId } = req.body;
  try {
    await UserService.joinCompany("", companyId);
  } catch (e) {
    return res.status(400).json({
      message: "Los datos del proyecto son incorrectos",
    });
  }
}

export async function joinProject(req: Request, res: Response) {
  const { projectId } = req.body;
  try {
    await UserService.joinProject("", projectId);
  } catch (e) {
    return res.status(400).json({
      message: "Los datos del proyecto son incorrectos",
    });
  }
}
