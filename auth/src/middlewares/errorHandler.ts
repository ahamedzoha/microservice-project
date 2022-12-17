import { NextFunction, Request, Response } from "express"

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {}

export default errorHandler
