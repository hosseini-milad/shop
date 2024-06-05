const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
var ObjectID = require('mongodb').ObjectID;
const orders = require('../models/orders/orders');
const carts = require('../models/product/cart')
const products = require('../models/product/products');
const { findQuickCartSum } = require('./faktorApi');
const {TaxRate} = process.env

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
            {$lookup:{
                from : "tasks", 
                localField: "cartNo", 
                foreignField: "orderNo", 
                as : "taskInfo"
            }},
            { $match:data.orderNo?{cartNo:new RegExp('.*' + data.orderNo + '.*')}:{}},
        
            { $match:!data.orderNo?{initDate:{$gte:new Date(data.dateFrom)}}:{}},
            { $match:!data.orderNo?{initDate:{$lte:new Date(data.dateTo)}}:{}},
            { $sort: {"initDate":-1}}
            ])
        const filter1Report = data.customer?
        reportList.filter(item=>item.userInfo[0]&&item.userInfo[0].cName&&
            item.userInfo[0].cName.includes(data.customer)):reportList;
        const orderList = filter1Report.slice(offset,
            (parseInt(offset)+parseInt(pageSize)))  
        
        const filterCart = data.customer?
        cartList.filter(item=>(item.userInfo[0]&&item.userInfo[0].username&&
            item.userInfo[0].username.includes(data.customer))):cartList;
        const cartListPage = filterCart.slice(offset,
            (parseInt(offset)+parseInt(pageSize))) 
        var showCart=[]
        for(var i=0;i<cartList.length;i++){
            var totalPrice=findCartSum(cartList[i].cartItems,
                cartList[i].payValue)
            
            showCart.push({...cartList[i],totalCart:totalPrice})
        }
        const brandUnique = [...new Set(filter1Report.map((item) => item.brand))];
       res.json({filter:orderList,brand:brandUnique, cartList:showCart,
        size:filter1Report.length,cartSize:cartList.length})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
const findCartSum=(cartItems,payValue)=>{
    if(!cartItems)return({totalPrice:0,totalCount:0})
    var cartSum=0;
    var cartCount=0;
    var cartDiscount = 0;
    var cartDescription = ''
    for (var i=0;i<cartItems.length;i++){
        //console.log(payValue)
        var cartItemPrice = findPayValuePrice(cartItems[i].price,payValue)
        //console.log(cartItemPrice)
        try{if(cartItems[i].price) 
            cartSum+= parseInt(cartItemPrice)*
            parseInt(cartItems[i].count.toString().replace( /,/g, '').replace( /^\D+/g, ''))
        if(cartItems[i].count)
            cartCount+=parseInt(cartItems[i].count.toString().replace( /,/g, '').replace( /^\D+/g, ''))
        cartDescription += cartItems[i].description?cartItems[i].description:''
        if(cartItems[i].discount){
            var off = parseInt(cartItems[i].discount.toString().replace( /,/g, '').replace( /^\D+/g, ''))
            if(off>100)
                cartDiscount += off 
            else
                cartDiscount += parseInt(cartItemPrice)
                *Number(cartItems[i].count)*
                (1+TaxRate)*(off)/100
        }
        }catch{}
    }
    return({totalFee:cartSum,
        totalCount:cartCount,
        totalDiscount:cartDiscount,
        totalTax:(cartSum*TaxRate),
        totalPrice:(cartSum*(1+TaxRate)-cartDiscount),
        cartDescription:cartDescription})
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