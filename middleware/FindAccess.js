const ProfileAccess = require("../models/auth/ProfileAccess")

var ObjectID = require('mongodb').ObjectID;

const FindAccess=async(user)=>{
    if(!user) return([])
        var adminProfiles = user?user.map(item=>ObjectID(item)):[]
    const profileData = await ProfileAccess.find({_id: {$in:adminProfiles}})
    if(!profileData||!profileData.length) return([])
    var profileAccess=[]
    for(var i=0;i<profileData.length;i++){
        profileAccess.concat(profileData[i].access)
    }
    return(profileAccess)
}
module.exports =FindAccess