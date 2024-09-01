
const IsToday=(date)=>{
    var today = new Date()
    var date = new Date(date)
    if(today.getDate() === date.getDate())
        return(1)
    else
        return(0)
}

module.exports =IsToday