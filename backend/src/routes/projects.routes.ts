import { Router } from "express";
import {
  createProject,
  getProjectById,
  getProjects,
} from "../modules/projects/controller.js";

const projectsRouter = Router();

projectsRouter.get("/", getProjects);

projectsRouter.get("/:id", getProjectById);

projectsRouter.post("/", createProject);

export default projectsRouter;
