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

    loader:<img className="imgLoader" src="/img/loaderPanel.gif"/>,
    defaultUser:"/img/avatar/avatar_1.jpg",
    defaultProduct:"/img/avatar/defaultProduct.png",

    editorApi:'qosmvwu6wq395cpq7ay8ud8j9d21cf4cdgkxwmpz317vpy2i'
}
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
    if(priceText === "0"||priceText === 0)return("رایگان");
    var rawPrice = parseInt(priceText.toString().replace(/\D/g,''))*(count?count:1)
    //console.log(rawPrice,priceText)
    return(
        (rawPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace( /^\D+/g, ''))
    )
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
    if(priceText === null||priceText === undefined) return(priceText)
    var rawPrice = priceText.toString().replaceAll(',', '')
    var rawDiscount = discountText.toString().replace('%', '')
    var priceTemp = normalPriceCount(rawPrice*parseInt(count)*(100-rawDiscount)/100)
    return((priceTemp?priceTemp.toString().split('.')[0]:""))
  }
export function PageInfoFunction(orderInfo,filters){
  var totalPage =orderInfo.size?parseInt(parseInt(orderInfo.size)/
  parseInt(filters.pageSize?filters.pageSize:"10")):0
  var currentPage =filters.offset?filters.offset:0
  if(currentPage>totalPage)currentPage=0
  return({
    show:true,
    totalPage:totalPage,
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

export default env
