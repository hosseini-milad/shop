const Logs = require('../models/logger')

const LogCreator=async(user,action,description)=>{

    await Logs.create({
        username: user.username,
        userId: user._id,
        action:action,
        description: description,

        date:Date.now()
    })
    return("done")
}
module.exports =LogCreator