const { SchemaTypes, Schema, model } = require("mongoose");
// const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "user",
  },
});

// contactSchema.plugin(mongoosePaginate);
const Contacts = model("contact", contactSchema);

module.exports = {
  Contacts,
};
