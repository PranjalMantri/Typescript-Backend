import { FilterQuery } from "mongoose";
import { Session, SessionDocument } from "../models/session.model";

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session;
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return await Session.find(query).lean();
}
