const mongoose = require("mongoose");

const publicLinks = new mongoose.Schema({
  creatorUserId: { type: String },
  expirationDate: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },
  cartNo: { type: String },
});

module.exports = mongoose.model("publicLinks", publicLinks);