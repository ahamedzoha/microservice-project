import express, { json, Request, Response, NextFunction } from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from "./routes"

import "express-async-errors"

import errorHandler from "./middlewares/errorHandler"
import { NotFoundError } from "./errors"

const app = express()
app.use(json())
app.use(morgan("dev"))

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth")
    console.log("Connected to MongoDB")
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log("Auth Service listening on port 3000!!!")
  })
}

start()
