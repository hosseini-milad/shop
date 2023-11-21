const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const task = require('../models/main/task');
const LogCreator = require('../middleware/LogCreator');
const users = require('../models/auth/users');
const slider = require('../models/main/slider');

router.post('/sliders', async (req,res)=>{
    try{
        const SlidersList = await slider.find()
        res.json({filter:SlidersList,message:"slider list"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/fetch-slider', async (req,res)=>{
    var sliderId = req.body.sliderId?req.body.sliderId:''
    try{
        const SliderData = await slider.findOne({_id:sliderId})
        res.json({filter:SliderData,message:"slider Data"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/updateSlider',auth,jsonParser, async (req,res)=>{
    var sliderId = req.body.sliderId?req.body.sliderId:''
    if(sliderId === "new")sliderId=''
    try{ 
        const data = {
            title:  req.body.title,
            enTitle:  req.body.enTitle,
            link: req.body.link,
            description:   req.body.description,
            imageUrl: req.body.imageUrl,
            thumbUrl:req.body.thumbUrl
        }
        var sliderResult = ''
        if(sliderId) sliderResult=await slider.updateOne({_id:sliderId},
            {$set:data})
        else
        sliderResult= await slider.create(data)
        
        res.json({result:sliderResult,success:sliderId?"Updated":"Created"})
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