const customers = require("../models/auth/customers");
const openOrders = require("../models/orders/openOrders");
const orders = require("../models/orders/orders");
const productCount = require("../models/product/productCount");
const products = require("../models/product/products");
const sepCart = require("../models/product/sepCart");
const CalcCart = require("./CalcCart");
var ObjectID = require('mongodb').ObjectID;
var {StockId,SaleType} = process.env;

var tax = process.env.TaxRate

const PrepareOrder=async(userid)=>{
    const orderData = await sepCart.find({userId:userid})
    const usersData = await customers.findOne({_id:ObjectID(userid)})
    const dateNow = new Date()
    const orderId = await checkRep(usersData?usersData.phone:"000000000",
    dateNow.toLocaleDateString('fa'))
    
    const orderPrice = await CalcCart(orderData)
    for(var i=0;i<orderData.length;i++)
        await openOrders.create({
            orderNo:orderId,
            count:orderData[i].count,
            sku:orderData[i].sku,
            payStatus:"initial"
        })
    return({orderId:orderId,orderPrice:orderPrice.totalPrice,
        orderData:orderData,orderCount:orderPrice.totalCount})
}
const checkRep=async(phone,dateYear)=>{
    var orderDate = dateYear.split('/')[0]
    orderDate = orderDate.substring(3)
    var phoneLength = phone.length
    var phone4 = phone.substring(phoneLength-4)
    var rxTemp = '';
    while(1){
        const foundRx = rxTemp&&await orders.findOne({orderNo:rxTemp});
        
        if(rxTemp&&!foundRx)break
        else rxTemp=faNumtoEn(orderDate)+phone4 +
            (Math.floor(Math.random() * 10000) + 10000)
    }
    return(rxTemp)

}
const faNumtoEn=(faNum)=>{
    var outPut = ''
    const faDigits = ['۱','۲','۳','۴','۵','۶','۷','۸','۹','۰'];
    const enDigits = ['1','2','3','4','5','6','7','8','9','0'];
    for(index=0;faDigits.length;index++)
        if(faDigits[index]===faNum)
            return(enDigits[index])
    return(0)
}
module.exports =PrepareOrder