import React, { useState } from "react";
import Status from "../Components/Status";
import PayStatus from "../Components/PayStatus";
import { normalPriceCount, rxFindCount } from "../../env";
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
  console.log(order);
  return (
    <React.Fragment>
      <tr className={activeAcc ? "activeAccordion" : "accordion"}>
        <td className="checkBoxStyle">
          <input
            type="checkbox"
            name=""
            id=""
            checked={checkState}
            onChange={(e) => setCheckState(checkState ? false : true)}
          />
        </td>
        <td>
          <div className="order-id">
            {cart ? (
              <p
                onClick={() =>
                  (window.location.href = "/orders/detail/" + order.cartNo)
                }
              >
                {order.cartNo}
              </p>
            ) : (
              <p
                onClick={() =>
                  (window.location.href = "/orders/detail/" + order.orderNo)
                }
              >
                {order.orderNo}
              </p>
            )}
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
          {cart ? (
            <div className="or-date">
              <p className="date">
                {new Date(order.initDate).toLocaleDateString(
                  props.lang === "persian" ? "fa" : "en"
                )}
              </p>
              <p className="time">
                {new Date(order.initDate).toLocaleTimeString(
                  props.lang === "persian" ? "fa" : "en"
                )}
              </p>
            </div>
          ) : (
            <div className="or-date">
              <p className="date">
                {new Date(order.date).toLocaleDateString(
                  props.lang === "persian" ? "fa" : "en"
                )}
              </p>
              <p className="time">
                {new Date(order.date).toLocaleTimeString(
                  props.lang === "persian" ? "fa" : "en"
                )}
              </p>
            </div>
          )}
        </td>

        <td>
          <div className="order-price">
            <p>{normalPriceCount(order.totalCart.totalPrice)}</p>
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
              <div className="sub-option" onClick={()=>window.location.href="/print/sepidar/"+order.InvoiceID}>
                
                <p>پرینت سپیدار</p>
              </div>
              <div className="sub-option" onClick={()=>window.location.href="/print/official/"+order.InvoiceID}>
                
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
