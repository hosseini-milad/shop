const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const BrandSchema = new Schema({
    title:  String,
    enTitle:String,
    lenzIndex:[String],
    material: [String],
    Coating:[String],
    purchase:String,
    purchaseContact:String,
    imageUrl: String,
    brandUrl: String,
    description: String,
    fullDesc: String,
    brandCode:String,
    store: String,
})
module.exports = mongoose.model('brands',BrandSchema);