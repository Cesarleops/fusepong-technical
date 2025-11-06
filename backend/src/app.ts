import { router } from "./routes/index.js";
import express from "express";

const BASE_ROUTE = "/api";

export const app = express();

app.use(BASE_ROUTE, router);
