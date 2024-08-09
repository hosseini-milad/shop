import React, { useState } from "react";
import Status from "../Components/Status";
import PayStatus from "../Components/PayStatus";
import { normalPriceCount, normalPriceRound, rxFindCount } from "../../env";
import OrderQuickDetail from "./OrderComponent/OrderQuickDetail";
import tabletrans from "../../translate/tables";
import OrderQuickCart from "./OrderComponent/OrderQuickCart";

function OrderTableRow(props) {
  const [openOption, setOpenOption] = useState(0);
  const [checkState, setCheckState] = useState(false);
  const activeAcc = props.index === props.detail;
  const order = props.order;
  const lang = props.lang;
  const cart = props.cart;
  const updateCheckBox=(field,action)=>{
    setCheckState(action?false:true)
    if(!action){
      if(props.selectedOrder){
        var index = props.selectedOrder&&
          props.selectedOrder.length
        props.setSelectedOrder(existingItems => {
          return [
            ...existingItems.slice(0, index),
            field,
            ...existingItems.slice(index + 1),
          ]
        }) 
      }
      else{
          props.setSelectedOrder([field])
        
      }
    }
    else{
      //const cartNo = e.target.getAttribute("cartNo")
      props.setSelectedOrder(l => 
        l.filter(item => item.cartNo !== field.cartNo));
    }
  }
  return (
    <React.Fragment>
      <tr className={activeAcc ? "activeAccordion" : "accordion"}>
        <td className="checkBoxStyle">
          <input
            type="checkbox"
            name=""
            id=""
            checked={checkState}
            onChange={(e) =>  updateCheckBox(order,checkState)}
          />
        </td>
        <td>
          <div className="order-id">
            <p onClick={() =>
                  (window.location.href = "/orders/detail/" + order.cartNo)
                }>
                {order.cartNo}
              </p>
            
          </div>
        </td>
        <td>
          <div className="cu-avatar">
            <img src="/img/avatar/avatar_1.jpg" alt="avatar" />
            <div className="cu-name">
              <p className="name">
                {order.userInfo[0]
                  ? order.userInfo[0].cName + "---" + order.userInfo[0].sName
                  : "---"}
              </p>
            </div>
            {order.moreInformation ? (
              <i className="fa fa-comment-o" title={order.moreInformation}></i>
            ) : (
              <></>
            )}
          </div>
        </td>
        <td>
          <div className="order-num">
            <p className="email">
              {order.userInfo[0]
                ? order.userInfo[0].phone
                : tabletrans.notEntered[lang]}
            </p>
          </div>
        </td>
        <td>
          <PayStatus
            payStatus={order.payStatus}
            class={"order-status"}
            lang={props.lang}
          />
        </td>
        <td>
          <div className="order-num">
            <p>{order.transport}</p>
          </div>
        </td>
        <td>
            <div className="or-date">
              <p className="date">
                {new Date(order.initDate).toLocaleDateString(
                  "fa")}
              </p>
              <p className="time">
                {new Date(order.initDate).toLocaleTimeString(
                  props.lang === "persian" ? "fa" : "en"
                )}
              </p>
            </div>
          
        </td>

        <td>
          <div className="order-price">
            <p>{normalPriceRound(order.totalCart&&
              order.totalCart.totalPrice)}</p>
          </div>
        </td>
        <td>
          {order.taskInfo&&order.taskInfo[0]&&
          order.taskInfo[0].taskStep=="archive"?"آماده":""}
          <Status
            status={order.status}
            class={"order-status"}
            lang={props.lang}
          />
        </td>

        <td>
          <div className="more-btn">
            <i
              className={`tableIcon fas ${
                activeAcc ? "fa-chevron-up" : "fa-chevron-down"
              }`}
              onClick={() => props.showDetail(activeAcc ? "-1" : props.index)}
            ></i>
            {/* <i
              className="tableIcon fas fa-edit"
              onClick={() =>
                (window.location.href = "/orders/detail/" + order.cartNo)
              }
            ></i> */}
            <i
              className="tableIcon fas fa-print"
              onClick={() =>(order.taskInfo[0].taskStep=="archive"?setOpenOption(openOption?0:1):(window.location.href = "/orders/print/" + order.cartNo))
                
              }
            ></i>
            
          </div>
          {openOption ? (
            <div className="sub-more-menu">
              <div className="sub-option" onClick={()=>window.location.href="/print/sepidar/"+order.taskInfo[0].result.InvoiceID}>
                
                <p>پرینت سپیدار</p>
              </div>
              <div className="sub-option" onClick={()=>window.location.href="/print/official/"+order.taskInfo[0].result.InvoiceID}>
                
                <p>پرینت رسمی</p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </td>
      </tr>
      {activeAcc ? (
        <tr className="sub-order">
          <td colSpan="10">
            {order.orderItems ? (
              <OrderQuickDetail order={order.orderItems} />
            ) : (
              <OrderQuickCart order={order.cartItems} />
            )}
          </td>
        </tr>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}
export default OrderTableRow;
