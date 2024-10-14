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
    try {
        const orderDetails = await cart.find({ cartNo: { $in: orderList } })
        const mergeOrder = await MergeOrder(orderDetails.map(item => item.cartItems))
        const adminData = await users.findOne({ _id: ObjectID(manageId) })
        const faktorNo = "F321" + orderDetails[0].cartNo
        var sepidarQuery = await CartToSepidar(mergeOrder, faktorNo,
            adminData, adminData.StockId)
        //console.log(sepidarQuery) 
        var sepidarResult = await sepidarPOST(sepidarQuery, "/api/invoices", adminData._id)
        if (sepidarResult && sepidarResult.InvoiceID) {
            await Invoice.create({ ...sepidarResult, manageId: adminData._id })
            var invoiceItems = sepidarResult.InvoiceItems
            for (var i = 0; i < invoiceItems.length; i++)
                await InvoiceItems.create({
                    ...invoiceItems[i],
                    InvoiceID: sepidarResult.InvoiceID
                })

            await cart.updateMany({ cartNo: { $in: orderList } }, {
                $set: {
                    Number: sepidarResult.Number,
                    InvoiceID: sepidarResult.InvoiceID
                }
            })
        }
        res.json({ data: sepidarResult, message: "orders process" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router;