const mongoose = require('mongoose');

const SliderSchema = new mongoose.Schema({
    title:  String,
    description:   String,
    imageUrl: String,
    date: { type: Date, default: Date.now }
    
})
module.exports = mongoose.model('sliders',SliderSchema);