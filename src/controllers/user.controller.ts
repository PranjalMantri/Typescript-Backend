import { Request, RequestHandler, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";

export async function createUserHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const user = await createUser(req.body);
    res.status(200).send(user);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}
