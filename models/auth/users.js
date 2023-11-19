const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  cName: { type: String, required : true},
  sName:{ type: String, required : true},
  phone: { type: String , required : true},
  password: { type: String },
  bitrixCode:{type: String },
  email: { type: String , unique: true},
  oldEmail: { type: String},
  access:{
    type:String,
    enum:["manager","agent","agency","customer","request"]
  },
  group: { type:String },
  credit: { type: String },
  token: { type: String },
  otp:{ type: String , default: null },
  nif: { type: String },
  agent:{ type: String },
  active:{ type: String },
  status:{ type: String },
  Code:{ type: String },

  nameCompany:{ type: String },
  firma:{ type: String },
  morada:{ type: String },
  nifCompany:{ type: String },
  phoneCompany:{ type: String },
  emailCompany:{ type: String },
  IBANCompany:{ type: String },

  date:{type:Date}
});

module.exports = mongoose.model("user", userSchema);