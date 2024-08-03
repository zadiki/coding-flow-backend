import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGO_DB_CONNECTION_STRING: str(),
  PORT: port(),
  SESSION_SECRET: str(),
});
