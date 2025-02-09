import errortrans from "../translate/error";
import { useEffect } from "react";
import { useState } from "react";
import env from "../env";
import tabletrans from "../translate/tables";
import PClassTable from "../modules/Classes/PClassTable";
import PostReq from "../utils/PostReq";
function ProductGroupe(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [filters, setFilters] = useState("");
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    setLoading(1);
    FetchPolicy();
  }, [filters]);
  const FetchPolicy = async () => {
    const result = await PostReq({
      method: "post",
      url: "/panel/user/sale-policy-groups",
      body: {},
    });

    setTimeout(() => setContent(result.salePolicyGroups), 200);
    setLoading(0);
  };
  return (
    <div className="user" style={{ direction: direction }}>
      <div className="od-header">
        <div className="od-header-info">
          <div className="od-header-name">
            <p>{tabletrans.productGroupes[lang]}</p>
          </div>
        </div>
      </div>
      <div className="list-container">
        <div className="user-list">
          {loading ? env.loader : <PClassTable classes={content} lang={lang} />}
        </div>
        {/* <Paging
          content={content}
          setFilters={setFilters}
          filters={filters}
          lang={props.lang}
        /> */}
      </div>
    </div>
  );
}
export default ProductGroupe;
