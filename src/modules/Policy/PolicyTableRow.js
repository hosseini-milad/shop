import React ,{ useState } from "react"
import Status from "../Components/Status"
import  env, { normalPriceCount, rxFindCount } from "../../env"
import PolicyQuickDetail from "./PolicyComponent/PolicyQuickDetail"

function PolicyTableRow(props){
  const [openOption,setOpenOption] = useState(0)
  const [checkState,setCheckState] = useState(false)
  const activeAcc = props.index===props.detail
  const policy=props.policy
  console.log(policy)
    return(<React.Fragment>
        <tr 
            className={activeAcc?"activeAccordion":"accordion"}>
            <td className="checkBoxStyle">
              <input type="checkbox" name="" id="" checked={checkState}
              onChange={(e)=>setCheckState(checkState?false:true)}/></td>
            <td>
                <div className="or-date">
                  <div className="cu-name" onClick={()=> window.location.href=
                    "/policy/detail/"+policy._id}>
                    <p className="name">{policy.policyName}</p>
                    <p className="email">{policy.policyCode}</p>
                  </div>
                </div>
            </td>
            <td>
              <div className="or-date">
                  <div className="cu-name" onClick={()=>
                  window.location.href="/policy/detail/"+policy._id}>
                    <p className="name">{policy.userInfo[0]&&policy.userInfo[0].cName}</p>
                    <p className="email">{policy.userInfo[0]&&policy.userInfo[0].phone}</p>
                  </div>
                  {policy.moreInformation?
                    <i className="fa fa-comment-o" title={policy.moreInformation}></i>:<></>}
                </div>
              </td>
              <td>
                <div className="or-date">
                  <p className="date">{new Date(policy.date)
                  .toLocaleDateString(props.lang==="persian"?'fa':'en')}</p>
                  <p className="time">{new Date(policy.date)
                  .toLocaleTimeString(props.lang==="persian"?'fa':'en')}</p>
                </div>
              </td>
              <td>
                <div className="order-num">
                  <p>{policy.category?policy.category.title:''}</p>
                </div>
              </td>
              <td>
                <div className="order-num">
                  <p>{policy.brand?policy.brand.title:''}</p>
                </div>
              </td>
              <td>
                <div className="order-num">
                  <p>{normalPriceCount(policy.discount)}</p>
                </div>
              </td>
              <td>
                <Status status={policy.status?policy.status:"فعال"} 
                  text={"فعال"}
                  class={"order-status"} lang={props.lang}/>
              </td>
            <td>
              <div className="more-btn">
              <i className={`tableIcon fas ${activeAcc?"fa-chevron-up":"fa-chevron-down"}`} 
                onClick={()=>props.showDetail(activeAcc?"-1":props.index)} ></i>
                <i className="tableIcon fas fa-edit" onClick={()=>
                  window.location.href="/policy/detail/"+policy._id}></i>
                {/* <i className="tableIcon fas fa-ellipsis-v" 
                  onClick={()=>setOpenOption(openOption?0:1)}></i> */}
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
        <td colSpan="9"><PolicyQuickDetail policy={policy}/></td></tr>
          :<React.Fragment></React.Fragment>}
          </React.Fragment>
    )
}
export default PolicyTableRow