const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ProductPriceSchema = new Schema({
    pID: String,
    ItemID: String,
    saleType:String,
    stock:String,
    price:String,
    date:{ type: Date }
})
module.exports = mongoose.model('productprice',ProductPriceSchema);