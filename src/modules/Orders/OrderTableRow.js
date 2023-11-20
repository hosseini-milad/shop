import React ,{ useState } from "react"
import Status from "../Components/Status"
import  { normalPriceCount, rxFindCount } from "../../env"
import OrderQuickDetail from "./OrderComponent/OrderQuickDetail"

function OrderTableRow(props){
  const [openOption,setOpenOption] = useState(0)
  const [checkState,setCheckState] = useState(false)
  const activeAcc = props.index===props.detail
  const order=props.order
    return(<React.Fragment>
        <tr 
            className={activeAcc?"activeAccordion":"accordion"}>
            <td className="checkBoxStyle">
              <input type="checkbox" name="" id="" checked={checkState}
              onChange={(e)=>setCheckState(checkState?false:true)}/></td>
            <td>
                <div className="order-id">
                  <p onClick={()=> window.location.href=
                    "/orders/detail/"+order.rxOrderNo}>
                    {order.rxOrderNo}</p>
                </div>
            </td>
            <td>
              <div className="cu-avatar">
                  <img src="/img/avatar/avatar_1.jpg" alt="avatar"/>
                  <div className="cu-name">
                    <p className="name">{order.userInfo[0].cName}</p>
                    <p className="email">{order.userInfo[0].phone}</p>
                  </div>
                  {order.moreInformation?
                    <i className="fa fa-comment-o" title={order.moreInformation}></i>:<></>}
                </div>
              </td>
              <td>
                <div className="or-date">
                  <p className="date">{new Date(order.date)
                  .toLocaleDateString(props.lang==="persian"?'fa':'en')}</p>
                  <p className="time">{new Date(order.date)
                  .toLocaleTimeString(props.lang==="persian"?'fa':'en')}</p>
                </div>
              </td>
              <td>
                <div className="order-num">
                  <p>{order.brand}</p>
                </div>
              </td>
              <td>
                <div className="order-num">
                  <p>{rxFindCount(order)}</p>
                </div>
              </td>
              <td>
                <div className="order-price">
                  <p>{normalPriceCount(order.totalPrice)}</p>
                </div>
              </td>
              <td>
                <Status status={order.status} class={"order-status"} 
                  lang={props.lang}/>
              </td>
            <td>
              <div className="more-btn">
              <i className={`tableIcon fas ${activeAcc?"fa-chevron-up":"fa-chevron-down"}`} 
                onClick={()=>props.showDetail(activeAcc?"-1":props.index)} ></i>
                <i className="tableIcon fas fa-edit" onClick={()=>
                  window.location.href="/orders/detail/"+order.rxOrderNo}></i>
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
        <td colSpan="9"><OrderQuickDetail order={order}/></td></tr>
          :<React.Fragment></React.Fragment>}
          </React.Fragment>
    )
}
export default OrderTableRow