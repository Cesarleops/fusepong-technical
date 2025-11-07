import { auth } from "../lib/auth.js";
import { Response, Request, NextFunction } from "express";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //@ts-ignore
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return res.status(401).send();
    //@ts-ignore
    req.user = session.user;
    //@ts-ignore
    req.session = session;
    next();
  } catch (e) {
    return res.status(401).send();
  }
};
