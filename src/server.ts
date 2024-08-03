import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const PORT = env.PORT;

mongoose
  .connect(env.MONGO_DB_CONNECTION_STRING)
  .then(() => {
    console.log("mongo connected");
    app.listen(PORT, () => {
      console.log(" app running in port " + PORT);
    });
  })
  .catch((e) => console.error(e));
