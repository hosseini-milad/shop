const faktor = require("../../models/product/faktor");
const faktorItems = require("../../models/product/faktorItems");


var tax = process.env.TaxRate

const CartToFaktor=async(query,userId,manageId)=>{
    if(!query) return
    await faktor.create({
        initDate: Date.now(),
        progressDate: Date.now(),
        userId:userId,
        customerID:query.CustomerRef,
        manageId:manageId,

        NetPrice: query.totalNetPrice,
        InvoiceID:1234,
        InvoiceNumber:14031111,
        totalCount:query.totalNetCount
    })
    const items = query.Items
    for(var i=0;i<(items&&items.length);i++){
        const item = items[i]
        await faktorItems.create({
            InvoiceID:1234,
            InvoiceNumber:14031111,
            initDate: Date.now(),
            sku:item.SKU,
            Description:item.Description,
            ItemID:item.ItemRef,
            discount:item.Discount,
            fee:item.Fee,
            price:item.Price,
            tax:item.Tax,
            netPrice:item.NetPrice,
            count:item.Quantity
        })
    }
    return(1)
}

module.exports =CartToFaktor