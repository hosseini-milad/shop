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

    NetPrice:{ type: String },
    InvoiceID:{ type: String ,unique:true},
    InvoiceNumber:{ type: String },
    ReceiptID:String,
    Status:{type:String,default:"unregister"},
    totalCount:{ type: String }
})
module.exports = mongoose.model('faktor',FaktorSchema);