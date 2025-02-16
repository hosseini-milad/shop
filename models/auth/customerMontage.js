const mongoose = require("mongoose");

const customerMontageSchema = new mongoose.Schema({
  userId: { type: String },

  goal: { type: String },
  propertyDestination: { type: String },
  proposersCount: { type: String },

  location: { type: String },
  bookAmount: { type: String },
  intendedFinancing: { type: String },
  entryAvailable: { type: String },
  intendedTerm: { type: String },
  notes: { type: String },

  date:{type:Date}
});

module.exports = mongoose.model("montagedetail", customerMontageSchema);