const MultiplySum = require("./MultiplySum")

const ClassifyOrder=(totalData,newItems)=>{
    return(totalData)
    const bIndex = totalData.findIndex(item=>item.brand==newItems.brand)
    
    var classResult = totalData
    if(bIndex == -1){
        classResult.push({brand:newItems.brand,
            data:[{index:newItems.index,
                data:[{
                    material:newItems.material,
                    count:newItems.count,
                    price:newItems.sumPrice,
                    data:[newItems]
                }
            ]}
            ]
        })
    }
    else{
        const iIndex = totalData[bIndex].data.findIndex(item=>item.index==newItems.index)
        //console.log(totalData[bIndex])
        //console.log(bIndex,iIndex)
        if(iIndex==-1){
            classResult[bIndex].data.push(
                {index:newItems.index,
                    data:[{
                        material:newItems.material,
                        count:newItems.count,
                        price:newItems.sumPrice,
                        data:[newItems]
                    }
                ]})
            }
        else{
            const mIndex = totalData[bIndex].data[iIndex].data.findIndex(item=>item.material==newItems.material)
            
            if(mIndex==-1){
                classResult[bIndex].data[iIndex].data.push(
                    {
                        material:newItems.material,
                        count:newItems.count,
                        price:newItems.sumPrice,
                        data:[newItems]
                    })
                }
            else{

                classResult[bIndex].data[iIndex].data[mIndex].data.push(newItems)
                classResult[bIndex].data[iIndex].data[mIndex].count=
                MultiplySum(classResult[bIndex].data[iIndex].data[mIndex].count,
                    newItems.count)
                classResult[bIndex].data[iIndex].data[mIndex].price = 
                MultiplySum(classResult[bIndex].data[iIndex].data[mIndex].price,
                    newItems.sumPrice)
            }
        }
    }
    
    return(classResult)
}

module.exports =ClassifyOrder