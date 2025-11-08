import { Router } from "express";
import {
  createCompany,
  createCompanyProject,
  getCompanies,
  getCompanyById,
  getCompanyProjects,
} from "../modules/companies/controller.js";

const companyRouter = Router();

companyRouter.get("/", getCompanies);

companyRouter.get("/:id", getCompanyById);

companyRouter.get("/:companyId/projects", getCompanyProjects);

companyRouter.post("/", createCompany);

companyRouter.post("/:companyId/projects", createCompanyProject);

export default companyRouter;
