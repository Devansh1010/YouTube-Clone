import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential: true,
}))

// Accept json also with 16kb of limit
app.use(express.json({
    limit: "16kb"
}))

// Accept different special charactere in the urls like %devandh, %20devansh, ?devansh etc...
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

// Storing files like pdf, images in the "Public" folder
app.use(express.static("Public"))

// Configure the cookie parser.
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1//users", userRouter)

export default app