const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
var ObjectID = require('mongodb').ObjectID;
const auth = require("../middleware/auth");
const logger = require('../middleware/logger');
const productSchema = require('../models/product/products');
const productcounts = require('../models/product/productCount');
const category = require('../models/product/category');
const cart = require('../models/product/cart');
const qCart = require('../models/product/quickCart');
const FaktorSchema = require('../models/product/faktor');
const customerSchema = require('../models/auth/customers');
const sepidarPOST = require('../middleware/SepidarPost');
const productCount = require('../models/product/productCount');
const cartLog = require('../models/product/cartLog');
const users = require('../models/auth/users');
const quickCart = require('../models/product/quickCart');
const bankAccounts = require('../models/product/bankAccounts');
const sepidarFetch = require('../middleware/Sepidar');
const products = require('../models/product/products');
const tasks = require('../models/crm/tasks');
const CheckSale = require('../middleware/CheckSale')
const profiles = require('../models/auth/ProfileAccess');
const CreateTask = require('../middleware/CreateTask');
const NewCode = require('../middleware/NewCode');
const customers = require('../models/auth/customers');
const brand = require('../models/product/brand');
const FindCurrentCart = require('../middleware/CurrentCart');
const FindCurrentExist = require('../middleware/CurrentExist');
const {TaxRate} = process.env

router.post('/products', async (req,res)=>{
    try{
        const allProducts = await productSchema.find()

        //logger.warn("main done")
        res.json({products:allProducts})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/list-products', async (req,res)=>{
    const filter = req.body.filters
    const brandId= filter?filter.brand:''
    const catId= filter?filter.category:''
    const subId = filter?filter.subCategory:''
    const stockId = req.body.stockId
    //const categoryData = await category.findOne({catCode:catId})
    const subChild = subId?[]:await category.find({"parent.catCode":catId})
    const subChildId = subChild.map(item=>item.catCode)
    
    var searchCat = ''
    if(subId)
        searchCat = {catId:subId}
    else{
        if(catId)
            if(subChildId&&subChildId.length)
                searchCat = {catId:{$in:subChildId}}
            else 
                searchCat = {catId:catId}
        else
            searchCat = {}
    }
    try{
        const products = await productSchema.aggregate([
            {$match:brandId?{brandId:brandId}:{}},
            {$match:searchCat},
            
            {$lookup:{
                from : "productprices", 
                localField: "ItemID", 
                foreignField: "ItemID", 
                as : "priceData"
            }},
            {$lookup:{
                from : "productcounts", 
                localField: "ItemID", 
                foreignField: "ItemID", 
                as : "countData"
            }}
        ])
        var showProduct=[]
        for(var i=0;i<products.length;i++){
            var count=products[i].countData&&
            products[i].countData.find(item=>item.Stock==stockId)
            if(count) count = count.quantity
            products[i].countData = count
            if(count)
                showProduct.push(products[i])
        }
        //console.log(showProduct)
        //logger.warn("main done")
        res.json({products:showProduct})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/list-filters', async (req,res)=>{
    try{
        const brandData = await brand.find()
        const catData = await category.find({parent:{$exists:false}})
        for(var i =0;i<catData.length;i++){
            var subCat = await category.find(
                {"parent._id":(catData[i]._id).toString()})
            catData[i].children = subCat
        } 
        //logger.warn("main done")
        res.json({brands:brandData,cats:catData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/find-products',auth, async (req,res)=>{
    const search = req.body.search
        const userData = await users.findOne({_id:req.headers['userid']})
        const stockId = userData.StockId?userData.StockId:"13"
        var filter =''
        //if(userData.group === "bazaryab") filter = "fs"
        const searchProducts = await productSchema.
        aggregate([{$match:
            search?{$or:[
                {sku:{$regex: search, $options : 'i'}},
                {title:{$regex: search, $options : 'i'}}
            ]}:{sku:{$exists:true}}
        },
        filter?{$match:{sku:{$in:[/fs/i,/cr/i,/pr/i]}}}:
            {$match:{sku:{$exists:true}}},
        {$lookup:{
            from : "productprices", 
            localField: "ItemID", 
            foreignField: "ItemID", 
            as : "priceData"
        }},
        {$lookup:{
            from : "productcounts", 
            localField: "ItemID", 
            foreignField: "ItemID", 
            as : "countData"
        }}])
        try{
        var searchProductResult=[]
        const cartList = {}//await cart.find(stockId?{stockId:stockId,}:{})
        var currentCart = {}//await FindCurrentCart(cartList)
        const qCartList = {}//await qCart.find(stockId?{stockId:stockId}:{})
        var index = 0
        for(var i=0;i<searchProducts.length;i++){
            var count = (searchProducts[i].countData.find(item=>item.Stock==stockId))
            var count3 = (searchProducts[i].countData.find(item=>item.Stock=="9"))
            var desc = ''
            var cartCount = 0&&findCartCount(searchProducts[i].sku,currentCart.concat(qCartList),stockId)
            if(count)count.quantity = parseInt(count.quantity)-parseInt(cartCount)
            if((count&&(count.quantity>0))||(count3&&(count3.quantity>0))){
                index++
                desc=searchProducts[i].title+
                "("+searchProducts[i].sku+")"+
                "___"+(count&&count.quantity)
            
                searchProductResult.push({...searchProducts[i],
                    count:count,description:desc})
                if(index===15)break
            }
        }
            res.json({products:searchProductResult})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/calc-count',auth, async (req,res)=>{
    const userData = await users.findOne({_id:req.headers['userid']})
    const stockId = userData.StockId?userData.StockId:"13"
    const sku = req.body.sku
    if(!sku){
        res.status(400).json({message:"not found"})
        return
    }
    try{ 
    const searchProducts = await productSchema.aggregate([
        {$match:{sku:sku}},
        {$lookup:{
            from : "productprices", 
            localField: "ItemID", 
            foreignField: "ItemID", 
            as : "priceData"
        }},
        {$lookup:{
            from : "productcounts", 
            localField: "ItemID", 
            foreignField: "ItemID", 
            as : "countData"
        }}])
        const cartList = await tasks.find({taskStep:{$nin:['archive']}})
        var currentCart = await FindCurrentCart(cartList.map(item=>item.orderNo))
        
        const qCartList = await qCart.find(stockId?{stockId:stockId}:{})
        for(var i=0;i<searchProducts.length;i++){
            var count = searchProducts[i].countData.find(item=>(item.Stock==stockId))
            var count3 = searchProducts[i].countData.find(item=>(item.Stock=="9"))
            var desc = ''
            count = count?count:0
            count3 = count3?count3:0
            var cartCount = findCartCount(searchProducts[i].sku,currentCart.concat(qCartList),stockId)
            //console.log(cartCount)
            const storeCount =count?parseInt(count.quantity):0
            const orderCount =parseInt(cartCount)
            if(count||count3){
                if(count)
                    count.quantity = storeCount-orderCount
                else if(count3)
                    count3.quantity = count3.quantity-orderCount 
                res.json({count,storeCount,orderCount,count3:count3?count3.quantity:0,
                    perBox:searchProducts[i].perBox?searchProducts[i].perBox:0})
                return
            }
            else{
                res.json({count:0,storeCount,orderCount})
                return
            }
        }
            
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const findCartCount=(item,cart)=>{
    var cartCount =0
    for(var i=0;i<cart.length;i++){
        var cartItem =cart[i].cartItems 
        for(var c=0;c<(cartItem&&cartItem.length);c++){
            if(cartItem[c].sku === item){
                cartCount=parseInt(cartCount)+parseInt(cartItem[c].count)
            }
        }
    }
    return(cartCount)
    
}
router.post('/update-product',jsonParser,auth, async (req,res)=>{
    const data={
        title:req.body.title,
        sku:req.body.sku,
        date:Date.now()
    }
    try{
        var status = "";
        const searchProduct = await productSchema.findOne({sku:data.sku})
        if(!searchProduct){
            await productSchema.create(data)
            status = "new product"
        }
        else{
            await productSchema.updateOne(
                {sku:data.sku},{$set:data})
            status = "update product"
        }
        const allProducts = await productSchema.find()
        //logger.warn("main done")
        res.json({products:allProducts,status:status})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/categories', async (req,res)=>{
    try{
        const allCategories = await category.find()

        //logger.warn("main done")
        res.json({categories:allCategories})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/update-category',jsonParser,auth, async (req,res)=>{
    const data={
        title:req.body.title,
        parent:req.body.parent,
        body:req.body.body,
        date:Date.now()
    }
    try{
        var status = "";
        const searchCategory = await category.findOne({catCode:req.body.catCode})
        if(!searchCategory){
            await category.create(data)
            status = "new category"
        }
        else{
            await category.updateOne(
                {catCode:req.body.catCode},{$set:data})
            status = "update category"
        }
        const allCategory = await category.find()
        res.json({categories:allCategory,status:status})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/cart',auth, async (req,res)=>{
    const userId =req.body.userId?req.body.userId:req.headers['userid'];
    try{
        const cartDetails = await findCartFunction(userId,req.headers['userid'])
        res.json(cartDetails)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const findCartFunction=async(userId,managerId)=>{
    const isSale = await CheckSale(managerId)
    try{ 
        const cartData = await cart.find({manageId:managerId,
        result:{$exists:false}})
        .sort({"initDate":-1}).limit(10).lean()
    const qCartData = await qCart.findOne({userId:userId})
    const qCartAdmin = await qCart.aggregate([
        {$match:{manageId:managerId}},
        
        {$match:{cartItems:{$ne:[]}}},

        { $addFields: { "userId": { "$toObjectId": "$userId" }}},
            {$lookup:{ 
                from : "customers", 
                localField: "userId", 
                foreignField: "_id", 
                as : "userInfo"
            }},
    ])
    //const userData = await customerSchema.findOne({userId:ObjectID(userId)})
    
    var cartDetail = []
    var qCartDetail = ''
    var description = ''
   for(var c=0;c<(cartData&&cartData.length);c++){
    
        try{
            for(var j=0;j<cartData[c].cartItems.length;j++){
                try{var cartTemp = cartData[c].cartItems[j]
                const cartItemDetail = findCartItemDetail(cartTemp,cartData[c].payValue)
                cartData[c].cartItems[j].total = cartItemDetail
                }
                catch{}
            }
            const userData = await customers.findOne({_id:ObjectID(cartData[c].userId)})
            cartData[c] = {...cartData[c],userData:userData}
            cartDetail.push(findCartSum(cartData[c].cartItems))
        }
    catch{}
        
   }
    if(qCartData) {
        qCartDetail =findQuickCartSum(qCartData.cartItems,
        qCartData.payValue,qCartData.discount)
    }
    return({cart:cartData,cartDetail:cartDetail,userData:"userData",isSale,
        quickCart:qCartData,qCartDetail:qCartDetail,qCartAdmin:qCartAdmin})
        }
    catch{
        return({cart:[],cartDetail:[],isSale,
            quickCart:'',qCartDetail:''})
    }
}
const findPayValuePrice=(priceArray,payValue)=>{
    if(!priceArray)return(0)
    if(!payValue)payValue = 3
    var price = priceArray
    if(priceArray.length&&priceArray.constructor === Array)
        price=priceArray.find(item=>item.saleType==payValue).price
   
    return(price)

}
const findCartItemDetail=(cartItem,payValue)=>{
    var cartItemPrice = findPayValuePrice(cartItem.price,payValue)
    var tax = 0
    var discount = 0
    var totalPrice = 0
    var count = cartItem.count
    if(cartItem.discount){
        var off = parseInt(cartItem.discount.toString().replace( /,/g, '').replace( /^\D+/g, ''))
        
        if(off>100)
            discount += off 
        else
            discount += parseInt(cartItemPrice)*
            count*(off)/100
        //console.log(off+": "+cartDiscount)
    }
    tax = (cartItemPrice*count - discount)*TaxRate
    totalPrice = (cartItemPrice*count - discount)*(1+TaxRate)
    return({price:cartItemPrice,tax:tax,
        total:totalPrice,discount:discount})
}
const findCartData=async(cartNo)=>{
    
    try{
        const cartData = await cart.findOne({cartNo:cartNo})
        var cartDetail = ''
    
        cartDetail=findQuickCartSum(cartData.cartItems,cartData.payValue,cartData.discount)
        //if(qCartData) qCartDetail =findQuickCartSum(qCartData.cartItems,qCartData.payValue)
   
    return({cart:[cartData],cartDetail:cartDetail})
        }
    catch{
        return({cart:[],cartDetail:[]})
    }
}
const findQuickCartSum=(cartItems,payValue,discount)=>{
    if(!cartItems)return({totalPrice:0,totalCount:0})
    var cartSum=0;
    var cartCount=0;
    var cartDescription = ''
    var cartDiscount = 0;
    for (var i=0;i<cartItems.length;i++){
        try{//console.log(payValue)
        var cartItemPrice = ''
        try{cartItemPrice =cartItems[i].price.find(item=>item.saleType===payValue).price
            .replace( /,/g, '').replace( /^\D+/g, '')}
        catch{cartItemPrice =cartItems[i].price&&cartItems[i].price
            .replace( /,/g, '').replace( /^\D+/g, '')}
        //console.log(cartItemPrice)
        var newCount = parseInt(cartItems[i].count.toString().replace( /,/g, '').replace( /^\D+/g, ''))
        if(cartItems[i].price) 
            cartSum+= parseInt(cartItemPrice)*newCount
        
        if(cartItems[i].count)
            cartCount+=newCount
        cartDescription += cartItems[i].description?cartItems[i].description:''
        
        if(cartItems[i].discount){
            var off = parseInt(cartItems[i].discount.toString().replace( /,/g, '').replace( /^\D+/g, ''))
            
            if(off>100)
                cartDiscount += off 
            else
                cartDiscount += parseInt(cartItemPrice)*
                newCount*(off)/100
            //console.log(off+": "+cartDiscount)
        }
    }catch{}

    }
    if(discount){
    if(parseInt(discount)>100)
        cartDiscount += parseInt(discount)
    else
        cartDiscount += discount&&
            (parseInt(cartSum)*
            parseInt(discount)/100)
    }
    const totalPriceNoTax = cartSum - cartDiscount
    return({totalFee:cartSum,
        totalCount:cartCount,
        totalDiscount:cartDiscount,
        totalTax:(totalPriceNoTax*TaxRate),
        totalPrice:(totalPriceNoTax*(1+TaxRate)),
        cartDescription:cartDescription})
}
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
router.post('/cartlist', async (req,res)=>{
    const userId =req.body.userId?req.body.userId:req.headers['userid'];
    const cartID=req.body.cartID
    try{
        const cartList = await cart.aggregate
        ([{$match:{manageId:userId}},
        { $addFields: { "manageId": { "$toObjectId": "$manageId" }}},
        
        {$lookup:{
            from : "customers", 
            localField: "userId", 
            foreignField: "Code", 
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
        }}])
    var cartTotal={cartPrice:0,cartCount:0}
        for(var i = 0;i<cartList.length;i++){
            if(cartList[i].cartItems&&cartList[i].cartItems.length){
                var cartResult = findCartSum(cartList[i].cartItems)
                cartList[i].countData=cartResult
            }
            else{
                cartList.splice(i,1)
            }
            if(!cartList[i].userData||!cartList[i].userData.length){
                //console.log(cartList[i].userData)
                var userData =await users.find({_id:ObjectID(cartList[i].userId)}).limit(1)
                cartList[i].userData=userData
            }
        }
        for(var i=0;i<cartList.length;i++){
            const found =(cartID&&cartID.find(item=>item===cartList[i]._id.toString()))
            if(found||!cartID.length){
            cartTotal.cartPrice+=cartList[i].countData?
            cartList[i].countData.totalPrice:0;
            cartTotal.cartCount+=cartList[i].countData?
            cartList[i].countData.totalCount:0;
            }
        }
        res.json({cart:cartList,
            cartTotal:cartTotal})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/cart-fetch', async (req,res)=>{
    const userId =req.body.userId?req.body.userId:req.headers['userid'];
    const cartID=req.body.cartID
    try{
        const cartList = await cart.aggregate
        ([{$match:{manageId:userId}},
          {$match:{_id:ObjectID(cartID)}},
        { $addFields: { "manageId": { "$toObjectId": "$manageId" }}},
        {$lookup:{
            from : "customers", 
            localField: "userId", 
            foreignField: "Code", 
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
        }}])
        var orderData={cartPrice:0,cartCount:0}
        var cartPrice = 0
        var cartItems = (cartList&&cartList[0].cartItems)?
            cartList[0].cartItems:[]
        for(var i = 0;i<cartItems.length;i++){
            cartPrice +=parseInt(cartItems[i].price)*
                cartItems[i].count
        }
        orderData.cartPrice=cartPrice
        
        res.json({cart:cartList,orderData:orderData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/cart-delete',auth, async (req,res)=>{
    const userId =req.headers['userid'];
    const cartID=req.body.cartID
    const adminData = await users.findOne({_id:ObjectID(userId)})
    try{
        if(adminData.access !== "manager"){
            res.status(500).json({message: "دسترسی ندارید",error:"deny"})
        }
        await cart.deleteOne({cartNo:cartID})
        await tasks.updateOne({orderNo:cartID},{$set:{taskStep:"cancel"}})
        
        
        res.json({message:"سفارش حذف شد"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/cart-find', async (req,res)=>{
    const cartNo=req.body.cartNo
    try{
        const cartList = await cart.aggregate
        ([{$match:{cartNo:cartNo}},
        { $addFields: { "manageId": { "$toObjectId": "$manageId" }}},
        { $addFields: { "userId": { "$toObjectId": "$userId" }}},
        {$lookup:{
            from : "customers", 
            localField: "userId", 
            foreignField: "_id", 
            as : "userData"
        }},
        {$lookup:{
            from : "users", 
            localField: "manageId", 
            foreignField: "_id", 
            as : "managerData"
        }}])
        const cartData =cartList&&cartList[0] 
        if(!cartData){
            res.status(400).json({error:"error",message:"آیتم ها با مشکل مواجه شدند"})
             return
        } 
        var cartItems = cartData.cartItems
        if(cartItems)
            for(var i=0;i<cartItems.length;i++){
            cartList[0].cartItems[i].total =findCartItemDetail(cartItems[i],cartData.payValue)
            
        }
        var orderData=findQuickCartSum(cartItems,cartData.payValue,
            cartData.discount)
        
        res.json({cart:cartList,orderData:orderData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/cartData', async (req,res)=>{
    const userId =req.body.userId?req.body.userId:req.headers['userid'];
    const cartNo=req.body.cartNo
    try{
        const cartList = await cart.aggregate
        ([
          {$match:{cartNo:cartNo}},
        { $addFields: { "manageId": { "$toObjectId": "$manageId" }}},
        { $addFields: { "userId": { "$toObjectId": "$userId" }}},
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
        }}])
        var orderData={totalPrice:0,totalCount:0}
        var cartPrice = 0
        var cartItem = 0
        var cartDiscount=0
        var cartItems = (cartList&&cartList[0].cartItems)?
            cartList[0].cartItems:[]
        for(var i = 0;i<cartItems.length;i++){
            cartPrice +=parseInt(cartItems[i].price.replace( /,/g, ''))*
                cartItems[i].count
            cartItem+=Number(cartItems[i].count)
            if(cartItems[i].discount){
                var off = parseInt(cartItems[i].discount.toString().replace( /,/g, '').replace( /^\D+/g, ''))
                if(off>100)
                    cartDiscount += off 
                else
                    cartDiscount += parseInt(cartItems[i].price)
                    *Number(cartItems[i].count)*(1+TaxRate)*off/100
            }
        }
        orderData.totalFee=cartPrice
        orderData.totalCount=cartItem
        orderData.totalDiscount=cartDiscount
        orderData.totalTax=cartPrice*TaxRate
        orderData.totalPrice=cartPrice*(1+TaxRate)-cartDiscount
        res.json({cart:cartList&&cartList[0],
            cartDetail:orderData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/cartRemove', async (req,res)=>{
    const userId =req.body.userId?req.body.userId:req.headers['userid'];
    const cartID=req.body.cartID
    try{
        const cartList = await cart.deleteOne({_id:ObjectID(cartID)})
        
        res.json({cart:cartList,message:"Cart Removed"})
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
        const userData = await users.findOne({_id:req.headers['userid']})
        const stockId = userData.StockId?userData.StockId:"13"
        var status = "";
        //const cartData = await cart.find({userId:userId})
        const qCartData = await quickCart.findOne({userId:userId})
        const availItems = await checkAvailable(req.body.cartItem,stockId)
        if(!availItems){
            res.status(400).json({error:"موجودی کافی نیست"}) 
            return
        }
        const cartItems = createCart(qCartData?qCartData.cartItems:[],
            req.body.cartItem)
        data.cartItems =(cartItems)
        if(!qCartData){
            cartLog.create({...data,ItemID:req.body.cartItem,action:"create"})
            await quickCart.create({...data,stockId:stockId})
            status = "new Cart"
        }
        else{
            cartLog.create({...data,ItemID:req.body.cartItem,action:"update"})
            await quickCart.updateOne(
                {userId:userId},{$set:data})
            status = "update cart"
        }
        const cartDetails = await findCartFunction(userId,req.headers['userid'])
        res.json({...cartDetails,message:"آیتم اضافه شد"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/update-desc',jsonParser, async (req,res)=>{
    const userId=req.body.userId?req.body.userId:req.headers['userid']
    const cartNo = req.body.cartNo
    const data={
        description:req.body.description,
        discount:req.body.discount,
        payValue:req.body.payValue
    }
    try{
        
        //const cartData = await cart.find({userId:userId})
        if(cartNo)
            await cart.updateOne({cartNo:cartNo},
            {...data})
        else
            await quickCart.updateOne({userId:userId},
            {...data})
        
        const cartDetails = cartNo?await findCartData(cartNo)
        :await findCartFunction(userId,req.headers['userid'])
        res.json({...cartDetails,message:"سبد بروز شد"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/edit-cart',jsonParser, async (req,res)=>{
    const userId =req.body.userId?req.body.userId:req.headers['userid']
    const data={
        
        payValue:req.body.payValue,
        date:req.body.date,
        progressDate:Date.now()
    }
    
        var status = "";
        //const cartData = await cart.find({userId:data.userId})
        const qCartData = await quickCart.findOne({userId:userId})
        const availItems = await checkAvailable(req.body.cartItem)
        
        if(!availItems){
            res.status(400).json({error:"موجودی کافی نیست"}) 
            return
        }
        const cartItems = editCart(qCartData,req.body.cartItem)
        data.cartItems =(cartItems)
        await quickCart.updateOne({userId:userId},{$set:data})
        status = "update cart"
        const cartDetails = await findCartFunction(userId,req.headers['userid'])
        res.json({...cartDetails,message:"آیتم ها بروز شدند"})
    try{}
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const checkAvailable= async(items,stockId)=>{

    //console.log(stockId)
    if(!stockId) stockId="13"
    const existItem = await productcounts.findOne({ItemID:items.id,Stock:stockId})
    const existItem3 = await productcounts.findOne({ItemID:items.id,Stock:"9"})
     

    if(!existItem&&!existItem3) return('')
    var totalCount = existItem?parseFloat(existItem.quantity):0
    totalCount += existItem3?parseFloat(existItem3.quantity):0
    
    const currentOrder = await FindCurrentExist(items.id)
    console.log("total: ",totalCount, "- order: ",currentOrder,
        "- req: ",items.count
    )
    var minusCount = currentOrder + items.count
    return(compareCount(totalCount,minusCount))
} 
const createCart=(cartData,cartItem)=>{
    var cartItemTemp=cartData?cartData:[]
    var repeat = 0
    for(var i=0;i<(cartItemTemp&&cartItemTemp.length);i++){
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
    for(var i=0;i<(cartItemTemp&&cartItemTemp.length);i++){
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
        const userCode = cartArray[i].userData[0]?
            cartArray[i].userData[0].CustomerID:
            cartArray[i].adminData[0].CustomerID
        const userAddress = cartArray[i].userData[0]?
            cartArray[i].userData[0].AddressID:
            cartArray[i].adminData[0].AddressID
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
            userTemp:cartArray[i].userId,
            userAddress:userAddress,
            userTotal:cartArray[i].userId,
            payValue:cartArray[i].payValue,
            stockId:cartArray[i].stockId?cartArray[i].stockId:"13",
            cartItems:cartArray[i].cartItems})
    }
    return(cartListTotal)
}
router.post('/update-Item',jsonParser, async (req,res)=>{
    const data={
        userId:req.body.userId?req.body.userId:req.headers['userid'],
        cartID:req.body.cartID,
        changes:req.body.changes,
        progressDate:Date.now()
    }
    try{
        var status = "";
        //const cartData = await cart.find({userId:data.userId})
        const qCartData = await quickCart.findOne({userId:data.userId})
        var oldCartItems = qCartData.cartItems
        for(var i=0;i<(oldCartItems&&oldCartItems.length);i++){
            if(!data.changes)break
            if(oldCartItems[i].id==data.cartID){
                
                if(data.changes.description)
                    oldCartItems[i].description = data.changes.description
                if(data.changes.count)
                    oldCartItems[i].count = data.changes.count
                if(data.changes.discount)
                    oldCartItems[i].discount = data.changes.discount

                const availItems = await checkAvailable(oldCartItems[i],"5")
                
                if(!availItems){
                    res.status(400).json({error:"موجودی کافی نیست"}) 
                    return
                }
            }
        }
        
        
        //const cartItems = removeCart(qCartData,req.body.cartID)
        //data.cartItems =(cartItems)
        cartLog.create({...data,ItemID:req.body.cartID,action:"delete"})
            await quickCart.updateOne(
                {userId:data.userId},{$set:{cartItems:oldCartItems}})
            status = "update cart"
        const cartDetails = await findCartFunction(data.userId,req.headers['userid'])
        res.json({...cartDetails,message:"آیتم بروز شد."})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/update-Item-cart',jsonParser, async (req,res)=>{
    const data={
        cartID:req.body.cartID,
        changes:req.body.changes,
        cartNo:req.body.cartNo,
        progressDate:Date.now()
    }
    try{
        var status = "";
        //const cartData = await cart.find({userId:data.userId})
        const CartData = await cart.findOne({cartNo:data.cartNo})
        var oldCartItems = CartData.cartItems
        var manId = await users.findOne({_id:ObjectID(CartData.manageId)})
        for(var i=0;i<oldCartItems.length;i++){
            if(!data.changes)break
            if(oldCartItems[i].id==data.cartID){
                if(data.changes.description)
                    oldCartItems[i].description = data.changes.description
                if(data.changes.count)
                    oldCartItems[i].count = data.changes.count
                if(data.changes.discount)
                    oldCartItems[i].discount = data.changes.discount
                //if(data.changes.stock)
                    oldCartItems[i].stock = data.changes.stock

                const availItems = await checkAvailable(oldCartItems[i],manId.StockId)
                if(!availItems){
                    res.status(400).json({error:"موجودی کافی نیست"}) 
                    return
                }
            }
        }
        
        
        //const cartItems = removeCart(qCartData,req.body.cartID)
        //data.cartItems =(cartItems)
        
        cartLog.create({...data,ItemID:req.body.cartID,action:"update"})
            await cart.updateOne(
                {cartNo:data.cartNo},{$set:{cartItems:oldCartItems}})
            status = "update cart"
        const cartDetails = await findCartData(data.cartNo)
        res.json({...cartDetails,message:"آیتم بروز شد."})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

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
        const cartDetails = await findCartFunction(data.userId,req.headers['userid'])
        res.json({...cartDetails,message:"آیتم حذف شد."})
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
        const cartDetails = await findCartFunction(userId,req.headers['userid'])
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
        //console.log(itemCount.quantity,count,cmpr)

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
        const isSale = await CheckSale(data.manageId)
        data.isSale = isSale
        //const cartAll = await cart.find()
        const userData = await customers.findOne({_id:ObjectID(userId)})
        const qCartData = await quickCart.findOne({userId:userId})
        
        data.payValue=qCartData&&qCartData.payValue
        data.description = qCartData&&qCartData.description
        data.discount = qCartData&&qCartData.discount
        const quickCartItems = qCartData&&qCartData.cartItems
        data.cartItems = quickCartItems
        const stockId = userData.StockId?userData.StockId:"5"
        
        const availItems = await checkCart(quickCartItems,stockId,data.payValue)
        
        
        if(availItems){
            res.status(400).json({error:availItems}) 
            return
        }
        //data.cartItems =pureCartPrice(quickCartItems,qCartData.payValue)
        data.cartNo = await NewCode(isSale?"s":"d")
        data.stockId = qCartData&&qCartData.stockId
        cartLog.create({...data,ItemID:req.body.cartID,action:"quick to cart"})
        await cart.create(data)
            status = "create cart"
        await quickCart.deleteOne({userId:data.userId})
        if(!isSale)
            await CreateTask("border",data,userData)
        const cartDetails = await findCartFunction(userId,req.headers['userid'])
        setTimeout(()=>res.json(cartDetails),3000)
        
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
const checkCart=async(cartItems,stockId,payValue)=>{
    const cartList = await tasks.find({taskStep:{$nin:['archive']}})
    var currentCart = await FindCurrentCart(cartList.map(item=>item.orderNo))
        
    const qCartList = await qCart.find(stockId?{stockId:stockId}:{})
    var checkCart=''
    for(var i =0;i<cartItems.length;i++){
        var sku = cartItems[i].sku
        const count = await findItemBySku(sku,currentCart.concat(qCartList),stockId,cartItems[i])
        const count3 = await findItemBySku(sku,currentCart.concat(qCartList),"9",cartItems[i])
        //console.log(count)
        if(count<0&&count3<0) 
            checkCart+=`sku: ${sku}, value: ${count} || `
    }
    return(checkCart)
    //const orders = await carts.
}
const findItemBySku=async(sku,cartItems,stockId,item)=>{
    var existCount =0
    const ItemID = item.price?item.price[0].ItemID:"0"
    const searchProducts = await productCount.find({ItemID:ItemID})
    var countSep = (searchProducts.find(item=>item.Stock==stockId))
    countSep = countSep?countSep.quantity:0
    var countCart = findCartCount(sku,cartItems,stockId)
    return(countSep-countCart)

}
router.post('/faktor', async (req,res)=>{
    const offset =req.body.offset?parseInt(req.body.offset):0 
    const userId =req.body.userId?req.body.userId:req.headers['userid'];
    try{
        const userDetail = await users.findOne({_id:req.headers['userid']})
        if(!userDetail){
            res.status(500).json({error: "access deny"})
            return
        }
        const access = userDetail.access
        const faktorTotalCount = await FaktorSchema.find(
            access==="manager"?{}:{manageId:userId}).count()
        const faktorList = await FaktorSchema.aggregate
        ([ {$match:access==="manager"?{}:{manageId:userId}},
        {$lookup:{
            from : "customers", 
            localField: "customerID", 
            foreignField: "CustomerID", 
            as : "userData"
        }},
        {$lookup:{
            from : "productcounts", 
            localField: "ItemID", 
            foreignField: "ItemID", 
            as : "countData"
        }},{$sort:{"initDate":-1}},
    {$skip:offset},{$limit:10}])
        //logger.warn("main done")
        res.json({faktor:faktorList,faktorCount:faktorTotalCount})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/faktor-find', async (req,res)=>{
    const faktorId =req.body.faktorId;
    try{
        const faktorData = await FaktorSchema.findOne({InvoiceID:faktorId})
        
        //logger.warn("main done")
        var userId=faktorData&&faktorData.manageId
        
        const OnlineFaktor = await sepidarFetch(data,"/api/invoices/"+faktorId,userId)
        const userDetail = await customerSchema.findOne({CustomerID:OnlineFaktor.CustomerRef})
        const invoice = OnlineFaktor.InvoiceItems
        if(!invoice)
            res.status(400).json({error: OnlineFaktor.Message})
        //var itemRefs=OnlineFaktor.InvoiceItems
        for(var i=0;i<invoice.length;i++){
            var faktorItem = invoice[i]
            var itemDetail = await products.findOne({ItemID:faktorItem.ItemRef})
            OnlineFaktor.InvoiceItems[i].itemDetail = itemDetail
            //itemRefs.push(faktorItem)
        }
        res.json({faktor:OnlineFaktor,userDetail:userDetail,itemRefs:invoice})
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})

router.post('/faktor-fetch', async (req,res)=>{
    const userId =req.body.userId?req.body.userId:req.headers['userid'];
    const faktorID=req.body.faktorID
    try{
        const faktorList = await FaktorSchema.aggregate
        ([
          {$match:{_id:ObjectID(faktorID)}},
        { $addFields: { "manageId": { "$toObjectId": "$manageId" }}},
        {$lookup:{
            from : "customers", 
            localField: "customerID", 
            foreignField: "CustomerID", 
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
        }}])
        var faktorData = faktorList&&faktorList[0]
        var faktorDetail = ''
        if(faktorData){
            faktorDetail = (faktorData.userId +" "+ faktorData.manageId)
            if(faktorData.userId != faktorData.manageId){
            var userShow = await users.findOne({_id:ObjectID(faktorData.userId)})
            faktorList[0].userData[0] = userShow
            }
        }
        var orderData={cartPrice:0,cartCount:0}
        var cartPrice = 0
        var cartItems = (faktorList&&faktorList[0].faktorItems)?
            faktorList[0].faktorItems:[]
        for(var i = 0;i<cartItems.length;i++){
            cartPrice +=parseInt(cartItems[i].price)*
                cartItems[i].count
        }
        orderData.cartPrice=cartPrice
        
        res.json({faktor:faktorList,orderData:orderData,faktorDetail:faktorDetail})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/update-faktor',jsonParser, async (req,res)=>{
    const userId =req.body.userId?req.body.userId:req.headers['userid']
    const data={
        //
        manageId:req.headers['userid'],
        date:req.body.date,
        progressDate:Date.now() 
    }
    const cartID=req.body.cartID
    try{
        const cartList = await cart.aggregate
        ([{$match:{manageId:userId}},
            { $addFields: { "cartID": { "$toString": "$_id" }}},
            (cartID&&cartID.length)?{$match:{cartID:{$in:cartID}}}:{$match:{}},
            { $addFields: { "manageId": { "$toObjectId": "$manageId" }}},
            
        {$lookup:{
            from : "customers", 
            localField: "userId", 
            foreignField: "Code", 
            as : "userData"
        }},
        {$lookup:{
            from : "users", 
            localField: "manageId", 
            foreignField: "_id", 
            as : "adminData"
        }}])
        const faktorSeprate = totalCart(cartList)
        const faktorDetail = await IntegrateCarts(faktorSeprate)
        
        var sepidarQuery=[]
        var addFaktorResult=[]
        var faktorNo=0
        for(var i=0;i<faktorDetail.length;i++){
            faktorNo= await createfaktorNo("F","02","21")
            sepidarQuery[i] = await SepidarFunc(faktorDetail[i],faktorNo)
            //console.log(sepidarQuery[i])
            addFaktorResult[i] = await sepidarPOST(sepidarQuery[i],"/api/invoices",req.headers['userid'])
            //console.log(addFaktorResult[i])
            if(!addFaktorResult[i]||addFaktorResult[0].Message||!addFaktorResult[i].Number){
                res.status(400).json({error:addFaktorResult[0].Message?addFaktorResult[0].Message:"error occure",
                    query:sepidarQuery[i],status:"faktor"})
                return
            }
            else{
                const cartDetail =findCartSum(faktorDetail[i].cartItems)
                await FaktorSchema.create(
                    {...data,faktorItems:faktorDetail[i].cartItems,
                        userId:faktorDetail[i].userTemp,
                        customerID:faktorDetail[i].userId,
                        faktorNo:faktorNo,
                        totalPrice:cartDetail.totalPrice,
                        totalCount:cartDetail.totalCount,
                        InvoiceNumber:addFaktorResult[i].Number,
                        InvoiceID:addFaktorResult[i].InvoiceID})
                
            }
        }
        
        (cartID&&cartID.length)?await cart.deleteMany({_id:{$in:cartID}}):
        await cart.deleteMany({manageId:userId})

        const recieptQuery = 1//await RecieptFunc(req.body.receiptInfo,addFaktorResult[0],faktorNo)
        const recieptResult = 1//await sepidarPOST(recieptQuery,"/api/Receipts/BasedOnInvoice")
        //const SepidarFaktor = await SepidarFunc(faktorDetail)
        if(!recieptQuery||recieptResult.Message){
            res.json({error:recieptResult.Message,query:recieptQuery,status:"reciept"})
                return
        }
        else{
            res.json({recieptInfo:faktorDetail,
                users:users,
                faktorInfo:addFaktorResult,
                faktorData:sepidarQuery,
                status:"done"})
            }
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const IntegrateCarts = async(carts)=>{
    var cartList=carts
    for(var i =0 ;i<cartList.length;i++){
        cartList[i].cartItems= setCart(cartList[i].cartItems)
        
    }
    return(cartList)
}
const setCart=(cartItems)=>{
    var tempCart=[]
    for(var i=0;i<cartItems.length;i++){
        repeat = 0
        for(var j=0;j<tempCart.length;j++){
            if(cartItems[i].id===tempCart[j].id){
                tempCart[j].count=parseInt(tempCart[j].count)+
                                    parseInt(cartItems[i].count)
                repeat=1
                break
            }
        }
        !repeat&&tempCart.push({...cartItems[i]})
    }
    return(tempCart)
}
const SepidarFunc=async(data,faktorNo)=>{
    const notNullCartItem = []
    for(var i=0;i<data.cartItems.length;i++)
        data.cartItems[i].count?
        notNullCartItem.push(data.cartItems[i]):''
    //console.log(data)
    var query ={
        "GUID": "124ab075-fc79-417f-b8cf-2a"+faktorNo,
        "CustomerRef": toInt(data.userId),
        "AddressRef": toInt(data.userAddress)?toInt(data.userAddress):'',
        "CurrencyRef":1,
        "Description":faktorNo,
        "DescriptionRef":faktorNo,
        "SaleTypeRef": data.payValue?toInt(data.payValue):4,
        "Duty":0.0000,
        "Items": 
        notNullCartItem.map((item,i)=>(
            {
            "ItemRef": toInt(item.id),
            "TracingRef": null,
            "Description":item.description,
            "StockRef":"5",//data.stockId,
            "Quantity": toInt(item.count),
            "Fee": toInt(item.price),
            "Price": normalPriceCount(item.price,item.count,1),
            "Discount": findDiscount(item),
            "Tax": normalPriceCount(item.price,item.count,TaxRate),
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
const updateCount = async(items)=>{
    for(var i=0;i<items.length;i++){
        await productCount.updateOne({ItemID:items[i].id,Stock:"13"},
            {$inc:{quantity:toInt(items[i].count,"1",-1)}})
    }
}
const returnUpdateCount = async(itemID,count)=>{
    await productCount.updateOne({ItemID:itemID,Stock:"13"},
        {$inc:{quantity:toInt(count)}})
    
}
const createfaktorNo= async(Noun,year,userCode)=>{
    var faktorNo = '';
    for(var i=0;i<10;i++){
        faktorNo = Noun+year+userCode+
        Math.floor(Math.random()* (99999 - 10000) + 10000)
        const findFaktor = await FaktorSchema.findOne({faktorNo:faktorNo})
        if(!findFaktor)
            return(faktorNo)
    }
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
const findDiscount=(item)=>{
    if(!item.discount) return(0.00)
    var off = Number(item.discount)
    var discount = off
    if(off<100){
        discount = Number(item.price) * Number(item.count) * discount/100
    }
    return(roundNumber(discount))
}
const roundNumber = (number)=>{
    var rawNumber = parseInt(number.toString().replace( /,/g, ''))
    return(parseInt(Math.round(rawNumber/1000))*1000)

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
router.post('/customer-find', async (req,res)=>{
    const search = req.body.search
    try{ 
        var searchCustomer = await users.
        aggregate([{$match:
            {$or:[
                {username:{$regex: search, $options : 'i'}},
                {Code:{$regex: search, $options : 'i'}}
            ]}
        }])
        //if(!searchCustomer.length){
        
        const searchUser = await customerSchema.
            aggregate([{$match:
                {$or:[
                    {username:{$regex: search, $options : 'i'}},
                    {Code:{$regex: search, $options : 'i'}}
                ]}
            }])
        //}
        const allUser = searchCustomer.concat(searchUser)  
        //logger.warn("main done")
        res.json({customers:allUser})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/bankCustomer', async (req,res)=>{
    const search = req.body.search
    try{ 
        var bankCustomer = await bankAccounts.find()
        
        res.json({bankList:bankCustomer})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/edit-addCart', async (req,res)=>{
    const cartNo=req.body.cartNo
    const data=req.body.data
    try{
        //const userData = await users.findOne({_id:req.headers['userid']})
        //const stockId = userData.StockId?userData.StockId:"13"
        var status = "";
        //const cartData = await cart.find({userId:userId})
        const CartData = await cart.findOne({cartNo:cartNo})
        
        const availItems = await checkAvailable(data,CartData.stockId)
        if(!availItems){
            res.status(400).json({error:"موجودی کافی نیست"}) 
            return
        }
        const cartItems = createCart(CartData?CartData.cartItems:[],
            data)
            CartData.cartItems =(cartItems)
        if(!CartData){
            
        }
        else{
            cartLog.create({...CartData,ItemID:data,action:"edit cart"})
            await cart.updateOne(
                {cartNo:cartNo},{$set:CartData})
            status = "edit cart"
        }
        const cartDetails = await findCartData(cartNo)
        res.json({...cartDetails,message:"آیتم اضافه شد"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/edit-removeCart',jsonParser, async (req,res)=>{
    const cartNo=req.body.cartNo
    const cartID=req.body.cartID
    
    try{
        var status = "";
        const cartData = await cart.findOne({cartNo:cartNo})
        const cartItems = removeCart(cartData,cartID)
        //cartData.cartItems =(cartItems)
        await cart.updateOne({cartNo:cartNo},
            {$set:{cartItems:cartItems}})
        //console.log(req.body.cartItem)
        cartLog.create({...cartData,ItemID:cartID,action:"edit delete"})
            
        const cartDetails = await findCartData(cartNo)
        res.json({...cartDetails,message:"آیتم حذف شد"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/edit-updateFaktor',jsonParser, async (req,res)=>{
    const data={
        //
        manageId:req.headers['userid'],
        date:req.body.date,
        progressDate:Date.now() 
    }
    const cartNo=req.body.cartNo
    try{
        const adminUser = await users.findOne({_id:ObjectID(req.headers["userid"])})
        
        if(!adminUser.access== "manager") {
            res.status(400).json({error:"no access"})
            return
        }
        const cartList = await cart.aggregate
        ([{$match:{cartNo:cartNo}},
            { $addFields: { "manageId": { "$toObjectId": "$manageId" }}},
            { $addFields: { "userId": { "$toObjectId": "$userId" }}},
            
        {$lookup:{
            from : "customers", 
            localField: "userId", 
            foreignField: "_id", 
            as : "userData"
        }},
        {$lookup:{
            from : "users", 
            localField: "manageId", 
            foreignField: "_id", 
            as : "adminData"
        }}])
        const faktorSeprate = totalCart(cartList)
        const faktorDetail = await IntegrateCarts(faktorSeprate)
        
        var sepidarQuery=[]
        var addFaktorResult=[]
        var faktorNo=0
        
        for(var i=0;i<faktorDetail.length;i++){
            faktorNo= await createfaktorNo("F","02","21")
            sepidarQuery[i] = await SepidarFunc(faktorDetail[i],faktorNo)
            
            addFaktorResult[i] = await sepidarPOST(sepidarQuery[i],"/api/invoices",req.headers['userid'])
            
            //console.log(addFaktorResult[i])
            if(!addFaktorResult[i]||addFaktorResult[0].Message||!addFaktorResult[i].Number){
                res.status(400).json({error:addFaktorResult[0].Message?addFaktorResult[0].Message:"error occure",
                    query:sepidarQuery[i],status:"faktor"})
                return
            }
            else{
                //console.log(addFaktorResult[i].Number)
                const cartDetail =findCartSum(faktorDetail[i].cartItems)
                await FaktorSchema.create(
                    {...data,faktorItems:faktorDetail[i].cartItems,
                        userId:faktorDetail[i].userTemp,
                        customerID:faktorDetail[i].userId,
                        faktorNo:faktorNo,
                        totalPrice:cartDetail.totalPrice,
                        totalCount:cartDetail.totalCount,
                        InvoiceNumber:addFaktorResult[i].Number,
                        InvoiceID:addFaktorResult[i].InvoiceID})
                
            }
        }
        
        await cart.deleteOne({cartNo:cartNo})
        

        const recieptQuery = 1//await RecieptFunc(req.body.receiptInfo,addFaktorResult[0],faktorNo)
        const recieptResult = 1//await sepidarPOST(recieptQuery,"/api/Receipts/BasedOnInvoice")
        //const SepidarFaktor = await SepidarFunc(faktorDetail)
        if(!recieptQuery||recieptResult.Message){
            res.json({error:recieptResult.Message,query:recieptQuery,status:"reciept"})
                return
        }
        else{
            res.json({recieptInfo:faktorDetail,
                users:users,
                faktorInfo:addFaktorResult,
                faktorData:sepidarQuery,
                status:"done"})
            }
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/edit-payValue',jsonParser, async (req,res)=>{
    const cartNo= req.body.cartNo;
    const data={
        userId:req.body.userId?req.body.userId:req.headers['userid'],
        payValue:req.body.payValue,
        date:req.body.date,
        progressDate:Date.now()
    }
    try{
        var status = "";
        cartNo?await cart.updateOne({cartNo:cartNo},{$set:{payValue:req.body.payValue}}):
            await quickCart.updateOne({userId:data.userId},{$set:data})
        status = "update cart"
        const cartDetails = cartNo?await findCartData(cartNo)
            :await findCartFunction(data.userId,req.headers['userid'])
        res.json({...cartDetails,message:"تغییرات ذخیره شد"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/sepidar-find',jsonParser, async (req,res)=>{
    const faktorId =req.body.faktorId;
    try{
        //const faktorData = await tasks.findOne({orderNo:cartId})
        //var faktorId = faktorData&&faktorData.result
        if(!faktorId){
            res.send({error:"not Found",message:"not found"})
            return
        }
        //logger.warn("main done")
        var userId=""
         
        const OnlineFaktor = await sepidarFetch("data","/api/invoices/"+faktorId) 
        
        const userDetail = await customerSchema.findOne({CustomerID:OnlineFaktor.CustomerRef,agent:{$exists:false}})
        const invoice = OnlineFaktor.InvoiceItems
        if(!invoice)
            res.status(400).json({error: OnlineFaktor.Message})
        //var itemRefs=OnlineFaktor.InvoiceItems
        for(var i=0;i<invoice.length;i++){
            var faktorItem = invoice[i]
            var itemDetail = await products.findOne({ItemID:faktorItem.ItemRef})
            OnlineFaktor.InvoiceItems[i].itemDetail = itemDetail
            //itemRefs.push(faktorItem)
        }
        res.json({faktor:OnlineFaktor,userDetail:userDetail,itemRefs:invoice})
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})
module.exports = router;