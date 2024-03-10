const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title:  { type: String},
    sku: { type: String , unique: true},
    enTitle:String,
    description:String,
    ItemID:{ type: String , unique: true},
    
    config:String,
    uploadImage:String,
    imageUrl: {
        type:String
    },
    imgGallery:String,
    imgGalleryUrl:{
        type:String 
    },
    perBox:Number,
    price:String,
    categories:String
})
module.exports = mongoose.model('product',ProductSchema);