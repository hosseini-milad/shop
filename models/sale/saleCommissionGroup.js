const mongoose = require('mongoose');

const saleCommissionGroupSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true, index: true, required: true },
        percentage: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const saleCommissionGroupModel = mongoose.model('saleCommissionGroup', saleCommissionGroupSchema);
module.exports = saleCommissionGroupModel;
