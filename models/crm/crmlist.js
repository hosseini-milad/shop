const mongoose = require("mongoose");

const crmListSchema = new mongoose.Schema({
  crmName: { type: String},
  crmCode: { type: String},
  description: { type: String},
  crmSteps:{type:Array},
  date: { type: String, default:Date.now()},
});

module.exports = mongoose.model("crmlist", crmListSchema);