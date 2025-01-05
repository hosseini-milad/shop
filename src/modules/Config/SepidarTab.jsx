import { useState } from "react";

function SepidarTab(props) {
  return (
    <nav className="slidemenu" style={{ paddingInline: "5px" }}>
      {props.TabList &&
        props.TabList.map((tabItem, i) => (
          <>
            <input
              type="radio"
              name="slideItem"
              id={`slide-item-${i + 1}`}
              className="slide-toggle"
            />
            <label
              htmlFor={`slide-item-${i + 1}`}
              onClick={() => {
                props.setStock(tabItem.id);
              }}
              className={
                props.Stock === tabItem.id ? "sliderMenuSelect" : "sliderMenu"
              }
            >
              <span style={{ fontSize: "0.8rem" }}>{tabItem.title}</span>
              <div className="sliderMenu"></div>
            </label>
          </>
        ))}
    </nav>
  );
}
export default SepidarTab;
