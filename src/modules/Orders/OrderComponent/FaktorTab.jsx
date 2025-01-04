import { useState } from "react";

function FaktorTab(props) {
  const FaktorTabList = [
    { title: "فاکتور", enTitle: "Faktor" },
    { title: "ریزفاکتور", enTitle: "SubFaktor" },
  ];
  return (
    <nav className="slidemenu">
      {FaktorTabList.map((tabItem, i) => (
        <>
          <input
            type="radio"
            name="slideItem"
            id={`slide-item-${tabItem.enTitle}`}
            className="slide-toggle"
          />
          <label
            htmlFor={`slide-item-${tabItem.enTitle}`}
            onClick={() => {
              props.setFaktorType(tabItem.enTitle);
            }}
            className={
              props.FaktorType === tabItem.enTitle
                ? "sliderMenuSelect"
                : "sliderMenu"
            }
          >
            <span>{tabItem.title}</span>
            <div className="sliderMenu"></div>
          </label>
        </>
      ))}
    </nav>
  );
}
export default FaktorTab;
