const { default: fetch } = require("node-fetch");
const { SEPIDAR_URL,SEPIDAR_HEADER} = process.env;

const sepidarPOST=async(data,action)=>{
    var response = ''; 
    try{    response = await fetch(SEPIDAR_URL+action,
            {method: 'POST' ,headers:JSON.parse(SEPIDAR_HEADER),
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