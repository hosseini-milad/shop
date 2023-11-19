const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    enTitle: String,
    icon:   String, 
})
module.exports = mongoose.model('Service',ServiceSchema);