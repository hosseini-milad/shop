const tasks = require("../models/crm/tasks")

const CanAnalyze=async(step)=>{
        if(step){
            if(step == "cancel"||step == "quote"){
                return(0)
            }
            else
                return(1)
        }   
        else
            return(0)
    }

module.exports =CanAnalyze