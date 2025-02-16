const mongoose = require("mongoose");

const loginLogSchema = new mongoose.Schema({
  title: { type: String}, 
  user: { type: String},
  phone: { type: String},
  description: { type: String},
  status: { type: String},
  kind:{ type: String},
  date:{ type: Date },
  modifyDate:{ type: Date },
});

module.exports = mongoose.model("loginlog", loginLogSchema);