const { default: fetch } = require("node-fetch");
const users = require("../models/auth/users");
const { SEPIDAR_URL,SEPIDAR_HEADER,
    SEPIDAR_HEADER_Bazaryab,SEPIDAR_HEADER_HESARAK} = process.env;
 
const sepidarFetch=async(data,action,user)=>{
    console.log(SEPIDAR_URL+action)
    var header = SEPIDAR_HEADER
    const userDetail = users&&await users.findOne({_id:user})
    if(userDetail&&userDetail.group === "bazaryab")
        header = SEPIDAR_HEADER_Bazaryab
    else if(userDetail&&userDetail.StockId==="6")
        header = SEPIDAR_HEADER_HESARAK
    var response = ''; 
    try{    response = await fetch(SEPIDAR_URL+action,
            {method: 'GET' ,headers:JSON.parse(header)});
        console.log(response)
        const result = await response.json();
        return(result)
    }
    catch(error){ 
        console.log(error)
        return({error:response&&response.status,
            error_description:response&&(response.status+" "+response.statusText)})
    }
  }
module.exports =sepidarFetch