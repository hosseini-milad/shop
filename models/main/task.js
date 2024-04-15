const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TaskSchema = new Schema({
    userId:  String, // String is shorthand for {type: String}
    state:   String, 
    prior:   Number,
    priority:   String,
    date:{ type: Date ,default:Date.now()},
    progressDate:Date
})
module.exports = mongoose.model('Task',TaskSchema);