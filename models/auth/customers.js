const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  cName: { type: String, required : true},
  sName:{ type: String},
  phone: { type: String},
  password: { type: String },
  meliCode:{type: String },
  email: { type: String},
  oldEmail: { type: String},
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

  nameCompany:{ type: String },
  firma:{ type: String },
  morada:{ type: String },
  nifCompany:{ type: String },
  phoneCompany:{ type: String },
  emailCompany:{ type: String },
  IBANCompany:{ type: String },

  date:{type:Date} 
});

module.exports = mongoose.model("customers", customerSchema);