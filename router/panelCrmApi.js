const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
var ObjectID = require('mongodb').ObjectID;
const multer = require('multer');
const fs = require('fs');
const user = require('../models/auth/users'); 
const mime = require('mime');
const crmlist = require('../models/crm/crmlist');
const tasks = require('../models/crm/tasks');

router.post('/fetch-crm',jsonParser,async (req,res)=>{
    const userId=req.body.userId?req.body.userId:req.headers['userid']
    const crmId = req.body.crmId
    try{
        var userData = await user.findOne({_id: ObjectID(userId)})
        const crmList = await crmlist.findOne({_id:crmId})
       res.json({data:crmList})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/fetch-tasks',auth,jsonParser,async (req,res)=>{
    const crmId = req.body.crmId
    const userId = req.headers["userid"]
    try{ 
        const tasksList = await calcTasks(userId)

       res.json(tasksList)
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
const calcTasks=async(userId)=>{
    const userData = await user.findOne({_id:ObjectID(userId)})
    var limitTask='' 
    if(userData&&userData.access!=="manager") limitTask= userData.profile
    const crmData = await crmlist.findOne()
    const crmId = (crmData._id).toString()
    taskList = await tasks.aggregate([
        {$match:limitTask?{profile:limitTask}:{}},
        {$match:{crmId:crmId}},
        {$addFields: { "user_Id": { $convert: {input:"$assign" ,
    to:'objectId', onError:'',onNull:''}}}},
        {$lookup:{from : "users", 
            localField: "user_Id", foreignField: "_id", as : "userInfo"}},
        {$addFields: { "profile_Id": { $convert: {input:"$profile" ,
        to:'objectId', onError:'',onNull:''}}}},
        {$lookup:{from : "profiles", 
            localField: "profile_Id", foreignField: "_id", as : "profileInfo"}},
        {$addFields: { "creator_Id": { $convert: {input:"$creator" ,
        to:'objectId', onError:'',onNull:''}}}},
        {$lookup:{from : "users", 
            localField: "creator_Id", foreignField: "_id", as : "creatorInfo"}},
        {$addFields: { "customer_Id": { $convert: {input:"$customer" ,
        to:'objectId', onError:'',onNull:''}}}},
        {$lookup:{from : "customers", 
            localField: "customer_Id", foreignField: "_id", as : "customerInfo"}}
    ])
    //const taskList = await tasks.find({crmCode:crmData._id})
    const columnOrder =crmData&&crmData.crmSteps
    var columns={}
    for(var i=0;i<columnOrder.length;i++)
        columns[columnOrder[i].enTitle]=[]
    for(var c=0;c<taskList.length;c++){
        var taskStep = taskList[c].taskStep
        columns[taskStep].push(taskList[c]._id) 
        //columnOrder.find(item=>item.enTitle===taskStep)
    } 
    return({crmData:crmData,tasks:taskList, crm:crmData,
        columnOrder:columnOrder,columns:columns})
}
router.post('/update-tasks',auth,jsonParser,async (req,res)=>{
    const taskId = req.body._id?req.body._id:""
    var body = req.body
    delete body['checkList']
    try{
        if(taskId)
            await tasks.updateOne({_id:taskId},{$set:body})
        else{
            const crmData = await crmlist.findOne()
            const crmStep = crmData.crmSteps.find(item=>item.index==1)
            await tasks.create({...body,taskStep:crmStep.enTitle})
 
        }
        const userId=req.headers["userid"]
        const tasksList = await calcTasks(userId)
       res.json({taskData:tasksList,message:taskId?"Task Updated":"Task Created"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/update-checkList',auth,jsonParser,async (req,res)=>{
    const taskId = req.body._id?req.body._id:""
    const body = req.body
    try{
        if(taskId)
            await tasks.updateOne({_id:taskId},{$set:body})
        else{
            const crmData = await crmlist.findOne()
            const crmStep = crmData.crmSteps.find(item=>item.index==1)
            await tasks.create({...body,taskStep:crmStep.enTitle})
 
        }
        const userId=req.headers["userid"]
        const tasksList = await calcTasks(userId)
       res.json({taskData:tasksList,message:taskId?"Task Updated":"Task Created"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/list-crm',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)):0;
    try{const data=req.body

        const reportList = await crmlist.find()
         
       res.json({filter:reportList,size:reportList.length})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
}) 

router.post('/change-state',jsonParser,async (req,res)=>{
    try{
        const taskId=req.body.taskId
        const body = {
            taskStep:req.body.state,
            prior:req.body.prior
        }
        const task = await tasks.findOne({_id:taskId})
        const taskUpdate = await tasks.updateOne({_id:taskId},
            {$set:{...body}})
        
       res.json({task:task,filter:taskUpdate,message:"task Updated"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/update-crm',auth,jsonParser,async (req,res)=>{
    var crmId = req.body.crmId
    if(crmId==="new")crmId=""
    const data=req.body 
    try{ 
        const CrmItem = crmId&&await crmlist.findOne({_id:ObjectID(crmId)})
        if(CrmItem){
            const result = await crmlist.updateOne({_id:ObjectID(crmId)},{$set:data})
            res.json({data:result,message:"Updated"})
            return
        } 
        else{ 
            const result = await crmlist.create(data)
            res.json({data:result,message:"Created"})
            return
        }
    }
    catch(error){
        res.status(500).json({error: error})
    } 
})

var storage = multer.diskStorage(
    {
        destination: '/dataset/',
        filename: function ( req, file, cb ) {
            cb( null, "Deep"+ '-' + Date.now()+ '-'+file.originalname);
        }
    }
  );
  const uploadImg = multer({ storage: storage ,
    limits: { fileSize: "5mb" }})

router.post('/upload',uploadImg.single('upload'), async(req, res, next)=>{
    const folderName = req.body.folderName?req.body.folderName:"temp"
    try{
        const data = (req.body.base64image)
    // to declare some path to store your converted image
    var matches = await data.match(/^data:([A-Za-z-+./]+);base64,(.+)$/),
    response = {};
    if (matches.length !== 3) {
    return new Error('Invalid input string');
    } 
    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.extension(type);
    
    let fileName = `Sharif-${Date.now().toString()+"-"+req.body.imgName}`;
   var upUrl = `/uploads/${folderName}/${fileName}`
    fs.writeFileSync("."+upUrl, imageBuffer, 'utf8');
    return res.send({"status":"success",url:upUrl});
    } catch (e) {
        res.send({"status":"failed",error:e});
    }
})


module.exports = router;