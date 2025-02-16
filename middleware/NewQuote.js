const quote = require("../models/product/quote");

const NewQuote=async(userNo,dateYear)=>{
    var rxTemp = '';
    while(1){
        
        const foundRx = rxTemp&&await quote.findOne({cartNo:rxTemp});
        if(rxTemp&&!foundRx)break
        else rxTemp=userNo+
            (Math.floor(Math.random() * 10000) + 1000)
    }
    return(rxTemp)

}
module.exports =NewQuote