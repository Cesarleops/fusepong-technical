import { Router } from "express";
import {
  createCompany,
  getCompanies,
} from "../modules/companies/controller.js";

const companyRouter = Router();

companyRouter.get("/", getCompanies);

companyRouter.post("/", createCompany);

export default companyRouter;
