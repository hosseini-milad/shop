import React, { useState } from "react";
import env, { normalPriceCount, rxFindCount } from "../../env";

function ClassTableRow(props) {
  const url = props.url;
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
        <td
          onClick={() =>
            (window.location.href = url + "/detail/" + classes._id)
          }
        >
          <div className="cu-avatar">
            <img src="/products-groupe.png" alt="icon" />
            <div className="cu-name">
              <p className="name">{classes.name}</p>
              {classes.percentage && (
                <p className="email">{classes.percentage + "%"}</p>
              )}
            </div>
          </div>
        </td>

        <td>
          <div className="more-btn">
            <i
              className="tableIcon fas fa-edit"
              onClick={() =>
                (window.location.href = url + "/detail/" + classes._id)
              }
            ></i>
            {classes.percentage && (
              <i
                class="fa fa-trash"
                aria-hidden="true"
                style={{ color: "red" }}
                onClick={() => props.deleteClass(classes._id)}
              ></i>
            )}
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
}
export default ClassTableRow;
