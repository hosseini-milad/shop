const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  crmId: { type: String},
  taskId: { type: String},
  content: { type: String},
  taskStep:{type:String},
  prior:{type:Number},
  assign:{type:String},
  profile:{type:String},
  
  date: { type: Date, default:Date.now()},
});

module.exports = mongoose.model("task", taskSchema);