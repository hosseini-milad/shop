const express = require('express');
const router = express.Router()
const auth = require("../middleware/auth");
const productSchema = require('../models/product/products');
const cart = require('../models/product/cart');
const qCart = require('../models/product/quickCart');
const users = require('../models/auth/users');
const category = require('../models/product/category');

router.post('/find-products', auth, async (req, res) => {
    const search = req.body.search
    const filters = req.body.filters
    try {
        const userData = await users.findOne({ _id: req.headers['userid'] })
        const stockId = userData.StockId ? userData.StockId : "13"
        var filter = ''
        var catArray = []
        if(filters&&filters.subCat){
            catArray = [filters.subCat]
        }
        else if(filters&&filters.category){
            const categoryData = await category.findOne({catCode:filters.category})
            if(categoryData) {
                const catID = categoryData._id.toString()
                const catLists = await category.find({parent:catID})
                catArray.push(catLists.map(item=>item.catCode))
            }
        }
        if (userData.group === "bazaryab") filter = "fs"
        const searchProducts = await productSchema.
            aggregate([{
                $match:
                search?{
                    $or: [
                        { sku: { $regex: search, $options: 'i' } },
                        { title: { $regex: search, $options: 'i' } }
                    ]
                }:{}
            },
            {$match:filters&&filters.brand?{brandId:filters.brand}:{}},
            {$match:filters?filters.subCat?{catId:filters.subCat}:
                filters.category?{catId:{$in:catArray}}:{}:{}},
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
        const cartList = await cart.find(stockId ? { stockId: stockId ,InvoiceID:{$exists:false}} : {})
        const qCartList = await qCart.find(stockId ? { stockId: stockId } : {})
        var index = 0
        for (var i = 0; i < searchProducts.length; i++) {
            var count = (searchProducts[i].countData.find(item => item.Stock == stockId))
            var desc = ''
            var cartCount = findCartCount(searchProducts[i].sku, cartList.concat(qCartList), stockId)
            if (count) count.quantity = parseInt(count.quantity) - parseInt(cartCount)
            if (count && count.quantity>0) {
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