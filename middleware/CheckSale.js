const users = require("../models/auth/users")
const profiles = require("../models/auth/ProfileAccess")
var ObjectID = require('mongodb').ObjectID;

const CheckSale=async(managerId)=>{
    const adminData = await users.findOne({_id:ObjectID(managerId)})
    const adminProfile = adminData&&await profiles.findOne({_id:ObjectID(adminData.profile)})
    const isSale = adminProfile.profileCode=="sale"?1:0
    return(isSale)
}

module.exports =CheckSale