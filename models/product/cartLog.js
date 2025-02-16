const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const CartLogSchema = new Schema({
    userId:{ type: String },
    ItemID:  { type : Array },
    count:{ type: String },
    action:{ type: String },
    date: { type: Date, default: Date.now }
})
module.exports = mongoose.model('cartlog',CartLogSchema);