const { default: fetch } = require("node-fetch");
const users = require("../models/auth/users");
const { SEPIDAR_URL,SEPIDAR_HEADER,
    SEPIDAR_HEADER_Bazaryab,SEPIDAR_HEADER_HESARAK} = process.env;

const sepidarPOST=async(data,action,user)=>{
    var header = SEPIDAR_HEADER
    const userDetail = await users.findOne({_id:user})
    if(userDetail.group === "bazaryab")
        header = SEPIDAR_HEADER_Bazaryab
    else if(userDetail.StockId==="6")
        header = SEPIDAR_HEADER_HESARAK
    var response = ''; 
    
    try{    response = await fetch(SEPIDAR_URL+action,
            {method: 'POST' ,headers:JSON.parse(header),
        body:JSON.stringify(data)});
        const result = await response.json();
        return(result)
    } 
    catch(error){
        return({error:response&&response.status,
            error_description:response&&(response.status+" "+response.statusText)})
    }
  }
module.exports =sepidarPOST