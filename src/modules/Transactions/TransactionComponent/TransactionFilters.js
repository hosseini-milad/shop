import StyleInput from "../../../components/Button/Input";
import StyleSelect from "../../../components/Button/AutoComplete";
import StyleDatePicker from "../../../components/Button/DatePicker";
import tabletrans from "../../../translate/tables";
import { useState } from "react";

function TransactionFilters(props) {
  const category = props.filters && props.filters.category;

  const handleFilterChange = (property, value) => {
    const newValue = value ? (value._id ? value._id : value) : "";
    props.setFilters((prevState) => ({
      ...prevState,
      [property]: newValue,
    }));
    // Update URL here
    props.updateUrlWithFilters({
      ...props.currentFilters,
      [property]: newValue,
    });
  };

  // Define the conditional action
  const createConditionalAction = (property, minLength) => {
    return (e) => {
      if (e.length > minLength || e.length === 0) {
        handleFilterChange(property, e);
      }
    };
  };

  return (
    <div className="user-filter">
      <div className="serach-input">
        <StyleInput
          title={"شماره سفارش"}
          direction={props.lang.dir}
          action={createConditionalAction("orderNo", 7)} // Remove the parentheses here
        />
        {/* <StyleInput title={"مشتری"} direction={props.lang.dir} 
              action={(e)=>(e.length>3||e.length===0)&&props.setFilters(prevState => ({
                ...prevState,
                customer:e
              }))}/> */}

        {/* <StyleDatePicker title={tabletrans.selectDate[props.lang.lang]} class="filterComponent" 
              direction={props.lang.dir} local={props.lang.dir==="ltr"?"en":"fa"}
              action={(e)=>props.setFilters(prevState => ({
                ...prevState,
                date:e
              }))}/> */}

        <i className="tableIcon fas fa-ellipsis-v"></i>
      </div>
      <div className="option-sub">
        <div className="option">
          <i className="fa-solid fa-print fa-sm"></i>
          <p>Print</p>
        </div>
        <div className="option">
          <i className="fa-solid fa-file-import fa-sm"></i>
          <p>Import</p>
        </div>
        <div className="option">
          <i className="fa-solid fa-file-export fa-sm"></i>
          <p>Export</p>
        </div>
      </div>
    </div>
  );
}
export default TransactionFilters;
