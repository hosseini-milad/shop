import React, { useRef, useEffect, useState } from "react";
import env from "../../../env";
import Status from "../../Components/Status";
import errortrans from "../../../translate/error";
import tabletrans from "../../../translate/tables";
import formtrans from "../../../translate/forms";
import ClassDetails from "./ClassDetails";
import ProductClassUsers from "./ProductClassUsers";
import ProductClassPolicy from "./ProductClassPolicy";
import Cookies from "universal-cookie";
import PostReq from "../../../utils/PostReq";
function ProductGroupeDetailHolder(props) {
  const cookies = new Cookies();
  const token = cookies.get(env.cookieName);
  const url = window.location.pathname.split("/")[3];
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;

  const [ProductFilter, setProductFilter] = useState("");
  const [content, setContent] = useState("");
  const [customers, setCustomers] = useState("");
  const [Products, setProducts] = useState("");
  const [classChange, setClassChange] = useState("");

  useEffect(() => {
    if (url === "new") return;
    FetchGroupe();
    FetchProducts();
  }, []);
  const FetchGroupe = async () => {
    const result = await PostReq({
      method: "GET",
      url: "/panel/user/sale-policy-groups/" + url,
      body: {},
    });

    setContent(result);
  };
  const FetchProducts = async () => {
    const result = await PostReq({
      method: "post",
      url: "/panel/user/sale-policy-products/",
      body: { id: url },
    });

    setProducts(result.products);
  };
  return (
    <div className="new-item" style={{ direction: direction }}>
      <div className="create-product">
        <h4>{tabletrans.addGroupe[lang]}</h4>
        {content || url === "new" ? (
          <div className="pages-wrapper">
            <div className="item-box">
              <ClassDetails
                direction={direction}
                lang={lang}
                content={content.salePolicyGroups}
                setClassChange={setClassChange}
                classChange={classChange}
              />

              {/* <ProductClassPolicy
                direction={direction}
                lang={lang}
                content={policy}
                setClassChange={setClassChange}
                classChange={classChange}
              /> */}
            </div>
            <div className="item-box">
              <ProductClassUsers
                direction={direction}
                lang={lang}
                content={content.salePolicyGroups}
                setClassChange={setClassChange}
                classChange={classChange}
                setProductFilter={setProductFilter}
                ProductFilter={ProductFilter}
                Products={Products}
                customers={customers}
                type={"user/sale-policy-groups/"}
                typeList={"user/sale-policy-products/"}
                token={token}
                url={url}
              />
            </div>
            {/* <div className="create-btn-wrapper">
              <div className="save-btn" onClick={saveClass}>
                {formtrans.saveChanges[lang]}
              </div>
              <div
                className="cancel-btn"
                onClick={() => (window.location.href = "/productclass")}
              >
                {formtrans.cancel[lang]}
              </div>
            </div> */}
          </div>
        ) : (
          <div>{env.loader}</div>
        )}
      </div>
    </div>
  );
}
export default ProductGroupeDetailHolder;
