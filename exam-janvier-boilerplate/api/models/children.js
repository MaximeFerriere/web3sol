const mongoose = require("mongoose");

// Define Schema
const childrenSchema = new mongoose.Schema({
  name: String,
  birthDate: String,
  gender: String,
});

childrenSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Export model
module.exports = mongoose.model("childrens", childrenSchema);
