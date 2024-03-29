import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// router import
import { userRouter } from "./routes/user.routes.js";
import { recipeRouter } from "./routes/recipe.routes.js";

// routes declaration
app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

export default app;
