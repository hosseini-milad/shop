const tasks = require("../models/crm/tasks");
const cart = require("../models/product/cart");
const faktor = require("../models/product/faktor");

const NewCode=async(userNo,dateYear)=>{
    var rxTemp = '';
    while(1){
        
        var foundRx = rxTemp&&await cart.findOne({cartNo:rxTemp});
        foundTask = rxTemp&&await tasks.findOne({orderNo:rxTemp});
        foundFaktor = rxTemp&&await faktor.findOne({faktorNo:rxTemp});
        if(rxTemp&&!foundRx&&!foundTask&&!foundFaktor)break
        else rxTemp=userNo+
            (Math.floor(Math.random() * 100000) + 10000)
    }
    return(rxTemp)

}
module.exports =NewCode