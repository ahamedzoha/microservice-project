import { NextFunction, Request, Response } from "express"
import { CustomError } from "../errors"

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }
}

export default errorHandler
