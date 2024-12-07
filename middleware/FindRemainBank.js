const users = require("../models/auth/users")
const profiles = require("../models/auth/ProfileAccess")
var ObjectID = require('mongodb').ObjectID;

const FindRemainBank=(transactions,total)=>{
    var remain = 0
    var totalPay = 0
    var orderPrice = total?total:1000000
    for(var i=0;i<(transactions&&transactions.length);i++){
        console.log(transactions[i].payValue)
        if(transactions[i]&&transactions[i].payValue)
            totalPay += parseInt(transactions[i].payValue)
    }
    var remain = orderPrice - totalPay
    return({remain,totalPay,orderPrice})
}

module.exports =FindRemainBank