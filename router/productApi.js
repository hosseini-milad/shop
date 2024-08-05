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
const {StockId,SaleType} = process.env;
const bankAccounts = require('../models/product/bankAccounts');
const sepidarFetch = require('../middleware/Sepidar');
const NormalTax = require('../middleware/NormalTax');
const openOrders = require('../models/orders/openOrders');
const {TaxRate} = process.env

router.post('/getlist', async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"12";
    var offset = req.body.offset?(parseInt(req.body.offset)):0;

    const filter = req.body
    try{
        const catData = await category.findOne({link:filter.category})
        const allProducts = await productSchema.find(
            {catId:catData.catCode,enTitle:{$exists:true}})
        const availableItems = [];
        for(var a=0;a<allProducts.length;a++){

            const countDataRaw = await productCount.findOne(
                {ItemID:allProducts[a].ItemID,Stock:"21"})
            const countData =(countDataRaw&&countDataRaw.quantity)?
                parseInt(countDataRaw.quantity):0
            if(countData){
                allProducts[a].count = countData
                availableItems.push(allProducts[a])
            }

        }
        const products = availableItems.slice(offset,
            (parseInt(offset)+parseInt(pageSize)))  
        var quantity = []
        var price = []
        for(var i=0;i<products.length;i++){
            
            const priceData = await productPrice.findOne(
                {ItemID:products[i].ItemID,saleType:SaleType})
            products[i].price = priceData.price?NormalTax(priceData.price)/10:''
            
        }
        const categoryList = await category.find()

        res.json({data:products,message:"Products List",size:availableItems.length,
        pages:Math.floor(availableItems.length/parseInt(pageSize)),
        catData:catData,quantity:quantity,price:price,categories:categoryList})
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})
router.post('/getProduct', async (req,res)=>{
    const stockId="21"
    try{
        const productData = await productSchema.findOne({sku:req.body.sku})
        const catData = productData.catId&&await category.findOne({catCode:productData.catId})
        const quantity = await productCount.findOne(
            {ItemID:productData.ItemID,Stock:StockId})
        const price = await productPrice.findOne(
            {ItemID:productData.ItemID,saleType:SaleType})
        
        productData.price = price?NormalTax(price.price)/10:''
        productData.count = quantity?quantity.quantity:''  
        var openCount = 0
        const openList = await openOrders.find({sku:productData.sku,payStatus:"paid"})
        for(var c=0;c<openList.length;c++) openCount+= parseInt(openList[c].count)
        productData.openOrderCount = openCount
        //logger.warn("main done")
        res.json({data:productData,message:"Products List",
        quantity:quantity,price:price,categoryData:catData})
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})
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
router.post('/find-products', async (req,res)=>{
    const search = req.body.search
    try{  
        const searchProducts = await productSchema.
        aggregate([{$match:
            {$or:[
                {sku:{$regex: search, $options : 'i'}},
                {title:{$regex: search, $options : 'i'}}
            ]}
        },
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
        var searchProductResult=[]
        const cartList = await cart.find()
        const qCartList = await qCart.find()
        var index = 0
        for(var i=0;i<searchProducts.length;i++){
            var count = (searchProducts[i].countData.find(item=>item.Stock==='13'))
            var cartCount = findCartCount(searchProducts[i].sku,cartList.concat(qCartList))
            if(count)count.quantity = parseInt(count.quantity)-parseInt(cartCount)
            if(count&&count.quantity){
                index++
                searchProductResult.push({...searchProducts[i],
                    count:count})
                if(index===4)break
            }
        }
        res.json({products:searchProductResult})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/subcategory', async (req,res)=>{
    const catName = req.body.catName
    const limit = 4
    try{  
        const categoryData = await category.findOne({link:catName})
        const subCategory= categoryData?await category.find({"parent.link":categoryData.link}):[]
        const catPool = subCategory.map(item=>item.catCode)
        const catProduct = await productSchema.aggregate([
            {$match:{catId:{$in:catPool}}},
            {$limit:limit}
        ])
        var tempProduct = []
        for(var i =0 ;i<limit;i++){
            if(!catProduct[i])break
            var newProduct = catProduct[i]
            var tempData = await findPriceCount(catProduct[i])
            newProduct.price = tempData.price;
            newProduct.count=tempData.count
            tempProduct.push(newProduct)
        }
        res.json({catData:categoryData,
            subCategory:subCategory,
            catProduct:tempProduct})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

const findPriceCount=async(products)=>{
    const countData = await productCount.findOne(
        {ItemID:products.ItemID,Stock:StockId})
    const priceData = await productPrice.findOne(
        {ItemID:products.ItemID,saleType:SaleType})
    return({price:priceData.price?NormalTax(priceData.price)/10:'',
           count:countData?countData.quantity:''})
}

const findCartCount=(item,cart)=>{
    var cartCount =0
    for(var i=0;i<cart.length;i++){
        var cartItem =cart[i].cartItems 
        for(var c=0;c<cartItem.length;c++){
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

router.post('/cart', async (req,res)=>{
    const userId =req.body.userId?req.body.userId:req.headers['userid'];
    try{
        const cartDetails = await findCartFunction(userId)
        res.json(cartDetails)
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
    
    for(var c=0;c<cartData.length;c++){
       try{ cartDetail.push(findCartSum(cartData[c].cartItems))}catch{
        cartDetail.push({})
       }}
    if(qCartData) {
        try{qCartDetail =findQuickCartSum(qCartData.cartItems,qCartData.payValue)}
        catch{qCartDetail={}}
    }
    return({cart:cartData,cartDetail:cartDetail, message:"error",
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
    for (var i=0;i<cartItems.length;i++){try{
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
    }catch{}
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

router.post('/faktor', async (req,res)=>{
    const offset =req.body.offset?parseInt(req.body.offset):0 
    const userId =req.body.userId?req.body.userId:req.headers['userid'];
    try{
        const faktorTotalCount = await FaktorSchema.find().count()
        const faktorList = await FaktorSchema.aggregate
        ([
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
        const faktorData = await //FaktorSchema.findOne({faktorNo:faktorId})
        FaktorSchema.aggregate
        ([{$match:{faktorNo:faktorId},
        },
        {$lookup:{
            from : "customers", 
            localField: "customerID", 
            foreignField: "CustomerID", 
            as : "userData"
        }}])
        //logger.warn("main done")

        const OnlineFaktor = await sepidarFetch("data","/api/invoices/"+faktorId)
        res.json({faktor:OnlineFaktor})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/update-faktor',jsonParser, async (req,res)=>{
    const data={
        userId:req.body.userId?req.body.userId:req.headers['userid'],
        manageId:req.headers['userid'],
        date:req.body.date,
        progressDate:Date.now()
    }
    const cartID=req.body.cartID
    try{
        const cartList = await cart.aggregate
        ([{ $addFields: { "cartID": { "$toString": "$_id" }}},
        cartID.length?{$match:{cartID:{$in:cartID}}}:{$match:{}},
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
        }}])
        
        const faktorSeprate = totalCart(cartList)
        const faktorDetail = await IntegrateCarts(faktorSeprate)
        
        var sepidarQuery=[]
        var addFaktorResult=[]
        var faktorNo=0
        for(var i=0;i<faktorDetail.length;i++){
            faktorNo= await createfaktorNo("F","02","21")
            sepidarQuery[i] = await SepidarFunc(faktorDetail[i],faktorNo)
            addFaktorResult[i] = await sepidarPOST(sepidarQuery[i],"/api/invoices")
            
            if(!addFaktorResult[i]||addFaktorResult[0].Message||!addFaktorResult[i].Number){
                res.status(400).json({error:addFaktorResult[0].Message?addFaktorResult[0].Message:"error occure",
                    query:sepidarQuery[i],status:"faktor"})
                return
            }
            else{
                const cartDetail =findCartSum(faktorDetail[i].cartItems)
                await FaktorSchema.create(
                    {...data,faktorItems:faktorDetail[i].cartItems,
                        customerID:faktorDetail[i].userId,
                        faktorNo:faktorNo,
                        totalPrice:cartDetail.totalPrice,
                        totalCount:cartDetail.totalCount,
                        InvoiceNumber:addFaktorResult[i].Number,
                        InvoiceID:addFaktorResult[i].InvoiceID})
                await cart.deleteMany({_id:{$in:cartID}})
                
            }
        }
        const recieptQuery = await RecieptFunc(req.body.receiptInfo,addFaktorResult[0],faktorNo)
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
const roundNumber = (number)=>{
    var rawNumber = parseInt(number.toString().replace( /,/g, '')
    .replace(/\D/g,''))
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
        },
        {$limit:6}])
        if(!searchCustomer.length){
            searchCustomer = await customerSchema.
            aggregate([{$match:
                {$or:[
                    {username:{$regex: search, $options : 'i'}},
                    {Code:{$regex: search, $options : 'i'}}
                ]}
            },
            {$limit:6}])
        }
            
        //logger.warn("main done")
        res.json({customers:searchCustomer})
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

module.exports = router;