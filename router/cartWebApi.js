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
const CartToWebFaktor = require('../middleware/NewModule/CartToWebFaktor');
const faktor = require('../models/product/faktor');
const logestic = require('../models/orders/logestic');


router.post('/addToCart', async (req,res)=>{
    
    const userId =req.headers['userid'];
    const sku = req.body.sku
    const ItemID = req.body.ItemID
    try{
        if(!sku||!ItemID){
            res.status(400).json({error:"شناسه محصول وارد نشده است"})
            return
        }
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

router.get('/cart-detail',auth, async (req,res)=>{
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

router.get('/remove-cart',auth,jsonParser, async (req,res)=>{
    const data=req.headers['userid']
    try{
        const cartData = await sepCart.deleteMany({userId:data})
        res.json({cart:[]})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/cart-to-Faktor',auth,jsonParser, async (req,res)=>{
    const userId = req.headers['userid']
    try{
        const result = await CartToWebFaktor(userId)
        res.status(200).json(result)
    }
    
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/add-logestic',auth,jsonParser, async (req,res)=>{
    const data = req.body
    try{
        const result = await logestic.create(data)
        res.status(200).json({data:result})
    }
    
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/edit-logestic',auth,jsonParser, async (req,res)=>{
    const data = {
        title: req.body.title,
        code:req.body.code,
        payValue:req.body.payValue
    }
    const logId = req.body.logId
    if(!logId){
        res.status(400).json(
            {error:"شناسه وارد نشده است"}
        )
        return
    }
    try{
        const result = await logestic.updateOne({_id:ObjectID(logId)},{$set:data})
        res.status(200).json({data:result})
    }
    
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/logestic-list',auth,jsonParser, async (req,res)=>{
    try{
        const result = await logestic.find({})
        res.status(200).json({data:result})
    }
    
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/add-log-to-cart',auth,jsonParser, async (req,res)=>{
    const userId = req.headers['userid']
    const logCode = req.body.logCode
    const logAddress = req.body.logAddress
    try{
        const result = await customers.updateOne({_id:ObjectID(userId)},{$set:{logestic:logCode,logAddress}})
        res.status(200).json({data:result,message:"حمل و نقل اضافه شد"})
    }
    
    catch(error){
        res.status(500).json({error: error.message})
    }
})

router.post('/my-Faktors',auth,jsonParser, async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)):0;
    const userId = req.headers['userid']
    try{
        const result = await faktor.find(userId)
        const faktorList = result.slice(offset,
            (parseInt(offset)+parseInt(pageSize)))  
        res.status(200).json({data:faktorList,size:result.length})
    }
    
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;