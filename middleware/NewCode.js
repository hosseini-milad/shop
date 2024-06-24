const cart = require("../models/product/cart");

const NewCode=async(userNo,dateYear)=>{
    var rxTemp = '';
    while(1){
        
        const foundRx = rxTemp&&await cart.findOne({cartNo:rxTemp});
        if(rxTemp&&!foundRx)break
        else rxTemp="q"+
            (Math.floor(Math.random() * 100000) + 10000)
    }
    return(rxTemp)

}
module.exports =NewCode