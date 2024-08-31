const cart = require("../models/product/cart");

const OrderToCart=async(orderNo)=>{
    const cartData = await cart.findOne({cartNo:orderNo})
    return (cartData)
}

module.exports =OrderToCart