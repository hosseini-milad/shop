const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  cName: { type: String, required : true},
  sName:{ type: String, required : true},
  phone: { type: String , required : true},
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


  date:{type:Date}
});

module.exports = mongoose.model("user", userSchema);