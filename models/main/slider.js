const mongoose = require('mongoose');

const SliderSchema = new mongoose.Schema({
    title:  String,
    enTitle:  String,
    description:   String,
    link:String,
    imageUrl: String,
    thumbUrl: String,
    date: { type: Date, default: Date.now }
    
})
module.exports = mongoose.model('sliders',SliderSchema);