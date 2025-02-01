import { useState } from "react";
import tabletrans from "../../translate/tables";
import AdvTableRow from "./AdvTableRow";
import Status from "../Components/Status";

function AdvTable(props) {
  const brand = props.brand;
  const lang = props.lang;

  return (
    <table>
      <thead>
        <tr>
          <th>
            <p>{tabletrans.namecat[lang]}</p>
            <i></i>
          </th>

          <th style={{textAlign:"center"}}>
            <p>{tabletrans.description[lang]}</p>
            <i></i>
          </th>
          <th>
            <p>{tabletrans.status[lang]}</p>
            <i></i>
          </th>
          <th>
            <p>{tabletrans.action[lang]}</p>
            <i></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="accordion">
          <td>
            <div>
              <p className="name bold-fonts">ثبت سفارش</p>
            </div>
          </td>
          <td>تیلیغات قسمت ثبت سفارش پنل در کنار فیلترها</td>
          <td>
            <Status status={"true"} class={"order-status"} lang={props.lang} />
          </td>
          <td>
            <div className="more-btn">
              <i
                className="tableIcon fas fa-edit"
                onClick={() =>
                  (window.location.href = "/advertisment/detail/" + "new")
                }
              ></i>
            </div>
          </td>
        </tr>
        <tr className="accordion">
          <td>
            <div>
              <p className="name bold-fonts">اسلایدر سایت 1</p>
            </div>
          </td>
          <td>اسلایدر صفحه اصلی سایت بالای صفحه</td>
          <td>
            <Status status={"true"} class={"order-status"} lang={props.lang} />
          </td>
          <td>
            <div className="more-btn">
              <i
                className="tableIcon fas fa-edit"
                onClick={() =>
                  (window.location.href = "/advertisment/detail/" + "new")
                }
              ></i>
            </div>
          </td>
        </tr>
        <tr className="accordion">
          <td>
            <div>
              <p className="name bold-fonts">اسلایدر سایت 2</p>
            </div>
          </td>
          <td>اسلایدر صفحه محصولات سایت بالای صفحه</td>
          <td>
            <Status status={"true"} class={"order-status"} lang={props.lang} />
          </td>
          <td>
            <div className="more-btn">
              <i
                className="tableIcon fas fa-edit"
                onClick={() =>
                  (window.location.href = "/advertisment/detail/" + "new")
                }
              ></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
export default AdvTable;
