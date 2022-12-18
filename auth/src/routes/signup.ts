import express, { Request, Response } from "express"
import { body, validationResult } from "express-validator"
import { RequestValidationError, DatabaseConnectionError } from "../errors/"

const router = express.Router()

// request body : { email: string, password: string }
router.post(
  "/api/users/signup",
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
  (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }

    const { email, password } = req.body
    // throw new DatabaseConnectionError()
    return res.send({ email, password })
  }
)

export { router as signupRouter }
