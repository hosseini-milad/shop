const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const InvoiceItemsSchema = new Schema({
    InvoiceID:  { type : String },
    Date: { type: Date, default: Date.now },
    InvoiceItemID:{ type: String },
    ItemRef: { type:String },
    Quantity:{ type: String },
    SecondaryQuantity:{ type: String },
    Fee:{ type: String },
    Price:{type:String},
    Discount:{type:String},
    Tax:{type:String},
    Addition:{ type: String },
    NetPrice:{ type: String },
    Description:{ type: String },
    result:{ type: String },
})
module.exports = mongoose.model('invoiceitem',InvoiceItemsSchema);