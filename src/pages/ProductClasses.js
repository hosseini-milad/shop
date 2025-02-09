import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import OrderFilters from "../modules/Orders/OrderComponent/OrderFilters";
import { useEffect } from "react";
import { useState } from "react";
import env from "../env";
import tabletrans from "../translate/tables";
import PClassTable from "../modules/Classes/PClassTable";
import PostReq from "../utils/PostReq";


function ProductClasses(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [filters, setFilters] = useState("");
  const [loading, setLoading] = useState(0);
  
  useEffect(() => {
    setLoading(1);
    FetchCommission();
  }, [filters]);
  const FetchCommission = async () => {
    const result = await PostReq({
      method: "post",
      url: "/panel/product/sale-commission-groups",
      body: {
        offset: filters.offset || "0",
        pageSize: filters.pageSize || "25",
      },
    });

    setTimeout(() => setContent(result.saleCommissionGroups), 200);
    setLoading(0);
  };
  const deleteClass = async (id) => {
    const result = await PostReq({
      method: "DELETE",
      url: "/panel/product/sale-commission-groups/" + id,
      body: {},
    });

    setTimeout(() => (window.location.href = "/productclass"), 2000);
  };

  return (
    <div className="user" style={{ direction: direction }}>
      <div
        className="od-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <div className="od-header-info">
          <div className="od-header-name">
            <p>{tabletrans.productClasses[lang]}</p>
          </div>
        </div>
        <div className="od-header-btn">
          <div
            className="edit-btn add-btn"
            onClick={() => (window.location.href = "/productclass/detail/new")}
          >
            <i className="fa-solid fa-plus"></i>
            <p>{tabletrans.addNew[lang]}</p>
          </div>
        </div>
      </div>
      <div className="list-container">
        {/* <OrderFilters lang={props.lang} setFilters={setFilters}
          options={content.brand} filters={filters}/> */}
        <div className="user-list">
          {loading ? (
            env.loader
          ) : (
            <PClassTable
              classes={content}
              lang={lang}
              deleteClass={deleteClass}
            />
          )}
        </div>
        <Paging
          content={content}
          setFilters={setFilters}
          filters={filters}
          lang={props.lang}
        />
      </div>
    </div>
  );
}
export default ProductClasses;
