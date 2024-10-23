const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const CartSchema = new Schema({
    cartItems:  { type : Array , "default" : [] },
    initDate: { type: Date, default: Date.now },
    cartNo:{ type: String },
    progressDate: { type: Date },
    userId:{ type: String },
    manageId:{ type: String },
    payValue:{ type: String },
    stockId:{type:String},
    description:{type:String},
    discount:{type:String},
    totalPrice:{ type: String },
    taskStep:{ type: String },
    query:{ type: String },
    result:{ type: String },
    isSale:{type:Boolean,default:false},
    isQuote:{type:Boolean,default:false},
    Number:{type:String},
    InvoiceID:{type:String}
})
module.exports = mongoose.model('cart',CartSchema);