const mongoose = require("mongoose");

const profileAccessSchema = new mongoose.Schema({
  profileName: { type: String},
  profileCode: { type: String},
  parentId: { type: String},
  manId: { type: String },
  access: { type: Array},
  
  date: { type: Date , default:Date.now() }
});

module.exports = mongoose.model("profiles", profileAccessSchema);