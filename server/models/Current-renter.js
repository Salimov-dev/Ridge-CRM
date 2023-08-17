import { Schema, model } from "mongoose"

const schema = new Schema({
  name: String,
});

export default model("CurrentRenter", schema);
