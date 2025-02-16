const SumArray=(data)=>{
    if(!data||!data.length) return(0)
    var sum = 0
    for(var i=0;i<data.length;i++){
        sum+= parseInt(data[0])
    }
    return(sum)
}
module.exports =SumArray