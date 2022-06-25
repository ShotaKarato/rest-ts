import { Request, Response } from "express";
import {
  CreateSessionInput,
  createSessionSchema,
} from "../schema/session.schema";
import { createSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  // validate user's password
  const user = await validatePassword(req.body.email, req.body.password);

  if (!user) {
    return res.send(401).send("Invalid email or password");
  }

  const session = createSession(user._id, req.get("user-agent") || "");
};
