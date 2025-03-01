import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = new model("Contact", contactSchema);

export default Contact;
