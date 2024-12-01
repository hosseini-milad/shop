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
import ProductListSale from "./Components/ProductListSale";
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
  const [tab,setTab] = useState(0)
  const access = CheckAccess(token,"orders")
  useEffect(() => {
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify(
        {
          
          userId: user
          ? user.Code
            ? user.Code
            : user._id
          : token && token.userId,
        }),
    };
    fetch(env.siteApi + `/panel/${tab?"quote":"faktor"}/cart`, postOptions)
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
  }, [user,tab]);
  useEffect(() => {
    const postOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
    };
    fetch(env.siteApi + "/panel/faktor/list-filters-panel", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result){

            if(token.profileCode == "sale"){
              setUser(result.defaultUser&&result.defaultUser)
            }
            else if (result.error) {
            } else {
              setFilters(result);
            }
          }
          else setFilters("");
        },
        (error) => {
          console.log(error);
        }
      );
    
  }, []);
  useEffect(() => {
    if (!appFilter) return;
    const postOptions = {
      method: "post",
      headers: {'Content-Type': 'application/json',
        "x-access-token":token&&token.token,"userId":token&&token.userId},
      body: JSON.stringify({
        filters: appFilter,
        stockId: token.stockId ? token.stockId : "5",
      }),
    };
    fetch(env.siteApi + `${token.profileCode == "sale"?"/sales/find-products":"/panel/faktor/list-products"}`, postOptions)
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
          (token.profileCode == "sale")?
          <ProductListSale
            filters={filters}
            products={products}
            setCart={setCart}
            user={user}
            setError={setError}
            payValue={payValue}
            token={token}
          />:
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
            OrderPop={true}
            tab={tab}
            setTab={setTab}
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
      <PreOrderSale token={token} user={user} setError={setError}
      cart={cart} setCart={setCart} access={access}/>:
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
