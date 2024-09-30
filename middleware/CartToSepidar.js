const {TaxRate} = process.env
const CartToSepidar=async(data,faktorNo,user,stock)=>{
        const notNullCartItem = []
        for(var i=0;i<data.length;i++)
            data[i].count?
            notNullCartItem.push(data[i]):''
        var query ={
            "GUID": "124ab075-fc79-417f-b8cf-1"+faktorNo,
            "CustomerRef": toInt(user.CustomerID),
            "AddressRef": user.AddressID?user.AddressID:'',
            "CurrencyRef":1,
            "SaleTypeRef": 3,
            "Duty":0.0000,
            "Description":faktorNo,
            "DescriptionRef":faktorNo,
            "Discount": 0.00,
            "Items": 
            notNullCartItem.map((item,i)=>{
                const price = findPayValuePrice(item.price,3)
                const discount =item.discount?normalPriceDiscount(price,item.discount,1):0
                return({
                "ItemRef": toInt(item.id),
                "TracingRef": null,
                "Description":item.title+"|"+item.sku,
                "StockRef":item.stock?item.stock:stock,
                "Quantity": toInt(item.count),
                "Fee": toInt(price),
                "Price": normalPriceCount(price,item.count,1),
                "Discount": discount?normalPriceCount(discount,item.count,1):0.0000,
                "Tax": normalPriceCount(price-discount,item.count,TaxRate),
                "Duty": 0.0000,
                "Addition": 0.0000
              })})
            
          }
        return(query)
    }

    
const toInt=(strNum,count,align)=>{
    if(!strNum)return(0)
    
    return(parseInt(parseInt((align?"-":'')+strNum.toString().replace( /,/g, ''))*
    (count?parseFloat(count):1)))
}
const normalPriceCount=(priceText,count,tax)=>{
    if(!priceText||priceText === null||priceText === undefined) return("")
    var rawCount = parseFloat(count.toString())
    var rawTax = parseFloat(tax.toString())
    var rawPrice = Math.round(parseInt(priceText.toString().replace( /,/g, '')
        .replace(/\D/g,''))*rawCount*rawTax/1000)
    rawPrice = parseInt(rawPrice)*1000
    return(
      (rawPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace( /^\D+/g, ''))
    )
  }
  const normalPriceDiscount=(priceText,discount,count)=>{
    if(!priceText||priceText === null||priceText === undefined) return(0)
    if(!discount) return(0)
    var rawCount = parseFloat(count.toString())
    var discount = parseInt(discount.toString())
    var newDiscount = discount
    if(discount<100)
        newDiscount = discount * rawCount * priceText /100
    rawPrice = parseInt(Math.round(newDiscount/1000))*1000
    return(rawPrice)
}
const findPayValuePrice=(priceArray,payValue)=>{
    if(!priceArray)return(0)
    if(!payValue)payValue = 3
    var price = priceArray
    if(priceArray.length&&priceArray.constructor === Array)
        price=priceArray.find(item=>item.saleType==payValue).price
   
    return(price)

}

module.exports =CartToSepidar