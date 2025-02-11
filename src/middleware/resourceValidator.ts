import { Request, Response, NextFunction, query } from "express";
import { AnyZodObject } from "zod";

// This middleware will take a schema and the data, it will validate the data and pass it to its destined route
const resourceValidator =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      return res.status(400).send(error.errors);
    }
  };

export default resourceValidator;
