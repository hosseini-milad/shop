const cart = require("../models/product/cart");

const CartToOrder=async(orderNo)=>{
    const cartData = await cart.findOne({cartNo:orderNo})
    return (cartData)
}

module.exports =CartToOrder