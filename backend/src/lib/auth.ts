import "dotenv";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";
import * as schema from "../db/schema/index.js";

//Better auth creates the tables related to sessions and authenticated users
export const auth = betterAuth({
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: ".obito.pro",
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "https://app.obito.pro",
    "https://api.obito.pro",
    "http://localhost:5173",
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    usePlural: true,
  }),
});
