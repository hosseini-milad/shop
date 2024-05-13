import Cookies from "universal-cookie";
import StatusBar from "../modules/Components/StatusBar";
import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import OrderTable from "../modules/Orders/OrderTable";
import OrderFilters from "../modules/Orders/OrderComponent/OrderFilters";
import { useEffect } from "react";
import { useState } from "react";
import env from "../env";
import tabletrans from "../translate/tables";
import {
  getFiltersFromUrl,
  updateUrlWithFilters,
  defaultFilterValues,
  handleFilterChange,
} from "../utils/filterUtils"; // Import the utility functions
const cookies = new Cookies();

function Orders(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [filters, setFilters] = useState(getFiltersFromUrl());
  const [loading, setLoading] = useState(0);
  const [tab, setTab] = useState(0);
  const token = cookies.get(env.cookieName);

  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    updateUrlWithFilters(newFilters);
  }

  useEffect(() => {
    setLoading(1);
    const body = {
      offset: filters.offset ? filters.offset : "0",
      pageSize: filters.pageSize ? filters.pageSize : "10",
      customer: filters.customer,
      orderNo: filters.orderNo,
      status: filters.status,
      brand: filters.brand,
      dateFrom: filters.date && filters.date.dateFrom,
      dateTo: filters.date && filters.date.dateTo,
      access: "manager",
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
    console.log(postOptions);
    fetch(env.siteApi + "/panel/order/list", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(0);
          setContent("");
          setTimeout(() => setContent(result), 200);
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );
  }, [filters]);
  //window.scrollTo(0, 270);},[pageNumber,filters,perPage,refreshTable])
  return (
    <div className="user" style={{ direction: direction }}>
      <div className="od-header">
        <div className="od-header-info">
          {/* <input
            type="button"
            onClick={() => setTab(tab ? 0 : 1)}
            value={"switch"}
          /> */}
          <div className="od-header-name">
            <p>{errortrans.orders[lang]}</p>
          </div>
          <button
            className="switch-btn"
            type="button"
            onClick={() => setTab(tab ? 0 : 1)}
          >
            {tab ? "مشتری" : "ویزیتور"}
          </button>
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
        <OrderFilters
          lang={props.lang}
          setFilters={handleFilterChange}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
          options={content.brand}
          filters={filters}
        />
        {tab === 0 ? (
          <div className="user-list">
            {loading ? (
              env.loader
            ) : (
              <OrderTable orders={content ? content.filter : {}} lang={lang} />
            )}
          </div>
        ) : (
          <div className="user-list">
            {loading ? (
              env.loader
            ) : (
              <OrderTable
                orders={content ? content.cartList : {}}
                lang={lang}
                cart="1"
              />
            )}
          </div>
        )}
        <Paging
          content={content}
          size={tab?content.cartSize:content.size}
          setFilters={setFilters}
          filters={filters}
          lang={props.lang}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
        />
      </div>
    </div>
  );
}
export default Orders;
