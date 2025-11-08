import { Router } from "express";
import {
  getUserCompanies,
  getUserProjects,
  getUserTickets,
  joinCompany,
  joinProject,
} from "../modules/users/controller.js";

const usersRouter = Router();

usersRouter.get("/companies", getUserCompanies);

usersRouter.get("/projects", getUserProjects);

usersRouter.get("/tickets", getUserTickets);

usersRouter.post("/companies/:id", joinCompany);

usersRouter.post("/projects/:id", joinProject);

export default usersRouter;
