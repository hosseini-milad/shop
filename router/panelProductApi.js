const express = require('express');
const { default: fetch } = require("node-fetch");
const request = require("request");
const fs = require('fs')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
var ObjectID = require('mongodb').ObjectID;
const { OLD_SITE_URL,API_PORT,StockId,SaleType} = process.env;
var im = require('imagemagick');
const resizeImg = require('resize-img');
 
const ServiceSchema = require('../models/product/Services');
const ProductSchema = require('../models/product/products');
const BrandSchema = require('../models/product/brand')
const category = require('../models/product/category');
const { env } = require('process');
const filterNumber = require('../middleware/Functions');

const productCount = require('../models/product/productCount');
const productPrice = require('../models/product/productPrice');
const NormalTax = require('../middleware/NormalTax');
const openOrders = require('../models/orders/openOrders');

router.post('/fetch-service',jsonParser,async (req,res)=>{
    var serviceId = req.body.serviceId?req.body.serviceId:''
    try{
        if(!serviceId){
            res.json({filter:{}})
            return
        }
        const serviceData = await ServiceSchema.findOne({_id: ObjectID(serviceId)})
        const brandsData = await BrandSchema.find()
       res.json({filter:serviceData,brandsData:brandsData})
    } 
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/list',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
    try{const data={
        category:req.body.category,
        title:req.body.title,
        brand:req.body.brand,
        offset:req.body.offset,
        pageSize:pageSize
    }
        const serviceList = await ServiceSchema.aggregate([
            { $match:data.title?{title:new RegExp('.*' + data.title + '.*')}:{}},
            { $match:data.category?{category:data.category}:{}},
            
            ])
            const orderList = serviceList.slice(offset,
                (parseInt(offset)+parseInt(pageSize)))  
            const typeUnique = [...new Set(serviceList.map((item) => item.category))];
            
           res.json({filter:orderList,type:typeUnique,
            size:serviceList.length})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/list-seprate',jsonParser,async (req,res)=>{
     try{
        const manData = await manufacture.findOne({sku:req.body.lenzDetail})
        const enColor=checkColor(manData)
        const serviceList = await ServiceSchema.find()
            var coating=[]
            var color=[]
            var mirror=[]
            var extra=[]
            for(var i=0;i<serviceList.length;i++){
                if(serviceList[i].category==="Coating"){
                    var price={}
                    try{price =JSON.parse(serviceList[i].servicePrice)}catch{}
                    console.log(price)
                    if(price[req.body.brand])
                        coating.push(serviceList[i])
                }
                if(serviceList[i].category==="Color"){
                    color.push(serviceList[i])
                }
                if(serviceList[i].category==="Mirror"){
                    mirror.push(serviceList[i])
                }
                if(serviceList[i].category==="Extra"){
                    extra.push(serviceList[i])
                }
            }
           res.json({color:color,mirror:mirror,
            coating:coating,extra:extra,enColor:enColor,
            manData:manData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
const checkColor=(lenzData)=>{
    if(lenzData.lenzIndex==="1.56"||
    lenzData.lenzIndex==="1.74"||
    lenzData.lenzIndex==="1.59"||
    lenzData.material.includes('Trans')||
    lenzData.material.includes('Polariz')||
    lenzData.material.includes('Photochrom'))
        return(0)
    else
        return(1)
}

router.post('/editService',jsonParser,async(req,res)=>{
    var serviceId= req.body.serviceId?req.body.serviceId:''
    if(serviceId === "new")serviceId=''
    try{ 
        const data = {
            title:  req.body.title,
            category: req.body.category,
            type:req.body.type,
            value:req.body.value,
            serviceCode: req.body.serviceCode,
            factoryCode:JSON.stringify(req.body.factoryCode),
            hexCode: req.body.hexCode,
            servicePrice: JSON.stringify(req.body.servicePrice), 
            serviceUnit: req.body.serviceUnit,
            servicePurchase: JSON.stringify(req.body.servicePurchase),
            options: req.body.options,
            description:req.body.description,
            sort: req.body.sort,
            imageUrl:  req.body.imageUrl
        }
        var serviceResult = ''
        if(serviceId) serviceResult=await ServiceSchema.updateOne({_id:serviceId},
            {$set:data})
        else
            serviceResult= await ServiceSchema.create(data)
        
        res.json({result:serviceResult,success:serviceId?"Updated":"Created"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


/*Product*/
router.post('/fetch-product',jsonParser,async (req,res)=>{
    var productId = req.body.productId?req.body.productId:''
    try{
        if(!productId){
            res.json({filter:{}})
            return
        } 
        const productData = await ProductSchema.findOne({_id: ObjectID(productId)})
        const brandList = await BrandSchema.find({})
        const categoryList = await category.find({})
       res.json({filter:productData,brandList:brandList,categoryList:categoryList})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/list-product',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
    try{const data={
        category:req.body.category,
        title:req.body.title,
        sku:req.body.sku,
        brand:req.body.brand,
        active:req.body.active,
        offset:req.body.offset,
        pageSize:pageSize
    }
        const productList = await ProductSchema.aggregate([
            { $match:data.title?{title:new RegExp('.*' + data.title + '.*')}:{}},
            { $match:data.sku?{sku:new RegExp('.*' + data.sku + '.*')}:{}},
            { $match:data.category?{category:data.category}:{}},
            { $match:data.active?{enTitle:{ $exists: true}}:{}},
            
            ])
            const products = productList.slice(offset,
                (parseInt(offset)+parseInt(pageSize)))  
            var quantity = []
            var price = []
            for(var i=0;i<products.length;i++){
                const countData = await productCount.findOne(
                    {ItemID:products[i].ItemID,Stock:StockId})
                var openCount = 0
                const openList = await openOrders.find({sku:products[i].sku})
                for(var c=0;c<openCount.length;c++) openCount+= parseInt(openCount[c].count)
                const priceData = await productPrice.findOne(
                    {ItemID:products[i].ItemID,saleType:SaleType})
                products[i].price = priceData?priceData.price:''
                products[i].taxPrice=NormalTax(products[i].price)
                products[i].count = countData?countData.quantity:''
                products[i].openOrderCount = openCount
            }
            const typeUnique = [...new Set(productList.map((item) => item.category))];
            
           res.json({filter:products,type:typeUnique,
            size:productList.length,full:productList,
            quantity:quantity,price:price})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/editProduct',jsonParser,async(req,res)=>{
    var productId= req.body.productId?req.body.productId:''
    if(productId === "new")productId=''
    try{ 
        const data = {
            title:  req.body.title,
            catId: req.body.catId,
            brandId: req.body.brandId,
            sharifId: req.body.sharifId,
            type:req.body.type,
            value:req.body.value,
            enTitle:req.body.enTitle,
            description:req.body.description,
            fullDesc:req.body.fullDesc,
            productUrl:req.body.productUrl,
            metaTitle: req.body.metaTitle,
            productMeta:req.body.productMeta,
            sku: req.body.sku,
            productCode: req.body.productCode,
            price: req.body.price,
            quantity: req.body.quantity,
            sort: req.body.sort,
            imageUrl:  req.body.imageUrl,
            thumbUrl:  req.body.thumbUrl
        }
        var productResult = ''
        if(productId) productResult=await ProductSchema.updateOne({_id:productId},
            {$set:data})
        else
        productResult= await ProductSchema.create(data)
        
        res.json({result:productResult,success:productId?"Updated":"Created"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/updateProduct',jsonParser,async(req,res)=>{
    var productId= req.body.productId?req.body.productId:''
    productId=filterNumber(productId)
    if(productId === "new")productId=''
    try{ 
        const newRawData = await fetch(OLD_SITE_URL+"/api/v1/getProduct/"+productId,
            {method: 'GET' ,headers:{"content-type": "application/json"}});
        var result = ''
        try{result =await newRawData.json()}
        catch{
            res.status(400).json({error:"Api not find"})
            return
        }
        const newData = result.data
        const location = "/upload/product/"
        const imageUrl = newData.image_url?location+productId+"."+newData.image_url.split('.').pop():
            "https://sharifoilco.com/images/motor-oil.jpg"
        const thumbUrl = newData.image_url?location+productId+"Thumb."+newData.image_url.split('.').pop():
            "https://sharifoilco.com/images/motor-oil.jpg"
        var status = 0
        await download(OLD_SITE_URL+newData.image_url,imageUrl , function(){
            status=1;
        });
        await resizeImage(imageUrl,thumbUrl)
        //const newImage = resultImage
        //console.log(resultImage)
        res.json({data:newData,image:imageUrl,thumb:thumbUrl,
            success:productId?"Updated":"Created"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


var download =async function(uri, filename, callback){
    return new Promise(resolve => {
    request.head(uri, function(err, res, body){
      request(encodeURI(uri)).pipe(fs.createWriteStream("."+filename)).on('close', resolve);
      
    })})
  };
function fetchImage(url) {
    return new Promise(function (resolve, reject) {
request.get(url,
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            resolve("data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64'))
            
        }else {
            reject(error);
          }
    })})}

async function resizeImage(imageData,outUrl){
    //const imageRaw = fs.readFileSync(imageData, 'binary')
    const image = await resizeImg(fs.readFileSync("."+imageData), {
        width: 150,
        height: 150
    });
 
    fs.writeFileSync("."+outUrl, image);
}

/*Product*/
router.post('/fetch-brand',jsonParser,async (req,res)=>{
    var brandId = req.body.brandId?req.body.brandId:''
    try{
        if(!brandId){
            res.json({filter:{}})
            return
        }
        const brandData = await BrandSchema.findOne({_id: ObjectID(brandId)})
       res.json({filter:brandData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/list-brands',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
    try{const data={
        category:req.body.category,
        title:req.body.title,
        brand:req.body.brand,
        offset:req.body.offset,
        pageSize:pageSize
    }
        const brandList = await BrandSchema.aggregate([
            { $match:data.title?{title:new RegExp('.*' + data.title + '.*')}:{}},
            { $match:data.category?{category:data.category}:{}},
            
            ])
            const brands = brandList.slice(offset,
                (parseInt(offset)+parseInt(pageSize)))  
            const typeUnique = [...new Set(brandList.map((item) => item.category))];
            
           res.json({filter:brands,type:typeUnique,
            size:brands.length})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/editBrand',jsonParser,async(req,res)=>{
    var brandId= req.body.brandId?req.body.brandId:''
    if(brandId === "new")brandId=''
    try{ 
        const data = {
            title:  req.body.title,
            enTitle: req.body.sku, 
            productMeta: req.body.productMeta,
            type:req.body.type,
            value:req.body.value,
            description:req.body.description,
            fullDesc:req.body.fullDesc,
            brandCode: req.body.brandCode,
            price: req.body.price,
            sort: req.body.sort,
            brandUrl:  req.body.brandUrl,
            imageUrl:  req.body.imageUrl
        }
        var brandResult = ''
        if(brandId) brandResult=await BrandSchema.updateOne({_id:brandId},
            {$set:data})
        else
        brandResult= await BrandSchema.create(data)
        
        res.json({result:brandResult,success:brandId?"Updated":"Created"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

/*Category*/
router.post('/fetch-category',jsonParser,async (req,res)=>{
    var catId = req.body.catId?req.body.catId:''
    try{
        if(!catId){
            res.json({filter:{}})
            return
        }
        const catData = await category.findOne({_id: ObjectID(catId)})
        const catList = await category.find()
       res.json({filter:catData,options:catList})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/list-category',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
    try{const data={
        category:req.body.category,
        title:req.body.title,
        brand:req.body.brand,
        offset:req.body.offset,
        pageSize:pageSize
    }
        const catData = await category.aggregate([
            { $match:data.title?{title:new RegExp('.*' + data.title + '.*')}:{}},
            { $match:data.category?{category:data.category}:{}},
            
            ])
            const cats = catData.slice(offset,
                (parseInt(offset)+parseInt(pageSize)))  
            const typeUnique = [...new Set(cats.map((item) => item.category))];
            
           res.json({filter:cats,type:typeUnique,
            size:cats.length})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/editCats',jsonParser,async(req,res)=>{
    var catId= req.body.catId?req.body.catId:''
    if(catId === "new")catId=''
    try{
        const data = {
            title:  req.body.title,
            link: req.body.link,
            type:req.body.type,
            value:req.body.value,
            parent:req.body.parent,
            description:req.body.description,
            sku: req.body.sku, 
            catCode:req.body.catCode,
            price: req.body.price,
            quantity: req.body.quantity,
            sort: req.body.sort,
            iconUrl:  req.body.iconUrl,
            imageUrl:  req.body.imageUrl,
            thumbUrl:  req.body.thumbUrl
        }
        var catResult = ''
        if(catId) catResult=await category.updateOne({_id:catId},
            {$set:data})
        else
        catResult= await category.create(data)
        
        res.json({result:catResult,success:catId?"Updated":"Created"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;