import { Request, Response } from "express";
import { CompanyService } from "./service.js";

export async function getCompanies(_req: Request, res: Response) {
  try {
    const companies = await CompanyService.getAllCompanies();
    return res.status(200).json(companies);
  } catch (e) {
    return res.status(500).json({
      message: "No pudimos obtener las compañias.",
    });
  }
}

export async function getCompanyProjects(req: Request, res: Response) {
  const { companyId } = req.params;
  try {
    const projects = await CompanyService.getCompanyProjects(companyId);

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
export async function createCompany(req: Request, res: Response) {
  const data = req.body;
  try {
    await CompanyService.create(data);
    return res.status(201).json({
      message: "Compañia creada exitosamente",
    });
  } catch (e) {
    return res.status(401).json({
      message: "No se pudo crear la compañia",
    });
  }
}

export async function createCompanyProject(req: Request, res: Response) {
  const data = req.body;
  try {
    await CompanyService.createCompanyProject(data);
    return res.status(201).json({
      message: "Proyecto creado exitosamente",
    });
  } catch (e) {
    return res.status(401).json({
      message: "No se pudo crear el proyecto.",
    });
  }
}
