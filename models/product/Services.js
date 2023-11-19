const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title:  String,
    category:String,
    type:String,
    value:String,
    serviceCode:String,
    hexCode:String,
    servicePrice:String,
    serviceUnit:String,
    servicePurchase:String,
    factoryCode:String,
    options:String,
    sort:String,
    description:String,
    imageUrl: String
})
module.exports = mongoose.model('services',ServiceSchema);