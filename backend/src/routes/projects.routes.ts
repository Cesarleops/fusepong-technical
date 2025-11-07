import { Router } from "express";
import {
  createProjectUserStory,
  getProjectById,
} from "../modules/projects/controller.js";

const projectsRouter = Router();

projectsRouter.get("/:id", getProjectById);

//TODO: Decide endpoint usability
// projectsRouter.get("/:projectId/stories");

projectsRouter.post("/:projectId/stories", createProjectUserStory);

export default projectsRouter;
