const mongoose = require('mongoose');


const FileSchema = new mongoose.Schema({
    fileName: { type: String },
    uploadUrl: { type: String },
    advType: { type: String },
    filetype: { type: String },
    title: { type: String },
    isActive: { type: Boolean, default: true },
    createAt: { type: Date, default: Date.now() }

})
module.exports = mongoose.model('files', FileSchema);