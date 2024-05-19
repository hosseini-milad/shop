import StyleInput from "../../../components/Button/Input";
import StyleSelect from "../../../components/Button/AutoComplete";
import StyleDatePicker from "../../../components/Button/DatePicker";
import tabletrans from "../../../translate/tables";
import { useState } from "react";

function ProductFilters(props){
  const lang = props.lang
  const stock=[
    {
      "StockID": 5,
      "Code": 1,
      "Title": "انبار مرکزی",
      "IsActive": true
    },
    {
      "StockID": 6,
      "Code": 2,
      "Title": "انبار فروشگاه ",
      "IsActive": true
    },
    {
      "StockID": 9,
      "Code": 3,
      "Title": "انبار 3",
      "IsActive": true
    },
    {
      "StockID": 12,
      "Code": 4,
      "Title": "انبار غیر قابل فروش",
      "IsActive": true
    },
    {
      "StockID": 13,
      "Code": 5,
      "Title": "انبار فروشگاه جایگاه",
      "IsActive": true
    },
    {
      "StockID": 17,
      "Code": 6,
      "Title": "انبار پخش",
      "IsActive": true
    },
    {
      "StockID": 21,
      "Code": 7,
      "Title": "انبار سایت",
      "IsActive": true
    }
  ]
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
        <StyleSelect
          title={"موجودی"}
          direction={props.lang.dir}
          options={["موجود", "نمایش همه"]}
          action={(e)=>handleFilterChange("exist", e)}

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
        <StyleSelect title={"انبار"} direction={props.lang.dir} 
              options={stock} label="Title" 
              
              action={(e)=>handleFilterChange("store", e)}/>
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
