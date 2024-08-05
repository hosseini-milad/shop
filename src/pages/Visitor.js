import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import VisitorTable from "../modules/visitor/VisitorTable";
import OrderTable from "../modules/visitor/OrderTable";
import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import env, { normalPriceCount, normalPriceRound } from "../env";
import tabletrans from "../translate/tables";
import VisitorFilters from "../modules/visitor/VisitorFilters";



const cookies = new Cookies();

function Users(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [Dtable, setDtable] = useState(0);
  const [visitorID, setvisitorID] = useState(0);
  const [filters, setFilters] = useState(getFiltersFromUrl());
  const [loading, setLoading] = useState(0);
  const [SaveD, setSaveD] = useState(0);
  const [brandOptions,setBrandOptions] = useState()
  //console.log(Dtable)
  const token = cookies.get(env.cookieName);
  useEffect(() => {
    setLoading(1);
    const body = {
      // offset:filters.offset?filters.offset:"0",
      offset: filters.offset || "0",

      // pageSize:filters.pageSize?filters.pageSize:"10",
      pageSize: filters.pageSize || "10",

      userId: filters.userId?filters.userId._id:'',
      manageId: visitorID,
      status: filters.status,
      profile: filters.profile,
      brandId: filters.brand,
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
    fetch(env.siteApi + "/panel/product/report-total", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(0);
          setContent("");
          setBrandOptions(result.brandList)
          setTimeout(() => setContent(result), 200);
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );
  }, [filters,visitorID]);
  // Function to get filters from URL
  function getFiltersFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    const filters = {};
    for (const [key, value] of searchParams.entries()) {
      filters[key] = value;
    }
    return filters;
  }

  function updateUrlWithFilters(newFilters) {
    const searchParams = new URLSearchParams(window.location.search);
    for (const key in newFilters) {
      if (newFilters[key]) {
        searchParams.set(key, newFilters[key]);
      } else {
        searchParams.delete(key); // Remove the parameter if the value is falsy
      }
    }
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }

  // Function to handle filter changes
  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    updateUrlWithFilters(newFilters);
  }

  return (
    <div className="user discount-page"  style={{ direction: direction }}>
      <div className="od-header">
        <div className="od-header-info">
          <div className="od-header-name">
            <p>{tabletrans.analyze[lang]}</p>
          </div>
          
        </div>
        <div class="search-wrapper">
          <VisitorFilters
            lang={props.lang}
            token={token}
            brandOptions={brandOptions}
            //setFilters={handleFilterChange}
            options={content.access}
            profiles={content.profilesList}
            currentFilters={filters}
            updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
            setFilters={setFilters}
          />
          <div class="total-wrapper">
            <p>قیمت کل:{normalPriceRound(content.totalPrice)}</p>
            <p>تعداد کل:{content.totalCount}</p>
          </div>
        </div>
      </div>
      <div class="d-container">
        <div className="list-container visitor-list">
          
          <div className="user-list">
            <VisitorTable
              content={content}
              lang={props.lang}
              visitorid={setvisitorID}
            />
          </div>
          <Paging
            content={content}
            setFilters={setFilters}
            filters={filters}
            lang={props.lang}
            updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
          />
        </div>
        <div className="list-container Vorder-list">
          <div className="user-list">
            <OrderTable
              lang={props.lang}
              content={content}
            />
          </div>
          <Paging
            content={content}
            setFilters={setFilters}
            filters={filters}
            lang={props.lang}
            updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
          />
        </div>
      </div>
      
    </div>
  );
}
export default Users;