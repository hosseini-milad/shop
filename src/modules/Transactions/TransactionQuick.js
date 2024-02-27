import { useEffect, useState } from "react"
import { normalPriceCount } from "../../env"


function TransactionQuickDetail(props){
    const order = props.query
    console.log(order)
    if(!order){
        return(<div className="sub-order-table">
            اطلاعات موجود نیست
        </div>)
    }
    if(order)
    return(
      <div className="sub-order-table">
        <div className="sub-row">
            <div className="sub-avatar">
                <div className="sub-avatar-container">

                    <div className="sub-info">
                    <p className="sub-name">شماره تراکنش: {order?order.SaleReferenceId:''}</p>
                    <p className="sub-id">اطلاعات پذیرنده: {order.CardHolderInfo}</p>
                    </div>
                </div>
            </div>
            <div className="sub-num">شماره کارت: {order.CardHolderPan}</div>
            <div className="sub-price"> مبلغ پرداختی: {normalPriceCount(order.FinalAmount,1)}</div>
        </div>
    </div>
    )
}
export default TransactionQuickDetail