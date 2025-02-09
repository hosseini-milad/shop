import React, { useState } from "react";
import Status from "../Components/Status";
import env, { normalPriceCount, rxFindCount } from "../../env";
import ClassQuickDetail from "./BrandComponent/ClassQuickDetail";

function PClassUserTableRow(props) {
  const url = props.url;
  const [openOption, setOpenOption] = useState(0);
  const [checkState, setCheckState] = useState(false);
  const activeAcc = props.index === props.detail;
  const classes = props.classes;
  return (
    <React.Fragment>
      <tr className={activeAcc ? "activeAccordion" : "accordion"}>
        <td className="checkBoxStyle">
          <input
            type="checkbox"
            name=""
            id=""
            checked={checkState}
            onChange={(e) => setCheckState(checkState ? false : true)}
          />
        </td>
        <td>
          <div
            className="cu-avatar"
            onClick={() =>
              (window.location.href = url + "/detail/" + classes._id)
            }
          >
            <img src={env.siteApiUrl + classes.imageUrl} alt="product" />
            <div className="cu-name">
              <p className="name">{classes.title}</p>
              <p className="email">کد: {classes.sku}</p>
            </div>
          </div>
        </td>

        <td>brand</td>

        <td>status</td>

        <td>
          <div className="more-btn">
            <i
              className="tableIcon fas fa-edit"
              onClick={() =>
                (window.location.href = url + "/detail/" + classes._id)
              }
            ></i>
            <i
              class="fa fa-trash"
              aria-hidden="true"
              style={{ color: "red" }}
              onClick={() => props.deleteProductToClass(classes.sku)}
            ></i>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
}
export default PClassUserTableRow;
