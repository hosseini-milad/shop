const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const logger = require('../middleware/logger');
const productSchema = require('../models/product/products');
const productPrice = require('../models/product/productPrice');
const productCount = require('../models/product/productCount');
const category = require('../models/product/category');
const cart = require('../models/product/cart');
const qCart = require('../models/product/quickCart');
const FaktorSchema = require('../models/product/faktor');
const customerSchema = require('../models/auth/customers');
const sepidarPOST = require('../middleware/SepidarPost');
const cartLog = require('../models/product/cartLog');
const users = require('../models/auth/users');
const quickCart = require('../models/product/quickCart');
const bankAccounts = require('../models/product/bankAccounts');
const sepidarFetch = require('../middleware/Sepidar');
const sepCart = require('../models/product/sepCart');
const NormalTax = require('../middleware/NormalTax');
const CalcCart = require('../middleware/CalcCart');

router.post('/addToCart', async (req,res)=>{
    const userId =req.headers['userid'];
    const sku = req.body.sku
    const ItemID = req.body.ItemID
    try{
        const cartDetails = await sepCart.findOne({userId:userId,sku:sku})
        if(cartDetails)
            await sepCart.updateOne({userId:userId,sku:sku},{
                progressDate: Date.now(),
                count:newCount(req.body.count,cartDetails.count)
            })
        else
            await sepCart.create({
                sku:  sku,
                initDate:  Date.now(),
                progressDate: Date.now(),
                userId:userId,
                ItemId:ItemID,
                count:req.body.count
            })
        res.json(cartDetails)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

const newCount=(count1,count2)=>{
    var outPut = 0;
    try{outPut += parseInt(count1)}catch{}
    try{outPut += parseInt(count2)}catch{}
    return(outPut)
}

router.post('/cart-detail', async (req,res)=>{
    const userId =req.headers['userid'];
    try{
        const cartDetails = await sepCart.aggregate([
            {$match:{userId:userId}},
            {$lookup:{
                from : "products", 
                localField: "sku", 
                foreignField: "sku", 
                as : "productData"
            }},
            
        ])
        var priceSet=[]
        var totalPrice = await CalcCart(orderData)
        
        
        
        res.json({cart:cartDetails,totalprice:totalPrice})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


const findCartFunction=async(userId)=>{
    
    try{
        const cartData = await cart.find({userId:userId}).sort({"initDate":-1})
    const qCartData = await qCart.findOne({userId:userId})
    var cartDetail = []
    var qCartDetail = ''
    var description = ''
    for(var c=0;c<cartData.length;c++)
        cartDetail.push(findCartSum(cartData[c].cartItems))
    if(qCartData) qCartDetail =findQuickCartSum(qCartData.cartItems,qCartData.payValue)
    return({cart:cartData,cartDetail:cartDetail,
        quickCart:qCartData,qCartDetail:qCartDetail})
        }
    catch{
        return({cart:[],cartDetail:[],
            quickCart:'',qCartDetail:''})
    }
}
const findQuickCartSum=(cartItems,payValue)=>{
    if(!cartItems)return({totalPrice:0,totalCount:0})
    var cartSum=0;
    var cartCount=0;
    var cartDescription = ''
    for (var i=0;i<cartItems.length;i++){
        //console.log(payValue)
        var cartItemPrice = ''
        try{cartItemPrice =cartItems[i].price.find(item=>item.saleType===payValue).price
            .replace( /,/g, '').replace( /^\D+/g, '')}
        catch{cartItemPrice =cartItems[i].price&&cartItems[i].price
            .replace( /,/g, '').replace( /^\D+/g, '')}
        //console.log(cartItemPrice)
        if(cartItems[i].price) 
            cartSum+= parseInt(cartItemPrice)*
            parseInt(cartItems[i].count.toString().replace( /,/g, '').replace( /^\D+/g, ''))
        if(cartItems[i].count)
            cartCount+=parseInt(cartItems[i].count.toString().replace( /,/g, '').replace( /^\D+/g, ''))
            cartDescription += cartItems[i].description?cartItems[i].description:''
    }
    return({totalPrice:cartSum,
        totalCount:cartCount,cartDescription:cartDescription})
}
const findCartSum=(cartItems,payValue)=>{
    if(!cartItems)return({totalPrice:0,totalCount:0})
    var cartSum=0;
    var cartCount=0;
    var cartDescription = ''
    for (var i=0;i<cartItems.length;i++){
        //console.log(payValue)
        var cartItemPrice = cartItems[i].price
            .replace( /,/g, '').replace( /^\D+/g, '')
        //console.log(cartItemPrice)
        if(cartItems[i].price) 
            cartSum+= parseInt(cartItemPrice)*
            parseInt(cartItems[i].count.toString().replace( /,/g, '').replace( /^\D+/g, ''))
        if(cartItems[i].count)
            cartCount+=parseInt(cartItems[i].count.toString().replace( /,/g, '').replace( /^\D+/g, ''))
            cartDescription += cartItems[i].description?cartItems[i].description:''
    }
    return({totalPrice:cartSum,
        totalCount:cartCount,cartDescription:cartDescription})
}
router.post('/cartlist', async (req,res)=>{
    const userId =req.body.userId?req.body.userId:req.headers['userid'];
    const cartID=req.body.cartID
    try{
        const cartList = await cart.aggregate
        ([
        { $addFields: { "userId": { "$toObjectId": "$userId" }}},
        { $addFields: { "manageId": { "$toObjectId": "$manageId" }}},
        {$lookup:{
            from : "customers", 
            localField: "userId", 
            foreignField: "_id", 
            as : "userData"
        }},
        {$lookup:{
            from : "users", 
            localField: "userId", 
            foreignField: "_id", 
            as : "adminData"
        }},
        {$lookup:{
            from : "users", 
            localField: "manageId", 
            foreignField: "_id", 
            as : "managerData"
        }},
    {$limit:10}])
    var cartTotal={cartPrice:0,cartCount:0}
        for(var i = 0;i<cartList.length;i++){
            if(cartList[i].cartItems&&cartList[i].cartItems.length){
                var cartResult = findCartSum(cartList[i].cartItems)
                cartList[i].countData=cartResult
            }
            else{
                cartList.splice(i,1)
            }
        }
        for(var i=0;i<cartList.length;i++){
            const found =(cartID&&cartID.find(item=>item===cartList[i]._id.toString()))
            if(found||!cartID.length){
            cartTotal.cartPrice+=cartList[i].countData.totalPrice;
            cartTotal.cartCount+=cartList[i].countData.totalCount;
            }
        }
        res.json({cart:cartList,
            cartTotal:cartTotal})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/update-cart',jsonParser, async (req,res)=>{
    const userId=req.body.userId?req.body.userId:req.headers['userid']
    const data={
        userId:userId,
        manageId:req.headers['userid'],
        date:req.body.date,
        payValue:req.body.payValue,
        progressDate:Date.now()
    }
    try{
        var status = "";
        //const cartData = await cart.find({userId:userId})
        const qCartData = await quickCart.findOne({userId:userId})
        const availItems = await checkAvailable(req.body.cartItem)
        if(!availItems){
            res.status(400).json({error:"موجودی کافی نیست"}) 
            return
        }
        const cartItems = createCart(qCartData?qCartData.cartItems:[],req.body.cartItem)
        data.cartItems =(cartItems)
        if(!qCartData){
            cartLog.create({...data,ItemID:req.body.cartItem,action:"create"})
            await quickCart.create(data)
            status = "new Cart"
        }
        else{
            cartLog.create({...data,ItemID:req.body.cartItem,action:"update"})
            await quickCart.updateOne(
                {userId:userId},{$set:data})
            status = "update cart"
        }
        const cartDetails = await findCartFunction(userId)
        res.json(cartDetails)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/edit-cart',jsonParser, async (req,res)=>{
    const data={
        userId:req.body.userId?req.body.userId:req.headers['userid'],
        payValue:req.body.payValue,
        date:req.body.date,
        progressDate:Date.now()
    }
    try{
        var status = "";
        //const cartData = await cart.find({userId:data.userId})
        const qCartData = await quickCart.findOne({userId:data.userId})
        const availItems = await checkAvailable(req.body.cartItem)
        if(!availItems){
            res.status(400).json({error:"موجودی کافی نیست"}) 
            return
        }
        const cartItems = editCart(qCartData,req.body.cartItem)
        data.cartItems =(cartItems)
        await quickCart.updateOne({userId:data.userId},{$set:data})
        status = "update cart"
        const cartDetails = await findCartFunction(data.userId)
        res.json(cartDetails)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/edit-payValue',jsonParser, async (req,res)=>{
    const data={
        userId:req.body.userId?req.body.userId:req.headers['userid'],
        payValue:req.body.payValue,
        date:req.body.date,
        progressDate:Date.now()
    }
    try{
        var status = "";
        await quickCart.updateOne({userId:data.userId},{$set:data})
        status = "update cart"
        const cartDetails = await findCartFunction(data.userId)
        res.json(cartDetails)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const checkAvailable= async(items)=>{
    const existItem = await productcounts.findOne({ItemID:items.id,Stock:"13"})
    //if(compareCount(existItem.quantity,items.count))
    return(compareCount(existItem.quantity,items.count))
}
const createCart=(cartData,cartItem)=>{
    var cartItemTemp=cartData?cartData:[]
    var repeat = 0
    for(var i=0;i<cartItemTemp.length;i++){
        if(cartItemTemp[i].id===cartItem.id){
            cartItemTemp[i].count=parseInt(cartItemTemp[i].count)+
                                  parseInt(cartItem.count)
            repeat=1
            break
        }
    }
    !repeat&&cartItemTemp.push({...cartItem,date:Date.now()})
    return(cartItemTemp)

}
const removeCart=(cartData,cartID)=>{
    if(!cartData||!cartData.cartItems)return([])
var cartItemTemp=cartData.cartItems
    for(var i=0;i<cartItemTemp.length;i++){
        if(cartItemTemp[i].id===cartID){
            cartItemTemp.splice(i,1)
            return(cartItemTemp)
        }
    }
}
const removeCartCount=(cartData,cartID,count)=>{
    if(!cartData||!cartData.cartItems)return([])
var cartItemTemp=cartData.cartItems
    for(var i=0;i<cartItemTemp.length;i++){
        if(cartItemTemp[i].id===cartID){
            cartItemTemp[i].count= parseInt(cartItemTemp[i].count)-parseInt(count)
            return(cartItemTemp)
        }
    }
}
const editCart=(cartData,cartItem)=>{
    if(!cartData||!cartData.cartItems)return([])
var cartItemTemp=cartData.cartItems
    for(var i=0;i<cartItemTemp.length;i++){
        if(cartItemTemp[i].id===cartItem.id){
            cartItemTemp[i].count = cartItem.count;
            if(cartItem.price)
                cartItemTemp[i].price = cartItem.price
            return(cartItemTemp)
        }
    }
}
const totalCart=(cartArray)=>{
    var cartListTotal =[]
    for(var i =0;i<cartArray.length;i++){
        const userCode = cartArray[i].adminData[0]?
            cartArray[i].adminData[0].CustomerID:
            cartArray[i].userData[0].CustomerID
        var repeat=0
        for(var j=0;j<cartListTotal.length;j++)
            if(userCode&&(userCode===cartListTotal[j].userId)){
                cartListTotal[j].cartItems.push(
                    ...cartArray[i].cartItems)
                cartListTotal[j].userTotal +="|"+cartArray[i].userId
                repeat=1
            break
        }
        !repeat&&cartListTotal.push({
            userId:userCode,
            userTotal:cartArray[i].userId,
            payValue:cartArray[i].payValue,
            cartItems:cartArray[i].cartItems})
    }
    return(cartListTotal)
}


router.post('/remove-cart',jsonParser, async (req,res)=>{
    const data={
        userId:req.body.userId?req.body.userId:req.headers['userid'],

        date:req.body.date,
        progressDate:Date.now()
    }
    try{
        var status = "";
        const cartData = await cart.find({userId:data.userId})
        const qCartData = await quickCart.findOne({userId:data.userId})
        const cartItems = removeCart(qCartData,req.body.cartID)
        data.cartItems =(cartItems)
        //console.log(req.body.cartItem)
        cartLog.create({...data,ItemID:req.body.cartID,action:"delete"})
            await quickCart.updateOne(
                {userId:data.userId},{$set:data})
            status = "update cart"
        const cartDetails = await findCartFunction(data.userId)
        res.json(cartDetails)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/return-cart',jsonParser, async (req,res)=>{
    const userId=req.body.userId?req.body.userId:req.headers['userid']
    const data={
        date:req.body.date,
        progressDate:Date.now()
    }
    try{
        var status = "";
        const cartData = await cart.findOne({_id:req.body.cartID})
        const cartItems = removeCartCount(cartData,req.body.itemId,req.body.count)
        data.cartItems =(cartItems)
        
        cartLog.create({...data,ItemID:req.body.cartID,action:"return"})
            await cart.updateOne(
                {_id:req.body.cartID},{$set:data})
            status = "Return "
        const cartDetails = await findCartFunction(userId)
        res.json(cartDetails)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const findNullCount=async(items,cart)=>{
    //console.log(items)
    for(var i=0;i<items.length;i++){
        const itemCount = await productCount.findOne({ItemID:items[i].id,Stock:'13'})
        var count = findCartCount(items[i].sku,cart)
        count+=parseInt(items[i].count)
        var cmpr = compareCount(itemCount.quantity,count)
        console.log(itemCount.quantity,count,cmpr)

    }
}
router.post('/quick-to-cart',jsonParser, async (req,res)=>{
    const userId=req.body.userId?req.body.userId:req.headers['userid']
    const data={
        userId:userId,
        manageId:req.headers['userid'],
        date:req.body.date,
        progressDate:Date.now()
    }
    try{
        var status = "";
        //const cartAll = await cart.find()
        
        const qCartData = await quickCart.findOne({userId:userId})
        data.payValue=qCartData.payValue
        const quickCartItems = qCartData&&qCartData.cartItems
        data.cartItems =pureCartPrice(quickCartItems,qCartData.payValue)
        cartLog.create({...data,ItemID:req.body.cartID,action:"quick to cart"})
        await cart.create(data)
            status = "create cart"
        await quickCart.deleteOne({userId:data.userId})
        const cartDetails = await findCartFunction(userId)
        res.json(cartDetails)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const pureCartPrice=(cartItem,payValue)=>{
    var cartItems = cartItem
    for(var c=0;c<cartItems.length;c++){
        try{
            cartItems[c].price = cartItem[c].price.find(item=>item.saleType===payValue).price
        }
        catch{
        }
    }
    return cartItems
}

const SepidarFunc=async(data,faktorNo)=>{
    const notNullCartItem = []
    for(var i=0;i<data.cartItems.length;i++)
        data.cartItems[i].count?
        notNullCartItem.push(data.cartItems[i]):''
    var query ={
        "GUID": "124ab075-fc79-417f-b8cf-2a"+faktorNo,
        "CustomerRef": toInt(data.userId),
        "CurrencyRef":1,
        "SaleTypeRef": data.payValue?toInt(data.payValue):4,
        "Duty":0.0000,
        "Discount": 0.0000,
        "Items": 
        notNullCartItem.map((item,i)=>(
            {
            "ItemRef": toInt(item.id),
            "TracingRef": null,
            "Description":item.title+"|"+item.sku,
            "StockRef":13,
            "Quantity": toInt(item.count),
            "Fee": toInt(item.price),
            "Price": normalPriceCount(item.price,item.count,1),
            "Discount": 0.0000,
            "Tax": normalPriceCount(item.price,item.count,"0.09"),
            "Duty": 0.0000,
            "Addition": 0.0000
          }))
        
      }
    return(query)
}
const RecieptFunc=async(data,FaktorInfo,faktorNo)=>{
    var query ={
        "GUID": "124ab075-fc79-417f-b8cf-2a"+faktorNo,
        "InvoiceID": toInt(FaktorInfo.InvoiceID),
        "Description": toInt(FaktorInfo.Number),
        "Date":new Date(),
        "Drafts": 
          data.filter(n => n).map((pay,i)=>(
            {
            "BankAccountID": toInt(pay.id),
            "Description": pay.title,
            "Number": pay.Number?pay.Number:"000",
            "Date":new Date(),
            "Amount": toInt(pay.value)
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

const minusInt=(quantity,minus)=>{
    if(!quantity)return(0)
    
    return(parseInt(quantity.replace(/\D/g,''))-
    parseInt(minus.replace(/\D/g,'')))
}
const compareCount=(count1,count2)=>{
    return(parseInt(count1.toString().replace(/\D/g,''))>=
    (parseInt(count2.toString().replace(/\D/g,''))))
} 


module.exports = router;