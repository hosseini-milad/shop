const crmlist = require("../models/crm/crmlist")
const tasks = require("../models/crm/tasks")


const CreateTask=async(type,data,user)=>{
    const crmId = await crmlist.findOne()
    var address = user?user.Address:''
    if(address){
        var addressArray = address.split(' '||'-'||'_')
        if( addressArray.length>3)
        address = addressArray[0]+" "+addressArray[1]+" "+addressArray[2]
        else if(addressArray.length>1)
        address = addressArray[0]+" "+addressArray[1]
        
    }
    if(!crmId) return('')
    const step = crmId.crmSteps.find(item=>item.index==1)
    await tasks.create({
        crmId: crmId._id,
        taskId:"ثبت سفارش "+data.cartNo+`(${address})`,
        content:data.description,
        creator: data.manageId,
        customer: data.userId,
        taskStep:step.enTitle,
        orderNo:data.cartNo,
        //date:data.date,
        prior:1,
        date:Date.now(),
        type:type,
    })
    return({message:"Task Created"})
}

module.exports =CreateTask