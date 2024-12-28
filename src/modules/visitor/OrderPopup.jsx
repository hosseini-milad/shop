import React, { useState, useEffect } from "react";
import env from "../../env";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function OrderPopup(props) {
  const CartNum = props.CartNum;
  const [Order, setOrder] = useState("");
  const token = cookies.get(env.cookieName);

  useEffect(() => {
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ cartNo: CartNum }),
    };

    fetch(env.siteApi + "/panel/faktor/cart-find", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setOrder(result.cart[0]);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  return (
    <div className="delete-modal">
      <div className="modal-backdrop show-modal">
        <div className="visitor-popup">
          <i
            className="fa-solid fa-close close-visit"
            onClick={() => props.setOrderPop("")}
          ></i>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>کد محصول</th>
                <th>نام محصول</th>
                <th>تعداد</th>
              </tr>
            </thead>
            <tbody>
              {Order &&
                Order.cartItems &&
                Order.cartItems.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.sku ? item.sku : "-"}</td>
                    <td>{item.title ? item.title : "-"}</td>
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
export default OrderPopup;
