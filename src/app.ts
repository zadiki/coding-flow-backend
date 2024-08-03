import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";

import env from "./util/validateEnv";

import notesRouter from "./routes/notes";
import MongoStore from "connect-mongo";

const app = express();

// app.use(morgan("dev"));
app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_DB_CONNECTION_STRING,
    }),
  })
);

app.use("/api/notes", notesRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Not found"));
});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  let responseStatus = 500;
  let errorMessage = "Internal server error";
  if (isHttpError(err)) {
    responseStatus = err.status;
    errorMessage = err.message;
  }
  res.status(responseStatus).json({
    status: responseStatus,
    message: errorMessage,
  });
});

export default app;
