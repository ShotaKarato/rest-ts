import { Request, Response } from "express";
import config from "config";
import {
  CreateSessionInput,
  createSessionSchema,
} from "../schema/session.schema";
import { createSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  // validate user's password
  const user = await validatePassword(req.body.email, req.body.password);

  if (!user) {
    return res.send(401).send("Invalid email or password");
  }

  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("accessTokenTtl") }
  );

  const refreshToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("refreshTokenTtl") }
  );

  return res.send({ accessToken, refreshToken });
};
