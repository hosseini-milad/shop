const tasks = require("../models/crm/tasks")
const cart = require("../models/product/cart")

const FindCurrentExist=async(itemId,cartNo,stockNo)=>{
    const currentTasks = await tasks.find({taskStep:{$nin:["cancel","archive","quote"]}})
   
    var stockId=stockNo?stockNo:"13"
    var countOrder =0
    for(var i=0;i<currentTasks.length;i++){
        if(currentTasks.isQuote) continue;
        if(currentTasks[i].orderNo == cartNo) continue
        const orderData = await cart.findOne({cartNo:currentTasks[i].orderNo,stockId:stockId})
        var cartItems = []
        if(orderData) cartItems = orderData.cartItems
        if(!cartItems) continue
        for(var j=0;j<cartItems.length;j++){
            
            if(cartItems[j].id === itemId){
                //validOrder.push(cartItems[j]) 
                countOrder+=parseInt(cartItems[j].count)
            }
        }
        
        //validOrder.push(validOrder)
    }
    return(countOrder)
    
    
}

module.exports =FindCurrentExist