const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const SepCartSchema = new Schema({
    sku:  { type : String},
    ItemId:  { type : String},
    initDate: { type: Date, default: Date.now },
    progressDate: { type: Date },
    userId:{ type: String },
    count:{ type: String },
    price:{ type: String }
})
module.exports = mongoose.model('sepcart',SepCartSchema);