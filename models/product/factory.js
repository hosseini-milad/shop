const mongoose = require('mongoose');

const FactorySchema = new mongoose.Schema({
    title:  String, // String is shorthand for {type: String}
    enTitle: String,
    date: { type: Date, default: Date.now }
    
})
module.exports = mongoose.model('factory',FactorySchema);