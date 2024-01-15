import { useEffect, useState } from "react"
import env, { normalPriceCount, rxFindCount } from "../../../env"
import OrderQuickRow from "./OrderQuickRow"

function OrderQuickDetail(props){
    const order = props.order
    const [itemDetail,setItemDetail]=useState()
    //console.log(order)
    return(
      <>
            {order?<div className="sub-order-table">
                {order&&order.map((item,i)=>(
                    <div className="sub-row" key={i}>
                    <div className="sub-avatar">
                        <OrderQuickRow orderItem={item[0]} />
                    </div>
                    <div className="sub-num">{item[0].count}</div>
                    <div className="sub-price">{normalPriceCount(item[0].price)}</div>
                </div>))}
                
            </div>:env.loader}</>
    )
}
export default OrderQuickDetail