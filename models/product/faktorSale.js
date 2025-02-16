const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const FaktorSale = new Schema({
    faktorNo:{ type: String },
    initDate: { type: Date, default: Date.now },
    progressDate: { type: Date },
    userId:{ type: String },
    customerID:{ type: String },
    manageId:{ type: String },
    
    totalDiscount:{ type: String },
    totalPrice:{ type: String },
    InvoiceID:{ type: String },
    totalCount:{ type: String }
}) 
module.exports = mongoose.model('faktorSale',FaktorSale);