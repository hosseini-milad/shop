const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const task = require('../models/main/task');
const LogCreator = require('../middleware/logCreator');
const users = require('../models/auth/users');
const slider = require('../models/main/slider');
const state = require('../models/main/state');
const city = require('../models/main/city');
const cart = require('../models/product/cart');
var ObjectID = require('mongodb').ObjectID;
const MergeOrder = require('../middleware/MergeOrder');
const CartToSepidar = require('../middleware/CartToSepidar');
const sepidarPOST = require('../middleware/SepidarPost');
const Invoice = require('../models/product/Invoice');
const InvoiceItems = require('../models/product/InvoiceItems');
const transaction = require('../models/product/transaction');
const RecieptFunc = require('../middleware/RecieptFunc');
const customers = require('../models/auth/customers');
const SumArray = require('../middleware/SumArray');
const FindRemainBank = require('../middleware/FindRemainBank');
const orderLog = require('../models/orders/orderLog');
const CalcCartTotal = require('../middleware/CalcCartTotaljs');

router.post('/sliders', async (req, res) => {
    try {
        const SlidersList = await slider.find()
        res.json({ filter: SlidersList, message: "slider list" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/fetch-slider', async (req, res) => {
    var sliderId = req.body.sliderId ? req.body.sliderId : ''
    try {
        const SliderData = await slider.findOne({ _id: sliderId })
        res.json({ filter: SliderData, message: "slider Data" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/updateSlider', auth, jsonParser, async (req, res) => {
    var sliderId = req.body.sliderId ? req.body.sliderId : ''
    if (sliderId === "new") sliderId = ''
    try {
        const data = {
            title: req.body.title,
            enTitle: req.body.enTitle,
            link: req.body.link,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            thumbUrl: req.body.thumbUrl
        }
        var sliderResult = ''
        if (sliderId) sliderResult = await slider.updateOne({ _id: sliderId },
            { $set: data })
        else
            sliderResult = await slider.create(data)

        res.json({ result: sliderResult, success: sliderId ? "Updated" : "Created" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/changeState', auth, jsonParser, async (req, res) => {
    const data = {
        state: req.body.state,
        prior: req.body.prior * 5 + 1
    }
    try {
        const userData = await users.findOne({ _id: req.headers['userid'] })

        const logData = await LogCreator(userData, "change State",
            `task no ${req.body.id}'s state change to ${data.state}`)
        const leadTask = await task.updateOne({ _id: req.body.id },
            { $set: data })
        //if(leadTask)
        res.json({ status: "report done", data: leadTask })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/changeOrder', auth, jsonParser, async (req, res) => {
    const tasks = req.body.tasks
    try {
        const userData = await users.findOne({ _id: req.headers['userid'] })

        const logData = await LogCreator(userData, "change Sort",
            `task sort by: ${tasks}`)

        for (var i = 0; i < tasks.length; i++) {
            const updateState = await task.updateOne({ _id: tasks[i] }, { $set: { prior: i * 5 + 3 } })
        }

        //if(leadTask)
        res.json({ status: "sort done" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/list-state', jsonParser, async (req, res) => {
    const search = req.body.search
    try {
        const stateList = await state.find(search ?
            { stateName: new RegExp('.*' + search + '.*') } : {})
        res.json({ data: stateList })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/list-city', jsonParser, async (req, res) => {
    const search = req.body.search
    const state = req.body.stateId
    try {
        if (!state) {
            res.status(400).json({ message: "لطفا کد استان را وارد نمایید" })
            return ('')
        }
        const cityList = await city.find(search ?
            {
                cityName: new RegExp('.*' + search + '.*'),
                stateId: state
            } : { stateId: state })
        res.json({ data: cityList })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/multi-sepidar', jsonParser, auth, async (req, res) => {
    const orderList = req.body.orderNo
    const manageId = req.headers['userid']
    var official = req.body.official?req.body.official:1
    
    var error=''
    try {
        const orderDetails = await cart.find({ cartNo: { $in: orderList } })
        if(!orderDetails||!orderDetails.length){
            res.status(400).json({error:"سفارش پیدا نشد"})
            return
        }
        const mergeOrder = await MergeOrder(orderDetails.map(item => item.cartItems),orderDetails)
        
        //const recResult = await RecieptFunc()
        const adminData = await users.findOne({ _id: ObjectID(manageId) })
        const customerData = await customers.findOne({ _id: ObjectID(orderDetails[0].userId) })
        if(customerData&&customerData.username&&customerData.username.includes("مصرف"))
            official =0
        if(customerData&&!customerData.CustomerID) official = 0
        const faktorNo = "F321" + orderDetails[0].cartNo
        var sepidarQuery = await CartToSepidar(mergeOrder, faktorNo,
            official?customerData:adminData, 
            adminData.StockId,orderDetails[0].discount,
            orderDetails[0].cartNo,orderDetails[0]&&orderDetails[0].payValue)
        var bankDetail = await transaction.find({userId:manageId,sepidarID:{$exists:false}})
        var recieptQuery=''
        var sepidarResult = await sepidarPOST(sepidarQuery, "/api/invoices", 
            ObjectID(adminData._id))
        var recieptResult
        if (sepidarResult && sepidarResult.InvoiceID) {
            recieptQuery = await RecieptFunc(bankDetail,sepidarResult,faktorNo)
            recieptResult = await sepidarPOST(recieptQuery, "/api/Receipts/BasedOnInvoice", ObjectID(adminData._id))
            
            //console.log(recieptResult)
            /*await Invoice.create({ ...sepidarResult, manageId: adminData._id })
            var invoiceItems = sepidarResult.InvoiceItems
            for (var i = 0; i < invoiceItems.length; i++)
                await InvoiceItems.create({
                    ...invoiceItems[i],
                    InvoiceID: sepidarResult.InvoiceID
                })*/
            await orderLog.create({
                    userId:manageId,
                    orderNo: faktorNo,
                    invoiceID:sepidarResult.InvoiceID,
                    orderPrice: "123",
                    orderCount:"12",
                    orderItem:mergeOrder,
                    orderList:orderList,
                    errorMessage:'',
                    query:sepidarQuery
            })
            await cart.updateMany({ cartNo: { $in: orderList } }, {
                $set: { 
                    Number: sepidarResult.Number,
                    InvoiceID: sepidarResult.InvoiceID
                } 
            })
            await transaction.updateMany({userId:manageId,sepidarID:{$exists:false}},
                {$set:{sepidarID:recieptResult&&recieptResult.ReceiptID}}
            )
        }
        else{
            error = sepidarResult && sepidarResult.Message
            await orderLog.create({
                userId:manageId,
                orderNo: faktorNo,
                invoiceID:'',
                orderPrice: "123",
                orderCount:"12",
                orderItem:mergeOrder,
                orderList:orderList,
                errorMessage:error,
                query:sepidarQuery
        })
        }
        res.json({ data: sepidarResult,query:sepidarQuery, 
            recieptResult:recieptResult, error,
            recieptQuery:recieptQuery,message: error?'':"سفارش در سپیدار ثبت شد" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/add-bank-to-cart',auth, async (req,res)=>{
    
    const data = {
        userId: req.headers['userid'],
        title: req.body.title,
        bankCode: req.body.bankCode,
        payValue: req.body.payValue,
        orderNo:req.body.orderNo,
        description: req.body.description
    }
    try{ 
        await transaction.create(data)
        var bankDetail = await transaction.find({userId:data.userId,sepidarID:{$exists:false}})
        var payArray = bankDetail.map(item=>item.payValue)
        var total = req.body.totalCartValue
        var transRemain = FindRemainBank(bankDetail,total)
        res.json({transData:bankDetail,transRemain,payArray
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/remove-bank-from-cart', async (req,res)=>{
    const userId = req.headers['userid']
    const id = req.body.id
    const total = req.body.totalCartValue
    try{ 
        await transaction.deleteOne({_id:ObjectID(id),userId:userId})
        var bankDetail = await transaction.find({userId:userId,sepidarID:{$exists:false}})
        var transRemain = FindRemainBank(bankDetail,total)
        res.json({transData:bankDetail,transRemain})
    } 
    catch(error){
        res.status(500).json({message: error.message})
    } 
}) 
router.post('/fetch-bank-of-cart', async (req,res)=>{
    const userId = req.headers['userid']
    //const total = req.body.totalCartValue
    var total = 0
    const carts = req.body.cartList
    try{ 
        if(!carts||!carts.length){
            res.status(400).json({error:"no cart"})
        }
        const cartTotal = await CalcCartTotal(carts)
        var bankDetail = await transaction.find({userId:userId,sepidarID:{$exists:false}})
        var transRemain = FindRemainBank(bankDetail,cartTotal&&cartTotal.totalPrice)
        res.json({transData:bankDetail,transRemain,cartTotal})
    } 
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/clear-bank-of-cart',auth, async (req,res)=>{
    const userId = req.headers['userid']
    try{ 
        var bankDetail = await transaction.deleteMany({userId:userId,sepidarID:{$exists:false}})
        var transRemain = 0//FindRemainBank(bankDetail,total)
        res.json({message:"done"})
    } 
    catch(error){
        res.status(500).json({message: error.message})
    }
})
module.exports = router;