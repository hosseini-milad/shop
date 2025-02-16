const { default: fetch } = require("node-fetch");
const { BITRIX_URL ,BITRIX_KEY} = process.env;

const bitrixDeal=async(data,action,user)=>{
    var response = '';
    try{
        response = await fetch(BITRIX_URL+BITRIX_KEY+action+
        "?FIELDS[TITLE]="+user.cName+" "+user.sName+
        "&FIELDS[NAME]=CRMlead"+
        "&FIELDS[CONTACT_ID]="+data,
            {method: 'GET' });
        const result = await response.json();
        return(result)
    }
    catch(error){
        return({error:response&&response.status,
            error_description:response&&(response.status+" "+response.statusText)})
    }
  }
module.exports =bitrixDeal