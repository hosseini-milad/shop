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
import OrderTab from "../modules/Orders/OrderComponent/OrderTab";

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
  const [StatusList, setStatusList] = useState("");
  const [tab, setTab] = useState(localStorage.getItem("orderTab"));
  const [Error, setError] = useState("");
  const token = cookies.get(env.cookieName);
  useEffect(()=>{
    localStorage.setItem("orderTab",tab)
  },[tab])
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
      type:filters.category,
      index:tab
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
    fetch(env.siteApi + "/panel/order/list", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if(result.error){
            setLoading(0);
            setError(result.error)
          }else{
          setLoading(0);
          setContent("");
          setTimeout(() => setContent(result), 200);
          setError('')
          }
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );
  }, [filters,tab]);
  useEffect(() => {
    const postOptions={
        method:'get',
        headers: {'Content-Type': 'application/json',
        "x-access-token":token&&token.token,"userId":token&&token.userId},
        body:JSON.stringify()
      }
   fetch(env.siteApi + "/panel/product/list-status",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      setStatusList(result.data)
    },
    (error) => {
      console.log(error);
    }
    
)},[])

  //window.scrollTo(0, 270);},[pageNumber,filters,perPage,refreshTable])
  return (
    <div className="user" style={{ direction: direction }}>
      <div className="od-header odHeaderBtnHolder">
        <div className="od-header-info">
          {/* <input
            type="button"
            onClick={() => setTab(tab ? 0 : 1)}
            value={"switch"}
          /> */}
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
      <StatusBar
          lang={lang}
          token={token}
          filters={filters}
          status={content.rxStatus}
          setFilters={setFilters}
        />
        <OrderTab setFilters={handleFilterChange} filters={filters} 
        setTab={setTab} tab={tab}/>

        <OrderFilters
          lang={props.lang}
          setFilters={handleFilterChange}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
          options={content.brand}
          filters={filters}
          StatusList={StatusList}
        />
        
        <div className="user-list">
          {loading ? (
            env.loader
          ) : (
            Error?<p>دسترسی ندارید</p>:<OrderTable orders={content ? content.filter : {}} lang={lang} 
            isSale={content&&content.isSale} token={token}/>
          )}
        </div>
      
        <Paging
          content={content}
          size={tab?content.cartSize:content.size}
          filters={filters}
          lang={props.lang}
          setFilters={handleFilterChange}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
          />
      </div>
    </div>
  );
}
export default Orders;
