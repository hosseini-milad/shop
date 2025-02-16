const mongoose = require('mongoose');

const salePolicyGroupSchema = new mongoose.Schema(
	{
		name: { type: String },
		category: { type: String },
	},
	{ timestamps: true }
);

const salePolicyGroupModel = mongoose.model('salePolicyGroup', salePolicyGroupSchema);
module.exports = salePolicyGroupModel;
