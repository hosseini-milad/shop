const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const task = require('../models/main/task');
const LogCreator = require('../middleware/LogCreator');
const users = require('../models/auth/users');

router.get('/report', async (req,res)=>{
    try{
        res.json({status:"report done"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/currentState',auth,jsonParser, async (req,res)=>{
    try{
        const allTasks= await task.aggregate([
            { $addFields: { "userId": { "$toObjectId": "$userId" }}},
            {$lookup:{
                from : "users", 
                localField: "userId", 
                foreignField: "_id", 
                as : "userDetail"
            }},{$sort:{prior:-1}}])
        const leadTask= await task.find({state:'lead'}).sort({'prior':1})
        const informationTask= await task.find({state:'informations'}).sort({'prior':1})
        const fiinTask= await task.find({state:'fiin'}).sort({'prior':1})
        
        const propertyTask= await task.find({state:'property'}).sort({'prior':1})
        const segurosTask= await task.find({state:'seguros'}).sort({'prior':1})
        const escrituraTask= await task.find({state:'escritura'}).sort({'prior':1})
        const commissionsTask= await task.find({state:'commissions'}).sort({'prior':1})
        const suspendedTask= await task.find({state:'suspended'}).sort({'prior':1})
        res.status(200).json({allTasks:allTasks,
            leadTask:leadTask,informationTask:informationTask,
            fiinTask:fiinTask,propertyTask:propertyTask,
            segurosTask:segurosTask,escrituraTask:escrituraTask,
            commissionsTask:commissionsTask,suspendedTask:suspendedTask
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/changeState',auth,jsonParser, async (req,res)=>{
    const data={
        state:req.body.state,
        prior:req.body.prior*5+1
    }
    try{
        const userData = await users.findOne({_id:req.headers['userid']})

    const logData = await LogCreator(userData,"change State",
        `task no ${req.body.id}'s state change to ${data.state}`)
        const leadTask= await task.updateOne({_id:req.body.id},
            {$set:data})
        //if(leadTask)
        res.json({status:"report done",data:leadTask})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/changeOrder',auth,jsonParser, async (req,res)=>{
    const tasks = req.body.tasks
    try{
        const userData = await users.findOne({_id:req.headers['userid']})

        const logData = await LogCreator(userData,"change Sort",
        `task sort by: ${tasks}`)
    
   for(var i = 0;i<tasks.length;i++){
    const updateState = await task.updateOne({_id:tasks[i]},{$set:{prior:i*5+3}})
    }
       
        //if(leadTask)
        res.json({status:"sort done"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
module.exports = router;