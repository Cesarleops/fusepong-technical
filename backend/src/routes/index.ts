import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";

import companyRouter from "./companies.routes.js";
import projectsRouter from "./projects.routes.js";
import userStoriesRouter from "./user-stories.routes.js";
import ticketsRouter from "./tickets.routes.js";
import usersRouter from "./users.routes.js";

export const router = Router();

//All the routes must be accessed by authenticated users
router.use(requireAuth);

router.use("/user", usersRouter);
router.use("/companies", companyRouter);
router.use("/projects", projectsRouter);
router.use("/user-stories", userStoriesRouter);
router.use("/tickets", ticketsRouter);
