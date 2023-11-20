const filterNumber=(value)=>{
    const newValue = value.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    return(newValue)
}
module.exports = filterNumber