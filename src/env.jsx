
const env={
    //siteApi:'http://localhost:6090/api',
    siteApi:'https://shopadmin.sharifoilco.com/api',
    
    //siteApiUrl:'http://localhost:6090',
    siteApiUrl:'https://shopadmin.sharifoilco.com',
    cookieName:'shop-login',
    //cookieName:'panel-login',
    //cookieName:'mehr-login',
    
    cookieLang:'shop-lang',
    //cookieLang:'panel-lang',
    //cookieLang:'mehr-lang',

    shopExpert:'shop-experience',
    tax: .1,
    loader:<img className="imgLoader" src="/img/loaderPanel.gif"/>,
    defaultUser:"/img/avatar/avatar_1.jpg",
    defaultProduct:"/img/avatar/defaultProduct.png",

    editorApi:'qosmvwu6wq395cpq7ay8ud8j9d21cf4cdgkxwmpz317vpy2i'
}
export const TAX=0.1
export const defPay=3
export function jalali_to_gregorian(jy, jm, jd) {
    var sal_a, gy, gm, gd, days;
    jy += 1595;
    days = -355668 + (365 * jy) + (~~(jy / 33) * 8) + ~~(((jy % 33) + 3) / 4) + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy = 400 * ~~(days / 146097);
    days %= 146097;
    if (days > 36524) {
      gy += 100 * ~~(--days / 36524);
      days %= 36524;
      if (days >= 365) days++;
    }
    gy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
      gy += ~~((days - 1) / 365);
      days = (days - 1) % 365;
    }
    gd = days + 1;
    sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];
    return [gy, gm, gd];
  }
export function normalPriceCount(priceText,count){
    if(!priceText||priceText === null||priceText === undefined) return("")

    try{priceText =priceText.split(' ')[0];}catch{}
    if(priceText === "0"||priceText === 0)return("-");
    var rawPrice = parseInt(priceText.toString().replace(/\D/g,''))*(count?count:1)
    //console.log(rawPrice,priceText)
    return(
        (rawPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace( /^\D+/g, ''))
    )
}
export function normalPriceCalc(priceAdd,price,priceMinus){
  //if(!priceAdd||priceAdd === null||priceAdd === undefined) return("")

  
  //console.log(rawPrice,priceText)
  return(
      (priceAdd)
  )
}
export function normalPriceRound(priceText,count,tax){
    if(!priceText||priceText === null||priceText === undefined) return("")

    try{priceText =priceText.split(' ')[0];}catch{}
    if(priceText === "0"||priceText === 0)return("رایگان");
    priceText = priceText.toString().split('.')[0]
    var rawPrice = parseInt(priceText.toString().replace(/\D/g,''))*
      (count?count:1)*(tax?tax:1)
    rawPrice = parseInt(Math.round(rawPrice/1000))*1000
    return(
        (rawPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace( /^\D+/g, ''))
    )
}
export function notNull(array,item){
  var notNullArray = []
  for(var i =0;i<array.length;i++){
    if(array[i][item])
      notNullArray.push(array[i])
  }
  return(notNullArray)
}
export function rxFindCount(order){
    var count = 0;
    if(!order) return(0)
    if(order.odMain!==",,,,") count++
    if(order.osMain!==",,,,") count++
    return(count)
}
export function rxFindCountSeprate(order){
  var left = 0; var right=0
  if(!order) return([0,0])
  if(order.odMain!==",,,,") right=1
  if(order.osMain!==",,,,") left=1
  return([right,left])
}
export function PriceDiscount(priceText,count,discountText){
  if(!discountText) discountText = "0"
    if(priceText === null||priceText === undefined) return(priceText)
    var rawPrice = priceText.toString().replaceAll(',', '')
    var rawDiscount = discountText.toString().replace('%', '')
    var priceTemp = normalPriceCount(rawPrice*parseInt(count)*(100-rawDiscount)/100)
    return((priceTemp?priceTemp.toString().split('.')[0]:""))
  }
export function PriceDiscountTax(priceText,count,discountText,tax){
  if(!discountText) discountText = "0"
    if(priceText === null||priceText === undefined) return(priceText)
    var rawPrice = priceText.toString().replaceAll(',', '')
    var rawDiscount = discountText.toString().replace('%', '')
    var priceTemp = normalPriceCount(rawPrice*parseInt(count)*(100-rawDiscount)/100,tax)
    var priceNoTax = (priceTemp?priceTemp.toString().split('.')[0]:0)
    console.log(priceTemp)
    return(normalPriceRound(priceTemp))
  }
export function PageInfoFunction(orderInfo,filters){
  var totalPage =orderInfo.size?parseInt(parseInt(orderInfo.size)/
  parseInt(filters.pageSize?filters.pageSize:"10")):0
  var currentPage =filters.offset?filters.offset:0
  if(currentPage>totalPage)currentPage=0
  return({
    show:true,
    totalPage:totalPage,
    totalItem:orderInfo.size,
    currentPage:currentPage,
    allowNext:currentPage>0?true:false,
    allowPre:currentPage==totalPage?false:true
  })
}
var fulldays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const dayFromNow=(originDate)=>{
  var dt = new Date(originDate),
      time=formatAMPM(dt),
      date = dt.getDate(),
      month = months[dt.getMonth()],
      timeDiff = originDate - Date.now(),
      diffDays = new Date().getDate() - date,
      diffMonths = new Date().getMonth() - dt.getMonth(),
      diffYears = new Date().getFullYear() - dt.getFullYear();
  //console.log(dt)
  if(diffYears === 0 && diffDays === 0 && diffMonths === 0){
    return `Today at ${time}` ;
  }else if(diffYears === 0 && diffDays === 1) {
    return `Yesterday at ${time}`;
  }else if(diffYears === 0 && diffDays === -1) {
    return "Tomorrow";
  }else if(diffYears === 0 && (diffDays < -1 && diffDays > -7)) {
    return fulldays[dt.getDay()];
  }else if(diffYears >= 1){
    return month + " " + date + ", " + new Date(originDate).getFullYear();
    }else {
      return month + " " + date;
    }
}
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
export const findPriority=(priority)=>{
  if(!priority) return("mid")
  if(priority=="کم") return("low")
  if(priority=="متوسط") return("mid")
  if(priority=="بالا") return("high")
  return("mid")
}
export const payValue=(priceSet,payValue,count,off)=>{
  var price = 0
  if(!priceSet) return(0)
  var price = ''
  if(priceSet.length&&priceSet.constructor === Array)
    price=priceSet.find(item=>item.saleType==payValue).price
  else
    price =priceSet 
  var rawPrice = parseInt(price)*(1+env.tax)
  rawPrice = parseInt(Math.round(rawPrice/1000))*1000
  var rawPriceCount = parseInt(rawPrice)*parseInt(count?count:1)
  if(off){
    var offInt = parseInt(off)
    if(offInt>100)
      rawPriceCount -= parseInt(off) 
    else
      rawPriceCount = rawPriceCount*(100-parseInt(off))/100
  }
  return(normalPriceCount(rawPriceCount,1))
}
export const stockValue=(stockSet,stockId)=>{
  
  var count = 0
  if(!stockSet) return(0)
  var price = ''
  if(stockSet.length&&stockSet.constructor === Array){
    count=stockSet.find(item=>item.Stock==stockId)
    if(count) count = count.quantity
  }
  else
    count =stockSet 
  
  return(count)
}
export const findBox=(item)=>{
  const count = item.count&&item.count.quantity
  const perBox = item.perBox
  if(!count || !perBox) return("-")
  var boxCount = (count/perBox)
  return(parseInt(boxCount))
}

export const parseDesc=(desc)=>{
  var brand = findElement(desc,"برند",1)
  var vs = findElement(desc,"ویسکوزیته",2)
  if(!vs)
    vs = findElement(desc,"ویسکوزیته",1)
  var suitable = findElement(desc,"مناسب برای",3)
  if(!suitable)
    suitable = findElement(desc,"مناسب برای",1)
  var volume = findElement(desc,"حجم",1)
  var pack = findElement(desc,"نوع بسته",1)
  
  return({brand:brand, vs:vs, suitable:suitable,
    volume:volume,pack:pack})


}
const findElement=(desc,field,index)=>{
  var value = desc.split(field)
  if(value.length>1){
    value = value[1].split('>')
    if(value.length>1) value = value[index]&&value[index].split('<')[0]
  }
  var pureValue = value
  if(value&&value.includes(':'))
    pureValue = value.replace(':','')
  if(pureValue&&pureValue[0]===' ')
    pureValue = pureValue.replace(' ','')
  return(pureValue)
}

export const findFPage=(user)=>{
  const userData = user.get(env.cookieName)
  if(userData){
    if(userData.profileClass === "660409167887fe34af0d0c77")
      return("market")
    else
      return("dashboard")
  }
  return("login")
}

export default env
