const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  city: { type: String},
  province:{ type: String},
  name: { type: String},
  mobile: { type: String },
  zip_code:{type: String },
  address:{type: String },
  location:{type: String },
  default:{type:Boolean},
  date:{type:Date,default:Date.now()} 
});

module.exports = mongoose.model("address", AddressSchema);