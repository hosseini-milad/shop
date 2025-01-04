import Cookies from "universal-cookie";
import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import OrderTable from "../modules/Orders/OrderTable";
import OrderFilters from "../modules/Orders/OrderComponent/OrderFilters";
import { useEffect } from "react";
import { useState } from "react";
import env from "../env";
import tabletrans from "../translate/tables";
import OrderTab from "../modules/Orders/OrderComponent/OrderTab";
import ShowError from "../components/Modal/ShowError";
import FaktorTab from "../modules/Orders/OrderComponent/FaktorTab";
import {
  getFiltersFromUrl,
  updateUrlWithFilters,
  defaultFilterValues,
  handleFilterChange,
} from "../utils/filterUtils"; // Import the utility functions
import FaktorTabel from "../modules/Orders/FaktorTable";
const cookies = new Cookies();
var TabOrder = JSON.parse(localStorage.getItem("orderTab"));
function Orders(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [errorPop, setErrorPop] = useState({ message: "", color: "brown" });
  const [FaktorType, setFaktorType] = useState("Faktor");
  const [content, setContent] = useState("");
  const [bankList, setbankList] = useState("");
  const [filters, setFilters] = useState(getFiltersFromUrl());
  const [loading, setLoading] = useState(0);
  const [StatusList, setStatusList] = useState("");
  const [StatusSale, setStatusSale] = useState("");
  const [TransData, setTransData] = useState("");
  const [TransRemain, setTransRemain] = useState("");
  const [tab, setTab] = useState(TabOrder && TabOrder.Tab);
  const [TabList, setTabList] = useState("");
  const [Error, setError] = useState("");
  const token = cookies.get(env.cookieName);
  useEffect(() => {
    TabOrder
      ? localStorage.setItem(
          "orderTab",
          JSON.stringify({
            ...TabOrder,
            Tab: tab,
            manager: filters.manager,
            type: filters.category,
          })
        )
      : localStorage.setItem(
          "orderTab",
          JSON.stringify({
            Tab: tab,
            manager: filters.manager,
            type: filters.category,
          })
        );
  }, [tab, filters.manager]);
  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    updateUrlWithFilters(newFilters);
  }

  useEffect(() => {
    setLoading(1);
    const body =
      FaktorType == "Faktor"
        ? {
            offset: filters.offset ? filters.offset : "0",
            pageSize: filters.pageSize ? filters.pageSize : "25",
          }
        : {
            offset: filters.offset ? filters.offset : "0",
            pageSize: filters.pageSize ? filters.pageSize : "25",
            customer: filters.customer,
            orderNo: filters.orderNo,
            status: filters.status,
            brand: filters.brand,
            dateFrom: filters.date && filters.date.dateFrom,
            dateTo: filters.date && filters.date.dateTo,
            type: filters.category ? filters.category : TabOrder.type,
            manager: filters.manager ? filters.manager : TabOrder.manager,
            index: tab,
          };
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify(body),
    };
    fetch(
      env.siteApi +
        (FaktorType == "Faktor"
          ? "/setting/list-faktors"
          : "/panel/order/list"),
      postOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            setLoading(0);
            setError(result.error);
          } else {
            setLoading(0);
            setContent("");
            setTimeout(() => setContent(result), 200);
            setbankList(result.bankList);
            setStatusSale(result.status);
            setTransData(result.transData);
            setTransRemain(result.remain);
            setError("");
            setTabList(result.tabs);
          }
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );
  }, [filters, tab, FaktorType]);
  useEffect(() => {
    const postOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify(),
    };
    fetch(env.siteApi + "/panel/product/list-status", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setStatusList(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="user" style={{ direction: direction }}>
      <div className="od-header odHeaderBtnHolder">
        <div className="od-header-info">
          <div className="od-header-name">
            <p>{errortrans.orders[lang]}</p>
          </div>
        </div>
        <div className="od-header-btn">
          <label
            className="edit-btn"
            onClick={() => (window.location.href = "/orders/business")}
          >
            <i className="fa-solid fa-plus"></i>
            {tabletrans.orderReg[lang]}
          </label>
        </div>
      </div>
      <div className="list-container">
        <OrderTab
          setFilters={handleFilterChange}
          filters={filters}
          setTab={setTab}
          tab={tab}
          TabList={TabList}
        />
        <FaktorTab setFaktorType={setFaktorType} FaktorType={FaktorType} />
        <OrderFilters
          lang={props.lang}
          setFilters={handleFilterChange}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
          options={content.brand}
          filters={filters}
          StatusList={StatusList}
          StatusSale={StatusSale}
        />

        <div className="user-list">
          {loading ? (
            env.loader
          ) : Error ? (
            <p>دسترسی ندارید</p>
          ) : FaktorType == "Faktor" ? (
            <FaktorTabel
              tab={tab}
              setTransRemain={setTransRemain}
              TransRemain={TransRemain}
              TransData={TransData}
              bankList={bankList}
              orders={content ? content.filter : {}}
              lang={lang}
              setTransData={setTransData}
              data={content}
              isSale={content && content.isSale}
              token={token}
              errorPop={errorPop}
              setErrorPop={setErrorPop}
            />
          ) : (
            <OrderTable
              tab={tab}
              setTransRemain={setTransRemain}
              TransRemain={TransRemain}
              TransData={TransData}
              bankList={bankList}
              orders={content ? content.filter : {}}
              lang={lang}
              setTransData={setTransData}
              data={content}
              isSale={content && content.isSale}
              token={token}
              errorPop={errorPop}
              setErrorPop={setErrorPop}
            />
          )}
        </div>

        <Paging
          content={content}
          size={tab ? content.cartSize : content.size}
          filters={filters}
          lang={props.lang}
          setFilters={handleFilterChange}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
        />
      </div>
      {errorPop && errorPop.message ? (
        <ShowError
          color={errorPop.color}
          status={"سفارشات"}
          text={errorPop.message}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
export default Orders;
