import { useState, useEffect } from "react";
import env, { TAX, normalPriceCount, normalPriceRound } from "../../env";
import Cookies from "universal-cookie";
const cookies = new Cookies();
function FishPrintCart(props) {
  const orderInfo = props.orderData;
  const orderData = props.orderData.orderData;
  const userInfo = props.orderData.userData ? props.orderData.userData[0] : "";
  const token = cookies.get(env.cookieName);
  if (!orderInfo) return <main>{"orderError"}</main>;
  else
    return (
      <div className="printArea fishPrintArea">
        <div className="faktor-info">
          <p className="title">فاکتور فروش</p>
          <div className="orderNum">
            <span>شماره:</span>
            <span>{orderInfo.cart[0].cartNo}</span>
          </div>
          <div className="info-wrapper">
            <div className="info-col">
              <p>صندوقدار:</p>
              <p>قیمت فروش:</p>
              <p>تاریخ و ساعت:</p>
              <p>مشتری:</p>
            </div>
            <div className="info-col">
              <p>{token.profileName}</p>
              <p>قیمت پیش فرض</p>
              <p>
                <small>
                  {new Date(orderInfo.orderDate).toLocaleDateString("fa")}
                </small>
                <small>
                  {new Date(orderInfo.orderDate).toLocaleTimeString("fa")}
                </small>
              </p>
              <p>{userInfo && userInfo.username}</p>
            </div>
          </div>
        </div>

        <table className="hesabfaMainTable">
          <tbody>
            <tr>
              <th>#</th>
              <th width={120}>عنوان</th>
              <th>تعداد</th>
              <th className="priceCell">فی</th>
              <th className="priceCell">خالص</th>
            </tr>
            {orderInfo &&
              orderInfo.cartItems &&
              orderInfo.cartItems.map((items, i) => (
                <tr key={i}>
                  <td className="centerCell">{i + 1}</td>
                  <td className="titleCell">
                    {items.title.length > 20
                      ? items.title.substring(0, 20) + ".."
                      : items.title}
                  </td>
                  <td className="centerCell">{items.count}</td>
                  <td className="priceCell">
                    {normalPriceRound(items.total.price)}
                  </td>
                  <td className="priceCell">
                    {normalPriceRound(items.total.total)}
                  </td>
                </tr>
              ))}
            <tr className="faktor-total">
              <td colSpan={3}>
                <p>جمع</p>
              </td>
              <td colSpan={2} className="priceCell">
                {normalPriceRound(orderData.totalPrice)}
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                <p style={{ textAlign: "right" }}>توضیحات:</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

export default FishPrintCart;
