var tax = process.env.TaxRate

const NormalTax=(price)=>{
    if(!price) return(0)
    const priceFloat = parseFloat(price)
    const taxEq = parseFloat(tax)
    const newPrice = priceFloat*(1+taxEq)
    const RoundPrice = Math.round(newPrice)
    return(parseInt(RoundPrice))
}

module.exports =NormalTax