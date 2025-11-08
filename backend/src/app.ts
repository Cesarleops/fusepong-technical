import { router } from "./routes/index.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import express, { json } from "express";
import cors from "cors";

const BASE_ROUTE = "/api";

export const app = express();

console.log("ENV", process.env);
app.use(
  cors({
    origin: "https://fusepong-technical.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

//We call the json middleware after the auth handler because betterAuth parses the request
// in a special way
app.use(json());

app.use(BASE_ROUTE, router);
