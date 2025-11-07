import { Router } from "express";
import { createUserStory } from "../modules/user-stories/controller.js";

const userStoriesRouter = Router();

userStoriesRouter.post("/", createUserStory);

export default userStoriesRouter;
