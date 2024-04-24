import React ,{ useState } from "react"
import Status from "../Components/Status"
import  env, { normalPriceCount, rxFindCount } from "../../env"
import BrandQuickDetail from "./BrandComponent/BrandQuickDetail"

function BrandTableRow(props){
  const [openOption,setOpenOption] = useState(0)
  const [checkState,setCheckState] = useState(false)
  const activeAcc = props.index===props.detail
  const brand=props.brand
    return(<React.Fragment>
        <tr 
            className={activeAcc?"activeAccordion":"accordion"}>
            <td className="checkBoxStyle">
              <input type="checkbox" name="" id="" checked={checkState}
              onChange={(e)=>setCheckState(checkState?false:true)}/></td>
            <td>
                <div className="order-id">
                  {brand.brandCode}
                </div>
            </td>
            <td>
              <div className="cu-avatar">
                  <img src={brand?(env.siteApiUrl+brand.brandUrl):''} 
                    alt={brand?brand.title:"default"}/>
                  <div className="cu-name" onClick={()=>
                  window.location.href="/brands/detail/"+brand._id}>
                    <p className="name">{brand.title}</p>
                    <p className="email">{brand.sku}</p>
                  </div>
                  {brand.moreInformation?
                    <i className="fa fa-comment-o" title={brand.moreInformation}></i>:<></>}
                </div>
              </td>
              <td>
                <Status status={brand.status} class={"order-status"} 
                  lang={props.lang}/>
              </td>
            <td>
              <div className="more-btn">
              <i className={`tableIcon fas ${activeAcc?"fa-chevron-up":"fa-chevron-down"}`} 
                onClick={()=>props.showDetail(activeAcc?"-1":props.index)} ></i>
                <i className="tableIcon fas fa-edit" onClick={()=>
                  window.location.href="/brands/detail/"+brand._id}></i>
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
        <td colSpan="9"><BrandQuickDetail brand={brand}/></td></tr>
          :<React.Fragment></React.Fragment>}
          </React.Fragment>
    )
}
export default BrandTableRow