import { useEffect, useState } from "react"
import env, { normalPriceCount, rxFindCount } from "../../../env"
import OrderQuickRow from "./OrderQuickRow"

function OrderQuickCart(props){
    const order = props.order
    const [itemDetail,setItemDetail]=useState()
    console.log(order)
    return(
      <>
            {order?<div className="sub-order-table">
                {order&&order.map((item,i)=>(
                    <div className="sub-row" key={i}>
                    <div className="sub-avatar">
                        <OrderQuickRow orderItem={item} />
                    </div>
                    <div className="sub-num">{item.count}</div>
                    <div className="sub-price">{normalPriceCount(item.price)}</div>
                </div>))}
                
            </div>:env.loader}</>
    )
}
export default OrderQuickCart