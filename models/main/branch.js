const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    branchId:  String,
    branchName:  String,
    date: { type: Date, default: Date.now }
    
})
module.exports = mongoose.model('branch',branchSchema);