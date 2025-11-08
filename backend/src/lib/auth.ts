import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";
import * as schema from "../db/schema/index.js";

//Better auth creates the tables related to sessions and authenticated users
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:5173", "http://localhost:3000"], //TODO: Move urls to .env
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    usePlural: true,
  }),
});
