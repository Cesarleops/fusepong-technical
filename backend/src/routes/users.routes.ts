import { Router } from "express";
import {
  getUserCompanies,
  getUserProjects,
  getUserTickets,
  joinCompany,
  joinProject,
} from "../modules/users/controller.js";

const usersRouter = Router();

usersRouter.get("/user/companies", getUserCompanies);

usersRouter.get("/user/projects", getUserProjects);

usersRouter.get("/user/tickets", getUserTickets);

usersRouter.post("/user/companies", joinCompany);

usersRouter.post("/user/projects", joinProject);

export default usersRouter;
