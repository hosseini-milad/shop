import { useState, useEffect } from "react";
import env, { TAX, normalPriceCount, normalPriceRound } from "../../env";
var token = JSON.parse(localStorage.getItem("token-lenz"));

function FishPrintCart(props) {
  const orderInfo = props.orderData;
  const orderData = props.orderData.orderData;
  const userInfo = props.orderData.userData ? props.orderData.userData[0] : "";
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
              <p>سرپرست</p>
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
            <tr>
              <td colSpan={4}>
                <p>جمع</p>
              </td>
              <td className="priceCell">
                {normalPriceRound(orderData.totalPrice)}
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <p>مانده حساب طرف حساب</p>
              </td>
              <td className="priceCell">0</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <p>مبلغ تسویه شده</p>
              </td>
              <td className="priceCell">
                {normalPriceRound(orderData.totalPrice)}
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <span>توضیحات:</span>
              </td>
              <td>
                <p>وضعیت</p>
              </td>
              <td className="priceCell"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

export default FishPrintCart;
