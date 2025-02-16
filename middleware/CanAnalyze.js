const tasks = require("../models/crm/tasks")

const CanAnalyze=async(orderNo)=>{
        const taskData = await tasks.findOne({orderNo:orderNo})
        if(taskData){
            if(taskData.taskStep == "cancel"||taskData.taskStep == "quote"){
                return(0)
            }
            else
                return(1)
        }   
        else
            return(0)
    }

module.exports =CanAnalyze