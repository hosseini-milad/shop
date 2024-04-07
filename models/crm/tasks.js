const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  crmId: { type: String},
  taskId: { type: String},
  content: { type: String},
  taskStep:{type:String},
  prior:{type:Number},
  assign:{type:String},
  profile:{type:String},
  creator:{type:String},
  customer:{type:String},
  orderNo:{type:String},

  checkList:{type:Array,default:[]},
  dueDate:{ type: Object},
  priority:{type:String},
  attach:{type:String},
  type:{type:String},
  query:{type:Object},
  result:{type:Object},
  date: { type: Date, default:Date.now()},
  progressDate: { type: Date},
});

module.exports = mongoose.model("task", taskSchema);