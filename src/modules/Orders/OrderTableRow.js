import React, { useState,useEffect,useRef } from "react";
import Status from "../Components/Status";
import PayStatus from "../Components/PayStatus";
import { normalPriceCount, normalPriceRound, rxFindCount } from "../../env";
import OrderQuickDetail from "./OrderComponent/OrderQuickDetail";
import tabletrans from "../../translate/tables";
import OrderQuickCart from "./OrderComponent/OrderQuickCart";
import LinkModal from "../../components/Modal/LinkModal";
import env from "../../env";
function OrderTableRow(props) {
  const [openOption, setOpenOption] = useState(false);
  const [checkState, setCheckState] = useState(0);
  const [LinkShare, setLinkShare] = useState("");
  const token = props.token
  const activeAcc = props.index === props.detail;
  const order = props.order;
  const lang = props.lang;
  const cart = props.cart;
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpenOption(false);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  useEffect(()=>{
    setCheckState(props.allcheck)
  },[props.allcheck])
  
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
    console.log(props.selectedOrder)
  }
  const CreateLink =(()=>{
    const postOptions={
        method:'post',
        headers: { 'Content-Type': 'application/json' ,
        "x-access-token": token&&token.token,
        "userId":token&&token.userId},
        body:JSON.stringify({cartNo:order.cartNo})
      }
    fetch(env.siteApi + "/panel/faktor/create-public-link",postOptions)
    .then(res => res.json())
    .then(
        (result) => {
            console.log(result)
            setLinkShare("/public-print/"+order.cartNo)
        },
        (error) => {
            console.log(error)
        })
    })

  return (
    <React.Fragment>
      <tr className={activeAcc ? "activeAccordion" : "accordion"}>
        <td>{props.index+1}</td>
        {order.isSale?<td className="checkBoxStyle">
          {order.status&&order.status=="undone"?
          <input
            type="checkbox"
            checked={checkState}
            onChange={(e) =>  updateCheckBox(order,checkState)}
          />:<></>}
        </td>:
        <td className="checkBoxStyle">
          {order.status&&order.status=="done"?
          <input
            type="checkbox"
            checked={checkState}
            onChange={(e) =>  updateCheckBox(order,checkState)}
          />:<></>}
        </td>}
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
          {/* {order.taskInfo&&order.taskInfo[0]&&
          order.taskInfo[0].taskStep=="archive"?"آماده":""} */}
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
            <i
              className="tableIcon fas fa-print"
              onClick={() =>(setOpenOption(openOption?0:1))}
            ></i>
            <i
              className="tableIcon fas fa-tag"
              onClick={()=>window.location.href = "/orders/fishprint/" + order.cartNo}>
            </i>
            <i
              className="tableIcon fas fa-paper-plane" onClick={()=>CreateLink()}
              >
            </i>
            
          </div>
          
            <div className={openOption==true?"sub-more-menu sub-active":"sub-more-menu"} ref={menuRef}>
              <div className="sub-option" onClick={()=>window.location.href = "/orders/print/" + order.cartNo}>
                
                <p>چاپ فاکتور</p>
              </div>
              <div className="sub-option" onClick={()=>window.location.href="/print/sepidar/"+order.cartNo}>
                
                <p>چاپ رسمی</p>
              </div>
              {(order.InvoiceID)?<>
              <div className="sub-option" onClick={()=>window.location.href="/print/official/"+order.InvoiceID}>
                
                <p>چاپ سپیدار</p>
              </div></>:<></>}
            </div>
          
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
      {LinkShare?<LinkModal LinkShare={LinkShare} setLinkShare={setLinkShare}/>:<></>}
    </React.Fragment>
  );
}
export default OrderTableRow;
