const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    InvoiceID:  { type : String,unique:true},
    Date: { type: Date, default: Date.now },
    OrderRef:{ type: String },
    Number: { type: String },
    CustomerRef:{ type: String },
    SaleTypeRef:{ type: String },
    Price:{type:String},
    Tax:{type:String},
    Discount:{ type: String },
    Addition:{ type: String },
    NetPrice:{ type: String },
    Description:{type:String},
    
    manageId:{ type: String },
})
module.exports = mongoose.model('invoice',InvoiceSchema);