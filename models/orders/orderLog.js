const mongoose = require("mongoose");

const OrderLogSchema = new mongoose.Schema({
  userId:{type: String},
  orderNo: {type: String},
  invoiceID:{type: String},
  orderPrice: {type: String},
  orderCount:{type: String},
  orderItem:{type: Array},
  
  errorMessage:{type: String},
  query:{type: String},
  date:{ type: Date,default:Date.now()}
});

module.exports = mongoose.model("orderlog", OrderLogSchema);