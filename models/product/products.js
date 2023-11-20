const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title:  { type: String},
    sku: { type: String , unique: true},
    enTitle:String,
    productUrl:String,
    description:String,
    fullDesc:String,
    productMeta:String,
    metaTitle:String,
    ItemID:{ type: String , unique: true},
    
    config:String,
    uploadImage:String,
    imageUrl: {
        type:String
    },
    imgGallery:String,
    thumbUrl: {type:String},
    price:String,
    brandId:String,
    catId:String,
    sharifId:String
})
module.exports = mongoose.model('product',ProductSchema);