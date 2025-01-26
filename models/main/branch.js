const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    branchId:      { type:  String},
    branchName:    { type:  String},
    branchCode:    { type:  String},
    isActive:      { type:  Boolean},
    userId:        { type:  String},
    date: { type: Date, default: Date.now }
    
})
module.exports = mongoose.model('branch',branchSchema);