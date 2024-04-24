import React ,{ useState } from "react"
import Status from "../Components/Status"
import  env, { normalPriceCount, stockFindCount } from "../../env"
import tabletrans from "../../translate/tables"
import Cookies from 'universal-cookie';
import TransactionQuickDetail from "./TransactionQuick";
const cookies = new Cookies();

function TransactionTableRow(props){
  const [openOption,setOpenOption] = useState(0)
  const [checkState,setCheckState] = useState(false)
  const activeAcc = props.index===props.detail
  const token=cookies.get(env.cookieName)
  const content=props.content
  const query = content&&content.query
  const orderData = content&&content.orderData&&content.orderData[0]
  const cancelOrder=(orderNo)=>{
    const postOptions={
      method:'post',
      headers: {'Content-Type': 'application/json',
      "x-access-token":token&&token.token,"userId":token&&token.userId},
      body:JSON.stringify({orderNo:orderNo,status:"cancel"})
    }
    console.log(postOptions)
fetch(env.siteApi + "/panel/order/editOrder",postOptions)
.then(res => res.json())
.then(
  (result) => {
    console.log(result)
    setTimeout(()=> window.location.reload(),1000)
    /*setContent('')
      setTimeout(()=> setContent(result),200)*/
  },
  (error) => {
    console.log(error);
  })
  }
    return(<React.Fragment>
        <tr 
            className={activeAcc?"activeAccordion":"accordion"}>
            <td className="checkBoxStyle">
              <input type="checkbox" name="" id="" checked={checkState}
              onChange={(e)=>setCheckState(checkState?false:true)}/></td>
            <td>
                <div className="order-id">
                  <p onClick={()=> window.location.href=
                    "/orders/detail/"+orderData._id}>
                    {orderData.orderNo}</p>
                </div>
            </td>
            <td>
              <div className="cu-avatar">
                  <img src="/img/avatar/avatar_1.jpg" alt="avatar"/>
                  <div className="cu-name">
                    <p className="name">{orderData.userDetail[0]?
                      orderData.userDetail[0].cName:orderData.userId}</p>
                    <p className="email">{orderData.userDetail[0]?
                      orderData.userDetail[0].phone:''}</p>
                  </div>
                  {content.moreInformation?
                    <i className="fa fa-comment-o" title={content.moreInformation}></i>:<></>}
                </div>
              </td>
              <td>
                <div className="or-date">
                  <p className="date">{new Date(content.payDate)
                  .toLocaleDateString(props.lang==="persian"?'fa':'en')}</p>
                  <p className="time">{new Date(content.payDate)
                  .toLocaleTimeString(props.lang==="persian"?'fa':'en')}</p>
                </div>
              </td>
              <td>
                <div className="order-price">
                  <p>{orderData.orderPrice}</p>
                </div>
              </td>
              <td>
                <div className="order-price">
                  <p>{content.saleReferenceId}</p>
                </div>
              </td>
              <td>
                <Status status={content.payStatus} class={"order-status"} 
                  lang={props.lang}/>
              </td>
            <td>
              <div className="more-btn">
              <i className={`tableIcon fas ${activeAcc?"fa-chevron-up":"fa-chevron-down"}`} 
                onClick={()=>props.showDetail(activeAcc?"-1":props.index)} ></i>
                {/* <i className="tableIcon fas fa-ellipsis-v" 
                  onClick={()=>setOpenOption(openOption?0:1)}></i> */}
              </div>
              {openOption?<div className={props.direction==="rtl"?
                "sub-more-menu rtl-sub-menu":"sub-more-menu"}>
                <div className="sub-option sub-delete" onClick={()=>cancelOrder(content.stockOrderNo)}>
                <i className="tableIcon fas fa-remove" style={{color: "#ff0000"}}></i>
                  <p>{tabletrans.delete[props.lang]}</p>
                </div>
                <div className="sub-option sub-edit">
                  <i className="tableIcon fas fa-edit"></i>
                  <p>Edit</p>
                </div>
              </div>:<></>}
            </td>
          </tr>
          {activeAcc?<tr className="sub-order">
        <td colSpan="9"><TransactionQuickDetail 
          query={query} data={content}/></td></tr>
          :<React.Fragment></React.Fragment>}
          </React.Fragment>
    )
}
export default TransactionTableRow