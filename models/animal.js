//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection")

////////////////////////////////////////////////
// Define Model
////////////////////////////////////////////////
const { Schema, model } = mongoose;

const animalsSchema = new Schema({
  name: String,
  color: String,
  isCute: Boolean,
});

const Animal = model("Animal", animalsSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Animal