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
const ProfileAccess = require('../models/auth/ProfileAccess');
const FindAccess = require('../middleware/FindAccess');
const {TaxRate} = process.env
const cart = require('../models/product/cart');
const sepidarPOST = require('../middleware/SepidarPost');
const customers = require('../models/auth/customers');

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
    var admin = 0
    if(userData.access==="manager") admin = 1
    const userAccess = await FindAccess(userData.profile)
    const allow = userAccess.find(item=>item.title==="Tasks")
    if(!allow&&!admin)return

    //if(userData&&userData.access!=="manager") limitTask= userData.profile
    const crmData = await crmlist.findOne()
    const crmId = (crmData._id).toString()
    taskList = await tasks.aggregate([
        //{$match:limitTask?{profile:limitTask}:{}},
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
    var showColumn =[]
    var columns={} 
    for(var i=0;i<columnOrder.length;i++){
        const access =(userAccess.find(item=>item.title ===columnOrder[i].enTitle))
        //console.log(access)
        if(access||admin){
            columnOrder[i].access = admin?"edit":access.state
            showColumn.push(columnOrder[i])
            columns[columnOrder[i].enTitle]=[]
        }
        
    }
    //console.log(columns)
    for(var c=0;c<taskList.length;c++){ 
        var taskStep = taskList[c].taskStep
        try{columns[taskStep].push(taskList[c]._id) }
        catch{}
        //columnOrder.find(item=>item.enTitle===taskStep)
    } 
    return({crmData:crmData,tasks:taskList, crm:crmData,
        columnOrder:showColumn,columns:columns})
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
router.post('/update-tasks-status',auth,jsonParser,async (req,res)=>{
    const taskId = req.body._id?req.body._id:""
    var status = req.body.status
    const crmData = await crmlist.findOne({})
    const taskData = await tasks.findOne({_id:ObjectID(taskId)})
    const crmSteps = crmData.crmSteps
    const taskStatus = taskData.taskStep
    var newStatus = ''
    var index = crmSteps.findIndex(item=>item.enTitle===taskStatus)
    var nextStep = findNext(index,status)
    newStatus = crmSteps[nextStep]
    try{
        var sepidarAccept = 1
        var sepidarQuery = ''
        var sepidarResult = ''
        var userData = ''
        var adminData = ''
        if(status==="sepidar"){
            const faktorNo= "F123"+taskData.orderNo
            const cartData = await cart.findOne({cartNo:taskData.orderNo})
            userData = await customers.findOne({_id:ObjectID(cartData.userId)})
            adminData = await user.findOne({_id:ObjectID(cartData.manageId)})
            sepidarQuery = await SepidarFunc(cartData,faktorNo,
                userData.CustomerID?userData.CustomerID:adminData.CustomerID,adminData.StockId)
            sepidarResult = await sepidarPOST(sepidarQuery,"/api/invoices",adminData._id)
            
            if(sepidarResult.Message)
                sepidarAccept =0
            
        }
        //console.log(sepidarResult)
        //console.log(sepidarQuery)
        if(sepidarAccept){
            await tasks.updateOne({_id:ObjectID(taskId)},
            {$set:{taskStep:newStatus.enTitle,query:sepidarQuery,
                result:sepidarResult}})
        }

         
        const userId=req.headers["userid"]
        const tasksList = await calcTasks(userId)
       res.json({taskData:tasksList,message:taskId?"Task Updated":"Task Created",
        result:sepidarResult,sepidarQuery:sepidarQuery,userData:adminData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
const findNext=(index,status)=>{
    if(status=="accept"){
        if(index===0) return(2)
        else
            return(index+1)
    }
    if(status=="sepidar")
        return(6)
    if(status=="edit"){
        return(1)
    }
}
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

const SepidarFunc=async(data,faktorNo,user,stock)=>{
    const notNullCartItem = []
    for(var i=0;i<data.cartItems.length;i++)
        data.cartItems[i].count?
        notNullCartItem.push(data.cartItems[i]):''
    var query ={
        "GUID": "124ab075-fc79-417f-b8cf-2a"+faktorNo,
        "CustomerRef": toInt(user),
        "CurrencyRef":1,
        "SaleTypeRef": data.payValue?toInt(data.payValue):4,
        "Duty":0.0000,
        "Discount": data.discount>100?toInt(data.discount):0.00,
        "Items": 
        notNullCartItem.map((item,i)=>(
            {
            "ItemRef": toInt(item.id),
            "TracingRef": null,
            "Description":item.title+"|"+item.sku,
            "StockRef":stock,
            "Quantity": toInt(item.count),
            "Fee": toInt(item.price),
            "Price": normalPriceCount(item.price,item.count,1),
            "Discount": normalPriceDiscount(item.price,item.discount,item.count),
            "Tax": normalPriceCount(item.price,item.count,TaxRate),
            "Duty": 0.0000,
            "Addition": 0.0000
          }))
        
      }
    return(query)
}
const toInt=(strNum,count,align)=>{
    if(!strNum)return(0)
    
    return(parseInt(parseInt((align?"-":'')+strNum.toString().replace( /,/g, ''))*
    (count?parseFloat(count):1)))
}
const normalPriceCount=(priceText,count,tax)=>{
    if(!priceText||priceText === null||priceText === undefined) return("")
    var rawCount = parseFloat(count.toString())
    var rawTax = parseFloat(tax.toString())
    var rawPrice = Math.round(parseInt(priceText.toString().replace( /,/g, '')
        .replace(/\D/g,''))*rawCount*rawTax/1000)
    rawPrice = parseInt(rawPrice)*1000
    return(
      (rawPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace( /^\D+/g, ''))
    )
  }
const normalPriceDiscount=(priceText,discount,count)=>{
    if(!priceText||priceText === null||priceText === undefined) return(0)
    if(!discount) return(0)
    var rawCount = parseFloat(count.toString())
    var discount = parseInt(discount.toString())
    var newDiscount = discount
    if(discount<100)
        newDiscount = discount * rawCount * priceText /100
    rawPrice = parseInt(Math.round(newDiscount/1000))*1000
    return(rawPrice)
}
module.exports = router;