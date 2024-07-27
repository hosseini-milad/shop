import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import StatusBar from "../modules/Components/StatusBar";
import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import SMS from "../components/SMS";


import env from "../env";
import CustomerFilters from "../modules/Customer/CustomerComponent/CustomerFilters";
import CustomerTable from "../modules/Customer/CustomerTable";
import tabletrans from "../translate/tables";
import {
  getFiltersFromUrl,
  updateUrlWithFilters,
  defaultFilterValues,
  handleFilterChange,
} from "../utils/filterUtils"; // Import the utility functions

const cookies = new Cookies();

function Customers(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [filters, setFilters] = useState(getFiltersFromUrl());
  const [showSms, setShowSMS] = useState(0);
  const [showPop, setShowPop] = useState(0);
  const [loading, setLoading] = useState(0);
  const [update, setUpdate] = useState(0);
  const token = cookies.get(env.cookieName);
  const [errorHandling, setErrorHandling] = useState(0);
  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    updateUrlWithFilters(newFilters);
  }
  useEffect(() => {
    setLoading(1);
    const body = {
      offset: filters.offset || "0",
      pageSize: filters.pageSize || "10",
      customer: filters.customer,
      orderNo: filters.orderNo,
      status: filters.status,
      brand: filters.brand,
      dateFrom: filters.date && filters.date.dateFrom,
      dateTo: filters.date && filters.date.dateTo,
      access: filters.access,
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
    fetch(env.siteApi + "/panel/user/list-customers", postOptions)
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
  useEffect(() => {
    if (update === 0) return;
    const body = {
      url: update,
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
    fetch(env.siteApi + "/panel/user/parse-list", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setErrorHandling(result.matchError);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [update]);
  const resizeFile = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const updateCustomers = async (event) => {
    const uploadFile = event.target.files[0];
    const tempfile = await resizeFile(uploadFile);
    const token = props.token;
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        base64image: tempfile,
        folderName: "excel",
        imgName: uploadFile.name.split(".")[0],
      }),
    };
    fetch(env.siteApi + "/panel/user/upload", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          //console.log(result)
          if (result.error) {
          } else {
            setUpdate(result.url);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <div className="user" style={{ direction: direction }}>
      <div className="od-header customer-header">
        <div className="od-header-info">
          <div className="od-header-name">
            <p>{tabletrans.customers[lang]}</p>
          </div>
        </div>
        <div className="od-header-btn">
          <label className="edit-btn" onClick={() => setShowSMS(1)}>
            <i className="fa-solid fa-envelope-o"></i>
            {tabletrans.sendSms[lang]}
          </label>
          
          <label className="edit-btn" onClick={() => setShowPop(1)}>
          <i className="fa-solid fa-bell"></i>
            {tabletrans.sendPop[lang]}
          </label>
          <label
            className="edit-btn"
            onClick={() => (window.location.href = "/Discount")}
          >
            <i className="fa-solid fa-percent"></i>
            {tabletrans.discount[lang]}
          </label>
          <label
            className="edit-btn"
            onClick={() => (window.location.href = "/offcustomer")}
          >
            <i className="fa-solid fa-user"></i>
            {tabletrans.newCu[lang]}
          </label>
          <label
            className="edit-btn"
            onClick={() => (window.location.href = "/class")}
          >
            <i className="fa-solid fa-plus"></i>
            {tabletrans.classes[lang]}
          </label>
        </div>
      </div>
      <div className="list-container">
        <CustomerFilters
          lang={props.lang}
          setFilters={handleFilterChange}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
          filters={filters}
          currentFilters={filters}
          options={content.access}
        />
        <div className="user-list">
          <CustomerTable userList={content} lang={props.lang} />
        </div>
        <Paging
          content={content}
          setFilters={handleFilterChange}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
          filters={filters}
          lang={props.lang}

        />

      </div>
      {showSms ? (
        <SMS
          title="ارسال پیامک"
          close={setShowSMS}
          text={`ارسال پیامک برای ${
            content.filter && content.filter.length
          } مشترک`}
          lang={props.lang}
          userList={content.filter}
        />
      ) : (
        <></>
      )}
      {showPop ? (
        <SMS
          title="پاپ آپ"
          close={setShowPop}
          text={`ارسال پاپ آپ برای ${
            content.filter && content.filter.length
          } مشترک`}
          lang={props.lang}
          userList={content.filter}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
export default Customers;
