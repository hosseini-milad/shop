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
                    ...calculateBoxing(newItems.count, productData.perBox),
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
                        ...calculateBoxing(newItems.count, productData.perBox),
                        price: newItems.sumPrice,
                        ...newItems
                    }
                    ]
                })
        }
        else {
            let sku = totalData[cIndex].data.find(item => item.brand == brandId).data.find(x => x.sku === newItems.sku)
            if (!sku) {
                const { box, single } = calculateBoxing(newItems.count, productData.perBox)

                sku = {
                    count: newItems.count,
                    unitID: newItems.unitID,
                    ...calculateBoxing(newItems.count, productData.perBox),
                    price: newItems.sumPrice,
                    ...newItems
                }

                classResult[cIndex].data[bIndex].data.push(sku)
            }
            else {
                sku.count += newItems.count;
                sku.count += newItems.count;
                const { box, single } = calculateBoxing(sku.count, productData.perBox)
                sku.box = box
                sku.single = single
                sku.price = MultiplySum(sku.price, newItems.price).toString();
            }
        }
    }
    return (totalData)
    // return (classResult)
}


function calculateBoxing(count, boxCapicity) {
    return {
        box: parseInt(parseInt(count) / parseInt(boxCapicity)),
        single: parseInt(parseInt(count) % parseInt(boxCapicity))
    }
}

module.exports = ClassifyOrder