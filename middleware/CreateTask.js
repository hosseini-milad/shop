const crmlist = require("../models/crm/crmlist")
const tasks = require("../models/crm/tasks")


const CreateTask=async(type,data)=>{
    const crmId = await crmlist.findOne()
    if(!crmId) return('')
    const step = crmId.crmSteps.find(item=>item.index==1)
    await tasks.create({
        crmId: crmId._id,
        taskId:"ثبت سفارش "+data.cartNo,
        content:data.description,
        creator: data.manageId,
        customer: data.userId,
        taskStep:step.enTitle,
        orderNo:data.cartNo,
        prior:1,
        type:type,
    })
    return({message:"Task Created"})
}

module.exports =CreateTask