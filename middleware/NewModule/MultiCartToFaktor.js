const faktor = require("../../models/product/faktor");
const faktorItems = require("../../models/product/faktorItems");


var tax = process.env.TaxRate

const CartToFaktor=async(query,userData,manageData,result)=>{
    if(!query) return
    await faktor.create({
        initDate: Date.now(),
        progressDate: Date.now(),
        userId:userData._id,
        customerID:query.CustomerRef,
        customerName:userData.username,
        manageId:manageData._id,
        managerName:manageData.username,

        NetPrice: result.NetPrice?result.NetPrice:
            query.totalNetPrice,
        InvoiceID:result.InvoiceID,
        InvoiceNumber:result.Number,
        totalCount:query.totalNetCount
    })
    const items = query.Items
    for(var i=0;i<(items&&items.length);i++){
        const item = items[i]
        await faktorItems.create({
            InvoiceID:result.InvoiceID,
            InvoiceNumber:result.Number,
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