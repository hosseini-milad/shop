const { default: fetch } = require("node-fetch");
const { BITRIX_URL ,BITRIX_KEY} = process.env;

const sendBitrix=async(data,action)=>{
    var response = '';
    try{
        response = await fetch(BITRIX_URL+BITRIX_KEY+action+
        "?FIELDS[TITLE]="+data.cName+" "+data.sName+" lead"+
        "&FIELDS[NAME]="+data.cName+
        "&FIELDS[LAST_NAME]="+data.sName+
        "&FIELDS[EMAIL][0][VALUE]="+data.email+
        "&FIELDS[EMAIL][0][VALUE_TYPE]=WORK"+
        "&FIELDS[PHONE][0][VALUE]="+data.phone+
        "&FIELDS[PHONE][0][VALUE_TYPE]=WORK`",
            {method: 'GET' });
        const result = await response.json();
        return(result)
    }
    catch(error){
        return({error:response&&response.status,
            error_description:response&&(response.status+" "+response.statusText)})
    }
  }
module.exports =sendBitrix