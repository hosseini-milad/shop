const customers = require("../../models/auth/customers");
const sepCart = require("../../models/product/sepCart");
const CalcCart = require("../CalcCart");
const NewCode = require("../NewCode");
var ObjectID = require('mongodb').ObjectID;
const {TaxRate} = process.env

const CartToWebFaktor=async(userId)=>{
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
        
        //await Faktor.create(faktorQuery)
        
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
            //await FaktorItems.create(cartItem)
        }
        
       return({faktorQuery,tax,cartDetails,cartItems})
    }
    catch(error){
        return({error: error.message})
    }
}

module.exports =CartToWebFaktor