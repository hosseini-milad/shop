import React ,{ useState } from "react"
import Status from "../Components/Status"
import  env, { normalPriceCount, rxFindCount } from "../../env"
import ProductQuickDetail from "./ProductComponent/ProductQuickDetail"

function ProductTableRow(props){
  const [openOption,setOpenOption] = useState(0)
  const [checkState,setCheckState] = useState(false)
  const [Count,setCount] = useState("")
  const activeAcc = props.index===props.detail
  const product=props.product
  const stockId=props.stockId
  const token = props.token
  const CalCount = (sku)=>{
    const postOptions={
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body:JSON.stringify({sku:sku})
  }
  fetch(env.siteApi + "/panel/faktor/calc-count",postOptions)
  .then(res => res.json())
  .then(
      (result) => {
        setCount(result)
      },
      (error) => {
          console.log(error)
      })

  }
  var newStockCount = (product.countTotal.length?product.countTotal:'')
  var stockIndex = stockId?product.countTotal.findIndex(item=>item.Stock==stockId.StockID):-1
  if(newStockCount&&stockIndex!==-1) newStockCount = newStockCount[stockIndex].quantity
  if(newStockCount&&stockIndex==-1) newStockCount="ناموجود"
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
                  {/*{stockId?<span>{newStockCount}</span>:
                  <><span>{product.count?product.count:"ناموجود"}</span>
                  <small> {product.openOrderCount?"(متنظر تایید: "+
                           product.openOrderCount+")":''}</small></>}
                  */}
                  <span>{product.count?product.count:"ناموجود"}</span>
                  </div>
              </td>
              <td>
                <div className="order-price">
                  <p>{normalPriceCount(product.price&&product.price)}</p>
                </div>
              </td>
              <td>
                <div className="order-num">
                  {Count?<p>{Count.storeCount}</p>:
                  <button className="cal-count" onClick={()=>CalCount(product.sku)}>محاسبه</button>}
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