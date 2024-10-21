const express = require('express');
const router = express.Router()
const auth = require("../middleware/auth");
const productSchema = require('../models/product/products');
const cart = require('../models/product/cart');
const qCart = require('../models/product/quickCart');
const users = require('../models/auth/users');

router.post('/find-products', auth, async (req, res) => {
    const search = req.body.search
    try {
        const userData = await users.findOne({ _id: req.headers['userid'] })
        const stockId = userData.StockId ? userData.StockId : "13"
        var filter = ''
        if (userData.group === "bazaryab") filter = "fs"
        const searchProducts = await productSchema.
            aggregate([{
                $match:
                {
                    $or: [
                        { sku: { $regex: search, $options: 'i' } },
                        { title: { $regex: search, $options: 'i' } }
                    ]
                }
            },
            filter ? { $match: { sku: { $in: [/fs/i, /cr/i, /pr/i] } } } :
                { $match: { sku: { $exists: true } } },
            {
                $lookup: {
                    from: "productprices",
                    localField: "ItemID",
                    foreignField: "ItemID",
                    as: "priceData"
                }
            },
            {
                $lookup: {
                    from: "productcounts",
                    localField: "ItemID",
                    foreignField: "ItemID",
                    as: "countData"
                }
            }])
        var searchProductResult = []
        const cartList = await cart.find(stockId ? { stockId: stockId } : {})
        const qCartList = await qCart.find(stockId ? { stockId: stockId } : {})
        var index = 0
        for (var i = 0; i < searchProducts.length; i++) {
            var count = (searchProducts[i].countData.find(item => item.Stock == stockId))
            var desc = ''
            var cartCount = findCartCount(searchProducts[i].sku, cartList.concat(qCartList), stockId)
            if (count) count.quantity = parseInt(count.quantity) - parseInt(cartCount)
            if (count && count.quantity) {
                index++
                desc = searchProducts[i].title +
                    "(" + searchProducts[i].sku + ")" +
                    "___" + count.quantity

                searchProductResult.push({
                    ...searchProducts[i],
                    count: count, description: desc
                })
                if (index === 15) break
            }
        }
        res.json({ products: searchProductResult })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

const findCartCount = (item, cart) => {
    var cartCount = 0
    for (var i = 0; i < cart.length; i++) {
        var cartItem = cart[i].cartItems
        for (var c = 0; c < cartItem.length; c++) {
            if (cartItem[c].sku === item) {
                cartCount = parseInt(cartCount) + parseInt(cartItem[c].count)
            }
        }
    }
    return (cartCount)
}

module.exports = router;