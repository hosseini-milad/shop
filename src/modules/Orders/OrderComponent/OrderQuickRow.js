import { useEffect, useState } from "react"
import env, { normalPriceCount, rxFindCount } from "../../../env"

function OrderQuickRow(props){
    const orderItem = props.orderItem

    const [content,setContent]=useState()
    //console.log(order)
    useEffect(() => {
        const body={sku:orderItem.sku}
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(body)
          }
      fetch(env.siteApi + "/product/getProduct",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setContent(result.data)
        },
        (error) => {
          console.log(error);
        }
        
    )},[])
    return(
      <>
        {content?<div className="sub-avatar-container">
                <img src={env.siteApiUrl+content.thumbUrl}
                alt={content.sku}/>
                <div className="sub-info">
                <p className="sub-name">{content.title}</p>
                <p className="sub-id">کد محصول: {content.sku}</p>
                </div>
            </div>:env.loader}</>
    )
}
export default OrderQuickRow