const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title:  String, // String is shorthand for {type: String}
    link:String,
    type:String,
    
    catCode:String,
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'categories'},
    body:   String,
    description:String,
    color: String,
    children:Array,

    imageUrl: String,
    iconUrl:  String,
    thumbUrl:String,
    date: { type: Date, default: Date.now }
    
})
module.exports = mongoose.model('categories',CategorySchema);