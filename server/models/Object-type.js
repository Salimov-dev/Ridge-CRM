import { Schema, model } from "mongoose";

const schema = new Schema({
  type: String,
});

export default model("ObjectType", schema);
