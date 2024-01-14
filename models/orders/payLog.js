const mongoose = require("mongoose");

const PayLogSchema = new mongoose.Schema({
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  orderNo: {type: String},
  payStatus: {type: String},
  orderPrice: {type: String},
  saleReferenceId:{type: String},
  errorMessage:{type: String},
  errorCode:{type: String},
  payDate:{ type: Date,default:Date.now()}
});

module.exports = mongoose.model("paylog", PayLogSchema);