import React ,{ useState } from "react"
import Status from "../Components/Status"
import  env, { normalPriceCount, rxFindCount } from "../../env"
import ProductQuickDetail from "./ProductComponent/ProductQuickDetail"

function ProductTableRow(props){
  const [openOption,setOpenOption] = useState(0)
  const [checkState,setCheckState] = useState(false)
  const activeAcc = props.index===props.detail
  const product=props.product
  console.log(product)
    return(<React.Fragment>
        <tr 
            className={activeAcc?"activeAccordion":"accordion"}>
            <td className="checkBoxStyle">
              <input type="checkbox" name="" id="" checked={checkState}
              onChange={(e)=>setCheckState(checkState?false:true)}/></td>
            
            <td>
              <div className="cu-avatar">
                  <img src={product.thumbUrl?(env.siteApiUrl+product.thumbUrl):env.defaultProduct} 
                  alt={product?product.title:"default"}/>
                  <div className="cu-name" onClick={()=>
                  window.location.href="/products/detail/"+product._id}>
                    <p className="name">{product.title}</p>
                    <p className="email">{product.sku}</p>
                  </div>
                  {product.moreInformation?
                    <i className="fa fa-comment-o" title={product.moreInformation}></i>:<></>}
                </div>
              </td>
              <td>
                <div className="order-num">
                  <p>{product.brandInfo&&product.brandInfo[0]?
                    product.brandInfo[0].title:product.brandId}</p>
                </div>
              </td>
              <td>
                <div className="order-num">
                  <span>{product.count?product.count:"ناموجود"}</span>
                  <small> {product.openOrderCount?"(متنظر تایید: "+
                           product.openOrderCount+")":''}</small>
                </div>
              </td>
              <td>
                <div className="order-price">
                  <p>{normalPriceCount(product.price&&product.price)}</p>
                </div>
              </td>
              <td>
                <div className="order-price">
                  <p>{normalPriceCount(product.taxPrice&&product.taxPrice)}</p>
                </div>
              </td>
              <td>
                <Status status={product.status} class={"order-status"} 
                  lang={props.lang}/>
              </td>
            <td>
              <div className="more-btn">
              <i className={`tableIcon fas ${activeAcc?"fa-chevron-up":"fa-chevron-down"}`} 
                onClick={()=>props.showDetail(activeAcc?"-1":props.index)} ></i>
                <i className="tableIcon fas fa-edit" onClick={()=>
                  window.location.href="/products/detail/"+product._id}></i>
                <i className="tableIcon fas fa-ellipsis-v" 
                  onClick={()=>setOpenOption(openOption?0:1)}></i>
              </div>
              {openOption?<div className="sub-more-menu">
                <div className="sub-option sub-delete">
                <i className="tableIcon fas fa-remove" style={{color: "#ff0000"}}></i>
                  <p>Delete</p>
                </div>
                <div className="sub-option sub-edit">
                  <i className="tableIcon fas fa-edit"></i>
                  <p>Edit</p>
                </div>
              </div>:<></>}
            </td>
          </tr>
          {activeAcc?<tr className="sub-order">
        <td colSpan="9"><ProductQuickDetail product={product}/></td></tr>
          :<React.Fragment></React.Fragment>}
          </React.Fragment>
    )
}
export default ProductTableRow