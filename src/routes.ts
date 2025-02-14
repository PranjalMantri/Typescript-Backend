import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
import resourceValidator from "./middleware/resourceValidator";
import { CreateUserSchema } from "./schema/user.schema";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "./controllers/session.controller";
import { CreateSessionSchema } from "./schema/session.schema";
import { deserializeUser } from "./middleware/deserialize";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post(
    "/api/users",
    resourceValidator(CreateUserSchema),
    createUserHandler
  );

  app.post(
    "/api/sessions",
    resourceValidator(CreateSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", getUserSessionsHandler);
}

export default routes;
