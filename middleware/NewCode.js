const cart = require("../models/product/cart");

const NewCode=async(userNo,dateYear)=>{
    var rxTemp = '';
    while(1){
        
        const foundRx = rxTemp&&await cart.findOne({cartNo:rxTemp});
        if(rxTemp&&!foundRx)break
        else rxTemp=userNo+
            (Math.floor(Math.random() * 10000) + 1000)
    }
    return(rxTemp)

}
module.exports =NewCode