import React, { useState, useEffect, useRef } from "react";
import Status from "../Components/Status";
import PayStatus from "../Components/PayStatus";
import { normalPriceCount, normalPriceRound, rxFindCount } from "../../env";
import OrderQuickDetail from "./OrderComponent/OrderQuickDetail";
import tabletrans from "../../translate/tables";
import OrderQuickCart from "./OrderComponent/OrderQuickCart";
import LinkModal from "../../components/Modal/LinkModal";
import env from "../../env";
function FaktorTableRow(props) {
  const [openOption, setOpenOption] = useState(false);
  const [checkState, setCheckState] = useState(0);
  const [LinkShare, setLinkShare] = useState("");
  const token = props.token;
  const activeAcc = props.index === props.detail;
  const order = props.order;
  const lang = props.lang;
  const cart = props.cart;
  const ClearBank = props.ClearBank;
  let menuRef = useRef();
  console.log(props.selectedOrder);
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenOption(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const CreateLink = () => {
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ cartNo: order.cartNo }),
    };
    fetch(env.siteApi + "/panel/faktor/create-public-link", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setLinkShare("/public-print/" + order.cartNo);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <React.Fragment>
      <tr className={activeAcc ? "activeAccordion" : "accordion"}>
        <td>{props.index + 1}</td>
        <td>
          <div className="order-id">
            <p>{order.InvoiceID}</p>
          </div>
        </td>
        <td>
          <div className="cu-avatar" style={{ minWidth: "150px" }}>
            <img src="/img/avatar/avatar_1.jpg" alt="avatar" />
            <div className="cu-name">
              <p className="name">{order.customerName && order.customerName}</p>
            </div>
          </div>
        </td>

        <td>
          <div className="or-date">
            <p className="date">
              {new Date(order.initDate).toLocaleDateString("fa")}
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
            <p>{normalPriceRound(order.NetPrice && order.NetPrice)}</p>
          </div>
        </td>
        <td>
          <Status
            status={order.Status}
            class={"order-status"}
            lang={props.lang}
          />
        </td>
        <td>
          <div className="more-btn">
            <i
              className="tableIcon fas fa-print"
              onClick={() => setOpenOption(openOption ? 0 : 1)}
            ></i>
            <i
              className="tableIcon fas fa-tag"
              onClick={() =>
                (window.location.href = "/orders/fishprint/" + order.cartNo)
              }
            ></i>
            <i
              className="tableIcon fas fa-paper-plane"
              onClick={() => CreateLink()}
            ></i>
          </div>

          <div
            className={
              openOption == true ? "sub-more-menu sub-active" : "sub-more-menu"
            }
            ref={menuRef}
          >
            <div
              className="sub-option"
              onClick={() =>
                (window.location.href = "/orders/print/" + order.cartNo)
              }
            >
              <p>چاپ فاکتور</p>
            </div>
            <div
              className="sub-option"
              onClick={() =>
                (window.location.href = "/print/sepidar/" + order.cartNo)
              }
            >
              <p>چاپ رسمی</p>
            </div>
            {order.InvoiceID ? (
              <>
                <div
                  className="sub-option"
                  onClick={() =>
                    (window.location.href =
                      "/print/official/" + order.InvoiceID)
                  }
                >
                  <p>چاپ سپیدار</p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </td>
        <td>
          <button
            className="register-btn"
            onClick={() =>
              props.setBankPop({
                InvoiceID: order.InvoiceID,
                NumberID: order.InvoiceNumber,
              })
            }
          >
            ثبت سند
          </button>
        </td>
      </tr>

      {LinkShare ? (
        <LinkModal LinkShare={LinkShare} setLinkShare={setLinkShare} token={token}/>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}
export default FaktorTableRow;
