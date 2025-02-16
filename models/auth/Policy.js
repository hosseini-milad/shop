const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policyName: { type: String},
  policyCode: { type: String},

  userId: { type: String},
  class: { type: Object},

  category: { type: Object },
  brand:{ type: Object },
  factory:{ type: Object },
  filters: { type: Object},

  discount:{ type: String },

  status: { type: String},
  startDate:{ type: Date},
  endDate:{ type: Date },
  date: { type: Date , default:Date.now() }
});

module.exports = mongoose.model("policy", policySchema);