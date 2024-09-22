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
const { error } = require('console');
const SepidarOrder = require('../middleware/SepidarOrder');
const MergeOrder = require('../middleware/MergeOrder');
const MergeCarts = require('../middleware/MergeCarts');
const ClassifyOrder = require('../middleware/ClassifyOrder');

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
    const crmId = crmData&&(crmData._id).toString()
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
            localField: "customer_Id", foreignField: "_id", as : "customerInfo"}},
        {$sort:{progressDate:-1}}
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
    const tasksToShow=[]
    for(var c=0;c<taskList.length;c++){ 
        var taskStep = taskList[c].taskStep
        var yesterday = new Date(Date.now() - 86400000); // that is: 24 * 60 * 60 * 1000
        var taskDate = taskList[c].progressDate?taskList[c].progressDate:
            taskList[c].date
        if(!taskList[c].progressDate){
            yesterday = new Date(Date.now() - 166400000)
        }
        if(taskStep=="archive")
            if( taskDate < yesterday)
                continue
        try{columns[taskStep].push(taskList[c]._id) 
            tasksToShow.push(taskList[c])
        }
        catch{}
        //columnOrder.find(item=>item.enTitle===taskStep)
    } 
    return({crmData:crmData,tasks:tasksToShow, crm:crmData,
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
    
        var sepidarAccept = 1
        var sepidarQuery = ''
        var sepidarResult = ''
        var userData = ''
        var adminData = ''
        if(status==="sepidar"){
            const faktorNo= "F123"+taskData.orderNo
            var sepidarResult = await SepidarOrder(orderNo)
            if(sepidarResult.Message)
                await tasks.updateOne({_id:ObjectID(taskId)},
            {$set:{taskStep:newStatus.enTitle,query:sepidarQuery,
                result:sepidarResult,progressDate:Date.now()}})
        }

         
        const userId=req.headers["userid"]
        const tasksList = await calcTasks(userId)
    try{
            res.json({taskData:tasksList,message:taskId?"Task Updated":"Task Created",
        result:sepidarResult,sepidarQuery:sepidarQuery,userData:adminData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/update-bulk',auth,jsonParser,async (req,res)=>{
    const orderList = req.body.orders
    const status = req.body.status
    if(!orderList||!orderList.length){
        res.status(400).json({error:true,message:"سفارش وارد نشده است"})
    }
    var result = []
    for(var i=0;i<orderList.length;i++){
        const orderData = await cart.findOne({cartNo:orderList[i].orderNo})
        const taskData = await tasks.findOne({taskNo:orderList[i].orderNo})
        if(taskData&&taskData.taskStep =="done"){
        const sepidarResult = await SepidarOrder(orderList[i])
        result.push(sepidarResult)
        }
        else{ 
            result.push({orderNo:orderList[i].orderNo,message:"وضعیت درست ارسال نشده است"})
        }
        
    }
    res.json({data:result,message:"بروزرسانی تجمعی"})
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
router.post('/find-bulk',auth,jsonParser,async (req,res)=>{
    var orderList = req.body.orders
    const status = req.body.status
    if(!orderList||!orderList.length){
        var orderListTemp = await tasks.find({taskStep:status})
        orderList = orderListTemp.map(item=>item.orderNo)

    }
    var result = []
    const orderData = await cart.aggregate([
        {$match:{cartNo:{$in:orderList}}}
    ])
    const taskData = await tasks.find({orderNo:{$in:orderList}})
    const mergeValue = await MergeCarts(orderData)
    const classOrder = await ClassifyOrder(mergeValue)
    res.json({data:mergeValue,classOrder,message:"اطلاعات تجمعی"})
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
            prior:req.body.prior,
            progressDate:Date.now()
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
        "CustomerRef": toInt(user.CustomerID),
        "AddressRef": user.AddressID,
        "CurrencyRef":1,
        "SaleTypeRef": data.payValue?toInt(data.payValue):3,
        "Duty":0.0000,
        "Description":faktorNo,
        "DescriptionRef":faktorNo,
        "Discount": data.discount>100?toInt(data.discount):0.00,
        "Items": 
        notNullCartItem.map((item,i)=>{
            const price = findPayValuePrice(item.price,data.payValue)
            const discount =item.discount?normalPriceDiscount(price,item.discount,1):0
            return({
            "ItemRef": toInt(item.id),
            "TracingRef": null,
            "Description":item.description,//item.title+"|"+item.sku,
            "StockRef":data.cartItems[i].stock?data.cartItems[i].stock:stock,
            "Quantity": toInt(item.count),
            "Fee": toInt(price),
            "Price": normalPriceCount(price,item.count,1),
            "Discount": discount?normalPriceCount(discount,item.count,1):0,
            "Tax": normalPriceCount(price-discount,item.count,TaxRate),
            "Duty": 0.0000,
            "Addition": 0.0000
          })})
        
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
const findPayValuePrice=(priceArray,payValue)=>{
    if(!priceArray)return(0)
    if(!payValue)payValue = 3
    var price = priceArray
    if(priceArray.length&&priceArray.constructor === Array)
        price=priceArray.find(item=>item.saleType==payValue).price
   
    return(price)

}
module.exports = router;