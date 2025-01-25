import React, { useState } from "react";
import Status from "../Components/Status";
import env, { normalPriceCount, rxFindCount } from "../../env";
import tabletrans from "../../translate/tables";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function AdvTableRow(props) {
  const [openOption, setOpenOption] = useState(0);
  const [checkState, setCheckState] = useState(false);
  const [error, setError] = useState({ errorText: "", errorColor: "brown" });
  const activeAcc = props.index === props.detail;
  const brand = props.brand;
  const token = cookies.get(env.cookieName);

  return (
    <React.Fragment>
      <tr className={activeAcc ? "activeAccordion" : "accordion"}>
        <td className="checkBoxStyle">
          <input type="checkbox" name="" id="" />
        </td>

        <td>
          <div className="cu-avatar">
            <div
              className="cu-name"
              onClick={() =>
                (window.location.href = "/advertisment/detail/" + "new")
              }
            >
              <p className="name">اسلایدر سایت</p>
            </div>
          </div>
        </td>
        <td>
          <Status status={"true"} class={"order-status"} lang={props.lang} />
        </td>
        <td>
          <div className="more-btn">
            <i
              className="tableIcon fas fa-edit"
              onClick={() =>
                (window.location.href = "/brands/detail/" + brand._id)
              }
            ></i>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
}
export default AdvTableRow;
