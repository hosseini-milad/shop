const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    Title:  String,
    StockID:Number,
    Code:Number,
    IsActive: Boolean
})
module.exports = mongoose.model('stock',StockSchema);