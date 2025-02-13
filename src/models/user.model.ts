import { Schema, model, Document, Model, Types } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

interface UserInput {
  email: string;
  name: string;
  password: string;
}

interface UserDocument extends UserInput, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (this: UserDocument, next) {
  // here we need to convert this into user (or rather UserDocument) because this is an instance of the UserModel
  // this has the value of some user, hence it is a UserDocument
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(config.get<number>("saltFactor"));
  const hashedPassword = bcrypt.hashSync(user.password, salt);

  user.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (
  this: UserDocument,
  candidatePassword: string
): Promise<boolean> {
  const user = this;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = model<UserDocument>("User", userSchema);

export { User, UserInput, UserDocument };
