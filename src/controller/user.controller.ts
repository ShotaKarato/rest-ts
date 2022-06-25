import { Request, Response } from "express";
import { omit } from "lodash";
import log from "../logger";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";

export const createUserHandler = async (
  req: Request<{}, {}, Omit<CreateUserInput["body"], "passwordConfirmation">>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (error: any) {
    log.error(error);
    return res.status(409).send(error.message);
  }
};
