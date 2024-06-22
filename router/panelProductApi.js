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
const Filters = require('../models/product/Filters');
const factory = require('../models/product/factory');
const orders = require('../models/orders/orders');
const faktor = require('../models/product/faktor');
const cart = require('../models/product/cart');
const users = require('../models/auth/users');
const products = require('../models/product/products');

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
    var offset = req.body.offset?(parseInt(req.body.offset)):0;
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
        if(!productData){
            res.json({filter:{}})
            return
        }
        const brandList = await BrandSchema.find({})
        const categoryList = await category.find({})
        const brandData = productData.brandId?
            brandList.find(item=>item.brandCode==productData.brandId):''
        const catData = productData.catId?
            categoryList.find(item=>item.catCode==productData.catId):''
        const filterList = catData?
            await Filters.find({"category._id":catData._id.toString()}):''
       
        res.json({filter:productData,brandList:brandList,categoryList:categoryList,
        brandData:brandData,catData:catData,filterList:filterList})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/list-product',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)):0;
    var stockId = req.body.store?req.body.store.StockID:StockId
    try{const data={
        category:req.body.category,
        title:req.body.title,
        sku:req.body.sku,
        exists: req.body.exist?1:0,
        brand:req.body.brand,
        active:req.body.active,
        offset:req.body.offset,
        pageSize:pageSize
    }
        const products = await ProductSchema.aggregate([
            { $match:data.title?{title:new RegExp('.*' + data.title + '.*')}:{}},
            { $match:data.sku?{sku:new RegExp('.*' + data.sku + '.*')}:{}},
            { $match:data.category?{category:data.category}:{}},
            { $match:data.active?{active:true}:{}},
            { $match:data.brand?{brandCode:data.brand}:{}},
            {$lookup:{from : "brands", 
            localField: "brandId", foreignField: "brandCode", as : "brandInfo"}},
            ])
        const productsQuantity = await productCount.find({Stock:stockId})
            var quantity = []
            var price = []
            const newProduct=[]
            for(var i=0;i<products.length;i++){
                const countData = productsQuantity.find(
                    Item=>Item.ItemID==products[i].ItemID)
                //const countStock = stockData?countData.find(item=>item.Stock==stockData):''
                if(!countData||!countData.quantity) 
                    if(!data.exists)continue
                
                if(newProduct.length>(pageSize+offset)){
                    newProduct.push({})
                    continue;
                }
                const countAll = await productCount.find(
                    {ItemID:products[i].ItemID})
                var openCount = 0
                //if()
                const openList = await openOrders.find({sku:products[i].sku,payStatus:"paid"})
                for(var c=0;c<openList.length;c++) openCount+= parseInt(openList[c].count)
                const priceData = await productPrice.findOne(
                    {ItemID:products[i].ItemID,saleType:SaleType})
                newProduct.push({
                    ...products[i],
                    price:priceData?priceData.price:'',
                    taxPrice:NormalTax(products[i].price)/10,
                    count:countData?countData.quantity:'',
                    countTotal:countAll,
                    openOrderCount:openCount
                })
            }
            
            const productList = newProduct.slice(offset,
                (parseInt(offset)+parseInt(pageSize)))  
            const typeUnique = [...new Set(productList.map((item) => item.brand))];
            const brandList = await BrandSchema.find()
           res.json({filter:productList,brands:brandList,
            size:newProduct.length,exists:data.exists,
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
            filters:req.body.filters,
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
    var offset = req.body.offset?(parseInt(req.body.offset)):0;
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
            size:brandList.length})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/update-brand',jsonParser,auth,async(req,res)=>{
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
            active:req.body.active,
            sort: req.body.sort,
            brandUrl:  req.body.brandUrl,
            imageUrl:  req.body.imageUrl
        }
        var brandResult = ''
        //const brandDetail = await BrandSchema.updateOne({_id:ObjectID(brandId)})
        if(brandId) brandResult=await BrandSchema.updateOne({_id:ObjectID(brandId)},
            {$set:data})
        else
        brandResult= await BrandSchema.create(data)
        
        res.json({result:brandResult,success:brandId?"Updated":"Created"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/delete-brand',jsonParser,auth,async(req,res)=>{
    var brandId= req.body.brandId?req.body.brandId:''
    try{ 
        
        var brandResult = ''
        if(brandId) brandResult=await BrandSchema.deleteOne({_id:ObjectID(brandId)})
        
        res.json({result:brandResult,success:brandId?"deleted":""})
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
    var offset = req.body.offset?(parseInt(req.body.offset)):0;
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
        if(catId) catResult=await category.updateOne({_id:ObjectID(catId)},
            {$set:data})
        else
        catResult= await category.create(data)
        try{
        
        res.json({result:catResult,success:catId?"Updated":"Created"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
/*Filters*/
router.post('/fetch-filter',jsonParser,async (req,res)=>{
    var filterId = req.body.filterId?req.body.filterId:''
    try{
        if(!filterId){
            res.json({filter:{}})
            return 
        }
        const categoryData = await category.find()
        const filterData = await Filters.findOne({_id: ObjectID(filterId)})
       res.json({filter:filterData,category:categoryData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/list-filter',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)):0;
    try{const data={
        category:req.body.category,
        title:req.body.title,
        enTitle:req.body.enTitle,
        type:req.body.type,
    }
        const filterList = await Filters.aggregate([
            { $match:data.title?{title:new RegExp('.*' + data.title + '.*')}:{}},
            { $match:data.category?{category:data.category}:{}},
            { $match:data.type?{type:data.type}:{}},
            ])
            const filters = filterList.slice(offset,
                (parseInt(offset)+parseInt(pageSize)))  
            const typeUnique = [...new Set(filterList.map((item) => item.category))];
            
           res.json({filter:filters,type:typeUnique,
            size:filterList.length})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/edit-filter',jsonParser,async(req,res)=>{
    var filterId= req.body.filterId?req.body.filterId:''
    if(filterId === "new")filterId=''
    try{ 
        const data = {
            category:req.body.category,
            title:req.body.title,
            enTitle:req.body.enTitle,
            type:req.body.type,
            optionsP:req.body.optionsP,
            optionsN:req.body.optionsN,
            sort:req.body.sort
        }
        var filterResult = ''
        if(filterId) filterResult=await Filters.updateOne({_id:filterId},
            {$set:data})
        else
        filterResult= await Filters.create(data)
        
        res.json({result:filterResult,success:filterId?"Updated":"Created"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

/*Factory*/
router.post('/fetch-factory',jsonParser,async (req,res)=>{
    var factoryId = req.body.factoryId?req.body.factoryId:''
    try{
        if(!factoryId){
            res.json({filter:{}})
            return
        }
        const filterData = await factory.findOne({_id: ObjectID(factoryId)})
       res.json({filter:filterData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/list-factory',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)):0;
    try{const data={
        category:req.body.category,
        title:req.body.title,
        enTitle:req.body.enTitle,
        type:req.body.type,
    }
        const filterList = await factory.aggregate([
            { $match:data.title?{title:new RegExp('.*' + data.title + '.*')}:{}},
            { $match:data.category?{category:data.category}:{}},
            { $match:data.type?{type:data.type}:{}},
            ])
            const filters = filterList.slice(offset,
                (parseInt(offset)+parseInt(pageSize)))  
            const typeUnique = [...new Set(filterList.map((item) => item.category))];
              
           res.json({filter:filters,type:typeUnique,
            size:filterList.length})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/edit-factory',jsonParser,async(req,res)=>{
    var factoryId= req.body.factoryId?req.body.factoryId:''
    if(factoryId === "new")factoryId=''
    try{ 
        const data = {
            title:req.body.title,
            enTitle:req.body.enTitle
        }
        var filterResult = ''
        if(factoryId) filterResult=await factory.updateOne({_id:factoryId},
            {$set:data})
        else
        filterResult= await factory.create(data)
        
        res.json({result:filterResult,success:factoryId?"Updated":"Created"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/report-total',jsonParser,auth,async(req,res)=>{
    var nowDate = new Date();
    try{ 
        const data = {
            manageId:req.body.manageId,
            userId:req.body.userId,
            brand:req.body.brandId,
            dateFrom:
                req.body.dateFrom?req.body.dateFrom[0]+"/"+
                req.body.dateFrom[1]+"/"+req.body.dateFrom[2]+" "+"00:00":
                new Date().toISOString().slice(0, 10)+" 00:00",
                //new Date(nowDate.setDate(nowDate.getDate() - 1)).toISOString().slice(0, 10)+" "+"00:00",
            dateTo:
                req.body.dateTo?req.body.dateTo[0]+"/"+
                req.body.dateTo[1]+"/"+req.body.dateTo[2]+" 23:59":
                new Date().toISOString().slice(0, 10)+" 23:59",
            
        }
        const managerList = await users.find({access:"market"})
        const nowIso=nowDate.toISOString();
        const nowParse = Date.parse(nowIso);
        const now = new Date(nowParse)
        var now2 = new Date();
        var now3 = new Date();
        const dateFromEn = new Date(now2.setDate(now.getDate()-(data.dateFrom?data.dateFrom:1)));
        dateFromEn.setHours(0, 0, 0, 0)
        const dateToEn = new Date(now3.setDate(now.getDate()-(data.dateTo?data.dateTo:0)));
        dateToEn.setHours(23, 59, 0, 0)
        const reportList = await cart.aggregate([
            {$lookup:{
                from : "customers", 
                localField: "userId", 
                foreignField: "_id", 
                as : "userInfo"
            }},
            { $match:data.manageId?{manageId:data.manageId}:{}},
            { $match:data.userId?{userId:data.userId}:{}},
            { $match:{initDate:{$gte:new Date(data.dateFrom)}}},
            { $match:{initDate:{$lte:new Date(data.dateTo)}}},
            { $sort: {"initDate":-1}},
     
            ])
        var filterResult = ''
        
        var productList=[]
        var totalPrice=0
        var totalCount = 0
        var userList = []
        var brandList=[]
        var errorPrice=[]
        for(var i=0;i<(reportList&&reportList.length);i++){
            var payValue = reportList[i].payValue
            var cartItems=reportList[i].cartItems
            var itemAdd = 0
            for(var j=0;j<(cartItems&&cartItems.length);j++){
                const productDetail = await products.aggregate([
                    {$match:{sku:cartItems[j].sku}},
                    {$lookup:{
                        from : "brands", 
                        localField: "brandId", 
                        foreignField: "brandCode", 
                        as : "brandInfo"
                    }},
                    {$lookup:{
                        from : "category", 
                        localField: "catId", 
                        foreignField: "catCode", 
                        as : "categoryInfo"
                    }},
                ])
                var price = cartItems[j].price
                cartItems[j].product = productDetail&&productDetail[0]
                if(data.brand)
                    if(cartItems[j].product&&
                        cartItems[j].product.brandId!=data.brand)
                        continue
                   
                itemAdd=1
                cartItems[j].brandData = cartItems[j].product&&cartItems[j].product.brandInfo[0]
                try{
                    price=cartItems[j].price.find(item=>item.saleType == payValue)
                    if(price) price = parseInt(price.price)
                }
                catch{
                    errorPrice.push(price)
                }
                var myItem = cartItems[j]
                myItem.totalPrice =price*myItem.count
                var index = productList.findIndex(item=>item.sku==myItem.sku)
                if(index == -1){
                    productList.push(myItem)
                }
                else{
                    var cNumber = parseInt(productList[index].count)
                    cNumber += parseInt(myItem.count)
                    productList[index].count = cNumber
                    var cPrice = parseInt(productList[index].totalPrice)
                    cPrice += parseInt(myItem.totalPrice)
                    productList[index].totalPrice = cPrice

                }
                totalPrice+= myItem.totalPrice
                totalCount+= parseInt(myItem.count)
            }
            if(itemAdd){
                var index = userList.findIndex(item=>item.id == reportList[i].userId)
                var bndex = brandList.findIndex(item=>item._id == reportList[i].brandData&&reportList[i].brandData._id)
                reportList[i].userInfo&& index==-1&&
                    userList.push({id:reportList[i].userId,
                        ...reportList[i].userInfo[0]})
                bndex == -1&&brandList.push(reportList[i].brandData)
            }
        }
        const sortList = productList.sort(function(a, b) {
            var textA = a.sku.toUpperCase();
            var textB = b.sku.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        //const brandList = [...new Set(sortList.map((item) => item.brandData._id))];
        res.json({data:sortList,marketList:managerList,
            errorPrice:errorPrice,userList,brandList,
            totalCount:totalCount,totalPrice:totalPrice})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
module.exports = router;