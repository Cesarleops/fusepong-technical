import "dotenv";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";
import * as schema from "../db/schema/index.js";

//Better auth creates the tables related to sessions and authenticated users
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "https://fusepong-technical.vercel.app",
    "https://fusepong-technical-backend.onrender.com",
    "http://localhost:5173",
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    usePlural: true,
  }),
});
