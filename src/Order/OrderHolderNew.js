import { useEffect, useState, useRef } from "react";
import OrderFilters from "./Components/Filters";
import OrderHeader from "./Components/Header";
import ProductList from "./Components/ProductList";
import QuickCartHolder from "./QuickCart/QuickCartHolder";
import PreOrderHolder from "./PreOrder/PreOrderList";
import PreOrderSale from "./PreOrder/PreOrderSale";
import env, { CheckAccess, defPay } from "../env";
import Cookies from "universal-cookie";
import ShowError from "../components/Modal/ShowError";
import PreQuickHolder from "./PreOrder/PreQuickList";
import ProductListSale from "./Components/ProductListSale";
import Paging from "../modules/Components/Paging";
import {
  getFiltersFromUrl,
  updateUrlWithFilters,
  defaultFilterValues,
  handleFilterChange,
} from "../utils/filterUtils";
import { useReactToPrint } from "react-to-print";
import PrintFish from "../modules/Print/PrintFish";
const cookies = new Cookies();
var shopVar = JSON.parse(localStorage.getItem(env.shopExpert));

function OrderHolder(props) {
  const token = cookies.get(env.cookieName);
  const [grid, setGrid] = useState(shopVar ? shopVar.grid : 0);
  const [filters, setFilters] = useState();
  const [Search, setSearch] = useState("");
  const [Date, setDate] = useState("");
  const [Loader, setLoader] = useState(0);
  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  const [appFilter, setAppFilter] = useState();
  const [products, setProduct] = useState();
  const [payValue, setPayValue] = useState(defPay);
  const [error, setError] = useState({ message: "", color: "brown" });
  const [tab, setTab] = useState(0);
  const access = CheckAccess(token, "orders");
  const [Pages, setPages] = useState(getFiltersFromUrl());
  const [PrintPop, setPrintPop] = useState("");
  var contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
  function handleFilterChange(newFilters) {
    setPages(newFilters);
    updateUrlWithFilters(newFilters);
  }
  useEffect(() => {
    setLoader(0);
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
        offset: Pages.offset ? Pages.offset : "0",
        pageSize: Pages.pageSize ? Pages.pageSize : "10",
        search: Search,
        dateFrom: Date && Date.dateFrom,
        dateTo: Date && Date.dateTo,
      }),
    };
    fetch(env.siteApi + `/panel/${tab ? "quote" : "faktor"}/cart`, postOptions)
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
              setLoader(1);
            }
          else setCart("");
          setLoader(1);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [user, tab, Pages, Search, Date]);
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
          if (result) {
            if (token.profileCode == "sale") {
              setUser(result.defaultUser && result.defaultUser);
              setFilters(result);
              if (result.defaultUser && result.defaultUser.CustomerID) {
                setPayValue(3);
              }
            } else if (result.error) {
            } else {
              setFilters(result);
            }
          } else setFilters("");
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
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        filters: appFilter,
        stockId: token.stockId ? token.stockId : "5",
      }),
    };
    fetch(
      env.siteApi +
        `${
          token.profileCode == "sale"
            ? "/sales/find-products"
            : "/panel/faktor/list-products"
        }`,
      postOptions
    )
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
          setPayValue={setPayValue}
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
          token.profileCode == "sale" ? (
            <ProductListSale
              filters={filters}
              products={products}
              setCart={setCart}
              user={user}
              setError={setError}
              payValue={payValue}
              token={token}
            />
          ) : (
            <ProductList
              filters={filters}
              products={products}
              setCart={setCart}
              user={user}
              setError={setError}
              payValue={payValue}
              token={token}
            />
          )
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
            setPrintPop={setPrintPop}
            reactToPrintFn={reactToPrintFn}
          />
        ) : (
          <></>
        )}
        {PrintPop ? (
          <div className="onlyPrint">
            <div ref={contentRef}>
              <PrintFish url={PrintPop} />
            </div>
          </div>
        ) : (
          <></>
        )}
        <PreQuickHolder token={token} user={user} cart={cart} />

        {cart && cart.isSale ? (
          <PreOrderSale
            token={token}
            user={user}
            setError={setError}
            cart={cart}
            setCart={setCart}
            access={access}
            setSearch={setSearch}
            Search={Search}
            Loader={Loader}
            setDate={setDate}
            lang={props.lang}
          />
        ) : (
          <PreOrderHolder token={token} user={user} cart={cart} />
        )}
        {cart ? (
          <Paging
            content={cart}
            size={cart.size}
            filters={Pages}
            lang={props.lang}
            setFilters={handleFilterChange}
            updateUrlWithFilters={updateUrlWithFilters}
            Selected={10}
          />
        ) : (
          <>{env.loader}</>
        )}
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
