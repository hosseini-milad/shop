const customers = require("../models/auth/customers")
const users = require("../models/auth/users")
const crmlist = require("../models/crm/crmlist")
const tasks = require("../models/crm/tasks")
const cart = require("../models/product/cart")
const CartToSepidar = require("./CartToSepidar")
var ObjectID = require('mongodb').ObjectID;
const sepidarPOST = require("./SepidarPost")


const SepidarOrder=async(orderNo)=>{
    const cartData = await cart.findOne({cartNo:orderNo})
    const faktorNo= "F123"+orderNo
    var userData = cartData.userId&&await customers.findOne({_id:ObjectID(cartData.userId)})
    var adminData = cartData.manageId&&await users.findOne({_id:ObjectID(cartData.manageId)})
    var sepidarQuery = await CartToSepidar(cartData.cartItems,faktorNo,
        userData.CustomerID?userData:adminData,adminData.StockId)
    

    var sepidarResult = await sepidarPOST(sepidarQuery,"/api/invoices",adminData._id)
    if(sepidarResult&&!sepidarResult.Message)
        await tasks.updateOne({orderNo:orderNo},
    {$set:{taskStep:"archive",query:sepidarQuery,
        result:sepidarResult,progressDate:Date.now()}})
    return(sepidarResult)
}

module.exports =SepidarOrder