import React, { useEffect, useState } from "react";
import formtrans from "../../../translate/forms";
import StyleSelect from "../../../components/Button/AutoComplete";
import PClassUserTable from "../PClassUserTable";
import PostReq from "../../../utils/PostReq";
function ProductClassUsers(props) {
  const url = props.url;
  const [ProductList, setProductList] = useState("");
  const [ProductSearch, setProductSearch] = useState("");
  const [Product, setProduct] = useState("");
  console.log(Product.sku);
  useEffect(() => {
    fetchProductList();
  }, []);
  const addProductToClass = async () => {
    const result = await PostReq({
      method: "post",
      url: "/panel/" + props.typeList + url,
      body: { sku: Product.sku },
    });

    setTimeout(() => window.location.reload(), 2000);
  };
  const deleteProductToClass = async (sku) => {
    const result = await PostReq({
      method: "DELETE",
      url: "/panel/" + props.typeList + url,
      body: { sku: sku },
    });

    setTimeout(() => window.location.reload(), 2000);
  };
  const SearchProduct = async (search) => {
    if (!search || search.length < 4) return;
    const result = await PostReq({
      method: "Post",
      url: "/panel/product/list-product",
      body: { title: search },
    });
    setProductSearch(result.filter);
  };
  const fetchProductList = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/" + props.typeList,
      body: { id: url },
    });
    setProductList(result);
  };

  return (
    <div className="userItem">
      <strong>لیست محصولات</strong>
      <div className="new-member newUser">
        <StyleSelect
          title={formtrans.product[props.lang]}
          direction={props.direction}
          options={ProductSearch || []}
          label={"title" || ""}
          textChange={(e) => SearchProduct(e)}
          action={(e) => setProduct(e)}
        />
        <div className="addClassBtn" onClick={addProductToClass}>
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>

      <div className="user-list">
        <PClassUserTable
          ProductList={ProductList && ProductList.products}
          lang={{ lang: props.lang }}
          deleteProductToClass={deleteProductToClass}
        />
      </div>
    </div>
  );
}
export default ProductClassUsers;
