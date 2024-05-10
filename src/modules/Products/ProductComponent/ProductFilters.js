import StyleInput from "../../../components/Button/Input";
import StyleSelect from "../../../components/Button/AutoComplete";
import StyleDatePicker from "../../../components/Button/DatePicker";
import tabletrans from "../../../translate/tables";
import { useState } from "react";

function ProductFilters(props) {
  const lang = props.lang;
  const options = props.options;

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
          title={tabletrans.productTitle[lang.lang]}
          direction={props.lang.dir}
          action={createConditionalAction("title", 3)}

        />
        <StyleInput
          title={" واحد نگهداری موجودی sku"}
          direction={props.lang.dir}
          action={createConditionalAction("sku", 3)}

        />
        <StyleSelect
          title={"وضعیت"}
          direction={props.lang.dir}
          options={["active", "deactive"]}
          defaultValue="active"
          // action={(e) =>
          //   props.setFilters((prevState) => ({
          //     ...prevState,
          //     active: e === "active" ? 1 : 0,
          //   }))
          // }
          action={(e) => handleFilterChange("active", e)}

        />

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
export default ProductFilters;
