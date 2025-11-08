import { createAuthMiddleware } from "better-auth/api";

export const authMiddleware = createAuthMiddleware(async (ctx) => {
  console.log("path", ctx.path);

  ctx.setHeader("user", "1334");
});
