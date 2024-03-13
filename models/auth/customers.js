const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: { type: String},
  cName: { type: String},
  sName:{ type: String},
  phone: { type: String, unique: true },
  password: { type: String },
  meliCode:{type: String },
  mobile:{type: String },
  email: { type: String},
  oldEmail: { type: String},
  profile:{type:String},
  class: {type:Array,default:[]},
  access:{type:String},
  group: { type:String },
  credit: { type: String },
  token: { type: String },
  otp:{ type: String , default: null },
  nif: { type: String },
  agent:{ type: String },
  active:{ type: String },
  status:{ type: String },
  cCode:{ type: String },
  CustomerID:{ type: String },

  date:{type:Date} 
});

module.exports = mongoose.model("customers", customerSchema);