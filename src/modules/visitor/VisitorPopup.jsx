import React, { useState, useEffect } from "react";
import env from "../../env";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function VisitorPopup(props) {
  const content = props.content;
  const [Order, setOrder] = useState("");
  const token = cookies.get(env.cookieName);

  // useEffect(() => {

  //   const postOptions = {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-access-token": token && token.token,
  //       userId: token && token.userId,
  //     },
  //     body: JSON.stringify({sku:orderNum,allOrder:"true"}),
  //   };

  //   fetch(env.siteApi + "/panel/faktor/calc-count", postOptions)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setOrder(result.orderData);
  //       },
  //       (error) => {

  //         console.log(error);
  //       }
  //     );
  // }, []);
  return (
    <div className="delete-modal">
      <div className="modal-backdrop show-modal">
        <div className="visitor-popup">
          <i
            className="fa-solid fa-close close-visit"
            onClick={() => props.setVpop("")}
          ></i>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>کد سفارش</th>
                <th>نام مشتری</th>
                <th>تعداد</th>
              </tr>
            </thead>
            <tbody>
              {content &&
                content.orderList &&
                content.orderList.map((item, i) => (
                  <tr
                    key={i}
                    onClick={() => {
                      
                      props.setOrderPop(item.title);
                    }}
                  >
                    <td>{i + 1}</td>
                    <td>{item.title ? item.title : "-"}</td>
                    <td>{item.user ? item.user : "-"}</td>
                    <td>{item.count ? item.count : "-"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default VisitorPopup;
