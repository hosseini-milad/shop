const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const FaktorItems = new Schema({
    faktorNo:{ type: String },
    initDate: { type: Date, default: Date.now },
    progressDate: { type: Date },
    sku:{ type: String },
    discount:{ type: String },
    price:{ type: String },
    totalPrice:{ type: String },
    count:{ type: String }
})
module.exports = mongoose.model('faktorItems',FaktorItems);