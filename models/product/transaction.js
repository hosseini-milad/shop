const mongoose = require("mongoose");

const transSchema = new mongoose.Schema({
  title:{ type: String},
  bankCode:{ type: String},
  userId:{type:String},
  orderNo:{type:Array},
  payValue:{type:String},
  description:{type:String},
  sepidarID:{type:String},
  date:{type:Date,default:Date.now()}
});

module.exports = mongoose.model("transaction", transSchema);