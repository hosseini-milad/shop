import StyleInput from "../../../components/Button/Input"
import StyleSelect from "../../../components/Button/AutoComplete"
import StyleDatePicker from "../../../components/Button/DatePicker"
import tabletrans from "../../../translate/tables"
import { useState } from "react"

function ProductFilters(props){
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
    return(
        <div className="user-filter">
            
          <div className="serach-input">
            <StyleInput title={"عنوان"} direction={props.lang.dir} 
            action={(e)=>(e.length>3||e.length===0)&&props.setFilters(prevState => ({
              ...prevState,
              title:e
            }))}/>
            <StyleInput title={" واحد نگهداری موجودی sku"} direction={props.lang.dir} 
              action={(e)=>(e.length>3||e.length===0)&&props.setFilters(prevState => ({
                ...prevState,
                sku:e
              }))}/>
            <StyleSelect title={"وضعیت"} direction={props.lang.dir} 
              options={["active","deactive"]} 
              defaultValue="active"
              action={(e)=>props.setFilters(prevState => ({
                ...prevState,
                active:e==="active"?1:0
              }))}/>
              
            <StyleSelect title={"انبار"} direction={props.lang.dir} 
              options={stock} label="Title" 
              
              action={(e)=>props.setStore(e)}/>


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
    )
}
export default ProductFilters