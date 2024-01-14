const productPrice = require("../models/product/productPrice")
const NormalTax = require("./NormalTax")
const {StockId,SaleType} = process.env;

var tax = process.env.TaxRate

const CalcCart=async(cartDetails)=>{
    var totalPrice = 0
    for(var c=0;c<cartDetails.length;c++){
    const ItemId = cartDetails[c].productData[0]
    const priceData = await productPrice.findOne(
        {ItemID:ItemId.ItemID,saleType:SaleType},
        {price:1,_id:0})
    
    cartDetails[c].price=NormalTax(priceData.price)
    totalPrice += cartDetails[c].price
    }
    return(totalPrice)
}

module.exports =CalcCart