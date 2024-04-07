const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: { type: String},
  cName: { type: String},
  sName:{ type: String},
  phone: { type: String, unique: true },
  password: { type: String },
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
  creator:{ type: String },
  roleId:{ type: String },
  active:{ type: String },
  status:{ type: String },
  cCode:{ type: String },
  CustomerID:{ type: String },
  Address:{ type: String },
  AddressID:{ type: String },
  meliCode:{ type: String },
  postalCode:{ type: String },

  official:{ type: String },
  status:{ type: String },
  Code:{ type: String },
  StockId:{ type: String },
  
  imageUrl1:{ type: String },
  imageUrl2:{ type: String },
  kasbUrl:{ type: String },
  shopUrl1:{ type: String },
  shopUrl2:{ type: String },
  shopUrl3:{ type: String },

  date:{type:Date} 
});

module.exports = mongoose.model("customers", customerSchema);