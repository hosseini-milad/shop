const { default: fetch } = require("node-fetch");
const { SEPIDAR_URL,SEPIDAR_HEADER} = process.env;

const sepidarFetch=async(data,action)=>{
    var response = ''; 
    try{    response = await fetch(SEPIDAR_URL+action,
            {method: 'GET' ,headers:JSON.parse(SEPIDAR_HEADER)});
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