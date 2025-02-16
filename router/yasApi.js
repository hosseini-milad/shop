const express = require("express");
const router = express.Router()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/test', async (req,res)=>{
    var sum = [];
    try{
        for(var i=1;i<=20;i++){
            var tempM=""
            for(var j=1;j<i;j++){
                tempM += " * "
            }
            sum.push(tempM)
        }
        res.json({result:sum,size:sum.length})
    }
    catch{

    }
})
module.exports = router;