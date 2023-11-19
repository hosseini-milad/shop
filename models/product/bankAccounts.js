const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const BankAccountSchema = new Schema({
    BankAccountID: Number,
    DlCode: String,
    DlTitle:String,
    CurrencyRef:Number,
})
module.exports = mongoose.model('bankAccount',BankAccountSchema);