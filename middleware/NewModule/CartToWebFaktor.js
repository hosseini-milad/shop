const customers = require("../../models/auth/customers");
const faktor = require("../../models/product/faktor");
const faktorItems = require("../../models/product/faktorItems");
const sepCart = require("../../models/product/sepCart");
const CalcCart = require("../CalcCart");
const NewCode = require("../NewCode");
var ObjectID = require('mongodb').ObjectID;
const {TaxRate} = process.env

const CartToWebFaktor=async(userId)=>{
    try{
        const userDetail = await customers.findOne({_id:ObjectID(userId)})
        if(!userDetail){
            return({error:"not valid user"})
        }
        const cartDetails = await sepCart.find({userId:userId})
        if(!cartDetails||!cartDetails.length){
            return({error:"not valid cart"})
            
        }
        var totalCartData = await CalcCart(cartDetails)
        const faktorNo = await NewCode("53")
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
        
        await faktor.create(faktorQuery)
        
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
            await faktorItems.create(cartItem)
        }
        await sepCart.deleteMany({userId:userId})
       return({faktorNo,totalPrice:totalCartData.totalPrice,})
    }
    catch(error){
        return({error: error.message})
    }
}

module.exports =CartToWebFaktor