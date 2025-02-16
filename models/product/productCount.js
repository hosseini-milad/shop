const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ProductCountSchema = new Schema({
    pID: String,
    ItemID: String,
    UnitRef:String,
    quantity:Number,
    Stock:String,
    date:{ type: Date }
})
module.exports = mongoose.model('productcount',ProductCountSchema);