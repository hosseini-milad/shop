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
const bankData = require('../publicPay/bank.json')
const crmlist = require('../models/crm/crmlist');
const bankAccounts = require('../models/product/bankAccounts');
const transaction = require('../models/product/transaction');
const FindRemainBank = require('../middleware/FindRemainBank');
const { TaxRate } = process.env

router.post('/sku/find', jsonParser, async (req, res) => {
    try {
        const manData = await products.findOne({ sku: req.body.sku });
        res.json(manData)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/list', jsonParser, async (req, res) => {
    var pageSize = req.body.pageSize ? req.body.pageSize : "10";
    var offset = req.body.offset ? (parseInt(req.body.offset)) : 0;
    var nowDate = new Date();
    try {
        const data = {
            orderNo: req.body.orderNo,
            status: req.body.status,
            customer: req.body.customer,
            manager: req.body.manager,
            brand: req.body.brand,
            dateFrom:
                req.body.dateFrom ? req.body.dateFrom[0] + "/" +
                    req.body.dateFrom[1] + "/" + req.body.dateFrom[2] + " " + "00:00" :
                    new Date().toISOString().slice(0, 10) + " 00:00",
            dateTo:
                req.body.dateTo ? req.body.dateTo[0] + "/" +
                    req.body.dateTo[1] + "/" + req.body.dateTo[2] + " 23:59" :
                    new Date().toISOString().slice(0, 10) + " 23:59",
            pageSize: pageSize
        }

        const nowIso = nowDate.toISOString();
        const nowParse = Date.parse(nowIso);
        const now = new Date(nowParse);
        var now2 = new Date();
        var now3 = new Date();

        var type = req.body.type ? req.body.type : "";

        const adminData = await users.findOne({ _id: ObjectID(req.headers["userid"]) });

        const dateFromEn = new Date(now2.setDate(now.getDate() - (data.dateFrom ? data.dateFrom : 1)));
        dateFromEn.setHours(0, 0, 0, 0);
        const dateToEn = new Date(now3.setDate(now.getDate() - (data.dateTo ? data.dateTo : 0)));
        dateToEn.setHours(23, 59, 0, 0);

        if (!adminData) {
            res.status(400).json({ error: "کاربر معتبر نیست" });
            return;
        }
        var tabs =adminData.access !== "manager"?[]: [
            {title:"ویزیتور", type:"Visitor",manager:""},
            {title:"فروشگاه زهره", type:"Sale",manager:"zohre"},
            {title:"فروشگاه حصارک", type:"Sale",manager:"hesarak"},
            {title:"فروشگاه مرکزی", type:"Sale",manager:"markazi"},
            {title:"وب سایت", type:"Website"},
        ]
        if(adminData.access !== "manager"){
            if(adminData.username=="zohre"|| adminData.username=="hesarak"){
                type="Sale"
                data.manager = adminData.username
            }
            else type="Visitor"
        }
        var brandUnique = [];
        var resultData = [];
        var fullSize = 0;
        var isSale = 0;
        var size = 0;
        var status = []
        var bankList = []
        var transactions = []
        var transRemain={remain:0,totalPay:1234000}

        if (!type || type == "Visitor") {
            if (adminData.access == "sale") {
                res.status(400).json({ error: "دسترسی به این بخش ندارید" });
                return;
            }
            var showCart = [];
            const cartList = await carts.aggregate([
                { $addFields: { "userId": { "$toObjectId": "$userId" } } },
                {
                    $lookup: {
                        from: "customers",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userInfo"
                    }
                },
                {
                    $lookup: {
                        from: "tasks",
                        localField: "cartNo",
                        foreignField: "orderNo",
                        as: "taskInfo"
                    }
                },
                { $match: data.orderNo ? { cartNo: new RegExp('.*' + data.orderNo + '.*') } : {} },
                { $match: { $or: [{ isSale: { $exists: false } }, { isSale: "0" }, { isSale: false }] } },
                { $match: !data.orderNo ? { initDate: { $gte: new Date(data.dateFrom) } } : {} },
                { $match: !data.orderNo ? { initDate: { $lte: new Date(data.dateTo) } } : {} },
                { $sort: { "initDate": -1 } }
            ]);

            for (var i = 0; i < (cartList && cartList.length); i++) {
                if (data.customer) {
                    if (cartList[i].userInfo[0]) {
                        var userSimilar = cartList[i].userInfo[0].username &&
                            cartList[i].userInfo[0].username.includes(data.customer);
                        var phoneSimilar = cartList[i].userInfo[0].phone &&
                            cartList[i].userInfo[0].phone.includes(data.customer);
                        if (!userSimilar && !phoneSimilar)
                            continue;
                    } else {
                        continue;
                    }
                }

                var cartTask = cartList[i].taskInfo && cartList[i].taskInfo[0];
                var InvoiceID = cartTask?(cartTask.result?cartTask.result.InvoiceID:''):''
                var taskStep = cartTask ? cartTask.taskStep : null;

                if (data.status) {
                    if ((taskStep) !== data.status)
                        continue;
                }

                var totalPrice = findCartSum(cartList[i].cartItems, cartList[i].payValue);

                var cartWithTaskStep = {
                    _id: cartList[i]._id,
                    status: taskStep, InvoiceID,
                    ...cartList[i],
                    totalCart: totalPrice
                };

                showCart.push(cartWithTaskStep);
            }
            var crmData = await crmlist.findOne({crmCode:"main"})
            status = crmData?crmData.crmSteps:[]
            brandUnique = [...new Set(showCart &&
                showCart.map((item) => item.brand))];
            size = showCart && showCart.length;
            const orderList = showCart && showCart.slice(offset,
                (parseInt(offset) + parseInt(pageSize)));

            resultData = orderList;
        }

        if (type == "WebSite") {
            isWeb = 1;
            const reportList = await orders.aggregate([
                {
                    $lookup: {
                        from: "customers",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userInfo"
                    }
                },
                { $match: data.orderNo ? { rxOrderNo: new RegExp('.*' + data.orderNo + '.*') } : {} },
                { $match: !data.orderNo ? { date: { $gte: new Date(data.dateFrom) } } : {} },
                { $match: !data.orderNo ? { date: { $lte: new Date(data.dateTo) } } : {} },
                { $sort: { "date": -1 } },
            ]);

            var filter1Report = data.customer ?
                reportList.filter(item => (item.userInfo[0] && item.userInfo[0].cName &&
                    item.userInfo[0].cName.includes(data.customer))) : reportList;

            resultData = orderList;
        }

        if (type == "Sale") {
            if (adminData.access == "market") {
                res.status(400).json({ error: "دسترسی به این بخش ندارید" });
                return;
            }
            var manager = ''
            if(adminData.access !== "manager"){
                if (!data.manager) {
                    res.status(400).json({ error: "اطلاعات واحد فروش وارد نشده است" });
                    return;
                }
                if (adminData.username!==data.manager) {
                    res.status(400).json({ error: "دسترسی به فاکتورهای واحدهای دیگر را ندارید" });
                    return;
                }
            }
            var managerData = data.manager&&await users.findOne({cName:data.manager})
            manager = managerData&&managerData._id
            var isSale = 1;
            var showCart = [];
            const openList = await carts.aggregate([
                { $addFields: { "userId": { "$toObjectId": "$userId" } } },
                {
                    $lookup: {
                        from: "customers",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userInfo"
                    }
                },
                { $match: data.status?data.status=="done"?{ InvoiceID: { $exists: true } }:
                        { InvoiceID: { $exists: false } }:{} },
                { $match: manager ? { manageId: manager.toString() } : {} },
                { $match: { isSale: true} },
                { $match: data.orderNo ? { cartNo: new RegExp('.*' + data.orderNo + '.*') } : {} },
                { $match: !data.orderNo ? { initDate: { $gte: new Date(data.dateFrom) } } : {} },
                { $match: !data.orderNo ? { initDate: { $lte: new Date(data.dateTo) } } : {} },
                { $sort: { "initDate": -1 } }
            ]);

            for (var i = 0; i < (openList && openList.length); i++) {
                var userInfo = openList[i].userInfo
                const userData = userInfo&&userInfo[0]&&userInfo[0].CustomerID
                var totalPrice = findCartSum(openList[i].cartItems,
                    openList[i].payValue);
                var tempStatus = openList[i].InvoiceID?"done":"undone"
                showCart.push({ ...openList[i], totalCart: totalPrice ,
                    status:tempStatus,isOfficial:userData?1:0});
            }
            status = [{title:"انجام نشده",enTitle:"undone",id:0},{title:"انجام شده",enTitle:"done",id:1}]
            bankList = await bankAccounts.find({limit:{$ne:adminData.username}})    
            transactions = await transaction.find({userId:req.headers["userid"],sepidarID:{$exists:false}})
            brandUnique = [...new Set(showCart &&
                showCart.map((item) => item.brand))];
            size = showCart && showCart.length;
            transRemain = FindRemainBank(transactions,req.body.totalCartValue)
            const orderList = showCart && showCart.slice(offset,
                (parseInt(offset) + parseInt(pageSize)));
            resultData = orderList;
        }

        if (type == "Invoice") {
            if (adminData.access == "market") {
                res.status(400).json({ error: "دسترسی به این بخش ندارید" });
                return;
            }

            var showCart = [];
            const invoiceList = await Invoice.aggregate([
                {
                    $lookup: {
                        from: "customers",
                        localField: "CustomerRef",
                        foreignField: "CustomerID",
                        as: "userInfo"
                    }
                },
                {
                    $lookup: {
                        from: "invoiceitems",
                        localField: "InvoiceID",
                        foreignField: "InvoiceID",
                        as: "invoiceItems"
                    }
                },
                { $sort: { "Date": -1 } }
            ]);

            for (var i = 0; i < (invoiceList && invoiceList.length); i++) {
                var totalPrice = findCartSum(invoiceList[i].cartItems, 3);
                showCart.push({ ...invoiceList[i], totalCart: totalPrice });
            }

            size = showCart && showCart.length;
            const orderList = showCart && showCart.slice(offset,
                (parseInt(offset) + parseInt(pageSize)));
            resultData = orderList;
        }

        res.json({
            filter: resultData, brand: brandUnique, isSale, ...transRemain,
            size,adminData,status,bankList,transData:transactions,tabs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/list-client',auth, jsonParser, async (req, res) => {
    var pageSize = req.body.pageSize ? req.body.pageSize : "10";
    var offset = req.body.offset ? (parseInt(req.body.offset)) : 0;
    var nowDate = new Date();
    try {
        const data = {
            orderNo: req.body.orderNo,
            status: req.body.status,
            customer: req.body.customer,
            manager: req.body.manager,
            brand: req.body.brand,
            dateFrom:
                req.body.dateFrom ? req.body.dateFrom[0] + "/" +
                    req.body.dateFrom[1] + "/" + req.body.dateFrom[2] + " " + "00:00" :
                    new Date().toISOString().slice(0, 10) + " 00:00",
            dateTo:
                req.body.dateTo ? req.body.dateTo[0] + "/" +
                    req.body.dateTo[1] + "/" + req.body.dateTo[2] + " 23:59" :
                    new Date().toISOString().slice(0, 10) + " 23:59",
            pageSize: pageSize
        }

        const nowIso = nowDate.toISOString();
        const nowParse = Date.parse(nowIso);
        const now = new Date(nowParse);
        var now2 = new Date();
        var now3 = new Date();

        var type = req.body.type ? req.body.type : "";

        const adminData = await users.findOne({ _id: ObjectID(req.headers["userid"]) });

        const dateFromEn = new Date(now2.setDate(now.getDate() - (data.dateFrom ? data.dateFrom : 1)));
        dateFromEn.setHours(0, 0, 0, 0);
        const dateToEn = new Date(now3.setDate(now.getDate() - (data.dateTo ? data.dateTo : 0)));
        dateToEn.setHours(23, 59, 0, 0);

        if (!adminData) {
            res.status(400).json({ error: "کاربر معتبر نیست" });
            return;
        }
        var clientList=[]
        if(adminData.access=="admin"){
            var userList = await users.find(
                {profile:{$in:adminData.profile},access:{$nin:["manager","admin"]}})//{StockId:userData.StockId})
            clientList=(userList.map(item=>item._id.toString()))
        }
        clientList.push(adminData._id.toString())
            var showCart = [];
            const cartList = await carts.aggregate([
                { $addFields: { "userId": { "$toObjectId": "$userId" } } },
                {
                    $lookup: {
                        from: "customers",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userInfo"
                    }
                },
                {
                    $lookup: {
                        from: "tasks",
                        localField: "cartNo",
                        foreignField: "orderNo",
                        as: "taskInfo"
                    }
                },
                { $match: { manageId: {$in:clientList}}},
                { $match: data.orderNo ? { cartNo: new RegExp('.*' + data.orderNo + '.*') } : {} },
                { $match: !data.orderNo ? { initDate: { $gte: new Date(data.dateFrom) } } : {} },
                { $match: !data.orderNo ? { initDate: { $lte: new Date(data.dateTo) } } : {} },
                { $sort: { "initDate": -1 } }
            ]);
            var isSale = false
            for (var i = 0; i < (cartList && cartList.length); i++) {
                if (data.customer) {
                    if (cartList[i].userInfo[0]) {
                        var userSimilar = cartList[i].userInfo[0].username &&
                            cartList[i].userInfo[0].username.includes(data.customer);
                        var phoneSimilar = cartList[i].userInfo[0].phone &&
                            cartList[i].userInfo[0].phone.includes(data.customer);
                        if (!userSimilar && !phoneSimilar)
                            continue;
                    } else {
                        continue;
                    }
                }
            var tempStatus = cartList[i].InvoiceID?"done":"undone"
                if(!isSale) isSale=cartList[i].isSale?true:false
                var cartTask = cartList[i].taskInfo && cartList[i].taskInfo[0];
                var InvoiceID = cartTask?(cartTask.result?cartTask.result.InvoiceID:''):''
                var taskStep = cartTask ? cartTask.taskStep : null;

                if (data.status) {
                    if ((taskStep) !== data.status)
                        continue;
                }

                var totalPrice = findCartSum(cartList[i].cartItems, cartList[i].payValue);

                var cartWithTaskStep = {
                    _id: cartList[i]._id,
                    status: taskStep, InvoiceID,
                    ...cartList[i], status:tempStatus,
                    totalCart: totalPrice,isSale
                };

                showCart.push(cartWithTaskStep);
            }
            var crmData = await crmlist.findOne({crmCode:"main"})
            status = crmData?crmData.crmSteps:[]
            brandUnique = [...new Set(showCart &&
                showCart.map((item) => item.brand))];
            size = showCart && showCart.length;
            const orderList = showCart && showCart.slice(offset,
                (parseInt(offset) + parseInt(pageSize)));

            resultData = orderList;
        


        res.json({
            filter: resultData, brand: brandUnique, 
            size,adminData,clientList
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const findCartSum = (cartItems, payValue) => {
    if (!cartItems) return ({ totalPrice: 0, totalCount: 0 })
    var cartSum = 0;
    var cartCount = 0;
    var cartDiscount = 0;
    var cartTax = 0;
    var cartDescription = ''
    for (var i = 0; i < cartItems.length; i++) {
        //console.log(payValue)
        var cartItemPrice = findPayValuePrice(cartItems[i].price, payValue)
        var countTemp = parseInt(cartItems[i].count.toString().replace(/,/g, '').replace(/^\D+/g, ''))
        try {
            if (cartItems[i].price){
                var tempPrice = parseInt(cartItemPrice) *countTemp
                cartSum += tempPrice
                cartTax += Math.round(tempPrice*TaxRate)
            }
            if (cartItems[i].count)
                cartCount += countTemp
            cartDescription += cartItems[i].description ? cartItems[i].description : ''
            if (cartItems[i].discount) {
                var off = parseInt(cartItems[i].discount.toString().replace(/,/g, '').replace(/^\D+/g, ''))
                if (off > 100)
                    cartDiscount += off
                else
                    cartDiscount += parseInt(cartItemPrice)
                        * Number(cartItems[i].count) *
                        (1 + TaxRate) * (off) / 100
            }
        } catch { }
    }
    return ({
        totalFee: cartSum,
        totalCount: cartCount,
        totalDiscount: cartDiscount,
        totalTax: cartTax,
        totalPrice: (cartSum +cartTax - cartDiscount),
        cartDescription: cartDescription
    })
}
const findPayValuePrice = (priceArray, payValue) => {
    if (!priceArray) return (0)
    if (!payValue) payValue = 3
    var price = priceArray
    if (priceArray.length && priceArray.constructor === Array)
        price = priceArray.find(item => item.saleType == payValue).price

    return (price)

}
module.exports = router;