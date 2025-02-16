const mongoose = require("mongoose");

const advTypeSchema = new mongoose.Schema({
  advTypeName: { type: String},
  description: { type: String},
  isActive: { type: Boolean}, 
  date: { type: Date , default:Date.now() }
});

module.exports = mongoose.model("advTypes", advTypeSchema);