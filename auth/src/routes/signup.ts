import express, { NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"
import { RequestValidationError } from "../errors/"
import { User } from "../models"

const router = express.Router()

// request body : { email: string, password: string }
router.post(
  "/api/users/signup",
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
      }

      const { email, password } = req.body

      const existingUser = await User.findOne({ email })

      if (existingUser) {
        console.log("Email in use")
        return res
          .status(422)
          .json({ errors: [{ msg: "Email is already in use" }] })
      }

      const user = User.build({
        email,
        password,
      })

      await user.save()
      res.status(201).send(user)
    } catch (err) {
      if (err instanceof RequestValidationError) {
        return res.status(400).json({ errors: err.message })
      } else {
        console.error(err)
        res.status(500).send("Server Error")
      }
    }
  }
)

export { router as signupRouter }
