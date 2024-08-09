const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  cName: { type: String},
  sName:{ type: String},
  phone: { type: String},
  password: { type: String },
  email: { type: String},
  oldEmail: { type: String},
  access:{
    type:String
  },
  group: { type:String },
  credit: { type: String },
  token: { type: String },
  otp:{ type: String , default: null },
  mobile: { type: String },
  classes:{ type: Array },
  profile:{ type: String },
  address:{ type: String },
  meli:{ type: String },

  StockId:{type:String},
  CustomerID:{type:String},
  date:{type:Date}
});

module.exports = mongoose.model("user", userSchema);