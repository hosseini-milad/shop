import React, { useRef, useEffect, useState } from "react";
import env from "../../../env";
import Status from "../../Components/Status";
import errortrans from "../../../translate/error";
import tabletrans from "../../../translate/tables";
import formtrans from "../../../translate/forms";
import BrandDetails from "./BrandDetails";
import BrandImage from "./BrandImage";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function BrandDetailHolder(props) {
  const url = window.location.pathname.split("/")[3];
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [error, setError] = useState({ errorText: "", errorColor: "brown" });

  const [content, setContent] = useState("");
  const [brandChange, setBrandChange] = useState("");

  const brand=props.brand
  const token=cookies.get(env.cookieName)

  useEffect(() => {
    if (url === "new") return;
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brandId: url }),
    };

    fetch(env.siteApi + "/panel/product/fetch-brand", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            setError({ errorText: result.error, errorColor: "brown" });
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              3000
            );
          } else {
            setError({ errorText: "سرویس پیدا شد", errorColor: "green" });
            setContent(result.filter);
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              2000
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  const saveBrands = () => {
    //if(newCustomer) {
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json", 
      "x-access-token":token&&token.token,"userId":token&&token.userId},
      body: JSON.stringify({ brandId: url, ...brandChange }),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/panel/product/update-brand", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            setError({ errorText: result.error, errorColor: "brown" });
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              3000
            );
          } else {
            setError({ errorText: result.success, errorColor: "green" });
            setTimeout(() => (window.location.href = "/brands"), 2000);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  console.log(content)
  return (
    <div className="new-item" style={{ direction: direction }}>
      <div className="create-product">
        <h4>{tabletrans.addBrand[lang]}</h4>
        {content || url === "new" ? (
          <div className="pages-wrapper">
            <div className="item-box">
              <BrandDetails
                direction={direction}
                lang={lang}
                content={content}
                setBrandChange={setBrandChange}
                brandChange={brandChange}
              />
              <div className="imageHolder">
                <label>Thumbnail</label>
                <BrandImage
                  lang={lang}
                  content={content}
                  value="brandUrl"
                  brandChange={brandChange}
                  part={1}
                  action={(e) =>
                    setBrandChange((prevState) => ({
                      ...prevState,
                      brandUrl: e,
                    }))
                  }
                />
                <hr />
                <label>Main Image</label>
                <BrandImage
                  lang={lang}
                  content={content}
                  value="imageUrl"
                  brandChange={brandChange}
                  part={2}
                  action={(e) =>
                    setBrandChange((prevState) => ({
                      ...prevState,
                      imageUrl: e,
                    }))
                  }
                />
              </div>
            </div>
            <div className="create-btn-wrapper">
              <div className="save-btn" onClick={saveBrands}>
                {formtrans.saveChanges[lang]}
              </div>
              <div
                className="cancel-btn"
                onClick={() => (window.location.href = "/brands")}
              >
                {formtrans.cancel[lang]}
              </div>
            </div>
          </div>
        ) : (
          <div>{env.loader}</div>
        )}
      </div>
    </div>
  );
}
export default BrandDetailHolder;
