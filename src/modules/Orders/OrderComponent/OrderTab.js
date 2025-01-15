import { useState } from "react";

function OrderTab(props) {
  return (
    <nav className="slidemenu">
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
                props.setFilters((prevState) => ({
                  ...prevState,
                  category: tabItem.type,
                  manager: tabItem.manager,
                }));
                props.setTab(i);
              }}
              className={props.tab === i ? "sliderMenuSelect" : "sliderMenu"}
            >
              <span>{tabItem.title}</span>
              <div className="sliderMenu"></div>
            </label>
          </>
        ))}
    </nav>
  );
}
export default OrderTab;
