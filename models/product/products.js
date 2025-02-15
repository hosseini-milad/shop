const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title:  { type: String},
    sku: { type: String , unique: true},
    enTitle:String,
    description:String,
    ItemID:{ type: String , unique: true},
    brandId:String,
    active:{ type: Boolean , default: true},
    unitID:String,
    catId:String,
    config:String,
    filters:{type:Object,default:{}},
    uploadImage:String,
    imageUrl: {
        type:String
    },
    thumbUrl: {
        type:String
    },
    imgGallery:String,
    imgGalleryUrl:{
        type:String 
    },
    perBox:Number,
    price:String,
    salePolicyGroupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'salePolicyGroup',
    },
    saleCommissionGroupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'saleCommissionGroup',
    },
    categories:String
})

const productModel = mongoose.model('product',ProductSchema);
module.exports = productModel;
