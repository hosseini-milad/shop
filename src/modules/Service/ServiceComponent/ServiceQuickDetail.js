import { useEffect, useState } from "react"
import env, { normalPriceCount, rxFindCount } from "../../../env"
import brandtrans from "../../../translate/brands"

function ServiceQuickDetail(props){
    const price = props.service&&props.service.servicePrice
    const purchase= props.service&&props.service.servicePurchase
    var servicePriceList = {}
    var servicePurchaseList = {}
    try{servicePriceList=JSON.parse(price)}catch{}
    try{servicePurchaseList=JSON.parse(purchase)}catch{}
    const brandList = brandtrans
    for(var i=0;i<brandList.length;i++){
        brandList[i].price=''
        brandList[i].purchase=''
        if(servicePriceList[brandList[i].value])
            brandList[i].price = servicePriceList[brandList[i].value]
        
        if(servicePurchaseList[brandList[i].value])
            brandList[i].purchase = servicePurchaseList[brandList[i].value]
    }
    console.log(brandList)
    return(
      <>
            {props.service?<div className="sub-order-table">
                {brandList&&brandList.map((price,i)=>(
                    price["price"]||price["purchase"]?
                    <div className="sub-row" key={i}>
                    <div className="sub-avatar">
                    <div className="sub-avatar-container">
                        <img src="/img/lenz01.jpg"
                        alt={price.value}/>
                        <div className="sub-info">
                        <p className="sub-name">{price[props.lang]}</p>
                        <p className="sub-id">{price["value"]}</p>
                        </div>
                    </div>
                    </div>
                    {price["purchase"]?<div className="sub-info">
                        <p className="sub-price">{normalPriceCount(price["purchase"],1)}</p>
                        <p className="sub-id">قیمت خرید: </p>
                    </div>:<></>}
                    <div className="sub-info">
                        <p className="sub-price">{normalPriceCount(price["price"],1)}</p>
                        <p className="sub-id">قیمت فروش:</p>
                    </div>
                </div>:<></>
                ))}
                
            </div>:env.loader}</>
    )
}
export default ServiceQuickDetail