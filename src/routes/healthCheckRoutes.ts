import express from "express";
import { healthcheck } from "../controller/healthCheck.controller";

export const route = express.Router();

route.get("/", healthcheck);
route.post("/");
route.put("/");
route.delete("/");
