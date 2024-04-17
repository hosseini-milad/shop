import { useEffect, useState } from "react"
import env, { normalPriceCount, rxFindCount } from "../../../env"

function PolicyQuickDetail(props){
    const product = props.product
    
    return(
    <div className="sub-order-table">
        <div className="sub-row">
            <div className="sub-avatar">
            <div className="sub-avatar-container">
                <img src="/img/lenz01.jpg"
                alt={"sku.sku"}/>
                <div className="sub-info">
                <p className="sub-name">{product.title}</p>
                <p className="sub-id"> {product.description}</p>
                </div>
            </div>
            </div>
            <div className="sub-num">کد محصول</div>
            <div className="sub-price">{product.sku}</div>
        </div>
        <div className="sub-row">
            <p dangerouslySetInnerHTML={{__html:product.fullDesc}}></p>
        </div>
    </div>
    )
}
export default PolicyQuickDetail