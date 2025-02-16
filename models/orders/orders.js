const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  manageId: {type: String},
  orderNo:{type:String},

  orderPrice:{type:String},
  orderCount:{type:String},
  orderItems:[{type:Array}],
  status:{ type: String },
  payStatus: {type: String},
  description:{ type: String },
  transport:{ type: String },
  date:{ type: Date ,default:Date.now()}, 
  progressDate:{ type: Date ,default:Date.now()},
});

module.exports = mongoose.model("orders", OrdersSchema);