const users = require("../models/auth/users")
const profiles = require("../models/auth/ProfileAccess")
const prod = require("../models/auth/ProfileAccess");
const products = require("../models/product/products");
var ObjectID = require('mongodb').ObjectID;

const MergeCarts=async(orderDetail)=>{
    var cart=[]
    for(var i=0;i<orderDetail.length;i++){
        const orderData = orderDetail[i].cartItems
        for(var j=0;j<orderData.length;j++){
            var orderSku = orderData[j].sku
            const productData = await products.findOne({sku:orderSku})
            var index = -1
            if(cart&&cart.length)
                index = cart.findIndex(item=>item.sku == orderSku)
            if(index==-1)
                cart.push(orderData[j])
            else{ 
                cart[index].count = pureSum(cart[index].count,
                    orderData[j].count
                )
            }
        }
    } 
    return(cart)
}
const pureSum =(count1,count2)=>{
    var totalCount = 0
    totalCount += count1?parseInt(count1):0
    totalCount += count2?parseInt(count2):0
    return(totalCount)
}

module.exports =MergeCarts