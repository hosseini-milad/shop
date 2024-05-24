import Cookies from "universal-cookie";
import StatusBar from "../modules/Components/StatusBar";
import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import ServiceTable from "../modules/Service/ServiceTable";
import ServiceFilters from "../modules/Service/ServiceComponent/ServiceFilters";
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

function Services(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [filters, setFilters] = useState("");
  const [loading, setLoading] = useState(0);
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
      category: filters.category,
      title: filters.title,
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
    fetch(env.siteApi + "/panel/product/list", postOptions)
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
          <div className="od-header-name">
            <p>{tabletrans.service[lang]}</p>
          </div>
        </div>
        <div className="od-header-btn">
          <div
            className="edit-btn add-btn"
            onClick={() => (window.location.href = "/services/detail/new")}
          >
            <i className="fa-solid fa-plus"></i>
            <p>{tabletrans.addNew[lang]}</p>
          </div>
          <div className="edit-btn">
            <i className="fa-solid fa-pen"></i>
            <p>{tabletrans.edit[lang]}</p>
          </div>
        </div>
      </div>
      <div className="list-container">
        {/*<StatusBar lang={lang} token={token} filters={filters}
         status={content.rxStatus} setFilters={setFilters}/>*/}
        <ServiceFilters
          lang={props.lang}
          setFilters={setFilters}
          options={content.brand}
          filters={filters}
        />
        <div className="user-list">
          {loading ? (
            env.loader
          ) : (
            <ServiceTable service={content} lang={lang} />
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
export default Services;
