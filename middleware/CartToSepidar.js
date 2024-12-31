const MultiplySum = require("./MultiplySum")

const {TaxRate} = process.env
const CartToSepidar=async(data,faktorNo,user,stock,cartOff,orderNo,payValue,fullPrice)=>{
        const notNullCartItem = []
        const totalOff= cartOff?parseInt(cartOff):0
        for(var i=0;i<data.length;i++)
            data[i].count?
            notNullCartItem.push(data[i]):''
        var query ={
            "GUID": "124ab075-fc79-417f-b8cf-3"+faktorNo,
            "CustomerRef": toInt(user.CustomerID),
            "AddressRef": user.AddressID?user.AddressID:'',
            "CurrencyRef":1,
            "SaleTypeRef": payValue?payValue:4,
            "Duty":0.0000,
            "Description":faktorNo,
            "DescriptionRef":faktorNo,
            "Discount": 0.00,
            "Items": 
            notNullCartItem.map((item,i)=>{
                const price = fullPrice?findPayValuePrice(item.price,payValue?payValue:4):item.price
                const itemDiscount = MultiplySum(item.discount,totalOff,1)
                const discount =itemDiscount?normalPriceFix(price,itemDiscount)/100:0
                return({
                "ItemRef": toInt(item.id),
                "TracingRef": null,
                "Description":item.title+"|"+item.sku+"("+item.desc+")",
                "StockRef":item.stock?item.stock:stock,
                "Quantity": toInt(item.count),
                "Fee": toInt(price),
                "Price": normalPriceFix(price,item.count,1),
                "Discount": discount?normalPriceFix(discount,item.count):0.0000,
                "Tax": normalPriceRound(price-discount,item.count,TaxRate),
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
    var tempPrice = priceText.toString().split('.')[0]
    var rawPrice = Math.round(parseInt(tempPrice.replace( /,/g, '')
        .replace(/\D/g,''))*rawCount*rawTax/1000)
    rawPrice = parseInt(rawPrice)*1000
    return(
      (rawPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace( /^\D+/g, ''))
    )
  }
  const normalPriceFix=(priceText,count,mult)=>{
    if(!priceText||priceText === null||priceText === undefined) return("")
    var rawCount = parseFloat(count.toString())
    var rawMult = mult?parseFloat(mult.toString()):1
    var purePrice = priceText.toString().split('.')[0]
    var rawPrice = (parseInt(purePrice.replace( /,/g, '')
        .replace(/\D/g,''))*rawCount*rawMult)
    return(
      (rawPrice).toString().split('.')[0]
    )
  }
  const normalPriceRound=(priceText,count,mult)=>{
    if(!priceText||priceText === null||priceText === undefined) return("")
    var rawCount = parseFloat(count.toString())
    var rawMult = mult?parseFloat(mult.toString()):1
    var purePrice = priceText.toString().split('.')[0]
    var rawPrice = (parseInt(purePrice.replace( /,/g, '')
        .replace(/\D/g,''))*rawCount*rawMult)
    return(
      Math.round(rawPrice).toString()
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
    if(!payValue)payValue = 4
    var price = priceArray
    if(priceArray.length&&priceArray.constructor === Array)
        price=priceArray.find(item=>item.saleType==payValue).price
   
    return(price)

}

module.exports =CartToSepidar