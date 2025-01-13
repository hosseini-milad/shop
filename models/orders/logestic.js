const mongoose = require("mongoose");

const LogesticSchema = new mongoose.Schema({
  title: {type: String},
  code:{type:String},

  payValue:{type:Number},
  date:{ type: Date ,default:Date.now()}, 
});

module.exports = mongoose.model("logestic", LogesticSchema);