import { Router } from "express";
import companyRouter from "./companies.routes.js";
import projectsRouter from "./projects.routes.js";
import userStoriesRouter from "./user-stories.routes.js";
import ticketsRouter from "./tickets.routes.js";

export const router = Router();

router.use("/companies", companyRouter);
router.use("/projects", projectsRouter);
router.use("/user-stories", userStoriesRouter);
router.use("/tickets", ticketsRouter);
