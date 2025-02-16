const MultiplySum=(number1,number2,multiply)=>{
    var result = 0
    var pure1 = number1?parseInt(number1):0
    var pure2 = number2?parseInt(number2):0
    var multi = multi?parseInt(multiply):1
    result = (pure1+pure2)*multi
    return(result)
}

module.exports =MultiplySum