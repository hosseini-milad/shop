const mongoose = require("mongoose");

const ClassesSchema = new mongoose.Schema({
  className: { type: String},
  classEn: { type: String},
  classCat: { type: String},
  manId: { type: String },
  
  date: { type: Date , default:Date.now() }
});

module.exports = mongoose.model("classes", ClassesSchema);