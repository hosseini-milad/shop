const mongoose = require("mongoose");

const transSchema = new mongoose.Schema({
  title:{ type: String},
  bankCode:{ type: String},
  userId:{type:String},
  faktorNo:{type:String},
  orderNo:{type:Array},
  payStatus:{type:String},
  payValue:{type:String},
  description:{type:String},
  saleReferenceId:{type:String},
  sepidarID:{type:String},
  InvoiceID:{type:String},
  date:{type:Date,default:Date.now()}
});

module.exports = mongoose.model("transaction", transSchema);