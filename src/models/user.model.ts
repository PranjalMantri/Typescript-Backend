import { NextFunction } from "express";
import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // here we need to convert this into user (or rather UserDocument) because this is an instance of the UserModel
  // this has the value of some user, hence it is a UserDocument
  const user = this as UserDocument;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(config.get<number>("saltFactor"));
  const hashedPassword = bcrypt.hashSync(user.password, salt);

  user.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

userSchema.statics.findUserByUsername = async function (
  username: string
): Promise<UserDocument> {
  // Here, this refers to the UserModel itself not the UserDocument, hence it has access to findOne and other such methods
  return await this.findOne({ username });
};

const User = model("User", userSchema);

export default User;
