import { Router } from "express";
import {
  createProjectUserStory,
  getProjectById,
} from "../modules/projects/controller.js";

const projectsRouter = Router();

projectsRouter.get("/:id", getProjectById);

projectsRouter.post("/user-stories", createProjectUserStory);

export default projectsRouter;
