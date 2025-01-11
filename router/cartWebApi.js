const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
var ObjectID = require('mongodb').ObjectID;
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
const {TaxRate} = process.env
const CalcCart = require('../middleware/CalcCart');
const Faktor = require('../models/product/faktor');
const FaktorItems = require('../models/product/faktorItems');
const NewCode = require('../middleware/NewCode');
const customers = require('../models/auth/customers');


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
        finalCart = await sepCart.findOne({userId:userId})
        res.json({cart:finalCart,message:"محصول به سبد اضافه شد"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/removeItem', async (req,res)=>{
    const userId =req.headers['userid'];
    const sku = req.body.sku
    try{
        const cartDetails = await sepCart.deleteOne({userId:userId,sku:sku})
        
        res.json({cart:cartDetails,message:"محصول از سبد حذف شد"})
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
    //res.status(400).json({error:"call admin"})
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
        var totalCartData = await CalcCart(cartDetails)
        var totalPrice = totalCartData.totalPrice/10
        var totalCount = totalCartData.totalCount
        
        
        
        res.json({cart:cartDetails,totalprice:totalPrice,
            totalCount:totalCount})
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
router.post('/remove-cart',jsonParser, async (req,res)=>{
    const data={
        userId:req.headers['userid'],

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

router.get('/cart-to-Faktor',auth,jsonParser, async (req,res)=>{
    const userId = req.headers['userid']
    try{
        const userDetail = await customers.findOne({_id:ObjectID(userId)})
        if(!userDetail){
            res.status(400).json({error:"not valid user"})
            return
        }
        const cartDetails = await sepCart.find({userId:userId})
        var totalCartData = await CalcCart(cartDetails)
        const faktorNo = await NewCode("fw")
        const faktorQuery = {
            initDate: Date.now(),
            userId:userId,
            customerID:userDetail.CustomerID,
            customerName:userDetail.username,
            faktorNo:faktorNo,
        
            Status:"initial",
            NetPrice:totalCartData.totalPrice,
            totalCount:totalCartData.totalCount
        }
        var cartItems = []
        
        await Faktor.create(faktorQuery)
        
        for(var i=0;i<cartDetails.length;i++){
            var count = Number(cartDetails[i].count)
            var fee = Number(cartDetails[i].price)
            var tax = Number(TaxRate)
            var discount = cartDetails[i].discount?Number(cartDetails[i].discount):0
            var priceCount = fee*count
            var taxPrice = priceCount*tax
            const cartItem={
                initDate: Date.now(),
                sku:cartDetails[i].sku,
                Description:cartDetails[i].ItemId,
                ItemID:cartDetails[i].ItemId,
                discount:discount,
                faktorNo:faktorNo,
                price:priceCount,
                tax:taxPrice,
                netPrice:priceCount-discount,
                count:count
            }
            await FaktorItems.create(cartItem)
        }
        
        res.json({faktorQuery,tax,cartDetails,cartItems})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;