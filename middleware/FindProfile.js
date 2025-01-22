const ProfileAccess = require("../models/auth/ProfileAccess")

var ObjectID = require('mongodb').ObjectID;

const FindProfile=async(access,profile)=>{
    if(!access) return(0)
    
    var adminProfiles = access?access.map(item=>(item)):[]
    const profileData = await ProfileAccess.find({_id: {$in:adminProfiles}})
    if(!profileData||!profileData.length) return(0)
    
    for(var i=0;i<profileData.length;i++){
        if(profileData[i].profileCode==profile)
            return(1)
    }
    return(0)
}
module.exports =FindProfile