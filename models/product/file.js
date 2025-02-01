const mongoose = require('mongoose');


const FileSchema = new mongoose.Schema({
    originalName : { type: String },
    path: { type: String },
    productName :{ type: String },
    path: { type: String },
    size: { type: String },
    advType: { type: String },
    filetype: { type: String },
    description:{ type: String },
    title: { type: String },
    isActive: { type: Boolean, default: true },
    createAt: { type: Date, default: Date.now() }

})
module.exports = mongoose.model('files', FileSchema);