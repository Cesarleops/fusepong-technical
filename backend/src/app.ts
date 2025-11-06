import { router } from "./routes/index.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

import express, { json } from "express";

const BASE_ROUTE = "/api";

export const app = express();

app.all("/api/auth/{*any}", toNodeHandler(auth));

//We call the json middleware after the auth handler because betterAuth parses the request
// in a special way
app.use(json());

app.use(BASE_ROUTE, router);
