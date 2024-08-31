const tasks = require("../models/crm/tasks");

const OrderToTask=async(orderNo)=>{
    const taskData = await tasks.findOne({orderNo:orderNo})
    return (taskData)
}

module.exports =OrderToTask