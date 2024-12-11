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
import ShowError from "../components/Modal/ShowError";
import {
  getFiltersFromUrl,
  updateUrlWithFilters,
  defaultFilterValues,
  handleFilterChange,
} from "../utils/filterUtils"; // Import the utility functions
const cookies = new Cookies();
var TabOrder = JSON.parse(localStorage.getItem("orderTab"));
function Orders(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [errorPop, setErrorPop] = useState({ message: "", color: "brown" });
  
  const [content, setContent] = useState("");
  const [bankList, setbankList] = useState("");
  const [filters, setFilters] = useState(getFiltersFromUrl());
  const [loading, setLoading] = useState(0);
  const [StatusList, setStatusList] = useState("");
  const [StatusSale, setStatusSale] = useState("");
  const [TransData,setTransData]=useState("")
  const [TransRemain,setTransRemain]=useState("")
  const [tab, setTab] = useState(TabOrder&&TabOrder.Tab);
  const [TabList, setTabList] = useState("");
  const [Error, setError] = useState("");
  const token = cookies.get(env.cookieName);
  useEffect(()=>{
    TabOrder?
      localStorage.setItem("orderTab",JSON.stringify({
        ...TabOrder,
        Tab: tab,mange:filters.manage,type:filters.category
      })):
      localStorage.setItem("orderTab",JSON.stringify({
        
        Tab: tab,mange:filters.manage,type:filters.category
      }))
  },[tab,filters.manage])
  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    updateUrlWithFilters(newFilters);
  }

  useEffect(() => {
    setLoading(1);
    const body = {
      offset: filters.offset ? filters.offset : "0",
      pageSize: filters.pageSize ? filters.pageSize : "25",
      customer: filters.customer,
      orderNo: filters.orderNo,
      status: filters.status,
      brand: filters.brand,
      dateFrom: filters.date && filters.date.dateFrom,
      dateTo: filters.date && filters.date.dateTo,
      type:filters.category?filters.category:TabOrder.type,
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
          setbankList(result.bankList)
          setStatusSale(result.status)
          setTransData(result.transData)
          setTransRemain(result.remain)
          setError('')
          setTabList(result.tabs)
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
      {/* <StatusBar
          lang={lang}
          token={token}
          filters={filters}
          status={content.rxStatus}
          setFilters={setFilters}
        /> */}
        <OrderTab setFilters={handleFilterChange} filters={filters} 
        setTab={setTab} tab={tab} TabList={TabList}/>

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
          ) : (
            Error?<p>دسترسی ندارید</p>:
            <OrderTable 
            setTransRemain={setTransRemain} 
            TransRemain={TransRemain} 
            TransData={TransData} 
            bankList={bankList} 
            orders={content ? content.filter : {}} 
            lang={lang} 
            setTransData={setTransData} 
            data={content}
            isSale={content&&content.isSale} 
            token={token}
            errorPop={errorPop}
            setErrorPop={setErrorPop}
            />
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
