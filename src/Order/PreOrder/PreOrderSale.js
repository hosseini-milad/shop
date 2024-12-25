import { useState } from "react";
import OpenOrderItem from "./OpenOrderItem";
import PreOrderItem from "./PreOrderItem";
import env from "../../env";

function PreOrderSale(props) {
  const cart = props.cart && props.cart.cart;
  const total = props.cart && props.cart.cartDetail;
  const access = props.access;
  const token = props.token;
  const [orders, setOrders] = useState([]);
  const [Loader, setLoader] = useState(1);

  const setSepidarTotal = () => {
    //console.log(cart)
    if (!orders || !orders.length) {
      return "no order selected";
    }
    setLoader(0);
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ orderNo: orders, official: true }),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/setting/multi-sepidar", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          props.setError({ message: result.message, color: "green" });
          setTimeout(
            () => props.setError({ message: "", color: "brown" }),
            3000
          );
          setLoader(1);
          setTimeout(() => window.location.reload(), 1000);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  if (!cart) return <></>;
  else
    return (
      <section className="orders-sec">
        <div className="title">
          <p>سفارشات باز</p>
          <div className="order-search">
            <input
              className="fold-search"
              type="search"
              placeholder="جستجو"
              onChange={(e) => props.setSearch(e.target.value)}
            />
            <i class="fa fa-search" aria-hidden="true"></i>
          </div>
          <div className="orders-total">
            <p>تعداد سفارشات : {cart.length}</p>
          </div>
        </div>
        {props.Loader ?
          cart.map((cart, i) => (
            <OpenOrderItem
              key={i}
              data={cart}
              token={token}
              total={total}
              index={i}
              setOrders={setOrders}
              orders={orders}
            />
          )):<>{env.loader}</>}
        {(access == "edit" || access == "full") && orders.length ? (
          <div className="orderButtonHolder">
            {Loader ? (
              <input
                type="button"
                className="orderButton"
                value={"ثبت سپیدار"}
                onClick={() => setSepidarTotal()}
              />
            ) : (
              <button className="orderButton">در حال پردازش</button>
            )}
          </div>
        ) : (
          <></>
        )}
      </section>
    );
}
export default PreOrderSale;
