const UpdateMarket=async(marketArray,user,count,price,brandArray,product)=>{
    var index = marketArray.findIndex(item=>item.id==user)
    if(index == -1) return({marketArray,brandArray})
        
    marketArray[index].count += parseFloat(count)
    marketArray[index].price += parseFloat(price)

    var bIndex = brandArray?brandArray.findIndex(item=>
        product.brandId?(item.brandId==product.brandId):item.brandId=="0"):-1
    if(bIndex == -1) {
        brandArray.push({
            name:(product.brandInfo&&product.brandInfo[0])?
                product.brandInfo[0].title:"نامشخص",
            brandId:product.brandId?product.brandId:"0",
            count:count, 
            price:price
        }) 
    }
    else{
        brandArray[bIndex].count += parseFloat(count)
        brandArray[bIndex].price += parseFloat(price)
        
    }
    return({marketArray,brandArray})
}

module.exports =UpdateMarket