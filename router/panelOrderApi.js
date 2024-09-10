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
const users = require('../models/auth/users');
const Invoice = require('../models/product/Invoice');
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
    try{
        const data={
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

    const adminData = await users.findOne({_id:ObjectID(req.headers["userid"])})

    const dateFromEn = new Date(now2.setDate(now.getDate()-(data.dateFrom?data.dateFrom:1)));
    
    dateFromEn.setHours(0, 0, 0, 0)
    const dateToEn = new Date(now3.setDate(now.getDate()-(data.dateTo?data.dateTo:0)));
    const type= req.body.type
    dateToEn.setHours(23, 59, 0, 0)
    if(!adminData){
        res.status(400).json({error: "کاربر معتبر نیست"})
        return
    }
    var brandUnique=[]
    var resultData = []
    var fullSize = 0
    var isSale = 0
    var isWeb = 0
    var size = 0
    if(!type||type=="Visitor"){  
        if(adminData.access=="sale"){
            res.status(400).json({error: "دسترسی به این بخش ندارید"}) 
            return
        }  
        var showCart=[]
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
        { $match: {$or:[{isSale:{$exists:false}},{isSale:"0"}]}},
        { $match:!data.orderNo?{initDate:{$gte:new Date(data.dateFrom)}}:{}},
        { $match:!data.orderNo?{initDate:{$lte:new Date(data.dateTo)}}:{}},
        { $sort: {"initDate":-1}}
        
    ])
    for(var i=0;i<(cartList&&cartList.length);i++){
        if(data.customer){
            if(cartList[i].userInfo[0]){
                var userSimilar = cartList[i].userInfo[0].username&&
                cartList[i].userInfo[0].username.includes(data.customer)
                var phoneSimilar = cartList[i].userInfo[0].phone&&
                cartList[i].userInfo[0].phone.includes(data.customer)
                if(!userSimilar&&!phoneSimilar)
                    continue
            }
            else{
                continue
            }
        }
        var cartTask = cartList[i].taskInfo&&cartList[i].taskInfo[0]
        if(data.status){
            if(cartTask.taskStep !== data.status)
                continue 
        }
        var totalPrice=findCartSum(cartList[i].cartItems,
            cartList[i].payValue)
        showCart.push({...cartList[i],totalCart:totalPrice})
    } 
    brandUnique = [...new Set(showCart&&
        showCart.map((item) => item.brand))];
    size = showCart&&showCart.length
    const orderList = showCart&&showCart.slice(offset,
        (parseInt(offset)+parseInt(pageSize)))  
    
    resultData = orderList 
    }
    if(type=="WebSite"){
        isWeb = 1
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
        var filter1Report = data.customer?
        reportList.filter(item=>(item.userInfo[0]&&item.userInfo[0].cName&&
            item.userInfo[0].cName.includes(data.customer))):reportList;
            
        resultData = orderList
    }
    if(type=="Sale"){     
        if(adminData.access=="market"){
            res.status(400).json({error: "دسترسی به این بخش ندارید"})
            return 
        }  
        var isSale = 1
        var showCart=[]
        const openList = await carts.aggregate([
            { $addFields: { "userId": { "$toObjectId": "$userId" }}},
            {$lookup:{
                from : "customers", 
                localField: "userId", 
                foreignField: "_id", 
                as : "userInfo"
            }}, 
            { $match: {InvoiceID:{$exists:false}}},
            { $match: {isSale:"1"}},
            { $match:data.orderNo?{cartNo:new RegExp('.*' + data.orderNo + '.*')}:{}},
        
            { $match:!data.orderNo?{initDate:{$gte:new Date(data.dateFrom)}}:{}},
            { $match:!data.orderNo?{initDate:{$lte:new Date(data.dateTo)}}:{}},
            { $sort: {"initDate":-1}}
            ])
        for(var i=0;i<(openList&&openList.length);i++){
            var totalPrice=findCartSum(openList[i].cartItems,
                openList[i].payValue)
            showCart.push({...openList[i],totalCart:totalPrice})
        }
        brandUnique = [...new Set(showCart&&
            showCart.map((item) => item.brand))];
        size = showCart&&showCart.length
        const orderList = showCart&&showCart.slice(offset,
            (parseInt(offset)+parseInt(pageSize)))      
        resultData = orderList
    }
    if(type=="Invoice"){     
        if(adminData.access=="market"){
            res.status(400).json({error: "دسترسی به این بخش ندارید"})
            return 
        }  
        var showCart=[]
        const invoiceList = await Invoice.aggregate([
            {$lookup:{
                from : "customers", 
                localField: "CustomerRef", 
                foreignField: "CustomerID", 
                as : "userInfo"
            }}, 
            {$lookup:{
                from : "invoiceitems", 
                localField: "InvoiceID", 
                foreignField: "InvoiceID", 
                as : "invoiceItems"
            }},
            { $sort: {"Date":-1}}
            ])
        for(var i=0;i<(invoiceList&&invoiceList.length);i++){
            var totalPrice=findCartSum(invoiceList[i].cartItems,3)
            showCart.push({...invoiceList[i],totalCart:totalPrice})
        }
        size = showCart&&showCart.length
        const orderList = showCart&&showCart.slice(offset,
            (parseInt(offset)+parseInt(pageSize)))      
        resultData = orderList
    }

       res.json({filter:resultData,brand:brandUnique, isSale,
        size}) 
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