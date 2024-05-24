import Cookies from "universal-cookie";
import StatusBar from "../modules/Components/StatusBar";
import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import TransactionFilters from "../modules/Transactions/TransactionComponent/TransactionFilters";
import { useEffect } from "react";
import { useState } from "react";
import env from "../env";
import TransactionTable from "../modules/Transactions/TransactionTable";
import {
  getFiltersFromUrl,
  updateUrlWithFilters,
  defaultFilterValues,
  handleFilterChange,
} from "../utils/filterUtils"; // Import the utility functions
const cookies = new Cookies();

function Transactions(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [filters, setFilters] = useState(getFiltersFromUrl());
  const [loading, setLoading] = useState(0);
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
    fetch(env.siteApi + "/panel/user/transactions", postOptions)
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
      <h4>{errortrans.transactions[lang]}</h4>
      <div className="list-container">
        <StatusBar
          lang={lang}
          token={token}
          filters={filters}
          status={content.rxStatus}
          setFilters={handleFilterChange}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop

        />
        <TransactionFilters
          lang={props.lang}
          setFilters={setFilters}
          options={content.brand}
          filters={filters}
        />
        <div className="user-list">
          {loading ? (
            env.loader
          ) : (
            <TransactionTable
              content={content}
              lang={lang}
              direction={direction}
            />
          )}
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
export default Transactions;
