const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const task = require('../models/main/task');
const LogCreator = require('../middleware/LogCreator');
const users = require('../models/auth/users');
const slider = require('../models/main/slider');

router.get('/main-page', async (req,res)=>{
    try{
        const SlidersList = await slider.find()
        res.json({slider:SlidersList,message:"main Api"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;