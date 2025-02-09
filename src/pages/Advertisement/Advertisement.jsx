import "./Advertisement.css";
import Cookies from "universal-cookie";
import Paging from "../../modules/Components/Paging";
import errortrans from "../../translate/error";
import { useEffect } from "react";
import { useState } from "react";
import env from "../../env";
import tabletrans from "../../translate/tables";
import AdvTable from "../../modules/Adv/AdvTable";
import {
  getFiltersFromUrl,
  updateUrlWithFilters,
  defaultFilterValues,
  handleFilterChange,
} from "../../utils/filterUtils"; // Import the utility functions
const cookies = new Cookies();
function Advertisement(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [filters, setFilters] = useState("");
  const [loading, setLoading] = useState();
  const token = cookies.get(env.cookieName);
  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    updateUrlWithFilters(newFilters);
  }
  useEffect(() => {
    setLoading(1);

    const postOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify(),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/panel/user/getAdvType", postOptions)
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
            <p>{tabletrans.Advertisment[lang]}</p>
          </div>
        </div>
      </div>
      <div className="list-container">
        <div className="user-list">
          {loading ? (
            env.loader
          ) : (
            <AdvTable setLoading={setLoading} brand={content} lang={lang} />
          )}
        </div>
        {/* <Paging
          content={content}
          setFilters={setFilters}
          filters={filters}
          lang={props.lang}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
        /> */}
      </div>
    </div>
  );
}
export default Advertisement;
