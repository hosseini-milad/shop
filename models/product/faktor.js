const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const FaktorSchema = new Schema({
    faktorNo:{ type: String },
    faktorItems:  { type : Array , "default" : [] },
    initDate: { type: Date, default: Date.now },
    progressDate: { type: Date },
    userId:{ type: String },
    customerID:{ type: String },
    manageId:{ type: String },

    totalPrice:{ type: String },
    InvoiceID:{ type: String },
    InvoiceNumber:{ type: String },
    totalCount:{ type: String }
})
module.exports = mongoose.model('faktor',FaktorSchema);