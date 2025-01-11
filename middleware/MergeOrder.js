const users = require("../models/auth/users")
const profiles = require("../models/auth/ProfileAccess")
var ObjectID = require('mongodb').ObjectID;

const MergeOrder=async(orderDetail,fullDetail)=>{
    var cart=[]
    for(var i=0;i<orderDetail&&orderDetail.length;i++){
        const payValue = fullDetail[i].payValue
        const orderData = orderDetail[i]
        for(var j=0;j<orderData&&orderData.length;j++){
            var orderSku = orderData[j].sku
            var index = -1
            if(cart&&cart.length){
                index = cart.findIndex(item=>item.sku == orderSku &&item.payValue==payValue)
            }
            if(index==-1){
                var desc = fullDetail[i].cartNo
                orderData[j].price=findPayValuePrice(orderData[j].price,payValue)
                cart.push({...orderData[j],payValue,desc})
            }
            else{ 
                var desc = cart[index].desc + "|"+fullDetail[i].cartNo
                cart[index].count = pureSum(cart[index].count,
                    orderData[j].count
                )
                //cart[index].desc = desc
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
const findPayValuePrice=(priceArray,payValue)=>{
    if(!priceArray)return(0)
    if(!payValue)payValue = 4
    var price = priceArray
    if(priceArray.length&&priceArray.constructor === Array)
        price=priceArray.find(item=>item.saleType==payValue).price
   
    return(price)

}

module.exports =MergeOrder