const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var ObjectID = require('mongodb').ObjectID;
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const User = require("../models/auth/users");
const loginLogSchema = require('../models/auth/logs')
const LogCreator = require('../middleware/LogCreator')
const sendMailBrevo = require('../middleware/sendMail');
const sendMailRegBrevo = require('../middleware/sendMailReg');
const sendMailChangeEmailBrevo = require('../middleware/sendMailChange');
const task = require('../models/main/task');
const customers = require('../models/auth/customers');
var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
  apikey: process.env.SMS_API
});

router.post('/login',jsonParser, async (req,res)=>{
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
          res.status(400).json({error:"All input is required"});
          return;
        }
        // Validate if user exist in our database
        const user = await User.findOne({username: username });
        //console.log(user)
        if(!user){
          res.status(400).json({error:"user not found"});
          return;
        }
        if(!user.password){
          res.status(400).json({error:"password not set"});
          return;
        }
        if(user.active==="false"){
          res.status(400).json({error:"user not active"});
          return;
        }
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {expiresIn: "72h",}
          );
          user.token = token;
          res.status(200).json(user);
          return;
        }
        if (user && password===user.password){
          const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {expiresIn: "2h",}
          );
          user.token = token;
          res.status(200).json(user);
          return;
        }
        else{
          res.status(400).json({error:"Invalid Password"}); 
        }
        } 
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const createOTP=(cName)=>{
  return(cName+(Math.floor(Math.random() * 10000000)
   + 10000000))
}
router.post('/sendOtp',jsonParser,async(req,res)=>{
  try {
    const { phone } = req.body;
    ////console.log((phone)
    var otpValue = Math.floor(Math.random() * 8999)+1000 ;
    
    const user = await customers.findOne({phone: phone });
    ////console.log((otpValue)
    if(user){
      
    /*console.log({
      token: otpValue,
      template: process.env.template,//"mgmVerify",
      receptor: phone
  }) */
      api.VerifyLookup({
        token: otpValue,
        template: process.env.template,//"mgmVerify",
        receptor: phone
    },);
      const newUser = await customers.updateOne(
        {phone:phone},{$set:{otp:otpValue}});
        ////console.log((newUser)
      res.status(200).json({message:"sms sent for "+phone});
    }
    else {
      api.VerifyLookup({
        token: otpValue,
        template: process.env.template,//"mgmVerify",
        receptor: phone 
    },);
      const newUser = await customers.create(
        { phone:phone,
          otp:otpValue,
          email:phone+"@mgmlenz.com",
          date:Date.now()});
      //res.status(200).json({"error":"user not found"});
      const newUserLog = await loginLogSchema.create({
        title: "ثبت مشتری جدید",
        user: newUser._id,
        phone: phone,
        kind:"crm",
        description: "کاربر با شماره تماس "+phone+ "در سامانه ثبت نام کرده است",
        status: "unread",
        date:Date.now()
      })
      ////console.log((newUserLog)
      res.status(200).json({message:"welcome to sharif, sms sent for "+phone});
    }
  }
  catch (error){
    res.status(400).json({message:"login error",error:error});
  }
})


router.post('/verifyOtp',jsonParser,async(req,res)=>{
try {
  // Get user input
  const data ={ phone, otp } = req.body;

  // Validate user input
  if (!(phone && otp)) {
    res.status(400).send("All input is required");
    return;
  }
  // Validate if user exist in our database
  const user = await customers.findOne({phone: phone });
  ////console.log((user , phone)
  if (user && otp===user.otp) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, phone },
      process.env.TOKEN_KEY,
      {
        expiresIn: "6h",
      }
    );

    // save user token
    user.token = token;

    // user
    res.status(200).json(user);
    return;
  }
  if(user && otp!==user.otp){
    res.status(200).json({
      "error":"wrong otp"
    });
  }
  //res.status(400).send("Invalid Credentials");
} catch (err) {
  //console.log((err);
}
})

router.post('/forget',jsonParser, async (req,res)=>{
  try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({error:"Email is required"});
        return;
      }
      // Validate if user exist in our database
      const user = await User.findOne({email: email });
      if(!user){
        
        res.status(400).json({error:"Email not found"});
        return;
      }
      if (user) {
        const newOtp=createOTP(user.cName)
        await User.updateOne({email: email },{$set:{otp:newOtp}})
        const sendMailResult = await sendMailBrevo(email,newOtp)
        //console.log(sendMailResult)
        if(sendMailResult.error)
          res.status(400).json({error:sendMailResult.error});
        else res.status(200).json({message:"email sent"});
        return;
      }
      
    } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/register',auth,jsonParser, async (req,res)=>{
  try {
      const data = {
        username: req.body.username,
        cName: req.body.cName,
        sName: req.body.sName,
        phone: req.body.phone,
        password: req.body.password,
        email: req.body.email,
        access: req.body.access,
        group: req.body.group,
        agent:req.body.agent?req.body.agent:req.headers["userid"],
        nif: req.body.nif,

        nameCompany:req.body.nameCompany,
        firma:req.body.firma,
        morada:req.body.morada,
        nifCompany:req.body.nifCompany,
        phoneCompany:req.body.phoneCompany,
        emailCompany:req.body.emailCompany,
        IBANCompany:req.body.IBANCompany,
        active:"false",
        date: Date.now()
      }
      if (!(data.cName && data.sName&&data.phone&&data.email)) {
        res.status(400).json(
          {error:"All input is required"});
        return;
      } 
      // Validate if user exist in our database
      const user = await User.findOne({$or:[
        {username: data.username },{email:data.email}]});
      if(!user){
        data.password = data.password&&await bcrypt.hash(data.password, 10);
        const bitrixData = {}//await sendBitrix(data,"crm.contact.add.json")
        //console.log(bitrixData)
        if(bitrixData.error){
          res.status(400).json({error:bitrixData.error_description})
          return
        }
        //const bitrixDealConst=await bitrixDeal(bitrixData.result,"crm.deal.add.json",data)

        //console.log(bitrixDealConst)
        const newOtp=createOTP(data.cName)
        const user = //bitrixData.result&&
          await User.create({...data,bitrixCode:bitrixData.result,
          otp:newOtp});

        const createTask =await task.create({userId:user._id,
          state:"lead",date:Date.now()})
        //await User.updateOne({email: data.email },{$set:{otp:newOtp}})
        const sendMailResult = await sendMailRegBrevo(data.email,'',
            data.access==="customer"?newOtp:req.body.password,newOtp)
        //console.log(sendMailResult)
        res.status(201).json({user:user,message:"User Created"})
        return;
      }
      else{
        res.status(400).json(
          {error:"User Already Exists"});
        return;
      }
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/list-users',auth,jsonParser, async (req,res)=>{
  try {
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
      const data = {
        agent: req.body.agent,
        cName: req.body.cName,
        sName: req.body.sName,
        phone: req.body.phone,
        email: req.body.email,
        access: req.body.access,
        group: req.body.group,
        nif: req.body.nif,
        offset:req.body.offset?req.body.offset:0,
        date: Date.now()
      }
      // Validate if user exist in our database
      const userOwner = await User.findOne({_id:req.headers["userid"]});
      //console.log(userOwner)
      const user = await User.aggregate([
        { $match : data.access?{access:data.access}:{}},
        { $match : data.cName?{cName:{$regex: data.cName}}:{}},
        { $match : data.sName?{sName:{$regex: data.sName}}:{}},
        { $match : data.nif?{nif:{$regex: data.nif}}:{}},
        { $match : data.email?{email:{$regex: data.email}}:{}},
        { $match : data.phone?{phone:{$regex: data.phone}}:{}},
        { $match : (userOwner&&(userOwner.access==="agent"||userOwner.access==="agency"))?
          {agent: {$regex:userOwner._id.toString()}}:{}},
        
        { $addFields: { "agent": { "$toObjectId": "$agent" }}},
        {$lookup:{
            from : "users", 
            localField: "agent", 
            foreignField: "_id", 
            as : "agentDetail"
        }}
    ])
    var pageUser=[];
    for(var i=data.offset;i<data.offset+parseInt(pageSize);i++)
      user[i]&&pageUser.push(user[i])
      res.status(200).json({user:pageUser,message:"User List",size:user.length})
      
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/list-search',auth,jsonParser, async (req,res)=>{
  try {
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
      const data = {
        agent: req.body.agent,
        search: req.body.search,
        access: req.body.access,
        offset:req.body.offset?req.body.offset:0,
        date: Date.now()
      }
      // Validate if user exist in our database
      const userOwner = await User.findOne({_id:req.headers["userid"]});
      if(userOwner.access ==="customer"){
        res.status(403).json({error:"not Authorized"});
        return
      }
      const user = await User.aggregate([
        { $match : data.access?{access:data.access}:{}},
        { $match : data.search?{$or:[
            {cName:{$regex: data.search}},
            {sName:{$regex: data.search}},
            {nif:{$regex: data.search}},
            {email:{$regex: data.search}},
            {phone:{$regex: data.search}}
          ]}:{}},
        
          { $match : (userOwner&&(userOwner.access==="agent"||userOwner.access==="agency"))?
          {agent: {$regex:userOwner._id.toString()}}:{}},
        
        { $addFields: { "agent": { "$toObjectId": "$agent" }}},
        {$lookup:{
            from : "users", 
            localField: "agent", 
            foreignField: "_id", 
            as : "agentDetail"
        }},{$sort:{date:-1}}
    ])
    var pageUser=[];
    for(var i=data.offset;i<data.offset+parseInt(pageSize);i++)
      user[i]&&pageUser.push(user[i])
      res.status(200).json({user:pageUser,message:"User List",size:user.length})
      
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/find-users',auth,jsonParser, async (req,res)=>{
  try {

        const userOwner = await User.findOne({_id:req.headers["userid"]});
        res.status(200).json({user:userOwner,message:"User Data"})
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/change-email',auth,jsonParser, async (req,res)=>{
  const data={
    email:req.body.email,
    username:req.body.email,
    active:"false"
  }
  try {
    const userOwner = await User.findOne({_id:req.body.userId});
    const newOwner = await User.findOne({email:data.email});
    data.oldEmail=userOwner.email;
    if(newOwner){
      res.status(500).json({error: "user already exists"})
      return
    }
    else{
      const newOtp = createOTP(userOwner.cName)
    const logData = await LogCreator(userOwner,"change email",
    "user email change by administrator to: "+data.email)
      
      const sendMailResult = await sendMailChangeEmailBrevo(data.email,newOtp)
      const newData=await User.updateOne({_id:req.body.userId},
          {$set:{...data,otp:newOtp}})
      res.status(200).json({user:userOwner,message:"User Email Updated"})
    }
    
  } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/find-user-admin',auth,jsonParser, async (req,res)=>{
  try {
        const userOwner = await User.findOne({_id:req.headers["userid"]});
        const userData = await User.findOne({_id:req.body.userId});
        /*if(userData&&userData.access==="customer")
          await User.updateOne({_id:req.body.userId},{$set:{active:"true"}});*/
        res.status(200).json({user:userData,message:"User Data"})
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/active-user',jsonParser, async (req,res)=>{

  try {
        const userData = await User.findOne({otp:req.body.otp});
        if(userData){
          await User.updateOne({otp:req.body.otp},
            {$set:{active:"true",otp:""}});
          res.status(200).json({user:userData,message:"User Activated"})
          }
        else{
          res.status(500).json({error:"Expired OTP"})
        }
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/change-password',auth,jsonParser, async (req,res)=>{
  try {
      const data = {
        oldPass: req.body.oldPass,
        newPass: req.body.newPass,
        confPass: req.body.confPass,
        date: Date.now()
      }
      if(data.newPass === data.confPass){
        var encryptedOld = await bcrypt.hash(data.oldPass, 10);
        const userOwner = await User.findOne({_id:req.headers["userid"]});
        const passCompare = await bcrypt.compare(data.oldPass,userOwner.password)
        
        if(passCompare){
          var encryptedNew = await bcrypt.hash(data.newPass, 10);
          await User.updateOne({_id:req.headers["userid"]},
          {$set:{password:encryptedNew}})

          res.status(200).json({user:passCompare,message:"User Pass Changes"})
        }
        else{
          res.status(400).json({error:"Wrong Password"});
        }
      }
      else{
        res.status(400).json({error:"Not Equal Passwords"});
      }
    } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.post('/forget-password-set',jsonParser, async (req,res)=>{
  try {
      const data = {
        newPass: req.body.newPass,
        confPass: req.body.confPass,
        otp:req.body.otp,
        date: Date.now()
      }
      if(data.newPass !== data.confPass){
        res.status(400).json({error:"Not Equal Passwords"});
        return
      }
        const user = await User.findOne(data.otp&&{otp:data.otp})
        if(!user){
          res.status(400).json({error:"Expired OTP"});
          return
        }
      //res.status(200).json({user:user,message:"User Found"})
        var encryptedNew = await bcrypt.hash(data.newPass, 10);
        await User.updateOne(data.otp&&{otp:data.otp},
          {$set:{password:encryptedNew,otp:""}})

          res.status(200).json({user:user,message:"User Pass Changed"})
        
    } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/change-user',auth,jsonParser, async (req,res)=>{
  try {
      const data = {
        username: req.body.username,
        cName: req.body.cName,
        sName:req.body.sName,
        phone:req.body.phone,
        email:req.body.email,
        nif:req.body.nif,

        nameCompany:req.body.nameCompany,
        firma:req.body.firma,
        morada:req.body.morada,
        nifCompany:req.body.nifCompany,
        phoneCompany:req.body.phoneCompany,
        emailCompany:req.body.emailCompany,
        IBANCompany:req.body.IBANCompany,
  
        active:req.body.active,
        date: Date.now()
      }
      // Validate if user exist in our database
      const userOwner = await User.updateOne({_id:ObjectID(req.body._id)},
        {$set:data});
      //console.log(await bcrypt.compare(userOwner.password, data.oldPass))
      
      res.status(200).json({user:userOwner,message:"User Data Changed."})
      
      } 
  catch(error){
    var errorTemp=error.message.includes("duplicate")?
      "duplicate Value":error.message
      res.status(500).json({error: errorTemp})
  }
})

router.get('/sendmail',jsonParser, async (req,res)=>{
  try {
      //sendEmailNow()
      res.status(200).json({message:"Email Sent"})
      
      } 
  catch(error){
      res.status(500).json({error: error})
  }
})
module.exports = router;