const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  username: { type: String},
  userId: { type: String},
  action:{ type: String},
  description: { type: String},

  date:{type:Date}
});

module.exports = mongoose.model("log", logSchema);