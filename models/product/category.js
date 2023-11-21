const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title:  String, // String is shorthand for {type: String}
    catCode:String,
    link:String,
    parent:String ,
    body:   String,
    description:String,
    color: String,
    imageUrl: String,
    thumbUrl: String,
    date: { type: Date, default: Date.now }
    
})
module.exports = mongoose.model('categories',CategorySchema);