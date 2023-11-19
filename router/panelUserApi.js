const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
var ObjectID = require('mongodb').ObjectID;
const multer = require('multer');
const fs = require('fs');
const user = require('../models/auth/customers');


router.post('/fetch-user',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var userId = req.body.userId
    try{
        const userData = await user.findOne({_id: ObjectID(userId)})
       res.json({data:userData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/list',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
    try{const data={
        orderNo:req.body.orderNo,
        status:req.body.status,
        customer:req.body.customer,
        access:req.body.access,
        offset:req.body.offset,
        brand:req.body.brand
    }
        const reportList = await user.aggregate([
            { $match:data.access?{access:data.access}:{}},
        ])
        const filter1Report = data.customer?
        reportList.filter(item=>item&&item.cName&&
            item.cName.includes(data.customer)):reportList;
        const orderList = filter1Report.slice(offset,
            (parseInt(offset)+parseInt(pageSize)))  
        const accessUnique = [...new Set(filter1Report.map((item) => item.access))];
       res.json({filter:orderList,size:filter1Report.length,access:accessUnique})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/update-user',jsonParser,async (req,res)=>{
    var userId = req.body.userId
    const data={
        cName:req.body.cName,
        email:req.body.email,
        mobile:req.body.mobile,
        meli:req.body.meli,
        cCode:req.body.cCode,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        about:req.body.about,
    }
    try{
        const userData = await user.updateOne({_id: ObjectID(userId)},
        {$set:data})
       res.json({data:userData,success:"تغییرات اعمال شدند"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})


var storage = multer.diskStorage(
    {
        destination: '/dataset/',
        filename: function ( req, file, cb ) {
            cb( null, "Deep"+ '-' + Date.now()+ '-'+file.originalname);
        }
    }
  );
  const uploadImg = multer({ storage: storage ,
    limits: { fileSize: "5mb" }})

router.post('/upload',uploadImg.single('upload'), async(req, res, next)=>{
    const folderName = req.body.folderName?req.body.folderName:"temp"
    try{
    // to declare some path to store your converted image
    var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    response = {};
    if (matches.length !== 3) {
    return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    //let type = decodedImg.type;
    //let extension = mime.extension(type);
    let fileName = `MGM-${Date.now().toString()+"-"+req.body.imgName}`;
   var upUrl = `/upload/${folderName}/${fileName}`
    fs.writeFileSync("."+upUrl, imageBuffer, 'utf8');
    return res.send({"status":"success",url:upUrl});
    } catch (e) {
        res.send({"status":"failed",error:e});
    }
})
module.exports = router;