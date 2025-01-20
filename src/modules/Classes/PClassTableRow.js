import React, { useState } from "react";
import Status from "../Components/Status";
import env, { normalPriceCount, rxFindCount } from "../../env";
import ClassQuickDetail from "./BrandComponent/ClassQuickDetail";

function ClassTableRow(props) {
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
            <img src="/img/avatar/avatar_1.jpg" alt="avatar" />
            <div className="cu-name">
              <p className="name">{classes.className}</p>
              <p className="email">کد کلاس: {classes.classEn}</p>
            </div>
          </div>
        </td>

        <td>
          <div className="or-date">
            <p className="date">
              {new Date(classes.date).toLocaleDateString(
                props.lang === "persian" ? "fa" : "en"
              )}
            </p>
            <p className="time">
              {new Date(classes.date).toLocaleTimeString(
                props.lang === "persian" ? "fa" : "en"
              )}
            </p>
          </div>
        </td>

        <td>
          <div className="order-num">
            <p>{"product"}</p>
          </div>
        </td>
        <td>
          <div className="order-price">
            <p>{normalPriceCount(classes.totalPrice)}</p>
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
          </div>
        </td>
      </tr>
      {activeAcc ? (
        <tr className="sub-order">
          <td colSpan="9">
            <ClassQuickDetail classes={classes} />
          </td>
        </tr>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}
export default ClassTableRow;
