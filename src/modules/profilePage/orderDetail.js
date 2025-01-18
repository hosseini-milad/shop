import { useState, useEffect } from "react";
import env, { normalPrice, siteApi } from "../../env";

function OrderDetail(props) {
  const token = props.token;
  const [orders, setOrders] = useState();
  const [tabShow, setTabShow] = useState(0);
  const [orderDetail, setOrderDetail] = useState(0);
  useEffect(() => {
    const getOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token.token,
        userId: token.userId,
      },
    };
    fetch(siteApi + "/cart-web/my-faktors", getOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          //console.log(result.data.orders)
          setOrders(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  console.log(orders);
  const loadOrder = (orderId) => {
    setOrderDetail("");
    const getOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (token && token.token),
      },
    };
    fetch(siteApi + env.newUserDetail + orderId, getOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          //console.log(result.data.orders)
          setOrderDetail(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <div className="orderHolders">
      <h2>لیست سفارشات</h2>
      <table className="orderList">
        <thead>
          <tr>
            <th>شماره سفارش</th>
            <th>تاریخ سفارش</th>
            <th>وضعیت سفارش</th>
            <th>وضعیت پرداخت</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, i) => (
              <>
                <tr className="orderItem" key={i}>
                  <td className="orderNo">{order.faktorNo}</td>
                  <td>{new Date(order.initDate).toLocaleDateString("fa")}</td>
                  <td>{order.statusFa}</td>
                  <td>{order.payStatusFa}</td>
                  <td>
                    <button
                      className="orderBtnShow"
                      onClick={() => {
                        setTabShow(tabShow === i + 1 ? 0 : i + 1);
                        loadOrder(order.faktorNo);
                      }}
                    >
                      {tabShow === i + 1 ? "بستن جزئیات" : "جزئیات سفارش"}
                    </button>
                  </td>
                </tr>
                <tr
                  style={{ display: tabShow === i + 1 ? "table-row" : "none" }}
                  className="orderDetail"
                >
                  <td colSpan={5} style={{ padding: "0px" }}>
                    <table>
                      <thead>
                        <tr>
                          <th>ردیف</th>
                          <th>شناسه محصول</th>
                          <th>نام محصول</th>
                          <th>تعداد</th>
                          <th>قیمت واحد</th>
                          <th>قیمت محصول</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.cartItems &&
                          order.cartItems.map((cartItem, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{cartItem.sku}</td>
                              <td>{cartItem.title}</td>
                              <td>{cartItem.count}</td>
                              <td>{normalPrice(cartItem.price)}</td>
                              <td>{normalPrice(cartItem.netPrice)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default OrderDetail;
