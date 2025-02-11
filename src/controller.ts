import { Request, Response } from "express";

const healthcheck = (req: Request, res: Response) => {
  res.sendStatus(200);
};

export { healthcheck };
