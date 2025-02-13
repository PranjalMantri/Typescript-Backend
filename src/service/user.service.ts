import { User, UserDocument, UserInput } from "../models/user.model";
import { create, omit } from "lodash";

export async function createUser(input: UserInput) {
  try {
    const user = await User.create(input);

    const createdUser = await User.findById(user._id).select("-password");

    return createdUser;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<Omit<UserDocument, "password"> | null> {
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return null;
  }

  return omit(user, "password") as Omit<UserDocument, "password">;
}
