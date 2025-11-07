import { Router } from "express";
import {
  createUserStoryTicket,
  getUserStoryById,
} from "../modules/user-stories/controller.js";

const userStoriesRouter = Router();

userStoriesRouter.get("/:id", getUserStoryById);

userStoriesRouter.post("/:storyId/tickets", createUserStoryTicket);

export default userStoriesRouter;
