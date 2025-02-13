import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
import resourceValidator from "./middleware/resourceValidator";
import { CreateUserSchema } from "./schema/user.schema";
import { createUserSessionHandler } from "./controllers/session.controller";
import { CreateSessionSchema } from "./schema/session.schema";

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
}

export default routes;
