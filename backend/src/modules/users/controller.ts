import { Request, Response } from "express";
import { UserService } from "./service.js";
import { console } from "node:inspector/promises";

export async function getUserCompanies(_req: Request, res: Response) {
  console.log("getting here 2");

  try {
    const companies = await UserService.getCompanies(
      "GMOfvhyVQAODBWscJxXtUoz2WmrVtkKt",
    );
    return res.status(200).json(companies);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "No pudimos obtener tus compañias" });
  }
}

export async function getUserProjects(_req: Request, res: Response) {
  try {
    const projects = await UserService.getProjects(
      "GMOfvhyVQAODBWscJxXtUoz2WmrVtkKt",
    );
    return res.status(200).json(projects);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "No pudimos obtener tus proyectos" });
  }
}

export async function getUserTickets(_req: Request, res: Response) {
  try {
    const tickets = await UserService.getTickets(
      "GMOfvhyVQAODBWscJxXtUoz2WmrVtkKt",
    );
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
