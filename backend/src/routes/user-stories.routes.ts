import { Router } from "express";
import { createUserStory } from "../modules/user-stories/controller.js";

//TODO: Think about deleting this routes since user stories are only accessed
// from projects at the moment.

const userStoriesRouter = Router();

userStoriesRouter.post("/", createUserStory);

export default userStoriesRouter;
