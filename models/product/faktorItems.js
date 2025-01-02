const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const FaktorItems = new Schema({
    InvoiceID:{ type: String },
    InvoiceNumber:{ type: String },
    initDate: { type: Date, default: Date.now },
    progressDate: { type: Date },
    sku:{ type: String },
    Description:{ type: String },
    ItemID:{ type: String },
    discount:{ type: String },
    fee:{ type: String },
    price:{ type: String },
    tax:{ type: String },
    netPrice:{ type: String },
    count:{ type: String }
})
module.exports = mongoose.model('faktorItems',FaktorItems);