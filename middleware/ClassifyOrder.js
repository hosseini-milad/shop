const products = require("../models/product/products")
const brands = require("../models/product/brand")
const category = require("../models/product/category")
const MultiplySum = require("./MultiplySum")

const ClassifyOrder = async (totalData, newItems) => {
    newItems.price = ''

    const productData = await products.findOne({ sku: newItems.sku })
    //console.log(productData)
    var catId = productData && productData.catId
    var brandId = productData && productData.brandId
    const brandDetail = brandId && await brands.findOne({ brandCode: brandId })
    const catDetail = catId && await category.findOne({ catCode: catId })

    const cIndex = totalData.findIndex(item => item.cat == catId)
    console.log(cIndex)
    newItems.box = productData.perBox
    newItems.single = parseInt(newItems.count)/parseInt(newItems.box)
    var classResult = totalData
    if (cIndex == -1) {
        classResult.push({
            cat: catId,
            catData: catDetail,
            data: [{
                brand: brandId,
                brandData: brandDetail,
                data: [{
                    count: newItems.count,
                    box:newItems.box,
                    single:newItems.single,
                    price: newItems.sumPrice,
                    ...newItems
                }
                ]
            }
            ]
        })
    }
    else {
        const bIndex = totalData[cIndex].data.findIndex(item => item.brand == brandId)
        //console.log(totalData[bIndex])
        //console.log(bIndex,iIndex)
        if (bIndex == -1) {
            classResult[cIndex].data.push(
                {
                    brand: brandId,
                    brandData: brandDetail,
                    data: [{
                        count: newItems.count,
                        box:newItems.box,
                        single:newItems.single,
                        price: newItems.sumPrice,
                        ...newItems
                    }
                    ]
                })
        }
        else {
            const sku = totalData[cIndex].data.find(item => item.brand == brandId).data.find(x => x.sku === newItems.sku)
            if (!sku) {
                classResult[cIndex].data[bIndex].data.push(newItems)
                classResult[cIndex].data[bIndex].count =
                    MultiplySum(classResult[cIndex].data[bIndex].count,
                        newItems.count)
                classResult[cIndex].data[bIndex].price =
                    MultiplySum(classResult[cIndex].data[bIndex],
                        newItems.sumPrice)

            }
            else {
                classResult[cIndex].data[bIndex].count =
                    MultiplySum(classResult[cIndex].data[bIndex].count,
                        newItems.count).toString();
                sku.count += newItems.count;
                classResult[cIndex].data[bIndex].price =
                    MultiplySum(classResult[cIndex].data[bIndex].price,
                        newItems.price).toString()
                sku.price = MultiplySum(sku.price, newItems.price).toString();
            }


        }
    }
    return (totalData)
    // return (classResult)
}

module.exports = ClassifyOrder