const siteUrl='http://localhost:3000';
//export const siteApi='https://shopadmin.sharifoilco.com/api';
//export const siteApiUrl='https://shopadmin.sharifoilco.com';
//export const siteApi='https://admin.sharifoilco.com/api/v1';
export const siteApi = 'http://localhost:6090/api'
export const siteApiUrl='http://localhost:6090';

const env ={
    siteUrl:'https://sharifoilco.com',
    graphqlUrl:'https://sharifoilco.com/backend/api',
    blogPostList:'https://sharifoilco.com/blog/wp-json/wp/v2/posts',
    blogMedia:'https://sharifoilco.com/blog/wp-json/wp/v2/media/',
    blogCategory:'https://sharifoilco.com/blog/wp-json/wp/v2/categories/',
    kaveNegarApi:'464D534974436D623637454B5547393169306E4D557A59637030574F4C37314930567354446F52424938773D',
    kaveNegarUrl:'https://api.kavenegar.com/v1/',
    loginUserUrl:siteUrl+'/backend/wp-json/jwt-auth/v1/token',
    addUserUrl:siteUrl+'/backend/wp-json/wp/v2/users',
    payApi:'https://sharifoilco.com/backend/wp-json/wp/v1/pay/order/',

    mainPageApi:'/app/main-page', //GET
    pageApi:'/pages/get-all-pages', //GET
    categoryApi:'/getCategory',
    sliderApi:'/app/sliders',

    cartDetailApi:'/order/cart-detail', //GET_AUTH
    cartAddApi:'/order/add-to-cart',
    cartRemoveApi:'/order/remove-from-cart',
    cartAddress:'/order/select-address', //POST address_id
    cartTransport:'/order/get-transportations', //GET
    cartTransPortSelect:'/order/select-transportations', //POST   transportation_id

    userAddApi:'/user/address/list',
    userAddInfoApi:'/user/addInfo',
    userInfo:'/user/info',
    userOrderApi:'/user/order/list',
    newUserOrder:'/order/list-of-paid-orders',
    newUserDetail:'/order/cart-detail-by-order-no/',
    userAddAddress:'/user/address/store',
    userEditAddress:'/user/address/edit/',
    userRemoveAddress:'/user/address/remove', //POST  address_id

    stateListApi:'/user/state/list',
    cityListApi:'/user/city/list',

    filterListApi:'/category/getFilter/',
    productListApi:'/product/getlist',

    productDataApi:'/product/getProduct/',
    productReviewApi:'/product/review/',
    productCommentApi:'/product/comment-list/',
    productCommentAdd:'/product/comment/',
    productRelatedApi:'/product/relate/',
    productFilterApi:'/product/items',

    paymentApi:'/payment/',
    setting:'/get-settings',

    cookieName:'shop-front'
}
export default env
export function normalPrice(priceText){
    if(priceText === null||priceText === undefined) return(priceText)
    return(
      ((priceText/10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace( /^\D+/g, ''))
    )
}
export function normalPriceCount(priceText,count){
  if(!priceText||priceText === null||priceText === undefined) return("")
  console.log(priceText)
  try{priceText =priceText.split(' ')[0];}catch{}
  if(priceText === "0"||priceText === 0)return("رایگان");
  var rawPrice = parseInt(priceText.toString().replace(/\D/g,''))*(count?count:1)
  //console.log(rawPrice,priceText)
  return(
      (rawPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace( /^\D+/g, ''))
  )
}
export function purePrice(priceText){
  if(!priceText)return(0)
  var rawPrice = priceText.toString().replaceAll(',', '')
  //console.log(rawPrice,priceText)
  return(
    (rawPrice.toString().replace( /^\D+/g, ''))
  )
}
export function comparePrice(price1,price2){
  if(!price1)return(1)
  try{
    var rawPrice1 = parseInt(price1.toString().replace(/,/g, '').replace( /^\D+/g, ''))
    var rawPrice2 = parseInt(price2.toString().replace(/,/g, '').replace( /^\D+/g, ''))
    //console.log(rawPrice1,rawPrice2,rawPrice1<rawPrice2?1:0)
    return(rawPrice1<rawPrice2?1:0)}
  catch{
    return(1)
  }
}
export function sumPrice(priceText){
  if(priceText === null||priceText === undefined) return(priceText)
  var rawPrice = priceText.toString().replaceAll(',', '')
  var tempSum = rawPrice.split('+');
  var TotalSum = 0
  for(var i=0;i<tempSum.length;i++)
    TotalSum += tempSum[i]?(parseInt(tempSum[i])|| 0):0;
  return(
    ((TotalSum/10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace( /^\D+/g, ''))
  )
}
export function roundPrice(priceText,roundUnit){
  if(priceText === null||priceText === undefined) return(priceText)
  var priceTemp = Math.round(parseInt(priceText)/parseInt(roundUnit))
  return(
    ((priceTemp*roundUnit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  )
}
export function discountPrice(priceText,discountPrice){
  if(priceText === null||priceText === undefined) return(priceText)
  var priceTemp = (parseInt(priceText)-parseInt(discountPrice))
  return(
    priceTemp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  )
}
export function discountPercent(priceText,discountPrice){
  console.log(priceText,discountPrice)
  if(priceText === null||priceText === undefined) return(priceText)
  var priceTemp = (discountPrice/priceText*100)
  console.log(priceText,discountPrice)
  return(priceTemp.toString().split('.')[0]
    //priceTemp
  )
}
export function findAddress(url){
  var cId = '';
  try{cId = (url.split('/')[1])}catch{}
  return(cId);
}
export function cartPrice(priceText,count){
  if(priceText === null||priceText === undefined) return(priceText)
  return(
    (parseInt(priceText.toString().replace(/^\D+/g, ''))/count/10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  )
}
export function standardSku(sku){
  var outSku = sku;
  try{outSku=sku.replace(/\//g,'--')}
  catch{}
  return outSku
}
export function validPhone(phone_number){
  if(phone_number.length<10)
    return(0)
  return(1)
}
export function filterToUrl(filters){
  const filterList = JSON.stringify(filters.filter).replace('[','').replace(']','');
  const catList = JSON.stringify(filters.category).replace('[','').replace(']','');
  
  const brands = JSON.stringify(filters.brands).replace('[','').replace(']','');
  const Search = filters.search_text&&`&search=${filters.search_text}`;
  const MaxPrice = filters.max_price&&`&max_price=${filters.max_price}`;
  const sortby = filters.sortby&&`&sortby=${filters.sortby}`;
  const page = filters.page?`&page=${filters.page}`:'';
  //console.log(sortby)
  return(`filter=${filterList}${brands?"&brands="+brands:''}${Search}${MaxPrice}${page}${sortby}`)
}

export function shortFetch(shortData){
  var shortSplit = shortData.replace(/<\/?[^>]+(>|$)/g, "").split('\n');
  var shortOut = "";
  //console.log(shortSplit)
  var fields=["برند","ویسکوزیته",":مدل",": مدل","حجم"]
  for(var index = 0;index<fields.length;index++){
    var tempOut = shortSplit.find(item=>item.includes(fields[index]))
    shortOut+= tempOut?"<li>"+tempOut+"</li>":''
  }
  
  return(shortOut&&shortOut)
}
export function toEnglishNumber(strNum,name) {
  var pn = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  var en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  var cache = strNum;
  for (var i = 0; i < 10; i++) {
      var regex_fa = new RegExp(pn[i], 'g');
      cache = cache.replace(regex_fa, en[i]);
  }
  return(cache.replace( /^\D+/g, ''));
}