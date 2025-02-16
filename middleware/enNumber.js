
const EnNumber=(number)=>{
    const p2e = number.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    return(p2e)
}

module.exports =EnNumber