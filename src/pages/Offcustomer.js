import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import NUserTable from "../modules/Users/NUserTable";
import StatusBar from "../modules/Components/StatusBar";
import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import UserFilters from "../modules/Users/UserFilters";
import env from "../env";
import tabletrans from "../translate/tables";
import SMS from "../components/SMS";
const cookies = new Cookies();

function NewUsers(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [filters, setFilters] = useState(getFiltersFromUrl());
  const [loading, setLoading] = useState(0);
  const [showSms, setShowSMS] = useState(0);
  const [update, setUpdate] = useState(0);
  const token = cookies.get(env.cookieName);
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
      official:"no"
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
    console.log(postOptions);
    fetch(env.siteApi + "/panel/user/parse-list", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [update]);

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

  return (
    <div className="user" style={{ direction: direction }}>
      <div className="od-header">
        <div className="od-header-info">
          <div className="od-header-name">
            <p>{tabletrans.newCu[lang]}</p>
          </div>
        </div>
      </div>
      <div className="list-container">
        <StatusBar />
        <UserFilters
          lang={props.lang}
          setFilters={handleFilterChange}
          // setFilters={setFilters}
          options={content.access}
          profiles={content.profilesList}
          currentFilters={filters}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
        />
        <div className="user-list">
          <NUserTable
            userList={content.filter}
            lang={props.lang}
            setSelectedUser={() => {}}
          />
        </div>
        <Paging
          content={content}
          setFilters={handleFilterChange}
          filters={filters}
          lang={props.lang}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
        />
      </div>
    </div>
  );
}
export default NewUsers;
