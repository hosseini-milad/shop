var tax = process.env.TaxRate

const NormalTax=(price)=>{
    const priceFloat = parseFloat(price)
    const taxEq = parseFloat(tax)
    const newPrice = priceFloat*(1+taxEq)
    const RoundPrice = Math.round(newPrice)
    return(parseInt(RoundPrice))
}

module.exports =NormalTax