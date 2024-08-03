import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);
