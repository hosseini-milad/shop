const users = require("../models/auth/users")
const profiles = require("../models/auth/ProfileAccess")
var ObjectID = require('mongodb').ObjectID;

const FindRemainBank=async(transactions,total)=>{
    var remain = 0
    var totalPay = total
    for(var i=0;i<transactions.length;i++){
        remain ++
    }
    return({remain,totalPay})
}

module.exports =FindRemainBank