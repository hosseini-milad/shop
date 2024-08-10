const UpdateMarket=async(marketArray,user,count,price,brandArray,product)=>{
    var index = marketArray.findIndex(item=>item.id==user)
    if(index == -1) return({marketArray,brandArray})
        
    marketArray[index].count += parseFloat(count)
    marketArray[index].price += parseFloat(price)

    var bIndex = brandArray?brandArray.findIndex(item=>item.brandId==product.brandId):-1
    if(bIndex == -1) {
        brandArray.push({
            name:product.brandInfo&&product.brandInfo[0]&&
                product.brandInfo[0].title,
            brandId:product.brandId,
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