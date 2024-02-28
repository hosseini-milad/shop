const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
var ObjectID = require('mongodb').ObjectID;
const multer = require('multer');
const fs = require('fs');
const user = require('../models/auth/users');
const customer = require('../models/auth/customers');
const payLog = require('../models/orders/payLog');
const tasks = require('../models/crm/tasks');
const ProfileAccess = require('../models/auth/ProfileAccess');
const orders = require('../models/orders/orders');


router.post('/fetch-user',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var userId = req.body.userId
    try{
        const userData = await user.findOne({_id: ObjectID(userId)})
       res.json({data:userData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/list',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
    try{const data={
        orderNo:req.body.orderNo,
        status:req.body.status,
        customer:req.body.customer,
        access:req.body.access,
        offset:req.body.offset,
        brand:req.body.brand
    }
        const reportList = await user.aggregate([
            { $match:data.access?{access:data.access}:{}},
        ])
        const filter1Report = data.customer?
        reportList.filter(item=>item&&item.cName&&
            item.cName.includes(data.customer)):reportList;
        const orderList = filter1Report.slice(offset,
            (parseInt(offset)+parseInt(pageSize)))  
        const accessUnique = [...new Set(filter1Report.map((item) => item.access))];
       res.json({filter:orderList,size:filter1Report.length,access:accessUnique})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/update-user',jsonParser,async (req,res)=>{
    var userId = req.body.userId
    const data={
        username:req.body.username,
        cName:req.body.cName,
        sName:req.body.sName,
        email:req.body.email,
        phone:req.body.phone,
        meli:req.body.meli,
        cCode:req.body.cCode,
        address:req.body.address,
        classess:req.body.classes,
        profile:req.body.profile,
        access:req.body.access,
    }
    try{
        const userData = await user.updateOne({_id: ObjectID(userId)},
        {$set:data})
       res.json({data:userData,success:"تغییرات اعمال شدند"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})

/*Customers*/
router.post('/fetch-customer',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var userId = req.body.userId
    try{
        const userData = await customer.findOne({_id: ObjectID(userId)})
       res.json({data:userData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/list-customers',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
    try{const data={
        orderNo:req.body.orderNo,
        status:req.body.status,
        customer:req.body.customer,
        access:req.body.access,
        offset:req.body.offset,
        brand:req.body.brand
    }
        const reportList = await customer.aggregate([
            { $match:data.access?{access:data.access}:{}},
        ])
        const filter1Report = data.customer?
        reportList.filter(item=>item&&item.cName&&
            item.cName.includes(data.customer)):reportList;
        const orderList = filter1Report.slice(offset,
            (parseInt(offset)+parseInt(pageSize)))  
        const accessUnique = [...new Set(filter1Report.map((item) => item.access))];
       res.json({filter:orderList,size:filter1Report.length,access:accessUnique})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/update-customer',jsonParser,async (req,res)=>{
    var userId = req.body.userId
    const data={
        cName:req.body.cName,
        email:req.body.email,
        mobile:req.body.mobile,
        meli:req.body.meli,
        cCode:req.body.cCode,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        about:req.body.about,
    }
    try{
        const userData = await customer.updateOne({_id: ObjectID(userId)},
        {$set:data})
       res.json({data:userData,success:"تغییرات اعمال شدند"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})

/*Profile*/
router.post('/fetch-profile',jsonParser,async (req,res)=>{
    var profileId = req.body.profileId
    try{
        const profileData = await ProfileAccess.findOne({_id: ObjectID(profileId)})
       res.json({data:profileData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
}) 
router.post('/list-profiles',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
    try{
        const data={
            rderNo:req.body.orderNo,
        }
        const profilesList = await ProfileAccess.find()
        res.json({profiles:profilesList})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/update-profile',jsonParser,async (req,res)=>{
    var profileId = req.body.profileId
    if(profileId==="new")profileId= ''
    const data={
        profileName: req.body.profileName,
        profileCode: req.body.profileCode,
        manId: req.body.manId,
        parentId: req.body.parentId,
        access: req.body.access,
    }
    try{
        //const profile = await ProfileAccess.find({_id: ObjectID(profileId)})
        var profileData = ''
        if(profileId)
           profileData = await ProfileAccess.updateOne({_id: ObjectID(profileId)},{$set:data})
        else
            profileData = await ProfileAccess.create(data)
        
       res.json({data:profileData,success:"تغییرات اعمال شدند"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})

router.get('/allow-menu',auth,jsonParser,async (req,res)=>{
    var userId = req.headers["userid"]
    if(!userId){
        res.status(500).json({error: "no Credit"})
    }
    try{
        const userData = await user.findOne({_id: ObjectID(userId)})
        const profileData = await ProfileAccess.findOne({_id: ObjectID(userData.profile)})
        
       res.json({access:profileData.access,message:"Profile List"})
    }
    catch(error){
        res.status(500).json({message: error.message})
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
    // to declare some path to store your converted image
    var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    response = {};
    if (matches.length !== 3) {
    return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    //let type = decodedImg.type;
    //let extension = mime.extension(type);
    let fileName = `MGM-${Date.now().toString()+"-"+req.body.imgName}`;
   var upUrl = `/upload/${folderName}/${fileName}`
    fs.writeFileSync("."+upUrl, imageBuffer, 'utf8');
    return res.send({"status":"success",url:upUrl});
    } catch (e) {
        res.send({"status":"failed",error:e});
    }
})

router.post('/transactions',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
    try{const data={
        orderNo:req.body.orderNo,
        status:req.body.status,
        customer:req.body.customer
    }
        const reportList = await payLog.aggregate([
            { $match:data.orderNo?{stockOrderNo:data.orderNo}:{}},
            
            { $match:data.status?{payStatus:data.status}:
                {payStatus:{$in:["paid","undone"]}}},
            {$sort:{"payDate":-1}}
        ]) 
        const filter1Report = /*data.customer?
        reportList.filter(item=>item&&item.cName&&
            item.cName.includes(data.customer)):*/reportList;
        const logList = filter1Report.slice(offset,
            (parseInt(offset)+parseInt(pageSize))) 
            for(var i=0;i<logList.length;i++){
                var orderData = await orders.aggregate([
                    {$match:{orderNo:logList[i].orderNo}},
                    {$addFields: { "user_Id": { $toObjectId: "$userId" }}},
                    {$lookup:{from : "customers", 
                    localField: "user_Id", foreignField: "_id", as : "userDetail"}}
                ])
                    logList[i].orderData = orderData
                logList[i].userDetail=[]
            }
       res.json({filter:logList,size:filter1Report.length})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})

router.post('/taskData', async (req,res)=>{
    const taskId=req.body.taskId
    try{
        const taskDetail =taskId&&await tasks.findOne({_id:taskId})
        const currentUser = taskDetail&&taskDetail.assign&&
            await user.findOne({_id:taskDetail.assign})
        const currentProfile = taskDetail&&taskDetail.profile&&
            await ProfileAccess.findOne({_id:taskDetail.profile})
        const profileList= await ProfileAccess.find()
        const userDetails= await user.find({profile:{$exists:true}})
        res.json({user:userDetails,currentAssign:currentUser?currentUser:currentProfile,
            profileList:profileList,message:"list users"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
module.exports = router;