const tasks = require("../models/crm/tasks")

const FindCurrentCart=async(cartList)=>{
    var validCarts = []
    for(var i=0;i<cartList.length;i++){
        var currentTask = await tasks.findOne({orderNo:cartList[i].cartNo})
        if(currentTask.taskStep!=='archive'){
            validCarts.push(cartList[i])
        }
        return(validCarts)
    }
    
    
    console.log("currentTask")
}

module.exports =FindCurrentCart