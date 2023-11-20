import React ,{ useState } from "react"
import Status from "../Components/Status"
import  { normalPriceCount, rxFindCount } from "../../env"
import ServiceQuickDetail from "./ServiceComponent/ServiceQuickDetail"
import { serviceKind } from "../../translate/status"

function ServiceTableRow(props){
  const [openOption,setOpenOption] = useState(0)
  const [checkState,setCheckState] = useState(false)
  const activeAcc = props.index===props.detail
  const service=props.service
  var serviceName = '';
  try{serviceName=serviceKind.find(item=>(item.english===service.category))[props.lang]
  }catch{}
    return(<React.Fragment>
        <tr 
            className={activeAcc?"activeAccordion":"accordion"}>
            <td className="checkBoxStyle">
              <input type="checkbox" name="" id="" checked={checkState}
              onChange={(e)=>setCheckState(checkState?false:true)}/></td>
            <td>
                <div className="order-id">
                  <p>{serviceName}</p>
                </div>
            </td>
            <td>
              <div className="cu-avatar">
                  <img src="/img/avatar/avatar_1.jpg" alt="avatar"/>
                  <div className="cu-name">
                    <p className="name" onClick={()=>
                  window.location.href="/services/detail/"+service._id}>{service.title}</p>
                  </div>
                </div>
              </td>
              <td>
                <div className="or-date">
                  <p className="date">{service.serviceCode}</p>
                </div>
              </td>
              <td>
                <div className="order-num">
                  <p>{service.brand}</p>
                </div>
              </td>
              <td>
                <div className="order-num">
                  <p>2</p>
                </div>
              </td>
              <td>
                <div className="order-price">
                  <p>{normalPriceCount(service.colorPrice)}</p>
                </div>
              </td>
              <td>
                <Status status={service.status} class={"order-status"} 
                  lang={props.lang}/>
              </td>
              <td>
              <div className="more-btn">
                <i className={`tableIcon fas ${activeAcc?"fa-chevron-up":"fa-chevron-down"}`} 
                  onClick={()=>props.showDetail(activeAcc?"-1":props.index)} ></i>
                <i className="tableIcon fas fa-edit" onClick={()=>
                  window.location.href="/services/detail/"+service._id}></i>
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
          <td colSpan="9"><ServiceQuickDetail service={service} lang={props.lang}/></td></tr>
            :<React.Fragment></React.Fragment>}
          </React.Fragment>
    )
}
export default ServiceTableRow