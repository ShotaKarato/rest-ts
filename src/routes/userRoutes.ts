import express from "express";
import { createUserHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

export const route = express.Router();

route.get("/", () => {});
route.post("/", validateResource(createUserSchema), createUserHandler);
route.put("/", () => {});
route.delete("/", () => {});
