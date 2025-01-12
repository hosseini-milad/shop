const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const FaktorSchema = new Schema({
    initDate: { type: Date, default: Date.now },
    progressDate: { type: Date },
    userId:{ type: String },
    customerID:{ type: String },
    customerName:{ type: String },
    manageId:{ type: String },
    managerName:{ type: String },
    faktorNo:{ type: String },
    isWeb:{type: Boolean, default:false},

    NetPrice:{ type: String },
    InvoiceID:{ type: String},
    InvoiceNumber:{ type: String },
    ReceiptID:String,
    Status:{type:String,default:"unregister"},
    payStatus:{type:String},
    totalCount:{ type: String }
})
module.exports = mongoose.model('faktor',FaktorSchema);