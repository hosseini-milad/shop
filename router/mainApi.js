const express = require('express');
const router = express.Router()
const { default: fetch } = require("node-fetch");
const slider = require('../models/main/slider');
const authApi = require('./authApi');
const taskApi = require('./taskApi');
const yasApi = require('./yasApi');
const appApi = require('./appApi');
const cartApi= require('./cartApi');
const settingApi = require('./settingApi');
const productApi = require('./productApi');
const formApi = require('./formApi');
const userApi = require('./userApi');
const panelUserApi = require('./panelUserApi')
const panelProductApi = require('./panelProductApi')
const sepidarFetch = require('../middleware/Sepidar');
const products = require('../models/product/products');
const productPrice = require('../models/product/productPrice');
const productCount = require('../models/product/productCount');
const customers = require('../models/auth/customers');
const schedule = require('node-schedule');
const bankAccounts = require('../models/product/bankAccounts');
const updateLog = require('../models/product/updateLog');
const { ONLINE_URL} = process.env;
 
router.get('/main', async (req,res)=>{
    try{
        const sliders = await slider.find()

        //logger.warn("main done")
        res.json({sliders:sliders})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.use('/auth', authApi)
router.use('/task', taskApi)
router.use('/setting', settingApi)
router.use('/app', appApi)
router.use('/cart', cartApi)
router.use('/product', productApi)
router.use('/form', formApi)
router.use('/user', userApi)

router.use('/yas', yasApi)
router.use('/panel/user', panelUserApi)
router.use('/panel/product', panelProductApi)
0&&schedule.scheduleJob('0 0 * * *', async() => { 
    response = await fetch(ONLINE_URL+"/sepidar-product",
        {method: 'GET'});
    response = await fetch(ONLINE_URL+"/sepidar-price",
        {method: 'GET'});
    response = await fetch(ONLINE_URL+"/sepidar-quantity",
        {method: 'GET'});
    response = await fetch(ONLINE_URL+"/sepidar-users",
        {method: 'GET'});
    response = await fetch(ONLINE_URL+"/sepidar-bank",
        {method: 'GET'});
 })
router.get('/sepidar-product', async (req,res)=>{
    const url=req.body.url
    try{
        const sepidarResult = await sepidarFetch("data","/api/Items")
        
        if(sepidarResult.error||!sepidarResult.length){
            res.json({error:"error occure",
                data:sepidarResult,message:"خطا در بروزرسانی"})
            return
        }
        await products.deleteMany({})
        var successItem=[];
        var failure = 0;
        for(var i = 0;i<sepidarResult.length;i++){
            const createResult = await products.create({
                sku:sepidarResult[i].Code,
                title:sepidarResult[i].Title,
                ItemID:sepidarResult[i].ItemID,
                date:new Date()})
                if(createResult)
                successItem.push(createResult)
        }
        
        await updateLog.create({
            updateQuery: "sepidar-product" ,
            date:Date.now()
        })
        res.json({sepidar:sepidarResult.length,message:"محصولات بروز شدند"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/sepidar-customer', async (req,res)=>{
    const url=req.body.url
    try{
        const sepidarResult = await sepidarFetch("data","/api/Customers")
 
        if(sepidarResult.error||!sepidarResult.length){
            res.json({error:"error occure",
                data:sepidarResult,message:"خطا در بروزرسانی"})
            return
        }
        await customers.deleteMany({})
        var successItem=[];
        var failure = 0;
        for(var i = 0;i<sepidarResult.length;i++){
            const createResult = await customers.create({
                username: sepidarResult[i].Title,
                cName: sepidarResult[i].Name,
                sName: sepidarResult[i].LastName,
                phone: sepidarResult[i].PhoneNumber,
                meliCode: sepidarResult[i].NationalID,
                email: sepidarResult[i].Code+"@sharifoilco.com",
                access:"customer",
                cCode:sepidarResult[i].Code,
                CustomerID:sepidarResult[i].CustomerID,
                date:new Date()})
                if(createResult)
                successItem.push(createResult)
        }
        
        await updateLog.create({
            updateQuery: "sepidar-customer" ,
            date:Date.now()
        })
        res.json({sepidar:sepidarResult.length,message:"کاربران بروز شدند"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/sepidar-price', async (req,res)=>{
    try{
        const sepidarPriceResult = await sepidarFetch("data","/api/PriceNoteItems")
        if(sepidarPriceResult.error||!sepidarPriceResult.length){
            res.json({error:"error occure",
                data:sepidarPriceResult,message:"خطا در بروزرسانی"})
            return
        }
        //var successItem=[];
        //var failure = 0;
        await productPrice.deleteMany({})
        for(var i = 0;i<sepidarPriceResult.length;i++){
            //sepidarPriceResult[i].SaleTypeRef===5&& 
            await productPrice.create({
                pID:sepidarPriceResult[i].Code,
                saleType:sepidarPriceResult[i].SaleTypeRef,
                price:sepidarPriceResult[i].Fee,
                ItemID:sepidarPriceResult[i].ItemRef,
                date:new Date()})
                
        }
        
        await updateLog.create({
            updateQuery: "sepidar-price" ,
            date:Date.now()
        })
        res.json({sepidar:sepidarPriceResult.length,message:"قیمت ها بروز شدند"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/sepidar-bank', async (req,res)=>{
    const url=req.body.url
    try{
        const sepidarBankResult = await sepidarFetch("data","/api/BankAccounts")
        if(sepidarBankResult.error||!sepidarBankResult.length){
            res.json({error:"error occure",
                data:sepidarBankResult,message:"خطا در بروزرسانی"})
            return
        }
        //var successItem=[];
        //var failure = 0;
        0&&await bankAccounts.deleteMany({})
        for(var i = 0;i<sepidarBankResult.length;i++){
            //sepidarPriceResult[i].SaleTypeRef===5&& 
            0&&await bankAccounts.create({
                BankAccountID:sepidarBankResult[i].BankAccountID,
                DlCode:sepidarBankResult[i].DlCode,
                DlTitle:sepidarBankResult[i].DlTitle,
                CurrencyRef:sepidarBankResult[i].CurrencyRef})
                
        }
        await updateLog.create({
            updateQuery: "sepidar-bank" ,
            date:Date.now()
        })
        res.json({sepidar:sepidarBankResult.length,
            data:sepidarBankResult,message:"غیر فعال است"})//"بانک ها بروز شدند"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/sepidar-quantity', async (req,res)=>{
    try{
        const sepidarQuantityResult = await sepidarFetch("data","/api/Items/Inventories")

        if(sepidarQuantityResult.error||!sepidarQuantityResult.length){
            res.json({error:"error occure",
                data:sepidarQuantityResult,message:"خطا در بروزرسانی"})
            return
        }
        //var successItem=[];
        //var failure = 0;
        await productCount.deleteMany({})
        for(var i = 0;i<sepidarQuantityResult.length;i++){
            sepidarQuantityResult[i].UnitRef!==3&&
            await productCount.create({
                quantity:sepidarQuantityResult[i].Qunatity,
                UnitRef:sepidarQuantityResult[i].UnitRef,
                Stock:sepidarQuantityResult[i].StockeRef,
                ItemID:sepidarQuantityResult[i].ItemRef,
            date:new Date()})
                
        }
        
        await updateLog.create({
            updateQuery: "sepidar-quantity" ,
            date:Date.now()
        })
        res.json({sepidar:sepidarQuantityResult.length,message:"تعداد بروز شدند"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/sepidar-all', async (req,res)=>{
    try{
        response = await fetch(ONLINE_URL+"/sepidar-product",
            {method: 'GET'});
        response = await fetch(ONLINE_URL+"/sepidar-price",
            {method: 'GET'});
        response = await fetch(ONLINE_URL+"/sepidar-quantity",
            {method: 'GET'});
        response = await fetch(ONLINE_URL+"/sepidar-customers",
            {method: 'GET'});
        response = await fetch(ONLINE_URL+"/sepidar-bank",
            {method: 'GET'});
        res.json({message:"تمامی جدول ها بروز شدند"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/sepidar-update-log', async (req,res)=>{
    try{ 
        const sepidarLog = await updateLog.find({}).sort({"date":-1})
        
        res.json({log:sepidarLog,message:"done"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;