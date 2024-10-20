import { useEffect, useState } from "react";
import OrderFilters from "./Components/Filters";
import OrderHeader from "./Components/Header";
import ProductList from "./Components/ProductList";
import QuickCartHolder from "./QuickCart/QuickCartHolder";
import PreOrderHolder from "./PreOrder/PreOrderList";
import PreOrderSale from "./PreOrder/PreOrderSale"
import env, {CheckAccess, defPay } from "../env";
import Cookies from "universal-cookie";
import ShowError from "../components/Modal/ShowError";
import PreQuickHolder from "./PreOrder/PreQuickList";
const cookies = new Cookies();
var shopVar = JSON.parse(localStorage.getItem(env.shopExpert));

function OrderHolder(props) {
  const token = cookies.get(env.cookieName);
  const [grid, setGrid] = useState(shopVar ? shopVar.grid : 0);
  const [filters, setFilters] = useState();
  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  const [appFilter, setAppFilter] = useState();
  const [products, setProduct] = useState();
  const [payValue, setPayValue] = useState(defPay);
  const [error, setError] = useState({ message: "", color: "brown" });
  const access = CheckAccess(token,"orders")
  useEffect(() => {
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        userId: user
          ? user.Code
            ? user.Code
            : user._id
          : token && token.userId,
      }),
    };
    fetch(env.siteApi + "/panel/faktor/cart", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result)
            if (result.error) {
              if (result.error === "Invalid Token Error") {
                const cookies = new Cookies();
                cookies.remove(env.cookieName, { path: "/" });
                setTimeout(() => (window.location.reload(), 1000));
              }
            } else {
              setCart(result);
            }
          else setCart("");
        },
        (error) => {
          console.log(error);
        }
      );
  }, [user]);
  useEffect(() => {
    const postOptions = {
      method: "get",
      headers: { "Content-Type": "application/json" },
    };
    fetch(env.siteApi + "/panel/faktor/list-filters", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result)
            if (result.error) {
            } else {
              setFilters(result);
            }
          else setFilters("");
        },
        (error) => {
          console.log(error);
        }
      );
    if(token.profileCode == "sale") 
      setUser(
      {"_id":"66128faa5820d102747ed259",
        "username":"مصرف کننده نهایی",
        "cName":"مصرف کننده نهایی",
        "phone":"09121697421",
        "cCode":"12124",
        "CustomerID":"2753"
      },
    )
  }, []);
  useEffect(() => {
    if (!appFilter) return;
    const postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filters: appFilter,
        stockId: token.stockId ? token.stockId : "5",
      }),
    };
    fetch(env.siteApi + "/panel/faktor/list-products", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result)
            if (result.error) {
            } else {
              setProduct(result.products);
            }
          else setProduct("");
        },
        (error) => {
          console.log(error);
        }
      );
  }, [appFilter]);
  return (
    <div className="sharif new-sharif" style={{ direction: "rtl" }}>
      <header className="sharif-order-header">
        <OrderHeader
          lang={props.lang}
          setGrid={setGrid}
          grid={grid}
          token={props.token}
          setError={setError}
          user={user}
          setUser={setUser}
          setFilters={setFilters}
        />
        <OrderFilters
          grid={grid}
          setFilters={setFilters}
          filters={filters}
          setAppFilter={setAppFilter}
          appFilter={appFilter}
        />
      </header>
      <main className="sharif-order-main">
        {filters && (filters.brand || filters.category) ? (
          <ProductList
            filters={filters}
            products={products}
            setCart={setCart}
            user={user}
            setError={setError}
            payValue={payValue}
            token={token}
          />
        ) : (
          <></>
        )}
        {user ? (
          <QuickCartHolder
            token={token}
            user={user}
            canEdit={1}
            payValue={payValue}
            setPayValue={setPayValue}
            cart={cart && cart.quickCart}
            setCart={setCart}
            setError={setError}
            cartDetail={cart && cart.qCartDetail}
          />
        ) : (
          <></>
        )}
        <PreQuickHolder token={token} user={user} cart={cart} />
        
        {(cart&&cart.isSale)?
      <PreOrderSale token={token} user={user}
      cart={cart} access={access}/>:
      <PreOrderHolder token={token} user={user}
        cart={cart}/>}
      </main>
      {error && error.message ? (
        <ShowError
          color={error.color}
          status={"سفارشات"}
          text={error.message}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
export default OrderHolder;
