import { Router } from "express";
import {
  createUserStory,
  getUserStories,
  getUserStoryById,
} from "../modules/user-stories/controller.js";

const userStoriesRouter = Router();

userStoriesRouter.get("/", getUserStories);

userStoriesRouter.get("/:id", getUserStoryById);

userStoriesRouter.post("/", createUserStory);

export default userStoriesRouter;
