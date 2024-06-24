const tasks = require("../models/crm/tasks")
const carts = require("../models/product/cart")

const FindCurrentCart=async(cartList)=>{
    const orders = await carts.find({cartNo:{$in:cartList}})
    return(orders)
    var validCarts = []
    for(var i=0;i<cartList.length;i++){
        var currentTask = await tasks.findOne({orderNo:cartList[i].cartNo})
        if(!currentTask) continue 
        if(currentTask.taskStep!=='archive'){
            validCarts.push(cartList[i])
        }
    }
    return(validCarts)
    
    
}

module.exports =FindCurrentCart