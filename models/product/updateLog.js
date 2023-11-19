const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const UpdateLogSchema = new Schema({
    userId:{ type: String },
    updateQuery:  { type : String },
    
    date: { type: Date, default: Date.now }
})
module.exports = mongoose.model('updatelog',UpdateLogSchema);