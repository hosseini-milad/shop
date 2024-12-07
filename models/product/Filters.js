const mongoose = require('mongoose');

const FilterSchema = new mongoose.Schema({
    title:  String,
    enTitle:String,
    type:String,
    multi:{type:Boolean,default:false},
    category:{type:Object},
    optionsP:{type:Array,default:[]},
    optionsN:{type:Array,default:[]},
    sort:String,
    data:{type:Date,default:Date.now()}
})
module.exports = mongoose.model('filters',FilterSchema);