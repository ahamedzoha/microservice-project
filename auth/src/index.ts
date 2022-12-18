import express, { json } from "express"
import morgan from "morgan"
import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from "./routes"

import errorHandler from "./middlewares/errorHandler"

const app = express()
app.use(json())
app.use(morgan("dev"))

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(errorHandler)

app.listen(3000, () => {
  console.log("Auth Service listening on port 3000!!!")
})
