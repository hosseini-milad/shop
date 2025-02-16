const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
    stateName:  String,
    stateId:String,
    date: { type: Date, default: Date.now }
    
})
module.exports = mongoose.model('state',StateSchema);