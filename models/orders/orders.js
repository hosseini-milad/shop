const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  stockId: {type: String},
  manageId: {type: String},
  orderNo:{type:String},

  orderPrice:{type:String},
  orderItems:[{type:Array}],
  orderItems:[{type:Array}],
  status:{ type: String },
  payStatus: {type: String},
  description:{ type: String },
  date:{ type: Date }, 
  progressDate:{ type: Date },
});

module.exports = mongoose.model("orders", OrdersSchema);