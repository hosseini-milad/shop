const tasks = require("../models/crm/tasks")
const cart = require("../models/product/cart")

const FindCurrentExist=async(itemId)=>{
    const currentTasks = await tasks.find({taskStep:{$nin:["cancel","archive"]}})
    
    var validOrder = []
    for(var i=0;i<currentTasks.length;i++){
        const orderData = await cart.findOne({cartNo:currentTasks[i].orderNo})
        const cartItems = orderData.cartItems
        for(var j=0;j<cartItems.length;j++){
            if(cartItems[j].sku === itemId){
                validOrder.push(cartItems[j]) 
            }
        }
        
        validOrder.push(validOrder)
    }
    return(validOrder)
    
    
}

module.exports =FindCurrentExist