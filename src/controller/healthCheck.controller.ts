import { RequestHandler } from "express";

export const healthcheck: RequestHandler = (req, res) => {
  res.json({ message: "API is working fine" });
};
