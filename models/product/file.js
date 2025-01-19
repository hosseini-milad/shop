const mongoose = require('mongoose');


const FileSchema = new mongoose.Schema({
    fileName :  { type: String},
    uploadUrl: { type: String},
    fileType : { type: String},
    isActive : { type: Boolean ,default:false},
    isDefault: { type: Boolean , default:false},
    createAt:{type:Date,default:Date.now()}
    
})
module.exports = mongoose.model('files',FileSchema);