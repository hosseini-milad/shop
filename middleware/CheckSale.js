const users = require("../models/auth/users")
const profiles = require("../models/auth/ProfileAccess")
var ObjectID = require('mongodb').ObjectID;

const CheckSale=async(managerId)=>{
    const adminData = await users.findOne({_id:ObjectID(managerId)})
    
    var adminProfiles = adminData.profile?adminData.profile.map(item=>ObjectID(item)):[]
    const adminProfile = adminData&&await profiles.find({ _id: {$in:adminProfiles}})

    //const adminProfile = adminData&&await profiles.findOne({_id:ObjectID(adminData.profile)})
    const isSale = adminProfile.findIndex(item=>item.profileCode=="sale")!==-1?1:0
    return(isSale)
}

module.exports =CheckSale