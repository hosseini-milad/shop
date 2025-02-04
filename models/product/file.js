const mongoose = require('mongoose');


const FileSchema = new mongoose.Schema({
    originalName : { type: String },
    mimetype : { type: String },
    imagePath: { type: String },
    thumbnailPath: { type: String },
    productName :{ type: String },
    size: { type: String },
    advType: { type: String },
    description:{ type: String },
    title: { type: String },
    isActive: { type: Boolean, default: true },
    createAt: { type: Date, default: Date.now() }

})
module.exports = mongoose.model('files', FileSchema);