const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
var ObjectID = require('mongodb').ObjectID;

const ManSchema = require('../model/Order/manufacture');
const OrdersSchema = require('../model/Order/orders');
const UserSchema = require('../model/user');
const RXSchema = require('../model/Order/rx');

router.post('/sku/find',jsonParser,async (req,res)=>{
    try{
        const manData = await ManSchema.findOne({sku:req.body.sku});
        res.json(manData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}) 
router.post('/list',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
    var nowDate = new Date();
    try{const data={
        orderNo:req.body.orderNo,
        status:req.body.status,
        customer:req.body.customer,
        brand:req.body.brand,
        dateFrom:
            req.body.dateFrom?req.body.dateFrom[0]+"/"+
            req.body.dateFrom[1]+"/"+req.body.dateFrom[2]+" "+"00:00":
            new Date().toISOString().slice(0, 10)+" 00:00",
            //new Date(nowDate.setDate(nowDate.getDate() - 1)).toISOString().slice(0, 10)+" "+"00:00",
        dateTo:
            req.body.dateTo?req.body.dateTo[0]+"/"+
            req.body.dateTo[1]+"/"+req.body.dateTo[2]+" 23:59":
            new Date().toISOString().slice(0, 10)+" 23:59",
        pageSize:pageSize
    }
    //console.log(data.dateTo,data.dateFrom) 
    //console.log(data.dateTo&&data.dateTo[0]+"/"+data.dateTo[1]+"/"+data.dateTo[2]) 
    //var initIso = new Date();
    ////console.log(initIso)
    const nowIso=nowDate.toISOString();
    ////console.log(nowIso)
    const nowParse = Date.parse(nowIso);
    const now = new Date(nowParse)
    var now2 = new Date();
    var now3 = new Date();

    const dateFromEn = new Date(now2.setDate(now.getDate()-(data.dateFrom?data.dateFrom:1)));
    
    dateFromEn.setHours(0, 0, 0, 0)
    const dateToEn = new Date(now3.setDate(now.getDate()-(data.dateTo?data.dateTo:0)));
    
    dateToEn.setHours(23, 59, 0, 0)

    const reportList = await RXSchema.aggregate([
        {$lookup:{
            from : "users", 
            localField: "userId", 
            foreignField: "_id", 
            as : "userInfo"
        }},
        { $match:req.body.userId?{userId:ObjectID(req.body.userId)}:{}},
    { $match:data.status?{status:new RegExp('.*' + data.status + '.*')}:{status:{$not:{$regex:/^initial.*/}}}},
        { $match:data.orderNo?{rxOrderNo:new RegExp('.*' + data.orderNo + '.*')}:{}},
        { $match:data.brand?{brand:data.brand}:{}},
        { $match:{rxOrderNo:{$ne:null}}},
        { $match:!data.orderNo?{date:{$gte:new Date(data.dateFrom)}}:{}},
        { $match:!data.orderNo?{date:{$lte:new Date(data.dateTo)}}:{}},
        { $sort: {"date":-1}},
 
        ])
        const filter1Report = data.customer?
        reportList.filter(item=>item.userInfo[0]&&item.userInfo[0].cName&&
            item.userInfo[0].cName.includes(data.customer)):reportList;
        const orderList = filter1Report.slice(offset,
            (parseInt(offset)+parseInt(pageSize)))  
        const brandUnique = [...new Set(filter1Report.map((item) => item.brand))];
       res.json({filter:orderList,brand:brandUnique,
        size:filter1Report.length,rxStatus:rxStatus(reportList)})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/editRxOrder',jsonParser,async(req,res)=>{
    try{ 
        const data = {
            userId:req.body.userId,
            coridor:req.body.coridor
        }
        const rxDetail= await RXSchema.updateOne({rxOrderNo:req.body.rxorderNo},
            {$set:{...data}})
        
        res.json(rxDetail)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/rxStatus',jsonParser,async(req,res)=>{
    try{
        const userData = await UserSchema.findOne({_id:ObjectID(req.headers['userid'])})
        //console.log(userData)
        const filters=req.body.filters?
            req.body.filters
            //rxOrderNo:req.body.rxOrderNo?req.body.rxOrderNo:''
        :{}
        const date=req.body.date?{
            dateFrom:
                req.body.date.dateFrom?req.body.date.dateFrom[0]+"/"+
                req.body.date.dateFrom[1]+"/"+req.body.date.dateFrom[2]+" "+"00:00":
                new Date().toISOString().slice(0, 10)+" 00:00",
                //new Date(nowDate.setDate(nowDate.getDate() - 1)).toISOString().slice(0, 10)+" "+"00:00",
            dateTo:
                req.body.date.dateTo?req.body.date.dateTo[0]+"/"+
                req.body.date.dateTo[1]+"/"+req.body.date.dateTo[2]+" 23:59":
                new Date().toISOString().slice(0, 10)+" 23:59",
        }:{}
        console.log( 
            {
            ...filters
            });
        const rxData = await RXSchema//.find(filters)
        .find();
        console.log(rxData)
        const rxDataAll = rxData.length
        const rxDataInitial = findStatusCount(rxData,"initial")
        const rxDataInprogress = findStatusCount(rxData,"inprogress");
        const rxDataAccepted = findStatusCount(rxData,"accept");
        
        const rxDataQC = findStatusCount(rxData,"qc");
        const rxDataInproduction = findStatusCount(rxData,"inproduction");
        const rxDataFaktor = findStatusCount(rxData,"faktor");
        const rxDataSending = findStatusCount(rxData,"sending");
        const rxDataDelivered = findStatusCount(rxData,"delivered");
        const rxDataStoreSent = findStatusCount(rxData,"storeSent");
        const rxDataCompleted = findStatusCount(rxData,"completed");
        const rxDataCancel = findStatusCount(rxData,"cancel");
        const rxDataHold = findStatusCount(rxData,"hold");
        const rxDataSuspend= findStatusCount(rxData,"suspend");
        
        res.json({status:[
            {status:"all",count:rxDataAll},
            {status:"initial",count:rxDataInitial},
            {status:"inprogress",count:rxDataInprogress},
            {status:"accept",count:rxDataAccepted},
            {status:"qc",count:rxDataQC},
            {status:"inproduction",count:rxDataInproduction},
            {status:"faktor",count:rxDataFaktor},
            {status:"sending",count:rxDataSending},
            {status:"delivered",count:rxDataDelivered},
            {status:"suspend",count:rxDataSuspend},
            {status:"storeSent",count:rxDataStoreSent},
            {status:"hold",count:rxDataHold},
            {status:"completed",count:rxDataCompleted},
            {status:"cancel",count:rxDataCancel},
        ],
        userInfo:userData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const rxStatus=(orderList)=>{
    var statusList = [
        {status:"all",count:0},
        {status:"initial",count:0},
        {status:"inprogress",count:0},
        {status:"accept",count:0},
        {status:"qc",count:0},
        {status:"inproduction",count:0},
        {status:"faktor",count:0},
        {status:"sending",count:0},
        {status:"delivered",count:0},
        {status:"suspend",count:0},
        {status:"storeSent",count:0},
        {status:"hold",count:0},
        {status:"completed",count:0},
        {status:"cancel",count:0}]
    for(var index=0;index<statusList.length;index++)
        statusList[index].count = 
        findStatusCount(orderList,statusList[index].status)

    return(statusList)
}
const findStatusCount=(orderList,status)=>{
    var count = 0;
    for(var i=0;i<orderList.length;i++)
        if(orderList[i].status === status||status==="all")
            count++
    return count
}

module.exports = router;