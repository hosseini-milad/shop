import { useEffect, useState } from "react"
import env, { normalPriceCount, rxFindCount } from "../../../env"

function ProductQuickDetail(props){
    const product = props.product
    
    return(
    <div className="sub-order-table">
        <div className="sub-row">
            <div className="sub-quick">
            <div className="sub-quick-container">
                <img src={product.imageUrl?(env.siteApiUrl+product.imageUrl):env.defaultProduct} 
                  alt={product?product.title:"default"}/>
                <div className="sub-info">
                    <p className="sub-name">{product.title}</p>
                    <p className="sub-id"> {product.description}</p>
                </div>
            </div>
            </div>
        </div>
        <div className="sub-row">
            <p dangerouslySetInnerHTML={{__html:product.fullDesc}}></p>
        </div>
    </div>
    )
}
export default ProductQuickDetail