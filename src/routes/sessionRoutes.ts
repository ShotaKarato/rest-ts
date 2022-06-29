import express from "express";
import { createUserSessionHandler } from "../controller/session.controller";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/session.schema";

export const route = express.Router();

route.get("/");
route.post(
  "/",
  validateResource(createSessionSchema),
  createUserSessionHandler
);
route.put("/");
route.delete("/");
