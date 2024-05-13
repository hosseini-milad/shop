const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
var ObjectID = require('mongodb').ObjectID;
const orders = require('../models/orders/orders');
const carts = require('../models/product/cart')
const products = require('../models/product/products');

router.post('/sku/find',jsonParser,async (req,res)=>{
    try{
        const manData = await products.findOne({sku:req.body.sku});
        res.json(manData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}) 
router.post('/list',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)):0;
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
    const reportList = await orders.aggregate([
        {$lookup:{
            from : "customers", 
            localField: "userId", 
            foreignField: "_id", 
            as : "userInfo"
        }},
        //{ $match:req.body.userId?{userId:ObjectID(req.body.userId)}:{}},
        //{ $match:data.status?{status:new RegExp('.*' + data.status + '.*')}:{status:{$not:{$regex:/^initial.*/}}}},
        { $match:data.orderNo?{rxOrderNo:new RegExp('.*' + data.orderNo + '.*')}:{}},
        //{ $match:data.brand?{brand:data.brand}:{}},
        { $match:!data.orderNo?{date:{$gte:new Date(data.dateFrom)}}:{}},
        { $match:!data.orderNo?{date:{$lte:new Date(data.dateTo)}}:{}},
        { $sort: {"date":-1}},
 
        ])
        const cartList = await carts.aggregate([
            { $addFields: { "userId": { "$toObjectId": "$userId" }}},
            {$lookup:{
                from : "customers", 
                localField: "userId", 
                foreignField: "_id", 
                as : "userInfo"
            }},
            { $match:data.orderNo?{cartNo:new RegExp('.*' + data.orderNo + '.*')}:{}},
        
            { $match:!data.orderNo?{date:{$gte:new Date(data.dateFrom)}}:{}},
            { $match:!data.orderNo?{date:{$lte:new Date(data.dateTo)}}:{}},
            { $sort: {"initDate":-1}}
            ])
        const filter1Report = data.customer?
        reportList.filter(item=>item.userInfo[0]&&item.userInfo[0].cName&&
            item.userInfo[0].cName.includes(data.customer)):reportList;
        const orderList = filter1Report.slice(offset,
            (parseInt(offset)+parseInt(pageSize)))  
        const brandUnique = [...new Set(filter1Report.map((item) => item.brand))];
       res.json({filter:orderList,brand:brandUnique, cartList:cartList,
        size:filter1Report.length})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})

module.exports = router;