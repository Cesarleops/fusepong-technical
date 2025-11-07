import { Router } from "express";
import {
  createCompany,
  getCompanies,
} from "../modules/companies/controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const companyRouter = Router();

companyRouter.get("/", authMiddleware, getCompanies);

companyRouter.post("/", createCompany);

export default companyRouter;
