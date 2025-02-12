import mongoose, { Schema, model, Document } from "mongoose";
import { UserDocument } from "./user.model";

interface SessionDocument extends Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true }
);

const Session = model("Session", sessionSchema);

export { Session, SessionDocument };
