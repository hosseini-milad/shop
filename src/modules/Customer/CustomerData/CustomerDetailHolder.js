import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import CustomerTabs from "../CustomerComponent/CustomerTabs";
import errortrans from "../../../translate/error";
import tabletrans from "../../../translate/tables";
import env from "../../../env";
import CustomerBill from "./CustomerBill";
import CustomerNotif from "./CustomerNotif";
import CustomerSocial from "./CustomerSocial";
import CustomerSecurity from "./CustomerSecurity";
import CustomerGeneral from "./CustomerGeneral";
import CustomerSupplementary from "./CustomerSupplementary";
import CustomerClass from "./CustomerClass";
const cookies = new Cookies();

function CustomerDetailHolder(props) {

  const url = window.location.pathname.split("/")[3];
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [userData, setUserData] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const token = cookies.get(env.cookieName);

  useEffect(() => {
    var postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ userId: url }),
    };
    fetch(env.siteApi + "/panel/user/fetch-customer", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setUserData(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  return (
    <div className="account" style={{ direction: direction }}>
      <h4>
        <i
          className={`fa-solid fa-angle-${
            direction === "rtl" ? "right" : "left"
          }`}
          onClick={() => (window.location.href = "/customers")}
        ></i>
        {tabletrans.account[lang]}
      </h4>
      <CustomerTabs tabIndex={tabIndex} setTabIndex={setTabIndex} lang={lang} />

      <div className="pages-wrapper">
        {tabIndex === 0 ? (
          <CustomerGeneral
            direction={direction}
            token={token}
            lang={lang}
            userData={userData}
          />
        ) : (
          <></>
        )}
        {tabIndex === 1 ? (
          <CustomerSupplementary
            direction={direction}
            token={token}
            lang={lang}
            userData={userData}
          />
        ) : (
          <></>
        )}
        {tabIndex === 2 ? (
          <CustomerBill direction={direction} lang={lang} />
        ) : (
          <></>
        )}
        {tabIndex === 3 ? (
          <CustomerNotif direction={direction} lang={lang} />
        ) : (
          <></>
        )}
        {tabIndex === 4 ? (
          <CustomerSocial direction={direction} lang={lang} />
        ) : (
          <></>
        )}
        {tabIndex === 5 ? (
          <CustomerSecurity
            direction={direction}
            lang={lang}
            userData={userData}
          />
        ) : (
          <></>
        )}
        {tabIndex === 6 ? (
          <CustomerClass
            direction={direction}
            lang={lang}
            userData={userData}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default CustomerDetailHolder;
