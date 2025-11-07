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
