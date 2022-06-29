import { omit } from "lodash";
import User, { UserDocument } from "../models/user.model";
import { CreateUserInput } from "../schema/user.schema";

export const createUser = async (input: {
  name: UserDocument["name"];
  password: UserDocument["password"];
  email: UserDocument["email"];
}) => {
  try {
    const user = await User.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
};

export const validatePassword = async (email: string, password: string) => {
  // findOne is mongodb specific method, so service has a role to interact with db
  const user = await User.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
};
