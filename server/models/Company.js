import { Schema, model } from "mongoose"

const schema = new Schema({
  name: {
    type: String,
  },
  inn: {
    type: String,
  },
  ogrn: {
    type: String,
  },
});

export default model("Company", schema);
