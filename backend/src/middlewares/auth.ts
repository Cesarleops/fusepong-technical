import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth.js";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const session = await auth.api.getSession({
      headers: new Headers(req.headers as Record<string, string>),
    });

    console.log("debugging", session);
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    req.user = session.user;
    next();
  } catch (err) {
    console.log("debugging", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
