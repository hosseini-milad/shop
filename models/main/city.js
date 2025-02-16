const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    cityName:  String,
    cityId:  String,
    stateId:String,
    date: { type: Date, default: Date.now }
    
})
module.exports = mongoose.model('city',CitySchema);